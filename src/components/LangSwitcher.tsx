"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

// Language switcher — small dropdown in the header. Routes to the localized
// landing page for ES/SO when available, falling back to root for English.
// Inner pages remain English for now and are linked with hrefLang on those
// pages.
const langs = [
  { code: "en", label: "English", path: "/" },
  { code: "es", label: "Español", path: "/es" },
  { code: "so", label: "Soomaali", path: "/so" }
] as const;

export function LangSwitcher() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Detect current language from URL prefix.
  const current =
    langs.find((l) => l.code !== "en" && pathname.startsWith(`/${l.code}`)) ??
    langs[0];

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1 rounded-full border border-ink/15 bg-bone-50 px-3 py-1.5 text-xs font-medium text-ink/80 hover:bg-ink/5"
        title="Choose language"
      >
        <Globe />
        <span className="uppercase tracking-wider">{current.code}</span>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-1 min-w-[10rem] overflow-hidden rounded-xl border border-ink/10 bg-bone-50 py-1 shadow-lg"
        >
          {langs.map((l) => (
            <li key={l.code} role="none">
              <Link
                href={l.path}
                role="option"
                aria-selected={l.code === current.code}
                className="block px-3 py-2 text-sm text-ink no-underline hover:bg-ink/5"
                onClick={() => setOpen(false)}
                hrefLang={l.code}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Globe() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
