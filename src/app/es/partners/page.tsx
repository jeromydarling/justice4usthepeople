import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { TranslationBanner } from "@/components/TranslationBanner";

export const metadata: Metadata = {
  title: "Socios de la coalición",
  description:
    "Las organizaciones con las que trabajamos — fe, trabajo, defensa legal y servicios directos en Minnesota.",
  alternates: { languages: { en: "/partners", es: "/es/partners", so: "/so/partners" } }
};

export default function PartnersPageES() {
  return (
    <>
      <TranslationBanner lang="es" englishHref="/partners" />
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Coalición"
          title="En comunidad con."
          lede="El trabajo es más grande que cualquier organización individual. Estos son los socios con quienes nos mantenemos — a través de la fe, el trabajo, la asistencia legal, y el servicio directo."
        />
      </section>

      <section className="container-wide pb-12">
        <div className="card p-8">
          <p className="eyebrow">Socios principales</p>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            <Partner
              name="African Education Development Society (AEDS)"
              category="Servicio directo"
              blurb="Desarrollo comunitario, educación y programas juveniles para la comunidad de África Oriental en las Twin Cities."
            />
            <Partner
              name="Somali Youth Link (S.Y.L.)"
              category="Servicio directo"
              blurb="Mentoría, liderazgo, y defensa con y para la juventud somalí en Minnesota."
            />
            <Partner
              name="Immigrant Law Center of Minnesota (ILCM)"
              category="Legal"
              blurb="Servicios legales de inmigración, clínicas de naturalización, y entrenamientos sobre Conozca Sus Derechos en todo el estado."
              url="https://www.ilcm.org"
            />
            <Partner
              name="MIRAC — MN Immigrant Rights Action Committee"
              category="Defensa"
              blurb="Coordina la red de respuesta rápida de Minnesota para actividad verificada de ICE y defensa comunitaria."
              url="https://miracmn.org"
            />
            <Partner
              name="ISAIAH Minnesota"
              category="Fe"
              blurb="Coalición multirracial basada en fe, organizando para la justicia racial y económica."
              url="https://isaiahmn.org"
            />
            <Partner
              name="CTUL — Centro de Trabajadores Unidos en Lucha"
              category="Trabajo"
              blurb="Organización liderada por trabajadores de bajos salarios. Clínicas contra el robo de salarios y entrenamientos de Conozca Sus Derechos en el trabajo."
              url="https://ctul.net"
            />
          </ul>
        </div>

        <div className="mt-10 card grid items-center gap-6 p-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow">Lista completa</p>
            <h3 className="font-serif text-2xl md:text-3xl">
              Ver todos los socios.
            </h3>
            <p className="mt-3 text-ink-soft">
              La página completa con logos, blurbs detallados y categorías
              está en inglés.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link href="/partners" className="btn-primary" hrefLang="en">
              Ver en inglés <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Partner({
  name,
  category,
  blurb,
  url
}: {
  name: string;
  category: string;
  blurb: string;
  url?: string;
}) {
  return (
    <li className="rounded-2xl bg-bone-100 p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-ember-700">
        {category}
      </p>
      <p className="mt-2 font-serif text-lg leading-snug text-ink">{name}</p>
      <p className="mt-2 text-sm text-ink-soft">{blurb}</p>
      {url && (
        <a href={url} target="_blank" rel="noreferrer" className="btn-link mt-2 inline-flex text-xs">
          Ver sitio →
        </a>
      )}
    </li>
  );
}
