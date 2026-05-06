"use client";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { asset } from "@/lib/asset";

type Entry = {
  title: string;
  blurb: string;
  url: string;
  category: "page" | "resource" | "event" | "program";
  keywords?: string;
};

const categoryLabel: Record<Entry["category"], string> = {
  page: "Page",
  resource: "Resource",
  event: "Event",
  program: "Program"
};

// Lightweight token-and-substring search over a build-time JSON index.
// No fuzzy library — we only have ~60 items, and tokens + simple scoring
// produce good-enough results without shipping kbytes of JS.
function score(entry: Entry, q: string): number {
  const text = (
    entry.title +
    " " +
    entry.blurb +
    " " +
    (entry.keywords ?? "")
  ).toLowerCase();
  const tokens = q.toLowerCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return 0;
  let s = 0;
  for (const t of tokens) {
    if (entry.title.toLowerCase().includes(t)) s += 6;
    if (text.includes(t)) s += 2;
    if (text.startsWith(t)) s += 3;
  }
  return s;
}

export function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Lazy-load index the first time the modal opens.
  useEffect(() => {
    if (!open || entries.length > 0) return;
    fetch(asset("/search-index.json"))
      .then((r) => r.json())
      .then((data: Entry[]) => setEntries(data))
      .catch(() => setEntries([]));
  }, [open, entries.length]);

  // Cmd/Ctrl + K to open. Escape to close.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Focus input when opened.
  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  const results = useMemo(() => {
    if (!q.trim()) return entries.slice(0, 8);
    return entries
      .map((e) => ({ e, s: score(e, q) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 12)
      .map((x) => x.e);
  }, [entries, q]);

  return (
    <>
      <button
        type="button"
        aria-label="Search the site"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-bone-50 px-2.5 py-1.5 text-xs font-medium text-ink/70 hover:bg-ink/5 lg:px-3"
      >
        <SearchIcon />
        <span className="hidden lg:inline">Search</span>
        <kbd className="hidden rounded border border-ink/15 bg-bone-100 px-1 text-[10px] text-ink-muted lg:inline">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-ink/40 px-4 pt-12 backdrop-blur-sm sm:pt-20"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-xl overflow-hidden rounded-2xl bg-bone-50 shadow-2xl ring-1 ring-ink/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-ink/10 px-4">
              <SearchIcon />
              <input
                ref={inputRef}
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search resources, events, pages…"
                className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-ink-muted"
                aria-label="Search"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close search"
                className="rounded p-1 text-ink-muted hover:text-ink"
              >
                ✕
              </button>
            </div>
            <ul className="max-h-[60vh] overflow-y-auto py-2">
              {results.length === 0 && (
                <li className="px-4 py-8 text-center text-sm text-ink-muted">
                  {q.trim() ? "No matches." : "Start typing to search."}
                </li>
              )}
              {results.map((r) => (
                <li key={r.url}>
                  <Link
                    href={r.url}
                    onClick={() => setOpen(false)}
                    className="flex flex-col gap-1 px-4 py-3 no-underline hover:bg-ink/5"
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <span className="rounded-full bg-indigo-700/10 px-2 py-0.5 font-medium text-indigo-700">
                        {categoryLabel[r.category]}
                      </span>
                    </div>
                    <p className="font-serif text-base text-ink">{r.title}</p>
                    <p className="line-clamp-2 text-sm text-ink-muted">
                      {r.blurb}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t border-ink/10 bg-bone-100 px-4 py-2 text-[11px] text-ink-muted">
              Press{" "}
              <kbd className="rounded border border-ink/15 bg-bone-50 px-1">
                Esc
              </kbd>{" "}
              to close ·{" "}
              <kbd className="rounded border border-ink/15 bg-bone-50 px-1">
                ⌘K
              </kbd>{" "}
              to open
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.6" />
      <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
