"use client";
import { useEffect, useState } from "react";
import { asset } from "@/lib/asset";

// Pages × languages grid. Coverage is computed at build time by
// scripts/build-translation-coverage.ts (which scans src/app/{es,so}/) and
// written to /public/translation-coverage.json — so the table updates
// automatically whenever a translation ships, without anyone editing code.

type CoverageCell = { en: boolean; es: boolean; so: boolean };
type Page = { id: string; label: string; english: string };
type Payload = {
  pages: Page[];
  coverage: Record<string, CoverageCell>;
};

const langLabel: Record<"en" | "es" | "so", string> = {
  en: "English",
  es: "Español",
  so: "Soomaali"
};

export function TranslationStatus() {
  const [payload, setPayload] = useState<Payload | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    fetch(asset("/translation-coverage.json"))
      .then((r) => r.json())
      .then((p: Payload) => setPayload(p))
      .catch(() => setPayload(null));
  }, []);

  function promptFor(p: Page, lang: "es" | "so") {
    const langName = lang === "es" ? "Spanish" : "Somali";
    const target = `/${lang}${p.id === "/" ? "" : p.id}`;
    return `Translate ${p.id} (${p.label}) into ${langName} and create the page at ${target}/page.tsx. Use DeepL-quality phrasing — natural, dignified, not literal. Mirror the page structure of the English original. Add hrefLang attributes for cross-linking. Then commit, push, and merge to main.`;
  }

  function copy(text: string) {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(text);
      setTimeout(() => setCopied(null), 1400);
    });
  }

  return (
    <section id="translations" className="container-wide pb-12">
      <div className="card p-8">
        <p className="eyebrow">Translation status</p>
        <h2 className="mt-2 font-serif text-2xl">Coverage at a glance.</h2>

        {!payload && (
          <p className="mt-4 text-sm text-ink-muted">Loading coverage…</p>
        )}

        {payload && (
          <>
            <CoverageSummary payload={payload} />

            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ink/10 text-left text-xs uppercase tracking-wider text-ink-muted">
                    <th className="py-2 pr-4">Page</th>
                    <th className="py-2 pr-4">URL</th>
                    {(["en", "es", "so"] as const).map((l) => (
                      <th key={l} className="py-2 pr-4 text-center">
                        {langLabel[l]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {payload.pages.map((p) => {
                    const c = payload.coverage[p.id] ?? {
                      en: false,
                      es: false,
                      so: false
                    };
                    return (
                      <tr key={p.id} className="border-b border-ink/5 align-middle">
                        <td className="py-2 pr-4 font-medium text-ink">{p.label}</td>
                        <td className="py-2 pr-4 font-mono text-xs text-ink-muted">
                          {p.id}
                        </td>
                        {(["en", "es", "so"] as const).map((l) => {
                          if (c[l]) {
                            return (
                              <td key={l} className="py-2 pr-4 text-center">
                                <span
                                  className="text-indigo-700"
                                  title="Translated"
                                >
                                  ✓
                                </span>
                              </td>
                            );
                          }
                          if (l === "en") {
                            return (
                              <td key={l} className="py-2 pr-4 text-center text-ink-muted">
                                —
                              </td>
                            );
                          }
                          const prompt = promptFor(p, l);
                          const isCopied = copied === prompt;
                          return (
                            <td key={l} className="py-2 pr-4 text-center">
                              <button
                                type="button"
                                onClick={() => copy(prompt)}
                                title="Copy translation prompt"
                                className={
                                  "rounded-full border px-2 py-0.5 text-[11px] font-medium transition " +
                                  (isCopied
                                    ? "border-indigo-700 bg-indigo-700 text-bone-50"
                                    : "border-ember-300 bg-ember-50 text-ember-700 hover:bg-ember-100")
                                }
                              >
                                {isCopied ? "Copied" : "Translate"}
                              </button>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-5 rounded-lg border border-indigo-200 bg-indigo-50 p-4 text-sm text-indigo-900">
              <p>
                <strong>How this works:</strong> click any{" "}
                <span className="font-medium">Translate</span> button → paste
                into Claude → Claude does the rest (translates the page,
                commits, pushes, and merges). This grid refreshes itself on
                the next deploy, so the ✓ appears automatically.
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function CoverageSummary({ payload }: { payload: Payload }) {
  const totalCells = payload.pages.length * 3;
  const filled = Object.values(payload.coverage).reduce(
    (sum, c) => sum + (c.en ? 1 : 0) + (c.es ? 1 : 0) + (c.so ? 1 : 0),
    0
  );
  const pct = Math.round((filled / totalCells) * 100);
  return (
    <p className="mt-2 max-w-2xl text-ink-soft">
      <span className="font-medium text-ink">
        {filled}/{totalCells}
      </span>{" "}
      cells covered ({pct}%). Click any{" "}
      <span className="text-ember-700">missing</span> cell to copy a
      ready-to-paste translation prompt — Claude handles everything from
      there.
    </p>
  );
}
