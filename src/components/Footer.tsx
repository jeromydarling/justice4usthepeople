import Link from "next/link";
import { Logo } from "./Logo";
import { NewsletterSignup } from "./NewsletterSignup";
import { site } from "@/lib/site";

type Group = {
  title: string;
  links: { label: string; href: string }[];
};

// Grouped footer nav. On mobile each group collapses into a <details>
// accordion so the footer stays browsable without scrolling forever.
const groups: Group[] = [
  {
    title: "Get help",
    links: [
      { label: "Resource map", href: "/get-help" },
      { label: "Know Your Rights", href: "/know-your-rights" },
      { label: "If a loved one was detained", href: "/find-loved-one" },
      { label: "Rental & utility relief", href: "/get-help/rental-utility" },
      { label: "Food relief", href: "/get-help/food" },
      { label: "Legal navigation", href: "/get-help/legal" }
    ]
  },
  {
    title: "Take action",
    links: [
      { label: "Events", href: "/events" },
      { label: "Take Action", href: "/take-action" },
      { label: "Court support", href: "/court-support" },
      { label: "Donate", href: "/donate" },
      { label: "Become a member", href: "/membership" },
      { label: "Store", href: "/store" }
    ]
  },
  {
    title: "About",
    links: [
      { label: "Our Values", href: "/values" },
      { label: "Stories", href: "/stories" },
      { label: "Coalition partners", href: "/partners" },
      { label: "News & Updates", href: "/news" },
      { label: "Contact", href: "/contact" }
    ]
  }
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-ink/10 bg-indigo-900 text-bone-100 print:hidden">
      {/* Newsletter band */}
      <div className="container-wide border-b border-bone-100/10 py-10">
        <div className="grid items-center gap-6 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow text-ember-200">Weekly briefing</p>
            <p className="mt-2 font-serif text-2xl text-bone-50">
              Stay close to the work.
            </p>
            <p className="mt-1 text-sm text-bone-200/80">
              A short note once a week. Unsubscribe any time.
            </p>
          </div>
          <div className="md:col-span-7">
            <NewsletterSignup variant="inline" />
          </div>
        </div>
      </div>

      {/* Brand + groups */}
      <div className="container-wide grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo variant="light" />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-bone-200/90">
            {site.mission}
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.18em] text-ember-200">
            {site.tagline}
          </p>
          <div className="mt-5 flex gap-4 text-sm">
            <a
              className="text-bone-100 no-underline hover:text-ember-200"
              href={site.social.instagram}
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
            <a
              className="text-bone-100 no-underline hover:text-ember-200"
              href={site.social.facebook}
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
            <a
              className="text-bone-100 no-underline hover:text-ember-200"
              href={site.social.bluesky}
              target="_blank"
              rel="noreferrer"
            >
              Bluesky
            </a>
          </div>
        </div>

        <div className="md:col-span-6 md:grid md:grid-cols-3 md:gap-8">
          {groups.map((g) => (
            <FooterGroup key={g.title} group={g} />
          ))}
        </div>

        <div className="md:col-span-2">
          <h4 className="text-sm font-medium uppercase tracking-widest text-bone-200">
            Reach us
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>{site.contact.address}</li>
            <li>
              <a
                className="text-bone-100 no-underline hover:text-ember-200"
                href={`mailto:${site.contact.email}`}
              >
                {site.contact.email}
              </a>
            </li>
            <li>
              <a
                className="text-bone-100 no-underline hover:text-ember-200"
                href={site.contact.phoneHref}
              >
                {site.contact.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Languages + copyright */}
      <div className="border-t border-bone-100/10">
        <div className="container-wide flex flex-col items-start justify-between gap-3 py-5 text-xs text-bone-200/70 md:flex-row md:items-center">
          <div className="flex flex-wrap items-center gap-3">
            <span className="uppercase tracking-[0.18em] text-ember-200">
              Languages
            </span>
            <Link className="text-bone-100 no-underline hover:text-ember-200" href="/" hrefLang="en">
              English
            </Link>
            <span aria-hidden>·</span>
            <Link className="text-bone-100 no-underline hover:text-ember-200" href="/es" hrefLang="es">
              Español
            </Link>
            <span aria-hidden>·</span>
            <Link className="text-bone-100 no-underline hover:text-ember-200" href="/so" hrefLang="so">
              Soomaali
            </Link>
          </div>
          <p>
            © {new Date().getFullYear()} {site.name}. Built for the common good.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Each group renders as a plain header + list on desktop. On mobile (< md),
// the same group becomes a <details> accordion to keep the footer compact.
function FooterGroup({ group }: { group: Group }) {
  return (
    <details
      open
      className="group border-b border-bone-100/10 py-3 md:border-b-0 md:py-0 [&_summary]:list-none"
    >
      <summary className="flex cursor-pointer items-center justify-between text-sm font-medium uppercase tracking-widest text-bone-200 md:cursor-auto md:pointer-events-none md:text-bone-200">
        {group.title}
        <Chevron className="h-4 w-4 transition-transform group-open:rotate-180 md:hidden" />
      </summary>
      <ul className="mt-3 space-y-2 text-sm md:mt-4">
        {group.links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-bone-100 no-underline hover:text-ember-200"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
