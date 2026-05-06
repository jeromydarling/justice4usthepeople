import type { FormField } from "@/components/Form";

// Fields modeled on the existing Google Forms (per the live site). Adjust
// the labels/required flags below to exactly match each program's intake.
//
// Common fields shared across all three intakes (kept short and dignifying —
// no extraneous data, no demographic gatekeeping).
const baseHousehold: FormField[] = [
  { kind: "text", name: "fullName", label: "Your name", required: true, autoComplete: "name" },
  { kind: "email", name: "email", label: "Email", required: true, autoComplete: "email" },
  { kind: "tel", name: "phone", label: "Phone", required: true, autoComplete: "tel", help: "Include area code. We'll only call about your application." },
  { kind: "select", name: "language", label: "Preferred language", required: true, options: [
    { value: "english", label: "English" },
    { value: "spanish", label: "Español" },
    { value: "somali", label: "Soomaali" },
    { value: "hmong", label: "Hmoob" },
    { value: "amharic", label: "አማርኛ" },
    { value: "oromo", label: "Afaan Oromoo" },
    { value: "other", label: "Other (note in comments)" }
  ]},
  { kind: "select", name: "household", label: "Household size", required: true, options: [
    { value: "1", label: "1 person" },
    { value: "2", label: "2 people" },
    { value: "3", label: "3 people" },
    { value: "4", label: "4 people" },
    { value: "5", label: "5 people" },
    { value: "6+", label: "6 or more" }
  ]},
  { kind: "text", name: "zip", label: "ZIP code", required: true, autoComplete: "postal-code" }
];

export const rentalForm: FormField[] = [
  ...baseHousehold,
  { kind: "select", name: "urgency", label: "How urgent is this?", required: true, options: [
    { value: "eviction-7", label: "Eviction notice within 7 days" },
    { value: "eviction-30", label: "Notice within 30 days" },
    { value: "shutoff", label: "Utility shut-off pending" },
    { value: "behind", label: "Behind on rent / utilities, no notice yet" }
  ]},
  { kind: "text", name: "amount", label: "Amount of help needed (USD)", required: false, placeholder: "$" },
  { kind: "textarea", name: "story", label: "Briefly, what happened?", required: false,
    help: "A few sentences is plenty. Share only what you're comfortable sharing.", rows: 5 },
  { kind: "checkbox", name: "consent", label: "I'm okay with a teammate calling or texting me to follow up.", required: true }
];

export const foodForm: FormField[] = [
  ...baseHousehold,
  { kind: "select", name: "delivery", label: "Pickup or delivery?", required: true, options: [
    { value: "delivery", label: "Delivery to my home" },
    { value: "pickup", label: "Pickup is fine" }
  ]},
  { kind: "textarea", name: "diet", label: "Allergies, diet, or kids in the household?", required: false, rows: 3 },
  { kind: "textarea", name: "story", label: "Anything else we should know?", required: false, rows: 4 },
  { kind: "checkbox", name: "consent", label: "I'm okay with a teammate calling or texting me to follow up.", required: true }
];

export const legalForm: FormField[] = [
  ...baseHousehold,
  { kind: "select", name: "matter", label: "What kind of matter?", required: true, options: [
    { value: "immigration-filing", label: "Immigration filing or status help" },
    { value: "ice-encounter", label: "Recent ICE encounter / detention" },
    { value: "court-date", label: "Upcoming court date" },
    { value: "workplace", label: "Workplace rights" },
    { value: "housing", label: "Housing / eviction defense" },
    { value: "other", label: "Other — explain below" }
  ]},
  { kind: "text", name: "deadline", label: "Any deadline or court date?", required: false,
    placeholder: "MM/DD/YYYY or 'unsure'" },
  { kind: "textarea", name: "story", label: "Briefly, what's the situation?", required: false,
    help: "Share only what's safe to put in writing.", rows: 5 },
  { kind: "checkbox", name: "consent", label: "I'm okay with a teammate calling or texting me to follow up.", required: true }
];

export const volunteerForm: FormField[] = [
  { kind: "text", name: "fullName", label: "Your name", required: true, autoComplete: "name" },
  { kind: "email", name: "email", label: "Email", required: true, autoComplete: "email" },
  { kind: "tel", name: "phone", label: "Phone", required: false, autoComplete: "tel" },
  { kind: "text", name: "city", label: "City / neighborhood", required: false },
  { kind: "select", name: "interest", label: "Where would you like to plug in?", required: true, options: [
    { value: "delivery", label: "Food / supply deliveries" },
    { value: "rapid-response", label: "Rapid response observer" },
    { value: "interpretation", label: "Interpretation / translation" },
    { value: "legal-support", label: "Legal accompaniment" },
    { value: "events", label: "Events & outreach" },
    { value: "skills", label: "Specific skills (web, design, accounting, etc.)" },
    { value: "anywhere", label: "Wherever you need me" }
  ]},
  { kind: "textarea", name: "skills", label: "Skills, languages, or availability", required: false, rows: 4 },
  { kind: "checkbox", name: "consent", label: "Add me to occasional movement updates.", required: false }
];

export const membershipForm: FormField[] = [
  { kind: "text", name: "fullName", label: "Your name", required: true, autoComplete: "name" },
  { kind: "email", name: "email", label: "Email", required: true, autoComplete: "email" },
  { kind: "tel", name: "phone", label: "Phone", required: false, autoComplete: "tel" },
  { kind: "text", name: "city", label: "City / neighborhood", required: false },
  { kind: "select", name: "tier", label: "Membership tier", required: true, options: [
    { value: "neighbor", label: "Neighbor — give what you can" },
    { value: "sustainer", label: "Sustainer — $10/mo recurring" },
    { value: "anchor", label: "Anchor — $25/mo recurring" },
    { value: "annual", label: "Annual member — $250/yr" }
  ]},
  { kind: "textarea", name: "why", label: "Why are you joining? (Optional)", required: false, rows: 4 },
  { kind: "checkbox", name: "consent", label: "Send me the monthly briefing.", required: false }
];

export const contactForm: FormField[] = [
  { kind: "email", name: "email", label: "Email", required: true, autoComplete: "email" },
  { kind: "text", name: "firstName", label: "First name", required: false, autoComplete: "given-name" },
  { kind: "text", name: "lastName", label: "Last name", required: false, autoComplete: "family-name" },
  { kind: "tel", name: "phone", label: "Phone", required: false, autoComplete: "tel" },
  { kind: "textarea", name: "message", label: "Comments or concerns", required: false, rows: 6 }
];
