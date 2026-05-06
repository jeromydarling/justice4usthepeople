import { Program } from "@/components/ProgramCard";

// The three relief programs from the existing site, kept verbatim in spirit
// but rewritten with dignity-first framing instead of crisis-first framing.
export const programs: Program[] = [
  {
    slug: "rental-utility",
    shortName: "Rental & utility relief",
    name: "Keeping Families Home",
    description:
      "Direct support for families facing eviction or shut-offs after a sudden loss of income or change in status.",
    dignityNote:
      "A home is not a luxury. It is the ground a family stands on while it figures out the rest.",
    icon: <HomeIcon />
  },
  {
    slug: "food",
    shortName: "Immediate food relief",
    name: "Food on the Table",
    description:
      "Groceries delivered and hot meals shared with neighbors who are stretched thin between paychecks, hours, and red tape.",
    dignityNote:
      "No one in our community should choose between eating and paying rent. Bread is the beginning of justice.",
    icon: <BowlIcon />
  },
  {
    slug: "legal",
    shortName: "Legal navigation",
    name: "Legal Resources",
    description:
      "Funded consultations, case support, and immigration filings — walked through with someone who knows the system.",
    dignityNote:
      "Due process belongs to every person, not only to those who can afford it.",
    icon: <ScalesIcon />
  }
];

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9z"
        fill="currentColor"
      />
    </svg>
  );
}
function BowlIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M3 12h18a9 9 0 1 1-18 0zm9-9c2 2 2 4 0 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
function ScalesIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 3v18M5 21h14M6 7h12M6 7l-3 6h6l-3-6zm12 0l-3 6h6l-3-6z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
