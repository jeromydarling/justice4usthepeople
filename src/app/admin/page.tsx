"use client";
import { useEffect, useMemo, useState, FormEvent } from "react";
import Link from "next/link";
import { events, sortEvents, formatDate } from "@/lib/events";
import { feeds } from "@/lib/news";
import { site } from "@/lib/site";

// Privacy-fence admin. Hash of the password is shipped in the bundle (via a
// public env var) — anyone determined can extract it, but a long passphrase
// makes it infeasible to brute. Use only as a "keep accidental visitors out"
// fence, not as real authentication.
const HASH = process.env.NEXT_PUBLIC_ADMIN_PASSWORD_SHA256 ?? "";
const STORAGE_KEY = "j4utp-admin-ok";

async function sha256Hex(s: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    if (sessionStorage.getItem(STORAGE_KEY) === "1") setAuthed(true);
  }, []);

  if (!hydrated) return null;
  if (!authed) return <Gate onUnlock={() => setAuthed(true)} />;
  return <AdminConsole />;
}

function Gate({ onUnlock }: { onUnlock: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    if (!HASH) {
      setErr(
        "Admin lock isn't configured. Set NEXT_PUBLIC_ADMIN_PASSWORD_SHA256 in repo secrets and rebuild."
      );
      setBusy(false);
      return;
    }
    const got = await sha256Hex(pw);
    if (got !== HASH) {
      setErr("That password doesn't match.");
      setBusy(false);
      return;
    }
    sessionStorage.setItem(STORAGE_KEY, "1");
    onUnlock();
  }

  return (
    <section className="container-wide flex min-h-[60vh] items-center justify-center py-16">
      <form
        onSubmit={onSubmit}
        className="card flex w-full max-w-md flex-col gap-4 p-8"
      >
        <p className="eyebrow">Admin</p>
        <h1 className="font-serif text-2xl">Sign in to keep going.</h1>
        <p className="text-sm text-ink-soft">
          A simple lock so casual visitors don&rsquo;t see this page. Use the
          shared admin password — you can rotate it any time by changing the
          repo secret <code>ADMIN_PASSWORD_SHA256</code>.
        </p>
        <input
          type="password"
          autoFocus
          required
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="Password"
          className="input"
          autoComplete="current-password"
        />
        <button type="submit" className="btn-primary" disabled={busy}>
          {busy ? "Checking…" : "Unlock"}
        </button>
        {err && (
          <p className="field-error" role="alert">
            {err}
          </p>
        )}
      </form>
    </section>
  );
}

// ---------------------------------------------------------------------------

function AdminConsole() {
  return (
    <>
      <section className="container-wide py-12 md:py-16">
        <p className="eyebrow">Admin</p>
        <h1 className="mt-2 font-serif text-3xl md:text-4xl">
          Behind the curtain.
        </h1>
        <p className="mt-3 max-w-2xl text-ink-soft">
          Three things live here: how to talk to Claude (your CMS), how to
          view your newsletter subscribers, and how to compose this
          week&rsquo;s digest in one click.
        </p>
        <button
          type="button"
          className="btn-link mt-3 text-sm"
          onClick={() => {
            sessionStorage.removeItem(STORAGE_KEY);
            location.reload();
          }}
        >
          Sign out
        </button>
      </section>

      <CmsCheatSheet />
      <WhereThingsLive />
      <WorkingWithGitHub />
      <AskingForFeatures />
      <SubscribersPanel />
      <DigestComposer />
    </>
  );
}

// ---------------------------------------------------------------------------

function CmsCheatSheet() {
  // Examples favor things the org will actually need to do without involving
  // a developer. Each prompt names the page or the data — Claude figures out
  // the file. The framing below ("what + where") is the universal pattern.
  const examples: { goal: string; prompt: string }[] = [
    {
      goal: "Add a resource on the map",
      prompt:
        "Add a new resource on /get-help: Casa de Esperanza, 1075 Atlantic St, St. Paul. Category: housing. Phone: 651-772-1611. Languages: English, Spanish. Blurb: bilingual domestic violence support, shelter, and advocacy."
    },
    {
      goal: "Add an event",
      prompt:
        "Add an event for May 31 at 2pm: Vigil for TPS holders at the Cathedral of St. Paul. Coalition partners: AEDS, S.Y.L. Use the same pattern as the existing events."
    },
    {
      goal: "Update a phone number or hours",
      prompt:
        "On the map, the phone for the People's Center is wrong. Change it to 612-332-4973."
    },
    {
      goal: "Edit homepage copy",
      prompt:
        "On the homepage, change the headline from 'Stand in solidarity' to 'Neighbors for one another' — keep the orange '4'."
    },
    {
      goal: "Add a story",
      prompt:
        "Add a new story to /stories. Title: 'After the call.' Tag: court accompaniment. Lede: 'A first-time volunteer realized why a row of neighbors matters.' Body: 4 sentences in privacy-safe language."
    },
    {
      goal: "Mark a resource as verified",
      prompt:
        "I just confirmed the People's Center is still accurate — set its verifiedAt to today's date."
    }
  ];
  return (
    <section className="container-wide pb-12">
      <div className="card p-8">
        <p className="eyebrow">Day-to-day editing with Claude</p>
        <h2 className="mt-2 font-serif text-2xl">
          Tell Claude <em>what</em> you want changed, and <em>where</em>.
        </h2>
        <p className="mt-2 max-w-2xl text-ink-soft">
          You don&rsquo;t need to know code, file names, or terminology. Open
          Claude with your repo, paraphrase one of these, and Claude does
          the rest — finds the right file, makes the change, opens a pull
          request, and the site rebuilds in about 90 seconds.
        </p>
        <ul className="mt-6 grid gap-5 md:grid-cols-2">
          {examples.map((ex, i) => (
            <li key={i} className="rounded-xl bg-bone-100 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                {ex.goal}
              </p>
              <p className="mt-2 text-sm text-ink">{ex.prompt}</p>
              <button
                type="button"
                onClick={() => navigator.clipboard?.writeText(ex.prompt)}
                className="btn-link mt-2 text-xs"
              >
                Copy prompt
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-6 rounded-lg border border-indigo-200 bg-indigo-50 p-4 text-sm leading-relaxed text-indigo-900">
          <p className="font-semibold">Stuck on what to ask?</p>
          <p className="mt-1">
            Two prompts that always work:
            <br />
            <span className="font-mono text-xs">
              &quot;What file would I edit to change [thing]?&quot;
            </span>
            <br />
            <span className="font-mono text-xs">
              &quot;Show me how to do [thing] on this site.&quot;
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

// Plain-English map of what lives where, so the team can describe what
// they want without learning the file structure first.
function WhereThingsLive() {
  const rows: { what: string; where: string }[] = [
    { what: "Mission, contact info, social links, nav menu", where: "src/lib/site.ts" },
    { what: "Resources on the map", where: "src/lib/resources.ts" },
    { what: "Events (and their posters)", where: "src/lib/events.ts + /public/events/" },
    { what: "Coalition partners", where: "src/app/partners/page.tsx" },
    { what: "Stories", where: "src/app/stories/page.tsx" },
    { what: "Get-Help programs (Rental / Food / Legal)", where: "src/lib/programs.tsx" },
    { what: "Know-Your-Rights bilingual content", where: "src/app/know-your-rights/page.tsx" },
    { what: "Spanish landing page", where: "src/app/es/page.tsx" },
    { what: "Somali landing page", where: "src/app/so/page.tsx" },
    { what: "Homepage copy", where: "src/app/page.tsx" },
    { what: "News sources (RSS feeds)", where: "src/lib/news.ts" },
    { what: "Donate / Stripe links", where: "repo secrets (the techy)" }
  ];
  return (
    <section className="container-wide pb-12">
      <div className="card p-8">
        <p className="eyebrow">Where things live</p>
        <h2 className="mt-2 font-serif text-2xl">A plain-English map.</h2>
        <p className="mt-2 max-w-2xl text-ink-soft">
          You don&rsquo;t need to memorize this — Claude knows. But it helps
          to describe what you&rsquo;re changing in your own words.
        </p>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink/10 text-left text-xs uppercase tracking-wider text-ink-muted">
                <th className="py-2 pr-4">What you want to change</th>
                <th className="py-2">Where it lives</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.what} className="border-b border-ink/5">
                  <td className="py-2 pr-4">{r.what}</td>
                  <td className="py-2 font-mono text-xs text-ink-muted">{r.where}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// Three categories of "I want to do X on the site," with examples of which
// kind each is. Helps the org know when they can move forward alone vs.
// when to ask the dev to set something up.
function WorkingWithGitHub() {
  return (
    <section className="container-wide pb-12">
      <div className="card p-8">
        <p className="eyebrow">Working with GitHub</p>
        <h2 className="mt-2 font-serif text-2xl">
          The shortest GitHub primer you&rsquo;ll ever read.
        </h2>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed">
          <li>
            <strong>The repo</strong> is the box that holds the website&rsquo;s
            code, content, and history. Every page on the live site comes from
            files in here.
          </li>
          <li>
            <strong>Commits</strong> are saved snapshots. Every time you ask
            Claude to change something, Claude commits — and the site rebuilds
            and re-deploys automatically about 90 seconds later. There is no
            &quot;publish&quot; button to press.
          </li>
          <li>
            <strong>Pull requests (PRs)</strong> are bundles of changes
            proposed for review before merging into the live site. Claude
            usually makes a PR, then merges it for you. You can ask Claude to{" "}
            <em>not</em> merge — useful when you want a teammate to look first.
          </li>
          <li>
            <strong>Issues</strong> are a to-do list. Form submissions land
            here as labeled issues — newsletter signups, contact-form
            messages, court-support volunteers. You don&rsquo;t need to do
            anything with them inside GitHub; the labels group them.
          </li>
          <li>
            <strong>Actions</strong> is the tab that shows automated runs:
            site deploys, the monthly resource link-checker, etc. If
            something looks off on the site, this is where to peek first.
          </li>
        </ul>

        <p className="mt-6 text-sm text-ink-soft">
          Useful direct links:
        </p>
        <ul className="mt-2 grid gap-2 text-sm md:grid-cols-2">
          <li>
            <a
              className="btn-link"
              target="_blank"
              rel="noreferrer"
              href="https://github.com/jeromydarling/justice4usthepeople"
            >
              The repo →
            </a>
          </li>
          <li>
            <a
              className="btn-link"
              target="_blank"
              rel="noreferrer"
              href="https://github.com/jeromydarling/justice4usthepeople/actions"
            >
              Actions / build status →
            </a>
          </li>
          <li>
            <a
              className="btn-link"
              target="_blank"
              rel="noreferrer"
              href="https://github.com/jeromydarling/j4utp-submissions/issues"
            >
              Form submissions (private) →
            </a>
          </li>
          <li>
            <a
              className="btn-link"
              target="_blank"
              rel="noreferrer"
              href="https://github.com/jeromydarling/justice4usthepeople/issues?q=is%3Aissue+is%3Aopen+label%3Aresource-verification"
            >
              Resource verification issue →
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

function AskingForFeatures() {
  const easy: string[] = [
    "Add or remove a resource / event / partner / story.",
    "Edit any text on any page.",
    "Add a new page (e.g. /press, /our-team).",
    "Update the donation impact numbers / hotline phone / address.",
    "Translate a page to another language (you can fix translations later).",
    "Add a new news source (any RSS URL works).",
    "Change colors, fonts, or the look of any section.",
    "Hide a page from the nav (e.g. tuck /court-support away for now)."
  ];
  const techy: string[] = [
    "Connect a new payment service (Stripe products, recurring giving).",
    "Switch from Gmail BCC to a real mailing list service (Buttondown, Resend).",
    "Add SMS or text-blast capabilities.",
    "Move to a paid Mapbox plan / get a custom map style.",
    "Migrate the domain or change DNS.",
    "Wire up real OAuth / single sign-on for /admin (vs. the password fence)."
  ];
  return (
    <section className="container-wide pb-12">
      <div className="card p-8">
        <p className="eyebrow">Asking for new features</p>
        <h2 className="mt-2 font-serif text-2xl">
          Three categories of &quot;can we do X?&quot;
        </h2>
        <p className="mt-2 max-w-2xl text-ink-soft">
          When something new comes to mind, ask Claude first:{" "}
          <em>&quot;Can you do this on this site, or do you need help from someone with access to keys / services?&quot;</em>{" "}
          Claude will tell you which bucket the request falls into.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-serif text-lg text-indigo-700">
              Claude can probably do this alone
            </h3>
            <p className="mt-1 text-xs text-ink-muted">
              No keys, no third-party setup. Just ask and it ships.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-ink">
              {easy.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-lg text-ember-700">
              Needs the developer
            </h3>
            <p className="mt-1 text-xs text-ink-muted">
              Anything involving secrets, API keys, or new external services.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-ink">
              {techy.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-7 rounded-lg border border-ember-300 bg-ember-50 p-4 text-sm leading-relaxed text-ember-900">
          <p className="font-semibold">A good template for new-feature asks</p>
          <p className="mt-1">
            <em>
              &quot;On <strong>[which page]</strong>, I want{" "}
              <strong>[who]</strong> to be able to{" "}
              <strong>[what]</strong>, so that{" "}
              <strong>[why]</strong>. Can you do this without setting up
              anything new?&quot;
            </em>
          </p>
          <p className="mt-2 text-xs">
            Claude will either build it, or tell you exactly what would
            need to be set up first — so you know what to take to the dev.
          </p>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------

function SubscribersPanel() {
  // Subscribers land as labeled issues in the submissions repo. The org views
  // and exports them via GitHub directly — no API call from this page.
  const issuesUrl =
    "https://github.com/jeromydarling/j4utp-submissions/issues?q=is%3Aissue+label%3Anewsletter-subscribe";
  return (
    <section className="container-wide pb-12">
      <div className="card p-8">
        <p className="eyebrow">Newsletter list</p>
        <h2 className="mt-2 font-serif text-2xl">Where the subscribers live.</h2>
        <p className="mt-2 text-ink-soft">
          Each newsletter signup creates a labeled issue in the private
          submissions repo. To export the list, open the link below — copy
          email addresses from the issue titles.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={issuesUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            Open subscribers in GitHub →
          </a>
          <Link href="/contact" className="btn-ghost">
            Or test the public form
          </Link>
        </div>
        <p className="mt-4 text-xs text-ink-muted">
          Tip: in GitHub, click the label name to filter, then select all and copy.
          For a richer export, ask Claude: &quot;Export the newsletter-subscribe
          issues as a CSV.&quot;
        </p>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------

type Story = { title: string; link: string; pubDate: string; source: string };

function DigestComposer() {
  const [stories, setStories] = useState<Story[]>([]);
  const [pickedIds, setPickedIds] = useState<Set<string>>(new Set());
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);

  // Pull last 7 days from the same news sources used on /news.
  useEffect(() => {
    const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
    Promise.allSettled(
      feeds.map(async (f) => {
        const u = new URL("https://api.rss2json.com/v1/api.json");
        u.searchParams.set("rss_url", f.url);
        u.searchParams.set("count", "5");
        const r = await fetch(u.toString());
        if (!r.ok) throw new Error(f.id);
        const j = await r.json();
        return ((j.items ?? []) as Story[]).map((it) => ({
          title: it.title,
          link: it.link,
          pubDate: it.pubDate,
          source: f.source
        }));
      })
    ).then((settled) => {
      const all = settled
        .flatMap((r) => (r.status === "fulfilled" ? r.value : []))
        .filter((it) => +new Date(it.pubDate) >= cutoff)
        .sort((a, b) => +new Date(b.pubDate) - +new Date(a.pubDate))
        .slice(0, 12);
      setStories(all);
      // Default-select first 5
      setPickedIds(new Set(all.slice(0, 5).map((s) => s.link)));
      setLoading(false);
    });
  }, []);

  const upcomingEvents = useMemo(() => sortEvents().upcoming.slice(0, 3), []);

  const subject = `This week with ${site.shortName} — ${new Date().toLocaleDateString(
    undefined,
    { month: "short", day: "numeric" }
  )}`;

  const body = useMemo(() => {
    const picked = stories.filter((s) => pickedIds.has(s.link));
    const lines: string[] = [];
    lines.push(`Friends,\n`);
    if (note.trim()) lines.push(note.trim() + "\n");
    if (picked.length > 0) {
      lines.push("From the news this week:");
      for (const s of picked) {
        lines.push(`• ${s.title} — ${s.source}\n  ${s.link}`);
      }
      lines.push("");
    }
    if (upcomingEvents.length > 0) {
      lines.push("Coming up — show up:");
      for (const e of upcomingEvents) {
        lines.push(
          `• ${e.title} — ${formatDate(e)}\n  ${site.url}/events`
        );
      }
      lines.push("");
    }
    lines.push("Thank you for being part of this work.");
    lines.push(`— ${site.name}`);
    lines.push(`${site.url}`);
    lines.push(``);
    lines.push(
      `(You're receiving this because you subscribed at ${site.url}. Reply to unsubscribe.)`
    );
    return lines.join("\n");
  }, [stories, pickedIds, note, upcomingEvents]);

  const mailto = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <section className="container-wide pb-24">
      <div className="card p-8">
        <p className="eyebrow">Compose this week&rsquo;s digest</p>
        <h2 className="mt-2 font-serif text-2xl">One click to Gmail.</h2>
        <p className="mt-2 text-ink-soft">
          Pre-filled with the last 7 days of news and the next 3 events.
          Clicking <em>Open in Gmail</em> opens a new compose window — paste
          your subscriber list into BCC and hit send.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow">Your note</p>
            <textarea
              className="textarea mt-2 min-h-[140px]"
              placeholder="A few sentences from you to set the week's tone."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            <p className="eyebrow mt-6">Stories to include</p>
            {loading && (
              <p className="mt-2 text-sm text-ink-muted">Loading the last 7 days…</p>
            )}
            {!loading && stories.length === 0 && (
              <p className="mt-2 text-sm text-ink-muted">
                No fresh stories from the feeds. You can still send the digest.
              </p>
            )}
            <ul className="mt-2 space-y-2">
              {stories.map((s) => {
                const id = s.link;
                const on = pickedIds.has(id);
                return (
                  <li key={id} className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={() => {
                        const next = new Set(pickedIds);
                        if (on) next.delete(id);
                        else next.add(id);
                        setPickedIds(next);
                      }}
                      className="mt-1"
                    />
                    <span className="text-sm">
                      <span className="font-medium">{s.title}</span>
                      <span className="block text-xs text-ink-muted">
                        {s.source}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="md:col-span-7">
            <p className="eyebrow">Preview</p>
            <p className="mt-2 text-sm text-ink-muted">Subject</p>
            <p className="mt-1 rounded-lg bg-bone-100 px-3 py-2 text-sm">
              {subject}
            </p>
            <p className="mt-3 text-sm text-ink-muted">Body</p>
            <pre className="mt-1 max-h-[280px] overflow-auto whitespace-pre-wrap rounded-lg bg-bone-100 p-3 text-xs leading-relaxed text-ink sm:max-h-[400px]">
              {body}
            </pre>

            <div className="mt-5 flex flex-wrap gap-3">
              <a href={mailto} className="btn-primary">
                Open in Gmail (or default mail) →
              </a>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => navigator.clipboard?.writeText(body)}
              >
                Copy body
              </button>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => navigator.clipboard?.writeText(subject)}
              >
                Copy subject
              </button>
            </div>
            <p className="mt-3 text-xs text-ink-muted">
              Gmail&rsquo;s free tier limits BCC to ~500 recipients/day.
              Workspace accounts allow up to 2,000. Past that, switch to a
              dedicated sender (Buttondown, Resend) — Claude can wire it up.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
