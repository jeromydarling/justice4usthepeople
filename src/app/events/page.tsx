import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import {
  events as allEvents,
  sortEvents,
  formatDate,
  formatTime,
  icsHref,
  type EventItem
} from "@/lib/events";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Press conferences, marches, vigils, and community trainings — every gathering is a moment to stand in solidarity."
};

export default function EventsPage() {
  // Use a stable date so static export is deterministic.
  const now = new Date();
  const { upcoming, past } = sortEvents(now);

  return (
    <>
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Events"
          title="Show up. Bring a neighbor."
          lede="Press conferences, marches, vigils, trainings. Every gathering is a moment to be visible for one another. RSVP isn't required, but it helps us plan — and helps a friend you'd bring along."
        />
      </section>

      {upcoming.length > 0 && (
        <section className="container-wide pb-12">
          <h2 className="sr-only">Upcoming events</h2>
          <ul className="grid gap-8">
            {upcoming.map((e) => (
              <li key={e.slug}>
                <EventCard event={e} status="upcoming" />
              </li>
            ))}
          </ul>
        </section>
      )}

      {upcoming.length === 0 && (
        <section className="container-wide pb-12">
          <div className="card p-8">
            <p className="eyebrow">No upcoming events listed</p>
            <h3 className="mt-2 text-2xl">Check back soon.</h3>
            <p className="mt-3 text-ink-soft">
              We schedule press conferences, marches, and trainings as the
              moment requires. Want to know when the next one drops?
            </p>
            <Link href="/membership" className="btn-primary mt-5">
              Join the briefing list <Arrow />
            </Link>
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section className="container-wide pb-24">
          <div className="mt-8 border-t border-ink/10 pt-12">
            <p className="eyebrow">Recent gatherings</p>
            <h2 className="mt-2">Where we've been together.</h2>
            <ul className="mt-8 grid gap-8">
              {past.slice(0, 6).map((e) => (
                <li key={e.slug}>
                  <EventCard event={e} status="past" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="container-wide pb-24">
        <div className="card grid items-center gap-6 p-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow">Hosting an event</p>
            <h3 className="font-serif text-2xl md:text-3xl">
              Bring us in.
            </h3>
            <p className="mt-3 text-ink-soft">
              Speaking at a parish hall, a union local, a school assembly, or a
              campus event? We'll come — with a Know-Your-Rights trainer, a
              neighbor with lived experience, and the materials to follow up.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link href="/contact?topic=speaking" className="btn-primary">
              Invite us to speak <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function EventCard({
  event,
  status
}: {
  event: EventItem;
  status: "upcoming" | "past";
}) {
  return (
    <article className="card grid gap-0 overflow-hidden md:grid-cols-12">
      {/* Date column */}
      <div className="bg-indigo-900 p-8 text-bone-50 md:col-span-3">
        {status === "upcoming" ? (
          <span className="inline-block rounded-full bg-ember-400 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-ink">
            Upcoming
          </span>
        ) : (
          <span className="inline-block rounded-full bg-bone-50/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-bone-200">
            Past
          </span>
        )}
        <p className="mt-6 font-serif text-5xl leading-none">
          {new Date(event.start).toLocaleDateString("en-US", {
            day: "numeric",
            timeZone: "America/Chicago"
          })}
        </p>
        <p className="mt-1 font-serif text-xl text-ember-200">
          {new Date(event.start).toLocaleDateString("en-US", {
            month: "long",
            timeZone: "America/Chicago"
          })}
          <span className="ml-2 text-bone-200">
            {new Date(event.start).getFullYear()}
          </span>
        </p>
        <p className="mt-1 text-sm text-bone-200">
          {new Date(event.start).toLocaleDateString("en-US", {
            weekday: "long",
            timeZone: "America/Chicago"
          })}{" "}
          · {formatTime(event)}
        </p>
      </div>

      {/* Content column */}
      <div className="p-8 md:col-span-6">
        {event.rallying && <p className="eyebrow">{event.rallying}</p>}
        <h3 className="mt-2 font-serif text-2xl md:text-3xl">{event.title}</h3>
        {event.subtitle && (
          <p className="mt-1 text-lg text-ink-soft">{event.subtitle}</p>
        )}
        <p className="mt-4 text-ink-soft">{event.description}</p>

        <dl className="mt-5 grid gap-3 text-sm md:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-wider text-ink-muted">When</dt>
            <dd className="mt-0.5">{formatDate(event)} · {formatTime(event)}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-ink-muted">Where</dt>
            <dd className="mt-0.5">
              {event.location.name}
              {event.location.city && (
                <span className="block text-ink-muted">{event.location.city}</span>
              )}
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap gap-3">
          {status === "upcoming" && (
            <a href={icsHref(event)} download={`${event.slug}.ics`} className="btn-primary">
              Add to calendar <Arrow />
            </a>
          )}
          {event.location.googleMapsQuery && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location.googleMapsQuery)}`}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              Get directions
            </a>
          )}
          {event.rsvpUrl && (
            <a href={event.rsvpUrl} target="_blank" rel="noreferrer" className="btn-ghost">
              RSVP / share
            </a>
          )}
        </div>

        {event.partners && event.partners.length > 0 && (
          <div className="mt-7 flex flex-wrap items-center gap-5 border-t border-ink/10 pt-5">
            <p className="text-xs uppercase tracking-[0.18em] text-ink-muted">
              In coalition with
            </p>
            <ul className="flex flex-wrap items-center gap-5">
              {event.partners.map((p) => (
                <li key={p.name} className="flex items-center gap-2">
                  <Image
                    src={p.logo}
                    alt={p.name}
                    width={36}
                    height={36}
                    className="h-9 w-9"
                  />
                  <span className="text-sm text-ink-soft">
                    <span className="font-medium">{p.short ?? p.name}</span>
                    {p.short && (
                      <span className="block text-xs text-ink-muted">{p.name}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Map preview column */}
      <div className="relative bg-bone-100 md:col-span-3">
        <EventMapPreview event={event} />
      </div>
    </article>
  );
}

function EventMapPreview({ event }: { event: EventItem }) {
  // A static, hand-drawn map preview. A live Mapbox preview here would be
  // overkill for many events on the page; the marker on /get-help already
  // provides a real interactive view. We link out for directions instead.
  return (
    <div className="flex h-full min-h-[180px] flex-col items-center justify-center p-6 text-center">
      <svg viewBox="0 0 120 120" className="h-20 w-20 text-indigo-700" aria-hidden>
        <circle cx="60" cy="55" r="22" fill="currentColor" opacity="0.15" />
        <path
          d="M60 18c-12 0-22 9-22 22 0 16 22 42 22 42s22-26 22-42c0-13-10-22-22-22zm0 32a10 10 0 1 1 0-20 10 10 0 0 1 0 20z"
          fill="currentColor"
        />
      </svg>
      <p className="mt-3 text-sm font-medium text-ink">{event.location.name}</p>
      {event.location.city && (
        <p className="text-xs text-ink-muted">{event.location.city}</p>
      )}
    </div>
  );
}
