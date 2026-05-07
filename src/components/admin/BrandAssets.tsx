"use client";
import { useState } from "react";
import { asset } from "@/lib/asset";
import { site } from "@/lib/site";

// A one-stop reference for "what's our brand?" — colors, logos, tagline,
// mission. Useful when a journalist or partner asks. Hex codes copy to
// clipboard; logos download.

const colors: { name: string; hex: string; note: string }[] = [
  { name: "Indigo", hex: "#1a2547", note: "Deep brand background. Footer, dark sections." },
  { name: "Indigo 700", hex: "#22304d", note: "Buttons, primary links." },
  { name: "Ember", hex: "#dc972f", note: "Brand accent. The orange '4'." },
  { name: "Ember 700", hex: "#a8512a", note: "Eyebrow text, warm accents." },
  { name: "Ink", hex: "#14171c", note: "Primary text on light surfaces." },
  { name: "Bone 50", hex: "#fbf8f2", note: "Cream background. Body of the site." },
  { name: "Bone 100", hex: "#f4f0e7", note: "Secondary background." },
  { name: "Terra 600", hex: "#854020", note: "Error / urgent state." }
];

const logos: { name: string; description: string; src: string }[] = [
  {
    name: "Loon mark (preferred)",
    description: "The loon and north-star wordmark. Use this everywhere.",
    src: "/brand/logo-loon.png"
  },
  {
    name: "Scales mark (alternate)",
    description: "Original scales-of-the-world wordmark. Reserve for legal-context use.",
    src: "/brand/logo-scales.png"
  }
];

export function BrandAssets() {
  const [copied, setCopied] = useState<string | null>(null);

  function copy(text: string) {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(text);
      setTimeout(() => setCopied(null), 1400);
    });
  }

  return (
    <section id="brand" className="container-wide pb-12">
      <div className="card p-8">
        <p className="eyebrow">Brand assets</p>
        <h2 className="mt-2 font-serif text-2xl">
          Colors, logos, words. Always one click away.
        </h2>
        <p className="mt-2 max-w-2xl text-ink-soft">
          Send these to a designer, paste into Canva, hand to a journalist —
          everything you need to represent the brand correctly.
        </p>

        {/* Words */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <CopyCard
            label="Tagline"
            value={site.tagline}
            onCopy={copy}
            copied={copied === site.tagline}
          />
          <CopyCard
            label="Rallying phrase"
            value={site.rallying}
            onCopy={copy}
            copied={copied === site.rallying}
          />
        </div>
        <div className="mt-4 rounded-2xl bg-bone-100 p-5">
          <div className="flex items-start justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Mission statement
            </p>
            <button
              type="button"
              onClick={() => copy(site.mission)}
              className="rounded-full border border-ink/15 bg-bone-50 px-2.5 py-1 text-[11px] font-medium hover:bg-ink/5"
            >
              {copied === site.mission ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-ink">{site.mission}</p>
        </div>

        {/* Colors */}
        <h3 className="mt-8 font-serif text-xl">Colors</h3>
        <p className="mt-1 text-sm text-ink-soft">
          Click any swatch to copy the hex.
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {colors.map((c) => {
            const isCopied = copied === c.hex;
            return (
              <li key={c.hex}>
                <button
                  type="button"
                  onClick={() => copy(c.hex)}
                  className="group block w-full rounded-2xl bg-bone-100 p-3 text-left ring-1 ring-ink/5 transition hover:bg-bone-100/70"
                >
                  <div
                    className="h-16 w-full rounded-lg ring-1 ring-ink/10"
                    style={{ background: c.hex }}
                  />
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm font-medium text-ink">{c.name}</p>
                    <span className="font-mono text-xs text-ink-muted">
                      {isCopied ? "Copied!" : c.hex}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-ink-muted">{c.note}</p>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Logos */}
        <h3 className="mt-8 font-serif text-xl">Logos</h3>
        <p className="mt-1 text-sm text-ink-soft">
          Right-click → Save image, or click the download link.
        </p>
        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          {logos.map((l) => (
            <li
              key={l.src}
              className="flex items-center gap-4 rounded-2xl bg-bone-100 p-4 ring-1 ring-ink/5"
            >
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-bone-50 ring-1 ring-ink/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(l.src)} alt={l.name} className="h-16 w-16" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-ink">{l.name}</p>
                <p className="mt-0.5 text-xs text-ink-muted">{l.description}</p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  <a
                    className="btn-link"
                    href={asset(l.src)}
                    download
                  >
                    Download PNG
                  </a>
                  <a
                    className="btn-link"
                    href={asset(l.src.replace(".png", ".webp"))}
                    download
                  >
                    Download WEBP
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 rounded-lg border border-indigo-200 bg-indigo-50 p-4 text-sm text-indigo-900">
          <p className="font-semibold">Typography</p>
          <p className="mt-1">
            Headlines: <strong>Fraunces</strong> (a dignified editorial serif).
            Body: <strong>Inter</strong> (a calm, neutral sans-serif). Both
            are free Google Fonts and are already loaded by every page.
          </p>
        </div>
      </div>
    </section>
  );
}

function CopyCard({
  label,
  value,
  onCopy,
  copied
}: {
  label: string;
  value: string;
  onCopy: (s: string) => void;
  copied: boolean;
}) {
  return (
    <div className="rounded-2xl bg-bone-100 p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
          {label}
        </p>
        <button
          type="button"
          onClick={() => onCopy(value)}
          className="rounded-full border border-ink/15 bg-bone-50 px-2.5 py-1 text-[11px] font-medium hover:bg-ink/5"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <p className="mt-2 font-serif text-lg text-ink">{value}</p>
    </div>
  );
}
