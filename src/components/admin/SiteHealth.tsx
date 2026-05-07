"use client";
import { useMemo } from "react";
import { resources, categories } from "@/lib/resources";
import { events, sortEvents } from "@/lib/events";

// At-a-glance health card — everything is computed from local data so we
// don't need any GitHub auth. Counts the team can act on:
//   - upcoming events
//   - resource verification status
//   - translation coverage by page
// Manual but useful: the team can see the "what's healthy / what needs
// attention" in one glance.

const STALE_DAYS = 180;

// Mirror of which pages we track for translation coverage. Add a row when
// you ship a new top-level page worth localizing.
const localizable = [
  { id: "/", label: "Home" },
  { id: "/get-help", label: "Get Help" },
  { id: "/find-loved-one", label: "If a loved one was detained" },
  { id: "/know-your-rights", label: "Know Your Rights" },
  { id: "/values", label: "Our Values" },
  { id: "/take-action", label: "Take Action" },
  { id: "/court-support", label: "Court Support" }
];

// Hard-coded so it doesn't depend on filesystem reads at runtime. Update
// this object whenever a new translated page lands.
const translated: Record<string, string[]> = {
  "/": ["en", "es", "so"],
  "/know-your-rights": ["en", "es"], // bilingual side-by-side on the same page
  "/get-help": ["en"],
  "/find-loved-one": ["en"],
  "/values": ["en"],
  "/take-action": ["en"],
  "/court-support": ["en"]
};

export function SiteHealth() {
  const counts = useMemo(() => {
    const now = new Date();
    const { upcoming, past } = sortEvents(now);
    const stale = resources.filter((r) => {
      const v = r.verifiedAt ? new Date(r.verifiedAt) : null;
      return !v || (Date.now() - +v) / 86_400_000 > STALE_DAYS;
    });
    const verified = resources.length - stale.length;
    const byCategory: Record<string, number> = {};
    for (const r of resources) {
      byCategory[r.category] = (byCategory[r.category] ?? 0) + 1;
    }
    return {
      upcomingEvents: upcoming.length,
      pastEvents: past.length,
      totalResources: resources.length,
      verifiedResources: verified,
      staleResources: stale.length,
      byCategory
    };
  }, []);

  const translationPct = useMemo(() => {
    const totalCells = localizable.length * 3; // en, es, so
    let filled = 0;
    for (const p of localizable) {
      const langs = translated[p.id] ?? ["en"];
      filled += langs.length;
    }
    return Math.round((filled / totalCells) * 100);
  }, []);

  return (
    <section id="health" className="container-wide pb-12">
      <div className="card p-8">
        <p className="eyebrow">Site health</p>
        <h2 className="mt-2 font-serif text-2xl">At a glance.</h2>
        <p className="mt-2 max-w-2xl text-ink-soft">
          Everything below is computed from this build — refresh the page
          after a deploy to see the new state.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat
            label="Upcoming events"
            value={counts.upcomingEvents}
            sub={`${counts.pastEvents} past`}
            tone={counts.upcomingEvents > 0 ? "good" : "warn"}
            href="/events"
          />
          <Stat
            label="Resources verified"
            value={`${counts.verifiedResources}/${counts.totalResources}`}
            sub={
              counts.staleResources > 0
                ? `${counts.staleResources} overdue`
                : "all current"
            }
            tone={counts.staleResources === 0 ? "good" : "warn"}
            href="/get-help"
          />
          <Stat
            label="Translation coverage"
            value={`${translationPct}%`}
            sub={`${localizable.length} pages × 3 languages`}
            tone={translationPct >= 60 ? "good" : "warn"}
          />
          <Stat
            label="Resource categories"
            value={Object.keys(counts.byCategory).length}
            sub="all currently active"
            tone="good"
          />
        </div>

        {/* Resources by category */}
        <div className="mt-6 rounded-2xl bg-bone-100 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
            Resources by category
          </p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(counts.byCategory).map(([k, n]) => (
              <li key={k} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{
                      background:
                        categories[k as keyof typeof categories]?.color ?? "#000"
                    }}
                  />
                  {categories[k as keyof typeof categories]?.label ?? k}
                </span>
                <span className="font-mono text-xs text-ink-muted">{n}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  sub,
  tone,
  href
}: {
  label: string;
  value: string | number;
  sub?: string;
  tone?: "good" | "warn";
  href?: string;
}) {
  const ringClass =
    tone === "warn"
      ? "ring-ember-300 bg-ember-50"
      : "ring-indigo-200 bg-indigo-50/30";
  const inner = (
    <div className={`rounded-2xl p-5 ring-1 ${ringClass}`}>
      <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
        {label}
      </p>
      <p className="mt-2 font-serif text-3xl text-ink">{value}</p>
      {sub && <p className="mt-1 text-xs text-ink-muted">{sub}</p>}
    </div>
  );
  if (href) {
    return (
      <a href={href} className="block no-underline transition hover:-translate-y-0.5">
        {inner}
      </a>
    );
  }
  return inner;
}
