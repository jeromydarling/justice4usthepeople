"use client";
import { useState } from "react";

// A grid of pages × languages showing which are translated, which aren't.
// Each unchecked cell becomes a copy-able "translate this" prompt.
//
// Edit `pages` and `coverage` when new translations land. They're hard-
// coded to keep this purely client-side and fast.

const pages = [
  { id: "/", label: "Homepage", source: "src/app/page.tsx" },
  { id: "/get-help", label: "Get Help (resource map)", source: "src/app/get-help/page.tsx" },
  { id: "/find-loved-one", label: "If a loved one was detained", source: "src/app/find-loved-one/page.tsx" },
  { id: "/know-your-rights", label: "Know Your Rights (already bilingual)", source: "src/app/know-your-rights/page.tsx" },
  { id: "/values", label: "Our Values", source: "src/app/values/page.tsx" },
  { id: "/take-action", label: "Take Action", source: "src/app/take-action/page.tsx" },
  { id: "/court-support", label: "Court Support", source: "src/app/court-support/page.tsx" },
  { id: "/donate", label: "Donate", source: "src/app/donate/page.tsx" },
  { id: "/membership", label: "Membership", source: "src/app/membership/page.tsx" },
  { id: "/contact", label: "Contact", source: "src/app/contact/page.tsx" },
  { id: "/stories", label: "Stories", source: "src/app/stories/page.tsx" },
  { id: "/partners", label: "Coalition Partners", source: "src/app/partners/page.tsx" }
];

// Hard-coded coverage. Bump these when a translated page lands.
const coverage: Record<string, { en: boolean; es: boolean; so: boolean }> = {
  "/": { en: true, es: true, so: true },
  "/get-help": { en: true, es: false, so: false },
  "/find-loved-one": { en: true, es: false, so: false },
  "/know-your-rights": { en: true, es: true, so: false },
  "/values": { en: true, es: false, so: false },
  "/take-action": { en: true, es: false, so: false },
  "/court-support": { en: true, es: false, so: false },
  "/donate": { en: true, es: false, so: false },
  "/membership": { en: true, es: false, so: false },
  "/contact": { en: true, es: false, so: false },
  "/stories": { en: true, es: false, so: false },
  "/partners": { en: true, es: false, so: false }
};

const langLabel: Record<"en" | "es" | "so", string> = {
  en: "English",
  es: "Español",
  so: "Soomaali"
};

export function TranslationStatus() {
  const [copied, setCopied] = useState<string | null>(null);

  function promptFor(pagePath: string, label: string, lang: "es" | "so") {
    const langName = lang === "es" ? "Spanish" : "Somali";
    const target = `/${lang}${pagePath === "/" ? "" : pagePath}`;
    return `Translate ${pagePath} (${label}) into ${langName} at ${target}. Use DeepL-quality phrasing — natural, dignified, not literal. Mirror the page structure and add hrefLang attributes for cross-linking.`;
  }

  function copy(text: string) {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(text);
      setTimeout(() => setCopied(null), 1400);
    });
  }

  const totalCells = pages.length * 3;
  const filled = pages.reduce((sum, p) => {
    const c = coverage[p.id];
    if (!c) return sum;
    return sum + (c.en ? 1 : 0) + (c.es ? 1 : 0) + (c.so ? 1 : 0);
  }, 0);
  const pct = Math.round((filled / totalCells) * 100);

  return (
    <section id="translations" className="container-wide pb-12">
      <div className="card p-8">
        <p className="eyebrow">Translation status</p>
        <h2 className="mt-2 font-serif text-2xl">Coverage at a glance.</h2>
        <p className="mt-2 max-w-2xl text-ink-soft">
          {filled} of {totalCells} cells covered ({pct}%). Click any{" "}
          <span className="text-ember-700">missing</span> cell to copy a
          ready-to-paste translation prompt.
        </p>

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
              {pages.map((p) => {
                const c = coverage[p.id] ?? { en: false, es: false, so: false };
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
                            <span className="text-indigo-700">✓</span>
                          </td>
                        );
                      }
                      const prompt =
                        l === "en"
                          ? `Add an English version of ${p.id} (it should already exist — look at ${p.source}).`
                          : promptFor(p.id, p.label, l);
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
            <strong>Workflow:</strong> click "Translate" → paste into Claude →
            review the result → bump the matching <code>coverage</code> entry
            in <code>src/components/admin/TranslationStatus.tsx</code> when
            it ships.
          </p>
        </div>
      </div>
    </section>
  );
}
