// The five places the team will actually navigate to. External links open in
// a new tab. No surprises, no jargon.
type Link = { label: string; url: string; note: string; external?: boolean };

const links: Link[] = [
  {
    label: "Open the repo in Claude",
    url: "https://claude.ai/projects",
    note: "Where you talk to Claude about edits. Pick the justice4usthepeople project.",
    external: true
  },
  {
    label: "View the live site",
    url: "https://justice4usthepeople.org",
    note: "What the world sees right now.",
    external: true
  },
  {
    label: "Recent builds & deploys",
    url: "https://github.com/jeromydarling/justice4usthepeople/actions",
    note: "Did the latest change reach the live site? Look here when something seems off.",
    external: true
  },
  {
    label: "Form submissions (private)",
    url: "https://github.com/jeromydarling/j4utp-submissions/issues",
    note: "Inbox for everything that comes through any form on the site.",
    external: true
  },
  {
    label: "Newsletter subscribers",
    url: "https://github.com/jeromydarling/j4utp-submissions/issues?q=is%3Aissue+label%3Anewsletter-subscribe",
    note: "Filtered view of just the newsletter signups.",
    external: true
  },
  {
    label: "Open issues / to-dos",
    url: "https://github.com/jeromydarling/justice4usthepeople/issues",
    note: "Things flagged for follow-up — including the monthly resource verification.",
    external: true
  }
];

export function QuickLinks() {
  return (
    <section className="container-wide pb-12">
      <div className="card p-8">
        <p className="eyebrow">Quick links</p>
        <h2 className="mt-2 font-serif text-2xl">Six places you&rsquo;ll go.</h2>
        <p className="mt-2 text-ink-soft">
          Bookmark these in your browser. You&rsquo;ll rarely need anywhere
          else.
        </p>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {links.map((l) => (
            <li key={l.url}>
              <a
                href={l.url}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noreferrer" : undefined}
                className="block rounded-2xl bg-bone-100 p-5 no-underline transition hover:bg-bone-100/70"
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium text-ink">{l.label}</p>
                  <span className="text-ink-muted">↗</span>
                </div>
                <p className="mt-1 text-sm text-ink-muted">{l.note}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
