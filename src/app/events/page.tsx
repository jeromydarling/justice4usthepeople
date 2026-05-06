import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { EventMap } from "@/components/EventMap";
import { asset } from "@/lib/asset";
import { site } from "@/lib/site";
import {
  events as allEvents,
  sortEvents,
  eventEnd,
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

// Schema.org Event entries for upcoming events — Google can surface these
// directly in search results with date / location / organizer.
function buildEventsJsonLd(events: EventItem[]) {
  return events.map((e) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.title,
    description: e.description,
    startDate: e.start,
    endDate: eventEnd(e).toISOString(),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: e.location.name,
      address: [e.location.address, e.location.city]
        .filter(Boolean)
        .join(", "),
      ...(e.location.coords && {
        geo: {
          "@type": "GeoCoordinates",
          latitude: e.location.coords[1],
          longitude: e.location.coords[0]
        }
      })
    },
    organizer: {
      "@type": "Organization",
      name: site.name,
      url: site.url
    }
  }));
}

export default function EventsPage() {
  // Use a stable date so static export is deterministic.
  const now = new Date();
  const { upcoming, past } = sortEvents(now);
  const eventsJsonLd = buildEventsJsonLd(upcoming);

  return (
    <>
      {eventsJsonLd.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }}
        />
      )}
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Events"
          title="Show up. Bring a neighbor."
          lede="Press conferences, marches, vigils, trainings. Every gathering is a moment to be visible for one another. RSVP isn't required, but it helps us plan — and helps a friend you'd bring along."
        />
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/calendar.ics" className="btn-ghost text-sm">
            Subscribe in your calendar
          </Link>
          <span className="self-center text-xs text-ink-muted">
            Events flow into Google / Apple / Outlook automatically.
          </span>
        </div>
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
      {/* Date column — compact on mobile, full editorial on desktop. */}
      <div className="bg-indigo-900 p-5 text-bone-50 sm:p-6 md:col-span-3 md:p-8">
        {status === "upcoming" ? (
          <span className="inline-block rounded-full bg-ember-400 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-ink">
            Upcoming
          </span>
        ) : (
          <span className="inline-block rounded-full bg-bone-50/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-bone-200">
            Past
          </span>
        )}
        <p className="mt-4 font-serif text-4xl leading-none sm:text-5xl md:mt-6">
          {new Date(event.start).toLocaleDateString("en-US", {
            day: "numeric",
            timeZone: "America/Chicago"
          })}
        </p>
        <p className="mt-1 font-serif text-lg text-ember-200 sm:text-xl">
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
      <div className="p-6 sm:p-7 md:col-span-6 md:p-8">
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset(p.logo)}
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

      {/* Map column — real Mapbox tile via Static Images API. */}
      <div className="relative bg-bone-100 md:col-span-3">
        <EventMap event={event} />
      </div>
    </article>
  );
}
