import type { Resource } from "@/lib/resources";

const STALE_DAYS = 180;

// Renders a small status pill next to a resource:
//   - "Verified Mar 2026"        — verifiedAt within STALE_DAYS
//   - "Verification overdue"     — verifiedAt > STALE_DAYS old
//   - "Awaiting verification"    — verifiedAt missing
// The team bumps verifiedAt when they confirm the resource is still current;
// the GitHub Action `check-resource-urls` opens an issue when URLs go down.
export function VerifiedBadge({ r }: { r: Resource }) {
  const v = r.verifiedAt ? new Date(r.verifiedAt) : null;
  const ageDays = v ? Math.floor((Date.now() - +v) / 86_400_000) : null;
  const stale = ageDays === null || ageDays > STALE_DAYS;

  const label = !v
    ? "Awaiting verification"
    : stale
      ? "Verification overdue"
      : `Verified ${v.toLocaleDateString(undefined, {
          month: "short",
          year: "numeric"
        })}`;

  const className = stale
    ? "inline-flex items-center gap-1.5 rounded-full bg-ember-100 px-2.5 py-0.5 text-[11px] font-medium text-ember-700"
    : "inline-flex items-center gap-1.5 rounded-full bg-indigo-700/10 px-2.5 py-0.5 text-[11px] font-medium text-indigo-700";

  return (
    <span className={className} title={r.verifiedAt ?? "No verification on record"}>
      <Dot stale={stale} />
      {label}
    </span>
  );
}

function Dot({ stale }: { stale: boolean }) {
  return (
    <span
      aria-hidden
      className="inline-block h-1.5 w-1.5 rounded-full"
      style={{ background: stale ? "#a8512a" : "#22304d" }}
    />
  );
}
