import Link from "next/link";
import { site } from "@/lib/site";
import { asset } from "@/lib/asset";

export type LogoMark = "loon" | "scales";

// Brand mark — defaults to the loon-and-north-star mark from the existing
// site footer (Minnesota's bird, rising as guardian; the steady light of
// justice). Pass `mark="scales"` to use the original Justice 4 Us The People
// scales-of-the-world wordmark instead.
//
// Drop replacement files at /public/brand/logo.svg or /public/brand/logo-scales.svg
// to override either mark.
export function Logo({
  variant = "dark",
  mark = "loon",
  className = "",
  showWordmark = true
}: {
  variant?: "dark" | "light";
  mark?: LogoMark;
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
      <BrandMark mark={mark} className={mark === "scales" ? "h-12 w-12 shrink-0" : "h-10 w-10 shrink-0"} />
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span className={`font-serif text-base sm:text-lg tracking-tight ${fg}`}>
            Justice <span className="text-ember-500">4</span> Us The People
          </span>
          {/* Sub-tagline hidden on smallest phones to make room for header utilities. */}
          <span
            className={`mt-1 hidden sm:inline text-[10px] font-medium uppercase tracking-[0.22em] ${subFg}`}
          >
            Stand in solidarity · Minnesota
          </span>
        </span>
      )}
    </Link>
  );
}

// Renders the original artwork via <picture> — WebP for modern browsers
// (small) with a PNG fallback (universal). basePath-prefixed src so the
// asset resolves correctly under GitHub Pages project deployments.
export function BrandMark({
  mark = "loon",
  className = ""
}: {
  mark?: LogoMark;
  className?: string;
}) {
  const base = mark === "scales" ? "/brand/logo-scales" : "/brand/logo-loon";
  const alt =
    mark === "scales"
      ? "Justice 4 Us The People — scales"
      : "Justice 4 Us The People — loon rising with north star";
  return (
    <picture>
      <source srcSet={asset(`${base}.webp`)} type="image/webp" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset(`${base}.png`)} alt={alt} className={className} loading="eager" />
    </picture>
  );
}
