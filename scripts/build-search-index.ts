// Builds a static search index that ships as /search-index.json.
// Combines pages, resources, events, and programs into one flat list of
// {title, blurb, url, category, keywords} entries. The client component
// fetches it once and runs substring + token matching in-browser.
//
// Run from `prebuild` so the file lands in /public before next build.
import { writeFileSync, mkdirSync } from "node:fs";
import { resources, categories } from "../src/lib/resources";
import { events } from "../src/lib/events";

// Programs are defined in programs.tsx (with JSX icons), which won't import
// cleanly into a Node script. Mirror their indexable fields here. Keep in
// sync with src/lib/programs.tsx.
const programs = [
  {
    slug: "rental-utility",
    name: "Keeping Families Home — rental & utility relief",
    description:
      "Direct support for families facing eviction or shut-offs after a sudden loss of income or change in status."
  },
  {
    slug: "food",
    name: "Food on the Table — immediate food relief",
    description:
      "Groceries delivered and hot meals shared with neighbors who are stretched thin between paychecks, hours, and red tape."
  },
  {
    slug: "legal",
    name: "Legal Resources — legal navigation",
    description:
      "Help finding the right immigration, housing, or family law attorney — and someone to walk with you to court."
  }
];

type Entry = {
  title: string;
  blurb: string;
  url: string;
  category: "page" | "resource" | "event" | "program";
  keywords?: string;
};

const pages: Entry[] = [
  {
    title: "Stand in solidarity with Minnesota",
    blurb: "Mission, values, and how to get involved.",
    url: "/",
    category: "page",
    keywords: "home about mission solidarity"
  },
  {
    title: "Our Values",
    blurb: "Dignity, solidarity, subsidiarity, and the common good.",
    url: "/values",
    category: "page"
  },
  {
    title: "Events",
    blurb: "Press conferences, marches, vigils, trainings.",
    url: "/events",
    category: "page",
    keywords: "march rally vigil press conference"
  },
  {
    title: "Get Help",
    blurb: "A living map of where to turn — legal, food, housing, health.",
    url: "/get-help",
    category: "page",
    keywords: "resources map directory"
  },
  {
    title: "If a loved one was detained",
    blurb:
      "Step-by-step in the first hours after detention — locator, lawyers, money on books.",
    url: "/find-loved-one",
    category: "page",
    keywords: "ICE detention detained lawyer custody"
  },
  {
    title: "Know Your Rights",
    blurb:
      "Bilingual cards on what to say at the door, in a car stop, and at work.",
    url: "/know-your-rights",
    category: "page",
    keywords: "KYR door car police work warrant lawyer rights conozca derechos"
  },
  {
    title: "News & Updates",
    blurb: "Live ICE updates and immigration coverage from trusted outlets.",
    url: "/news",
    category: "page"
  },
  {
    title: "Stories",
    blurb: "Real moments — what happens when a community stands together.",
    url: "/stories",
    category: "page"
  },
  {
    title: "Coalition Partners",
    blurb: "The organizations we stand with across MN.",
    url: "/partners",
    category: "page"
  },
  {
    title: "Take Action",
    blurb: "Volunteer, host a KYR night, or join a rapid-response team.",
    url: "/take-action",
    category: "page",
    keywords: "volunteer help donate"
  },
  {
    title: "Court Support",
    blurb:
      "Volunteer to accompany a neighbor to immigration court — a row of community in the gallery.",
    url: "/court-support",
    category: "page",
    keywords: "court accompany hearing immigration"
  },
  {
    title: "Donate",
    blurb: "Funded by neighbors, spent on neighbors. Rent, food, legal aid.",
    url: "/donate",
    category: "page"
  },
  {
    title: "Membership",
    blurb: "Become a member of the movement.",
    url: "/membership",
    category: "page"
  },
  {
    title: "Store",
    blurb: "Yard signs, t-shirts, button packs.",
    url: "/store",
    category: "page"
  },
  {
    title: "Contact",
    blurb: "Email, phone, hotline, in-person hours.",
    url: "/contact",
    category: "page",
    keywords: "email phone reach"
  }
];

const resourceEntries: Entry[] = resources.map((r) => ({
  title: r.name,
  blurb: r.blurb,
  url: `/get-help/resources/${r.id}`,
  category: "resource",
  keywords: [
    categories[r.category].label,
    r.address,
    r.phone,
    r.languages?.join(" ")
  ]
    .filter(Boolean)
    .join(" ")
}));

const eventEntries: Entry[] = events.map((e) => ({
  title: e.title,
  blurb: e.description,
  url: `/events#${e.slug}`,
  category: "event",
  keywords: [
    e.subtitle,
    e.rallying,
    e.location.name,
    e.location.city
  ]
    .filter(Boolean)
    .join(" ")
}));

const programEntries: Entry[] = programs.map((p) => ({
  title: p.name,
  blurb: p.description,
  url: `/get-help/${p.slug}`,
  category: "program"
}));

const all: Entry[] = [
  ...pages,
  ...resourceEntries,
  ...eventEntries,
  ...programEntries
];

mkdirSync("public", { recursive: true });
writeFileSync("public/search-index.json", JSON.stringify(all));
console.log(`Wrote search-index.json with ${all.length} entries`);
