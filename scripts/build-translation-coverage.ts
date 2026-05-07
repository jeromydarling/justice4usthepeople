// Scans src/app/{es,so}/ at build time and writes a coverage map to
// public/translation-coverage.json. The TranslationStatus admin component
// fetches it at runtime so the grid stays accurate without anyone needing
// to edit code when a translation lands.
import { existsSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

// The pages we track for translation coverage. Edit this list when a new
// top-level translatable page ships.
const pages = [
  { id: "/", label: "Homepage", english: "src/app/page.tsx" },
  { id: "/get-help", label: "Get Help (resource map)", english: "src/app/get-help/page.tsx" },
  { id: "/find-loved-one", label: "If a loved one was detained", english: "src/app/find-loved-one/page.tsx" },
  { id: "/know-your-rights", label: "Know Your Rights", english: "src/app/know-your-rights/page.tsx" },
  { id: "/values", label: "Our Values", english: "src/app/values/page.tsx" },
  { id: "/take-action", label: "Take Action", english: "src/app/take-action/page.tsx" },
  { id: "/court-support", label: "Court Support", english: "src/app/court-support/page.tsx" },
  { id: "/donate", label: "Donate", english: "src/app/donate/page.tsx" },
  { id: "/membership", label: "Membership", english: "src/app/membership/page.tsx" },
  { id: "/contact", label: "Contact", english: "src/app/contact/page.tsx" },
  { id: "/stories", label: "Stories", english: "src/app/stories/page.tsx" },
  { id: "/partners", label: "Coalition Partners", english: "src/app/partners/page.tsx" },
  { id: "/news", label: "News & Updates", english: "src/app/news/page.tsx" },
  { id: "/events", label: "Events", english: "src/app/events/page.tsx" }
];

type Coverage = Record<string, { en: boolean; es: boolean; so: boolean }>;

const coverage: Coverage = {};
for (const p of pages) {
  const slug = p.id === "/" ? "" : p.id;
  coverage[p.id] = {
    en: existsSync(resolve(p.english)),
    es: existsSync(resolve(`src/app/es${slug}/page.tsx`)),
    so: existsSync(resolve(`src/app/so${slug}/page.tsx`))
  };
}

const payload = { pages, coverage };

mkdirSync(resolve("public"), { recursive: true });
writeFileSync(
  resolve("public/translation-coverage.json"),
  JSON.stringify(payload)
);

const totalCells = pages.length * 3;
const filled = Object.values(coverage).reduce(
  (sum, c) => sum + (c.en ? 1 : 0) + (c.es ? 1 : 0) + (c.so ? 1 : 0),
  0
);
console.log(
  `Wrote translation-coverage.json: ${filled}/${totalCells} cells covered`
);
