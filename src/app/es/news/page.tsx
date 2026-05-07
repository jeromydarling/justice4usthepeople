import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { TranslationBanner } from "@/components/TranslationBanner";

export const metadata: Metadata = {
  title: "Noticias y actualizaciones",
  description:
    "Actualizaciones en vivo de ICE y cobertura de inmigración de las fuentes que confiamos.",
  alternates: { languages: { en: "/news", es: "/es/news", so: "/so/news" } }
};

export default function NewsPageES() {
  return (
    <>
      <TranslationBanner lang="es" englishHref="/news" />
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Mirando juntos"
          title="Actualizaciones de ICE y noticias locales."
          lede="Un feed en vivo y multifuente — Minnesota Public Radio, Sahan Journal, Star Tribune, y desks nacionales de inmigración. Filtre por tema o fuente. Nunca editamos los titulares."
        />
      </section>

      <section className="container-wide pb-24">
        <div className="card p-8">
          <p className="eyebrow">Feed completo</p>
          <h3 className="mt-2 font-serif text-2xl">
            El feed de noticias en vivo está en inglés.
          </h3>
          <p className="mt-3 text-ink-soft">
            Las noticias se traen de los outlets que cubren inmigración —
            algunos en español (Sahan Journal), pero la mayoría en inglés.
            Use los filtros en la página completa para encontrar cobertura
            específica.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/news" hrefLang="en" className="btn-primary">
              Abrir feed completo <Arrow />
            </Link>
          </div>
        </div>

        <div className="mt-10 rounded-lg border border-ember-300 bg-ember-50 p-5 text-sm text-ember-900">
          <p className="font-semibold">¿Tiene un dato?</p>
          <p className="mt-1">
            Actividad verificada de ICE, llamadas a corte, redadas, o
            movimientos de política local. Llame nuestra línea directa al{" "}
            <a className="btn-link" href="tel:+16124241785">
              612-424-1785
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
