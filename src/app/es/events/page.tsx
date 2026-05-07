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
  title: "Eventos",
  description:
    "Conferencias de prensa, marchas, vigilias, y entrenamientos comunitarios — cada reunión es un momento para estar en solidaridad.",
  alternates: { languages: { en: "/events", es: "/es/events", so: "/so/events" } }
};

export default function EventsPageES() {
  const now = new Date();
  const { upcoming, past } = sortEvents(now);
  return (
    <>
      <TranslationBanner lang="es" englishHref="/events" />
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Eventos"
          title="Aparezca. Traiga a un vecino."
          lede="Conferencias de prensa, marchas, vigilias, capacitaciones. Cada reunión es un momento para ser visibles los unos por los otros. RSVP no es requerido, pero nos ayuda a planear — y ayuda a un amigo que pueda traer."
        />
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/calendar.ics" className="btn-ghost text-sm">
            Suscribirse en su calendario
          </Link>
          <span className="self-center text-xs text-ink-muted">
            Los eventos fluyen a Google / Apple / Outlook automáticamente.
          </span>
        </div>
      </section>

      {upcoming.length > 0 && (
        <section className="container-wide pb-12">
          <h2 className="sr-only">Eventos próximos</h2>
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
            <p className="eyebrow">Sin eventos próximos</p>
            <h3 className="mt-2 text-2xl">Vuelva a revisar pronto.</h3>
            <p className="mt-3 text-ink-soft">
              Programamos conferencias, marchas, y entrenamientos según el
              momento lo requiera. ¿Quiere saber cuándo cae el próximo?
            </p>
            <Link href="/es/membership" className="btn-primary mt-5" hrefLang="es">
              Únase a la lista de aviso <Arrow />
            </Link>
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section className="container-wide pb-24">
          <div className="mt-8 border-t border-ink/10 pt-12">
            <p className="eyebrow">Reuniones recientes</p>
            <h2 className="mt-2">Donde hemos estado juntos.</h2>
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
            <p className="eyebrow">¿Organiza un evento?</p>
            <h3 className="font-serif text-2xl md:text-3xl">Llévanos a usted.</h3>
            <p className="mt-3 text-ink-soft">
              ¿Habla en una sala parroquial, un local sindical, una asamblea
              escolar, o un evento universitario? Iremos — con un capacitador
              de Conozca Sus Derechos, un vecino con experiencia vivida, y
              los materiales para hacer seguimiento.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link href="/es/contact?topic=speaking" className="btn-primary" hrefLang="es">
              Invítenos a hablar <Arrow />
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
          <span className="inline-block rounded-full bg-ember-400 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-ink">
            Próximo
          </span>
        ) : (
          <span className="inline-block rounded-full bg-bone-50/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-bone-200">
            Pasado
          </span>
        )}
        <p className="mt-4 font-serif text-4xl leading-none sm:text-5xl md:mt-6">
          {new Date(event.start).toLocaleDateString("es-US", { day: "numeric", timeZone: "America/Chicago" })}
        </p>
        <p className="mt-1 font-serif text-lg text-ember-200 sm:text-xl">
          {new Date(event.start).toLocaleDateString("es-US", { month: "long", timeZone: "America/Chicago" })}
          <span className="ml-2 text-bone-200">
            {new Date(event.start).getFullYear()}
          </span>
        </p>
        <p className="mt-1 text-sm text-bone-200">
          {new Date(event.start).toLocaleDateString("es-US", { weekday: "long", timeZone: "America/Chicago" })}{" "}
          · {formatTime(event)}
        </p>
      </div>

      <div className="p-6 sm:p-7 md:col-span-6 md:p-8">
        {event.rallying && <p className="eyebrow">{event.rallying}</p>}
        <h3 className="mt-2 font-serif text-2xl md:text-3xl">{event.title}</h3>
        {event.subtitle && <p className="mt-1 text-lg text-ink-soft">{event.subtitle}</p>}
        <p className="mt-4 text-ink-soft">{event.description}</p>

        <dl className="mt-5 grid gap-3 text-sm md:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-wider text-ink-muted">Cuándo</dt>
            <dd className="mt-0.5">{formatDate(event)} · {formatTime(event)}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-ink-muted">Dónde</dt>
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
              Agregar al calendario <Arrow />
            </a>
          )}
          {event.location.googleMapsQuery && (
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location.googleMapsQuery)}`} target="_blank" rel="noreferrer" className="btn-ghost">
              Cómo llegar
            </a>
          )}
          {event.rsvpUrl && (
            <a href={event.rsvpUrl} target="_blank" rel="noreferrer" className="btn-ghost">
              RSVP / compartir
            </a>
          )}
        </div>

        {event.partners && event.partners.length > 0 && (
          <div className="mt-7 flex flex-wrap items-center gap-5 border-t border-ink/10 pt-5">
            <p className="text-xs uppercase tracking-[0.18em] text-ink-muted">En coalición con</p>
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
