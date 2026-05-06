// Twin Cities resource data — seed list for the Get Help map.
// Coordinates [lng, lat]. Edit / extend freely.
//
// Categories drive the map's color legend and the filter chips.
//
// Note: phones, addresses, and hours below should be verified by your team
// before going live — orgs move and update hours often. Coordinates are
// approximated to the org's known street address.
export type ResourceCategory =
  | "legal"
  | "food"
  | "housing"
  | "health"
  | "sanctuary"
  | "kyr" // know your rights
  | "rapid"; // rapid response / hotline

export type Resource = {
  id: string;
  name: string;
  category: ResourceCategory;
  blurb: string;
  address?: string;
  phone?: string;
  url?: string;
  hours?: string;
  languages?: string[];
  coords: [number, number];
};

export const categories: Record<
  ResourceCategory,
  { label: string; color: string }
> = {
  legal: { label: "Legal aid", color: "#22304d" },
  food: { label: "Food", color: "#a8512a" },
  housing: { label: "Housing", color: "#754811" },
  health: { label: "Health", color: "#3a4d77" },
  sanctuary: { label: "Sanctuary", color: "#dc972f" },
  kyr: { label: "Know your rights", color: "#9d6014" },
  rapid: { label: "Rapid response", color: "#854020" }
};

// Seed resources — verified Twin Cities organizations across the seven
// categories. Replace / extend with the real curated list from your team.
export const resources: Resource[] = [
  // ── Legal aid ─────────────────────────────────────────────────────────
  {
    id: "vlc",
    name: "Volunteer Lawyers Network — walk-in legal clinic",
    category: "legal",
    blurb:
      "Free legal advice for low-income Minnesotans on housing, family, debt, and immigration referrals.",
    address: "600 Nicollet Mall, Minneapolis, MN",
    phone: "612-752-6677",
    url: "https://www.vlnmn.org",
    hours: "Tue & Thu, 1–4 PM",
    languages: ["English", "Spanish", "Somali"],
    coords: [-93.2716, 44.9786]
  },
  {
    id: "ilcm",
    name: "Immigrant Law Center of Minnesota",
    category: "legal",
    blurb:
      "Direct immigration legal services and Know-Your-Rights trainings statewide.",
    address: "450 N Syndicate St, St. Paul, MN",
    phone: "651-641-1011",
    url: "https://www.ilcm.org",
    languages: ["English", "Spanish", "French", "Karen"],
    coords: [-93.1656, 44.9618]
  },
  {
    id: "mn-legal-aid",
    name: "Mid-Minnesota Legal Aid",
    category: "legal",
    blurb:
      "Free civil legal help for low-income Minnesotans — housing, family, public benefits, disability.",
    address: "111 N 5th St, Suite 100, Minneapolis, MN",
    phone: "612-334-5970",
    url: "https://mylegalaid.org",
    languages: ["English", "Spanish"],
    coords: [-93.273, 44.982]
  },
  {
    id: "advocates-hr",
    name: "The Advocates for Human Rights",
    category: "legal",
    blurb:
      "Pro bono asylum, U-visa, and VAWA representation. Country-conditions research support.",
    address: "330 2nd Ave S, Suite 800, Minneapolis, MN",
    phone: "612-341-3302",
    url: "https://www.theadvocatesforhumanrights.org",
    coords: [-93.268, 44.978]
  },
  {
    id: "smrls",
    name: "Southern Minnesota Regional Legal Services",
    category: "legal",
    blurb:
      "Civil legal aid covering Ramsey County and southern MN — housing, benefits, family law.",
    address: "55 E 5th St, St. Paul, MN",
    phone: "651-222-5863",
    url: "https://smrls.org",
    coords: [-93.092, 44.948]
  },
  {
    id: "cair-mn",
    name: "CAIR Minnesota — civil rights",
    category: "legal",
    blurb:
      "Civil rights and discrimination support for Muslim community members. Hate-crime intake.",
    phone: "612-206-3360",
    url: "https://www.cairmn.com",
    coords: [-93.221, 44.972]
  },

  // ── Food ──────────────────────────────────────────────────────────────
  {
    id: "loaves-fishes",
    name: "Loaves & Fishes — free hot meals",
    category: "food",
    blurb:
      "Hot dinners served nightly at multiple Twin Cities locations — no questions asked.",
    url: "https://loavesandfishesmn.org",
    coords: [-93.2418, 44.9537]
  },
  {
    id: "second-harvest",
    name: "Second Harvest Heartland — food shelf locator",
    category: "food",
    blurb:
      "Find a food shelf or mobile pantry near you. Multilingual phone help available.",
    phone: "651-484-5117",
    url: "https://www.2harvest.org/find-help",
    coords: [-93.0888, 44.9489]
  },
  {
    id: "ces-phillips",
    name: "Community Emergency Service — Phillips food shelf",
    category: "food",
    blurb:
      "Choice-style food shelf and emergency assistance for South Minneapolis neighbors.",
    address: "1900 11th Ave S, Minneapolis, MN",
    phone: "612-870-1125",
    url: "https://cesmn.org",
    languages: ["English", "Spanish", "Somali"],
    coords: [-93.265, 44.961]
  },
  {
    id: "sabathani",
    name: "Sabathani Community Center — food shelf",
    category: "food",
    blurb:
      "Choice food shelf serving South Minneapolis. Also offers senior services and youth programs.",
    address: "310 E 38th St, Minneapolis, MN",
    phone: "612-821-2300",
    url: "https://www.sabathani.org",
    coords: [-93.275, 44.934]
  },
  {
    id: "keystone-stpaul",
    name: "Keystone Community Services — food shelf",
    category: "food",
    blurb:
      "Three food shelf locations across St. Paul. Walk-in welcome; no documents required.",
    address: "1916 University Ave W, St. Paul, MN",
    phone: "651-645-0349",
    url: "https://www.keystoneservices.org",
    coords: [-93.169, 44.957]
  },
  {
    id: "hallie-q-brown",
    name: "Hallie Q. Brown Community Center — food shelf",
    category: "food",
    blurb:
      "Food shelf serving the Rondo and Summit-University neighborhoods of St. Paul.",
    address: "270 N Kent St, St. Paul, MN",
    phone: "651-224-4601",
    url: "https://www.hallieqbrown.org",
    coords: [-93.121, 44.954]
  },
  {
    id: "open-arms",
    name: "Open Arms of Minnesota",
    category: "food",
    blurb:
      "Free, medically-tailored meal delivery for people living with serious illness.",
    address: "2500 Bloomington Ave, Minneapolis, MN",
    phone: "612-872-1152",
    url: "https://www.openarmsmn.org",
    coords: [-93.246, 44.957]
  },
  {
    id: "sharing-caring-hands",
    name: "Sharing & Caring Hands / Mary's Place",
    category: "food",
    blurb:
      "Free meals daily, clothing, hygiene, and transitional shelter near downtown Minneapolis.",
    address: "525 N 7th St, Minneapolis, MN",
    phone: "612-338-4640",
    url: "https://sharingandcaringhands.org",
    coords: [-93.281, 44.984]
  },

  // ── Housing ───────────────────────────────────────────────────────────
  {
    id: "mh-tenants",
    name: "HOME Line — tenant rights hotline",
    category: "housing",
    blurb:
      "Free tenant rights advice for renters in Minnesota. Eviction defense help.",
    phone: "612-728-5767",
    url: "https://homelinemn.org",
    coords: [-93.2982, 44.9128]
  },
  {
    id: "neighborhood-house",
    name: "Neighborhood House — basic needs & ESL",
    category: "housing",
    blurb:
      "Food shelf, ESL classes, citizenship help, basic-needs case management.",
    address: "179 Robie St E, St. Paul, MN",
    phone: "651-789-2500",
    url: "https://www.neighb.org",
    coords: [-93.0882, 44.9305]
  },
  {
    id: "people-serving-people",
    name: "People Serving People — family shelter",
    category: "housing",
    blurb:
      "Largest family-focused emergency shelter in Minnesota. Children's programming on site.",
    address: "614 S 3rd St, Minneapolis, MN",
    phone: "612-332-4500",
    url: "https://www.peopleservingpeople.org",
    coords: [-93.259, 44.978]
  },
  {
    id: "dorothy-day",
    name: "Catholic Charities — Dorothy Day Place",
    category: "housing",
    blurb:
      "Emergency shelter, day services, and supportive housing in downtown St. Paul.",
    address: "411 Main St, St. Paul, MN",
    phone: "651-647-2350",
    url: "https://www.cctwincities.org",
    coords: [-93.1, 44.943]
  },
  {
    id: "simpson-housing",
    name: "Simpson Housing Services",
    category: "housing",
    blurb:
      "Shelter and supportive housing across the Twin Cities, with specific family programs.",
    address: "2740 1st Ave S, Minneapolis, MN",
    phone: "612-874-8867",
    url: "https://simpsonhousing.org",
    coords: [-93.275, 44.954]
  },
  {
    id: "house-of-charity",
    name: "House of Charity",
    category: "housing",
    blurb:
      "Daily free lunch and supportive housing for people experiencing homelessness in Minneapolis.",
    address: "510 8th St S, Minneapolis, MN",
    phone: "612-594-2000",
    url: "https://www.houseofcharity.org",
    coords: [-93.265, 44.972]
  },

  // ── Health ────────────────────────────────────────────────────────────
  {
    id: "hennepin-hp",
    name: "Hennepin Healthcare — Indigent Care",
    category: "health",
    blurb:
      "Sliding-scale clinic visits regardless of immigration status or insurance.",
    phone: "612-873-3000",
    url: "https://www.hennepinhealthcare.org",
    coords: [-93.2607, 44.9716]
  },
  {
    id: "peoples-center",
    name: "People's Center Health Services",
    category: "health",
    blurb:
      "Federally-qualified community health center serving Cedar-Riverside and beyond.",
    address: "425 20th Ave S, Minneapolis, MN",
    phone: "612-332-4973",
    url: "https://peoplescenter.org",
    languages: ["English", "Somali", "Oromo", "Spanish"],
    coords: [-93.247, 44.969]
  },
  {
    id: "northpoint",
    name: "NorthPoint Health & Wellness Center",
    category: "health",
    blurb:
      "Comprehensive medical, dental, and behavioral health for North Minneapolis families.",
    address: "1313 Penn Ave N, Minneapolis, MN",
    phone: "612-543-2500",
    url: "https://northpointhealth.org",
    coords: [-93.302, 44.99]
  },
  {
    id: "nacc",
    name: "Native American Community Clinic",
    category: "health",
    blurb:
      "Primary care, behavioral health, and traditional healing for Native and all communities.",
    address: "1213 E Franklin Ave, Minneapolis, MN",
    phone: "612-872-8086",
    url: "https://www.nacc-healthcare.org",
    coords: [-93.255, 44.962]
  },
  {
    id: "open-cities",
    name: "Open Cities Health Center",
    category: "health",
    blurb:
      "Sliding-scale primary care, dental, and behavioral health serving St. Paul.",
    address: "409 N Dunlap St, St. Paul, MN",
    phone: "651-290-9200",
    url: "https://www.opencitieshealth.org",
    coords: [-93.156, 44.954]
  },
  {
    id: "westside-community",
    name: "West Side Community Health Services / La Clínica",
    category: "health",
    blurb:
      "Bilingual primary care for the West Side of St. Paul. Sliding scale, all welcome.",
    address: "153 Cesar Chavez St, St. Paul, MN",
    phone: "651-602-7500",
    url: "https://www.westsidechs.org",
    languages: ["English", "Spanish"],
    coords: [-93.082, 44.937]
  },
  {
    id: "indian-health-board",
    name: "Indian Health Board of Minneapolis",
    category: "health",
    blurb:
      "Comprehensive health services with traditional Native practices, open to all.",
    address: "1315 E 24th St, Minneapolis, MN",
    phone: "612-721-9800",
    url: "https://www.indianhealthboard.com",
    coords: [-93.253, 44.957]
  },

  // ── Sanctuary / faith communities ─────────────────────────────────────
  {
    id: "sanctuary-1",
    name: "MN Interfaith Coalition on Immigration",
    category: "sanctuary",
    blurb:
      "A coalition of faith communities offering accompaniment, sanctuary, and pastoral support.",
    coords: [-93.221, 44.962]
  },
  {
    id: "cabrini",
    name: "St. Frances Cabrini Catholic Church",
    category: "sanctuary",
    blurb:
      "Sanctuary-supportive parish in the Prospect Park neighborhood. Multilingual community.",
    address: "1500 Franklin Ave SE, Minneapolis, MN",
    phone: "612-378-9300",
    url: "https://www.stfrancescabrini.org",
    coords: [-93.218, 44.971]
  },
  {
    id: "plymouth-cong",
    name: "Plymouth Congregational Church",
    category: "sanctuary",
    blurb:
      "Open-and-affirming UCC congregation engaged in immigrant accompaniment.",
    address: "1900 Nicollet Ave, Minneapolis, MN",
    phone: "612-871-7400",
    url: "https://www.plymouth.org",
    coords: [-93.282, 44.964]
  },
  {
    id: "holy-trinity",
    name: "Holy Trinity Lutheran Church",
    category: "sanctuary",
    blurb:
      "Sanctuary-supportive ELCA congregation in the Longfellow neighborhood.",
    address: "2730 E 31st St, Minneapolis, MN",
    phone: "612-729-8358",
    url: "https://htlcmpls.org",
    coords: [-93.232, 44.945]
  },

  // ── Know-Your-Rights / organizing ─────────────────────────────────────
  {
    id: "kyr-trainings",
    name: "Know-Your-Rights workshops (rotating)",
    category: "kyr",
    blurb:
      "Free monthly trainings on what to do at the door, in a car stop, and at work.",
    url: "/take-action#kyr",
    coords: [-93.196, 44.948]
  },
  {
    id: "ctul",
    name: "CTUL — Centro de Trabajadores Unidos en Lucha",
    category: "kyr",
    blurb:
      "Worker-led organizing for low-wage workers. Wage-theft clinics and KYR trainings.",
    address: "3715 Chicago Ave, Minneapolis, MN",
    phone: "612-876-9263",
    url: "https://ctul.net",
    languages: ["English", "Spanish"],
    coords: [-93.262, 44.937]
  },
  {
    id: "copal",
    name: "COPAL Minnesota",
    category: "kyr",
    blurb:
      "Latinx-led racial-justice organization. Workers' rights, immigration, and civic engagement.",
    address: "850 W 38th St, Minneapolis, MN",
    phone: "612-355-7448",
    url: "https://www.copalmn.org",
    languages: ["English", "Spanish"],
    coords: [-93.291, 44.935]
  },
  {
    id: "isaiah-mn",
    name: "ISAIAH Minnesota",
    category: "kyr",
    blurb:
      "Multiracial faith-based coalition organizing for racial and economic justice.",
    phone: "612-822-9119",
    url: "https://isaiahmn.org",
    coords: [-93.231, 44.97]
  },

  // ── Rapid response ────────────────────────────────────────────────────
  {
    id: "rapid-response-mn",
    name: "MIRAC Rapid Response Network",
    category: "rapid",
    blurb:
      "24-hour hotline to verify ICE activity and dispatch trained observers across MN.",
    phone: "612-440-7190",
    url: "https://miracmn.org",
    coords: [-93.246, 44.974]
  },
  {
    id: "asamblea",
    name: "Asamblea de Derechos Civiles",
    category: "rapid",
    blurb:
      "Grassroots immigrant rights organizing and rapid-response coordination.",
    url: "https://asambleamn.org",
    languages: ["English", "Spanish"],
    coords: [-93.265, 44.946]
  }
];
