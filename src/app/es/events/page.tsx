import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { TranslationBanner } from "@/components/TranslationBanner";
import { sortEvents, formatDate, formatTime } from "@/lib/events";

export const metadata: Metadata = {
  title: "Eventos",
  description:
    "Conferencias de prensa, marchas, vigilias, y entrenamientos comunitarios.",
  alternates: { languages: { en: "/events", es: "/es/events", so: "/so/events" } }
};

export default function EventsPageES() {
  const { upcoming } = sortEvents();
  return (
    <>
      <TranslationBanner lang="es" englishHref="/events" />
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Eventos"
          title="Aparezca. Traiga a un vecino."
          lede="Conferencias de prensa, marchas, vigilias, entrenamientos. Cada reunión es un momento para ser visibles los unos por los otros."
        />
        <Link href="/calendar.ics" className="btn-ghost mt-6 text-sm">
          Suscribirse al calendario
        </Link>
      </section>

      <section className="container-wide pb-12">
        {upcoming.length === 0 ? (
          <div className="card p-8">
            <p className="eyebrow">Sin eventos próximos</p>
            <h3 className="mt-2 text-2xl">Vuelva a revisar pronto.</h3>
            <p className="mt-3 text-ink-soft">
              Programamos conferencias, marchas, y entrenamientos según el
              momento lo requiera. ¿Quiere saber cuándo cae el próximo?
            </p>
          </div>
        ) : (
          <ul className="grid gap-6">
            {upcoming.map((e) => (
              <li key={e.slug} className="card p-6">
                <p className="eyebrow">Próximo</p>
                <h3 className="mt-2 font-serif text-xl">{e.title}</h3>
                <p className="mt-1 text-sm text-ink-soft">
                  {formatDate(e)} · {formatTime(e)} · {e.location.name}
                </p>
                <p className="mt-3 text-sm text-ink-soft">{e.description}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="container-wide pb-24">
        <div className="card grid items-center gap-6 p-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow">Versión completa</p>
            <h3 className="font-serif text-2xl md:text-3xl">
              Mapas, RSVP, posters y más.
            </h3>
            <p className="mt-3 text-ink-soft">
              La página completa de eventos en inglés tiene mapas
              interactivos y enlaces de calendario para cada evento.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link href="/events" className="btn-primary" hrefLang="en">
              Ver eventos <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
