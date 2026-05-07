import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { EventMap } from "@/components/EventMap";
import { asset } from "@/lib/asset";
import {
  sortEvents,
  formatDate,
  formatTime,
  icsHref,
  type EventItem
} from "@/lib/events";
import { TranslationBanner } from "@/components/TranslationBanner";

export const metadata: Metadata = {
  title: "Dhacdooyin",
  description:
    "Shir-jaraa'idka, daahirsiyada, baxnaaninta, iyo tababbarrada bulshada — ururkasta waa daqiiqo aan u istaagno wadajir.",
  alternates: { languages: { en: "/events", es: "/es/events", so: "/so/events" } }
};

export default function EventsPageSO() {
  const now = new Date();
  const { upcoming, past } = sortEvents(now);
  return (
    <>
      <TranslationBanner lang="so" englishHref="/events" />
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Dhacdooyin"
          title="Imow. Keen deggan."
          lede="Shir-jaraa'id, daahirsiyo, baxnaanin, tababbar. Ururinkasta waa daqiiqo aan u muuqasanno isu midda kale. RSVP looma baahna, laakiin wuu na caawiyaa qorshaynta — wuxuuna caawiyaa saaxiib aad keeneyso."
        />
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/calendar.ics" className="btn-ghost text-sm">
            Iska diiwaan geli jadwalkaaga
          </Link>
          <span className="self-center text-xs text-ink-muted">
            Dhacdooyinku waxay si toos ah ugu galaan Google / Apple / Outlook.
          </span>
        </div>
      </section>

      {upcoming.length > 0 && (
        <section className="container-wide pb-12">
          <h2 className="sr-only">Dhacdooyinka soo socda</h2>
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
            <p className="eyebrow">Dhacdooyin soo socda ma jiraan</p>
            <h3 className="mt-2 text-2xl">Mar dambe na soo eeg.</h3>
            <p className="mt-3 text-ink-soft">
              Waxaan jadwaleynaa shir-jaraa'idka, baxnaanin, iyo tababar
              sida xaaladdu u baahato. Ma rabtaa inaad ogaato marka kan
              soo socdaa la sameeyo?
            </p>
            <Link href="/so/membership" className="btn-primary mt-5" hrefLang="so">
              Ku biir liiska ogeysiiska <Arrow />
            </Link>
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section className="container-wide pb-24">
          <div className="mt-8 border-t border-ink/10 pt-12">
            <p className="eyebrow">Ururinta dhowaan</p>
            <h2 className="mt-2">Halka aan wadajir u joognay.</h2>
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
            <p className="eyebrow">Ma martiqaadayaa dhacdo?</p>
            <h3 className="font-serif text-2xl md:text-3xl">Na soo waco.</h3>
            <p className="mt-3 text-ink-soft">
              Ma ka hadleysaa hool kaniisad, qol urur shaqo, kulan dugsiyeed,
              ama dhacdo jaamacadeed? Waan iman doonnaa — la socda tababare
              Conozca Sus Derechos, deggan leh khibrad nool, iyo qalabka aan
              ku raac dhaaca dhanka kale.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link href="/so/contact?topic=speaking" className="btn-primary" hrefLang="so">
              Noogu yeer inaan ka hadalno <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function EventCard({ event, status }: { event: EventItem; status: "upcoming" | "past" }) {
  return (
    <article className="card grid gap-0 overflow-hidden md:grid-cols-12">
      <div className="bg-indigo-900 p-5 text-bone-50 sm:p-6 md:col-span-3 md:p-8">
        {status === "upcoming" ? (
          <span className="inline-block rounded-full bg-ember-400 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-ink">Soo socda</span>
        ) : (
          <span className="inline-block rounded-full bg-bone-50/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-bone-200">Hore</span>
        )}
        <p className="mt-4 font-serif text-4xl leading-none sm:text-5xl md:mt-6">
          {new Date(event.start).toLocaleDateString("en-US", { day: "numeric", timeZone: "America/Chicago" })}
        </p>
        <p className="mt-1 font-serif text-lg text-ember-200 sm:text-xl">
          {new Date(event.start).toLocaleDateString("en-US", { month: "long", timeZone: "America/Chicago" })}
          <span className="ml-2 text-bone-200">{new Date(event.start).getFullYear()}</span>
        </p>
        <p className="mt-1 text-sm text-bone-200">
          {new Date(event.start).toLocaleDateString("en-US", { weekday: "long", timeZone: "America/Chicago" })} · {formatTime(event)}
        </p>
      </div>

      <div className="p-6 sm:p-7 md:col-span-6 md:p-8">
        {event.rallying && <p className="eyebrow">{event.rallying}</p>}
        <h3 className="mt-2 font-serif text-2xl md:text-3xl">{event.title}</h3>
        {event.subtitle && <p className="mt-1 text-lg text-ink-soft">{event.subtitle}</p>}
        <p className="mt-4 text-ink-soft">{event.description}</p>

        <dl className="mt-5 grid gap-3 text-sm md:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-wider text-ink-muted">Goorma</dt>
            <dd className="mt-0.5">{formatDate(event)} · {formatTime(event)}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-ink-muted">Halka</dt>
            <dd className="mt-0.5">
              {event.location.name}
              {event.location.city && <span className="block text-ink-muted">{event.location.city}</span>}
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap gap-3">
          {status === "upcoming" && (
            <a href={icsHref(event)} download={`${event.slug}.ics`} className="btn-primary">
              Ku dar jadwalka <Arrow />
            </a>
          )}
          {event.location.googleMapsQuery && (
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location.googleMapsQuery)}`} target="_blank" rel="noreferrer" className="btn-ghost">
              Hel jihada
            </a>
          )}
          {event.rsvpUrl && (
            <a href={event.rsvpUrl} target="_blank" rel="noreferrer" className="btn-ghost">
              RSVP / wadaag
            </a>
          )}
        </div>

        {event.partners && event.partners.length > 0 && (
          <div className="mt-7 flex flex-wrap items-center gap-5 border-t border-ink/10 pt-5">
            <p className="text-xs uppercase tracking-[0.18em] text-ink-muted">Iskaashi</p>
            <ul className="flex flex-wrap items-center gap-5">
              {event.partners.map((p) => (
                <li key={p.name} className="flex items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={asset(p.logo)} alt={p.name} width={36} height={36} className="h-9 w-9" />
                  <span className="text-sm text-ink-soft">
                    <span className="font-medium">{p.short ?? p.name}</span>
                    {p.short && <span className="block text-xs text-ink-muted">{p.name}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="relative bg-bone-100 md:col-span-3">
        <EventMap event={event} />
      </div>
    </article>
  );
}
