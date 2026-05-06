// Cloudflare Worker — receives form submissions from the static site and
// creates a GitHub Issue in a designated (private) repo. No third-party
// email service, no database. Submission data lives in your own GitHub.
//
// Deploy with `wrangler deploy` from /worker.
// See ./README.md for setup steps.

export interface Env {
  // Comma-separated list of allowed Origin headers, e.g.
  //   "https://justice4usthepeople.org,https://jeromydarling.github.io"
  ALLOWED_ORIGINS: string;

  // Fine-grained Personal Access Token with Issues: Read & write on
  // ISSUES_REPO only.
  GITHUB_TOKEN: string;

  // "owner/repo" where issues are created (use a PRIVATE repo — submissions
  // contain PII).
  ISSUES_REPO: string;

  // Optional: default label applied to every issue (e.g. "form-submission").
  ISSUES_LABEL?: string;

  // Optional: when set, simple per-IP rate limit (requests per minute).
  RATE_LIMIT_PER_MIN?: string;

  // Optional KV namespace for rate limiting; bind in wrangler.toml.
  RATE_LIMIT?: KVNamespace;
}

export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const cors = buildCors(req, env);
    if (req.method === "OPTIONS") return new Response(null, { headers: cors });
    if (req.method !== "POST") {
      return json({ error: "Method not allowed" }, 405, cors);
    }

    // Read body — accept either form-encoded or JSON.
    const data = await readBody(req);

    // Honeypot — silently accept and discard.
    if (data._gotcha) return json({ ok: true }, 200, cors);

    // Basic abuse mitigation.
    const ip = req.headers.get("CF-Connecting-IP") ?? "unknown";
    if (await isRateLimited(env, ip)) {
      return json({ error: "Too many requests" }, 429, cors);
    }

    const formId = sanitize(data._form || "general", 64);
    const subject = sanitize(data._subject || `New ${formId} submission`, 200);

    try {
      const issue = await createIssue(env, { formId, subject, data, ip });
      // Fire-and-forget: any background work (analytics, etc.) goes via ctx.
      ctx.waitUntil(Promise.resolve());
      return json({ ok: true, id: issue.number, url: issue.html_url }, 200, cors);
    } catch (err) {
      console.error("Worker error:", err);
      return json({ error: "Submission failed. Please try again or call us." }, 502, cors);
    }
  }
};

// ---------------------------------------------------------------------------

function buildCors(req: Request, env: Env): HeadersInit {
  const origin = req.headers.get("Origin") ?? "";
  const allowed = (env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const ok = allowed.includes("*") || allowed.includes(origin);
  return {
    "Access-Control-Allow-Origin": ok ? origin : "",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin"
  };
}

function json(body: unknown, status: number, cors: HeadersInit): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...(cors as Record<string, string>) }
  });
}

async function readBody(req: Request): Promise<Record<string, string>> {
  const ct = req.headers.get("content-type") ?? "";
  if (ct.includes("application/json")) {
    const j = (await req.json()) as Record<string, unknown>;
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(j)) out[k] = String(v ?? "");
    return out;
  }
  // Default: form-encoded or multipart.
  const form = await req.formData();
  const out: Record<string, string> = {};
  for (const [k, v] of form.entries()) out[k] = typeof v === "string" ? v : "(file)";
  return out;
}

function sanitize(s: string, max = 200): string {
  return s.replace(/[\r\n]+/g, " ").slice(0, max);
}

// ---------------------------------------------------------------------------
// GitHub Issue creation
// ---------------------------------------------------------------------------

async function createIssue(
  env: Env,
  ctx: { formId: string; subject: string; data: Record<string, string>; ip: string }
) {
  const url = `https://api.github.com/repos/${env.ISSUES_REPO}/issues`;
  const body = renderIssueBody(ctx);
  const labels = env.ISSUES_LABEL ? [env.ISSUES_LABEL, ctx.formId] : [ctx.formId];

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "j4utp-forms-worker",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title: ctx.subject, body, labels })
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`GitHub API ${res.status}: ${detail}`);
  }
  return (await res.json()) as { number: number; html_url: string };
}

function renderIssueBody({
  formId,
  data,
  ip
}: {
  formId: string;
  subject: string;
  data: Record<string, string>;
  ip: string;
}): string {
  const ts = new Date().toISOString();
  const meta = [
    `**Form:** \`${formId}\``,
    `**Submitted:** ${ts}`,
    `**IP:** \`${ip}\``
  ].join("  \n");

  const longFieldKeys = ["story", "message", "skills", "diet", "why", "comments", "comment"];
  const hidden = ["_gotcha", "_form", "_subject"];

  const rows: string[] = [];
  const long: { k: string; v: string }[] = [];

  for (const [k, v] of Object.entries(data)) {
    if (hidden.includes(k) || !v) continue;
    if (longFieldKeys.includes(k.toLowerCase()) || v.length > 120) {
      long.push({ k, v });
    } else {
      rows.push(`| **${escapeMd(k)}** | ${escapeMd(v)} |`);
    }
  }

  const table = rows.length
    ? `\n| Field | Value |\n|---|---|\n${rows.join("\n")}\n`
    : "";

  const longSections = long.length
    ? `\n\n${long
        .map((p) => `### ${escapeMd(p.k)}\n\n${quoteMd(p.v)}`)
        .join("\n\n")}`
    : "";

  return [
    `_Auto-created from a public form submission. Treat as PII._`,
    "",
    meta,
    table,
    longSections
  ].join("\n");
}

function escapeMd(s: string): string {
  return s.replace(/\|/g, "\\|").replace(/[\r\n]+/g, " ").trim();
}

function quoteMd(s: string): string {
  return s
    .split(/\r?\n/)
    .map((line) => `> ${line}`)
    .join("\n");
}

// ---------------------------------------------------------------------------
// Rate limit (best-effort; only active when KV is bound)
// ---------------------------------------------------------------------------

async function isRateLimited(env: Env, ip: string): Promise<boolean> {
  if (!env.RATE_LIMIT) return false;
  const limit = parseInt(env.RATE_LIMIT_PER_MIN ?? "8", 10);
  const key = `rl:${ip}:${Math.floor(Date.now() / 60000)}`;
  const current = parseInt((await env.RATE_LIMIT.get(key)) ?? "0", 10);
  if (current >= limit) return true;
  await env.RATE_LIMIT.put(key, String(current + 1), { expirationTtl: 90 });
  return false;
}
