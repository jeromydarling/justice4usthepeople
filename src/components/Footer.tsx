import Link from "next/link";
import { Logo } from "./Logo";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-ink/10 bg-indigo-900 text-bone-100">
      <div className="container-wide grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo variant="light" />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-bone-200/90">
            {site.mission}
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.18em] text-ember-200">
            {site.tagline}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-medium uppercase tracking-widest text-bone-200">
            Visit
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link className="text-bone-100 no-underline hover:text-ember-200" href="/values">Our Values</Link></li>
            <li><Link className="text-bone-100 no-underline hover:text-ember-200" href="/events">Events</Link></li>
            <li><Link className="text-bone-100 no-underline hover:text-ember-200" href="/get-help">Get Help</Link></li>
            <li><Link className="text-bone-100 no-underline hover:text-ember-200" href="/find-loved-one">If a loved one was detained</Link></li>
            <li><Link className="text-bone-100 no-underline hover:text-ember-200" href="/news">News &amp; Updates</Link></li>
            <li><Link className="text-bone-100 no-underline hover:text-ember-200" href="/stories">Stories</Link></li>
            <li><Link className="text-bone-100 no-underline hover:text-ember-200" href="/partners">Coalition partners</Link></li>
            <li><Link className="text-bone-100 no-underline hover:text-ember-200" href="/take-action">Take Action</Link></li>
            <li><Link className="text-bone-100 no-underline hover:text-ember-200" href="/store">Store</Link></li>
            <li><Link className="text-bone-100 no-underline hover:text-ember-200" href="/donate">Donate</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-medium uppercase tracking-widest text-bone-200">
            Reach us
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>{site.contact.address}</li>
            <li>
              <a className="text-bone-100 no-underline hover:text-ember-200" href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </a>
            </li>
            <li>{site.contact.phone}</li>
          </ul>
          <div className="mt-4 flex gap-3 text-sm">
            <a className="text-bone-100 no-underline hover:text-ember-200" href={site.social.instagram} target="_blank" rel="noreferrer">Instagram</a>
            <a className="text-bone-100 no-underline hover:text-ember-200" href={site.social.facebook} target="_blank" rel="noreferrer">Facebook</a>
            <a className="text-bone-100 no-underline hover:text-ember-200" href={site.social.bluesky} target="_blank" rel="noreferrer">Bluesky</a>
          </div>
        </div>
      </div>

      <div className="border-t border-bone-100/10">
        <div className="container-wide flex flex-col items-start justify-between gap-2 py-5 text-xs text-bone-200/70 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} {site.name}. Built for the common good.</p>
          <p className="italic">
            “We belong to one another.” — a working principle of this community.
          </p>
        </div>
      </div>
    </footer>
  );
}
