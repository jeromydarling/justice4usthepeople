import Link from "next/link";
import { site } from "@/lib/site";

// Brand mark — inspired by the existing loon-with-north-star logo.
// The loon (Minnesota's state bird) represents the rooted, watchful guardian
// of the community; the north star is the steady light of justice and
// belonging. Drop a real /public/brand/logo-loon.svg in to override the
// inline SVG below.
export function Logo({
  variant = "dark",
  className = "",
  showWordmark = true
}: {
  variant?: "dark" | "light";
  className?: string;
  showWordmark?: boolean;
}) {
  const isLight = variant === "light";
  const fg = isLight ? "text-bone-50" : "text-indigo-900";
  const subFg = isLight ? "text-ember-200" : "text-ember-700";
  return (
    <Link
      href="/"
      aria-label={site.name}
      className={`group inline-flex items-center gap-3 no-underline ${className}`}
    >
      <BrandMark variant={variant} className="h-10 w-10 shrink-0" />
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span className={`font-serif text-lg tracking-tight ${fg}`}>
            Justice <span className="text-ember-500">4</span> Us The People
          </span>
          <span
            className={`mt-1 text-[10px] font-medium uppercase tracking-[0.22em] ${subFg}`}
          >
            Stand in solidarity · Minnesota
          </span>
        </span>
      )}
    </Link>
  );
}

// Stylized loon-and-star mark. Two-color, prints clean, scales down to a favicon.
export function BrandMark({
  variant = "dark",
  className = ""
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const isLight = variant === "light";
  const ring = isLight ? "#fbf8f2" : "#1a2540";
  const sky = isLight ? "#22304d" : "#bcc3d4";
  const body = isLight ? "#fbf8f2" : "#15171c";
  const star = "#dc972f";
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label="Loon rising with north star"
      className={className}
    >
      <circle cx="32" cy="32" r="30" fill={sky} />
      <circle cx="32" cy="32" r="30" fill="none" stroke={ring} strokeWidth="2.5" />
      {/* Loon: stylized silhouette of a rising water bird with wings up. */}
      <path
        d={`
          M32 49
          C 22 49 18 43 17 38
          C 21 41 25 41 28 39
          C 24 33 22 26 22 19
          C 26 24 30 28 32 31
          C 34 28 38 24 42 19
          C 42 26 40 33 36 39
          C 39 41 43 41 47 38
          C 46 43 42 49 32 49 Z
        `}
        fill={body}
      />
      {/* Eye accent */}
      <circle cx="32" cy="36" r="0.9" fill={star} />
      {/* North star above */}
      <path
        d="M32 6 L33.4 11 L38 12 L33.4 13 L32 18 L30.6 13 L26 12 L30.6 11 Z"
        fill={star}
      />
    </svg>
  );
}
