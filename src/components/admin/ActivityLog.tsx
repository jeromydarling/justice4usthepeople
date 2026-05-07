"use client";
import { useEffect, useState } from "react";

// Pulls the last 10 commits on the public repo via GitHub's unauthenticated
// API and renders them in plain English. Rate-limited to ~60 calls/hour
// per IP, which is plenty for a small admin team.

type Commit = {
  sha: string;
  url: string;
  author: string;
  message: string;
  date: string;
};

const REPO = "jeromydarling/justice4usthepeople";

function relativeTime(iso: string): string {
  const ms = Date.now() - +new Date(iso);
  const m = Math.floor(ms / 60_000);
  if (m < 1) return "just now";
  if (m < 60) return `${m} minute${m === 1 ? "" : "s"} ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} hour${h === 1 ? "" : "s"} ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d} day${d === 1 ? "" : "s"} ago`;
  return new Date(iso).toLocaleDateString();
}

function humanize(message: string): string {
  // Strip the conventional commit prefix when rendering the headline.
  return message.replace(/^[a-z]+(\([^)]+\))?:\s*/, "").split("\n")[0];
}

export function ActivityLog() {
  const [commits, setCommits] = useState<Commit[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://api.github.com/repos/${REPO}/commits?per_page=10`, {
      signal: controller.signal,
      headers: { Accept: "application/vnd.github+json" }
    })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: { sha: string; html_url: string; commit: { author: { name: string; date: string }; message: string } }[]) => {
        setCommits(
          data.map((c) => ({
            sha: c.sha.slice(0, 7),
            url: c.html_url,
            author: c.commit.author.name,
            message: c.commit.message,
            date: c.commit.author.date
          }))
        );
      })
      .catch((err: unknown) => {
        if ((err as { name?: string })?.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Couldn't load commits.");
      });
    return () => controller.abort();
  }, []);

  return (
    <section id="activity" className="container-wide pb-12">
      <div className="card p-8">
        <p className="eyebrow">Recent activity</p>
        <h2 className="mt-2 font-serif text-2xl">What changed lately.</h2>
        <p className="mt-2 max-w-2xl text-ink-soft">
          The last 10 commits on the public repo, in plain English. Click any
          one to see the full diff on GitHub.
        </p>

        {error && (
          <p className="mt-5 rounded-lg border border-ember-300 bg-ember-50 p-4 text-sm text-ember-700">
            Couldn&rsquo;t load activity ({error}). GitHub&rsquo;s public API
            is rate-limited — try again in an hour.
          </p>
        )}

        {!error && !commits && (
          <ul className="mt-5 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <li key={i} className="animate-pulse rounded-xl bg-bone-100 p-4">
                <div className="h-3 w-1/3 rounded bg-ink/10" />
                <div className="mt-2 h-3 w-2/3 rounded bg-ink/10" />
              </li>
            ))}
          </ul>
        )}

        {!error && commits && commits.length === 0 && (
          <p className="mt-5 text-sm text-ink-muted">No recent commits.</p>
        )}

        {!error && commits && commits.length > 0 && (
          <ul className="mt-5 divide-y divide-ink/10 rounded-2xl bg-bone-100 ring-1 ring-ink/5">
            {commits.map((c) => (
              <li key={c.sha}>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col gap-1 px-4 py-3 no-underline transition hover:bg-bone-100/70"
                >
                  <p className="text-sm font-medium text-ink">
                    {humanize(c.message)}
                  </p>
                  <p className="text-xs text-ink-muted">
                    by {c.author} · {relativeTime(c.date)} ·{" "}
                    <span className="font-mono">{c.sha}</span>
                  </p>
                </a>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-4 text-xs text-ink-muted">
          Want to roll back? Tell Claude:{" "}
          <em>&ldquo;Revert commit [sha]&rdquo;</em>.
        </p>
      </div>
    </section>
  );
}
