// Centralized site config. Real contact info from the existing site preserved.
export const site = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "Justice 4 Us The People",
  shortName: "J4UTP",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://justice4usthepeople.org",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  city: "Twin Cities, Minnesota",
  // Mission written in the moral voice of the common good — neighbor language,
  // dignity, solidarity — without explicit religious vocabulary.
  mission:
    "We believe every person carries an unshakable dignity. Justice is what love looks like in public — and we are neighbors first.",
  rallying: "Stand in Solidarity with Minnesota",
  tagline: "Immigrant-led. Community-rooted. People for one another.",
  contact: {
    email: "justice4usthepeople@gmail.com",
    phone: "612-424-1785",
    phoneHref: "tel:+16124241785",
    address: "Twin Cities, Minnesota"
  },
  social: {
    instagram: "https://instagram.com/justice4usthepeople",
    facebook: "https://facebook.com/justice4usthepeople",
    bluesky: "https://bsky.app/profile/justice4usthepeople.org"
  },
  // Original donate channel — used as fallback / supplementary CTA.
  gofundmeUrl: "https://gofund.me/4a87ee1d7",
  // Single endpoint for all form submissions. Points to our Cloudflare
  // Worker (see /worker). Each form passes a different `_form` field so the
  // Worker can label / route as needed.
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? ""
};

// (formspree config removed — see formEndpoint above)

export const stripeLinks = {
  donate: {
    "25": process.env.NEXT_PUBLIC_STRIPE_DONATE_25 ?? "",
    "50": process.env.NEXT_PUBLIC_STRIPE_DONATE_50 ?? "",
    "100": process.env.NEXT_PUBLIC_STRIPE_DONATE_100 ?? "",
    "250": process.env.NEXT_PUBLIC_STRIPE_DONATE_250 ?? "",
    custom: process.env.NEXT_PUBLIC_STRIPE_DONATE_CUSTOM ?? ""
  },
  membership: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_MEMBERSHIP_MONTHLY ?? "",
    annual: process.env.NEXT_PUBLIC_STRIPE_MEMBERSHIP_ANNUAL ?? ""
  }
};

export type NavItem = { label: string; href: string };
export const primaryNav: NavItem[] = [
  { label: "Our Values", href: "/values" },
  { label: "Events", href: "/events" },
  { label: "Get Help", href: "/get-help" },
  { label: "News", href: "/news" },
  { label: "Take Action", href: "/take-action" },
  { label: "Store", href: "/store" }
];
