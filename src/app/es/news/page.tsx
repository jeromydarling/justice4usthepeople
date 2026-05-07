import type { Metadata } from "next";
import { NewsFeed } from "@/components/NewsFeed";
import { SectionHeader } from "@/components/SectionHeader";
import { TranslationBanner } from "@/components/TranslationBanner";

export const metadata: Metadata = {
  title: "Noticias y actualizaciones",
  description:
    "Actualizaciones en vivo de ICE y cobertura de inmigración de las fuentes y cuentas comunitarias que confiamos.",
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
          lede="Un feed en vivo, multifuente — Minnesota Public Radio, Sahan Journal, Star Tribune, y desks nacionales de inmigración. Filtre por tema o fuente. Nunca editamos los titulares."
        />
        <p className="mt-3 text-xs text-ink-muted">
          Los titulares vienen directamente de los outlets en inglés (excepto
          Sahan Journal que publica en varios idiomas). Los controles de
          filtro abajo están en inglés.
        </p>
      </section>

      <section className="container-wide pb-20">
        <NewsFeed />
      </section>

      <section className="container-wide pb-24">
        <div className="card grid items-center gap-6 p-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow">¿Tiene un dato?</p>
            <h3 className="font-serif text-2xl md:text-3xl">
              Comparta lo que está viendo.
            </h3>
            <p className="mt-2 text-ink-soft">
              Actividad verificada de ICE, llamadas a corte, redadas, o
              movimientos de política local. Lo pasaremos a nuestra red de
              respuesta rápida.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <a className="btn-primary" href="tel:+16124241785">
              Línea directa · 612-424-1785
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
