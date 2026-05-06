// Twin Cities resource data — seed list for the Get Help map.
// Coordinates [lng, lat]. Edit / extend freely.
//
// Categories drive the map's color legend and the filter chips.
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

// Seed resources — replace with the real list curated by your team.
// Coordinates are within the Minneapolis / St. Paul metro.
export const resources: Resource[] = [
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
    id: "kyr-trainings",
    name: "Know-Your-Rights workshops (rotating)",
    category: "kyr",
    blurb:
      "Free monthly trainings on what to do at the door, in a car stop, and at work.",
    url: "/take-action#kyr",
    coords: [-93.196, 44.948]
  },
  {
    id: "sanctuary-1",
    name: "Sanctuary congregation network",
    category: "sanctuary",
    blurb:
      "A coalition of faith communities offering accompaniment, sanctuary, and pastoral support.",
    coords: [-93.221, 44.962]
  }
];
