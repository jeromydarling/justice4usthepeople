// Pings every resource URL and prints a Markdown report of:
//   - URLs that 4xx, 5xx, or time out
//   - resources whose verifiedAt is missing or older than 180 days
//
// Exit code:
//   0 — everything healthy
//   1 — at least one issue found (the GitHub workflow uses this to decide
//       whether to open / update the tracking issue).
//
// Run locally:  npm run check-resources
import { resources } from "../src/lib/resources";

const STALE_DAYS = 180;
const TIMEOUT_MS = 10_000;
const USER_AGENT =
  "Mozilla/5.0 (compatible; J4UTPLinkCheck/1.0; +https://justice4usthepeople.org)";

type Result = {
  id: string;
  name: string;
  url?: string;
  ok: boolean;
  status?: number | string;
  issue: string;
};

async function checkOne(r: (typeof resources)[number]): Promise<Result> {
  const ageDays = r.verifiedAt
    ? Math.floor((Date.now() - +new Date(r.verifiedAt)) / 86_400_000)
    : null;
  const stale = ageDays === null || ageDays > STALE_DAYS;

  if (!r.url) {
    return {
      id: r.id,
      name: r.name,
      ok: !stale,
      issue: stale
        ? `No URL on record; ${ageDays === null ? "no verification ever" : `last verified ${ageDays}d ago`}`
        : ""
    };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    // Many sites reject HEAD with 405; try HEAD first, fall back to GET.
    let res = await fetch(r.url, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
      headers: { "User-Agent": USER_AGENT }
    });
    if (res.status === 405 || res.status === 403) {
      res = await fetch(r.url, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
        headers: { "User-Agent": USER_AGENT }
      });
    }
    clearTimeout(timer);
    const httpOk = res.status >= 200 && res.status < 400;
    return {
      id: r.id,
      name: r.name,
      url: r.url,
      ok: httpOk && !stale,
      status: res.status,
      issue: !httpOk
        ? `HTTP ${res.status}`
        : stale
          ? `URL OK but verification ${ageDays === null ? "missing" : `${ageDays}d old`}`
          : ""
    };
  } catch (err) {
    clearTimeout(timer);
    const msg = err instanceof Error ? err.message : String(err);
    return {
      id: r.id,
      name: r.name,
      url: r.url,
      ok: false,
      status: "error",
      issue: `Fetch failed: ${msg}`
    };
  }
}

async function main() {
  console.log(`# Resource verification — ${new Date().toISOString().slice(0, 10)}\n`);
  console.log(`Checking ${resources.length} resources…\n`);

  // Bounded concurrency.
  const concurrency = 6;
  const results: Result[] = [];
  for (let i = 0; i < resources.length; i += concurrency) {
    const slice = resources.slice(i, i + concurrency);
    const batch = await Promise.all(slice.map(checkOne));
    results.push(...batch);
  }

  const broken = results.filter((r) => r.status && r.status !== 200 && !r.ok);
  const stale = results.filter((r) => r.ok === false && !broken.includes(r));
  const healthy = results.filter((r) => r.ok);

  console.log(`- ✓ Healthy: ${healthy.length}`);
  console.log(`- ⚠ Stale or unverified: ${stale.length}`);
  console.log(`- ✗ Broken URL: ${broken.length}\n`);

  if (broken.length > 0) {
    console.log(`## Broken URLs\n`);
    for (const r of broken) {
      console.log(`- **${r.name}** (\`${r.id}\`): ${r.issue} — ${r.url ?? "(no URL)"}`);
    }
    console.log("");
  }

  if (stale.length > 0) {
    console.log(`## Verification overdue\n`);
    for (const r of stale) {
      console.log(`- **${r.name}** (\`${r.id}\`): ${r.issue}`);
    }
    console.log("");
  }

  console.log(`---\n`);
  console.log(
    `_Bump \`verifiedAt: "${new Date().toISOString().slice(0, 10)}"\` on a resource in \`src/lib/resources.ts\` after confirming it's still accurate._`
  );

  if (broken.length > 0 || stale.length > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
