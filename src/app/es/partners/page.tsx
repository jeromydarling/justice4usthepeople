import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { asset } from "@/lib/asset";
import { TranslationBanner } from "@/components/TranslationBanner";

export const metadata: Metadata = {
  title: "Socios de la coalición",
  description:
    "Las organizaciones con las que trabajamos — fe, trabajo, defensa, y servicios directos en Minnesota.",
  alternates: { languages: { en: "/partners", es: "/es/partners", so: "/so/partners" } }
};

type CoalitionPartner = {
  name: string;
  short?: string;
  blurb: string;
  url?: string;
  logo?: string;
  category: "advocacy" | "faith" | "service" | "legal" | "labor";
};

// Spanish blurbs mirroring the English partners list.
const partners: CoalitionPartner[] = [
  { name: "African Education Development Society", short: "AEDS", blurb: "Desarrollo comunitario, educación, y programas juveniles para la comunidad de África Oriental en las Twin Cities.", logo: "/partners/aeds.svg", category: "service" },
  { name: "Somali Youth Link", short: "S.Y.L.", blurb: "Mentoría, liderazgo, y defensa con y para la juventud somalí en Minnesota.", logo: "/partners/syl.svg", category: "service" },
  { name: "Immigrant Law Center of Minnesota", short: "ILCM", blurb: "Servicios legales de inmigración, clínicas de naturalización, y entrenamientos de Conozca Sus Derechos en todo el estado.", url: "https://www.ilcm.org", category: "legal" },
  { name: "MIRAC — MN Immigrant Rights Action Committee", short: "MIRAC", blurb: "Coordina la red de respuesta rápida de Minnesota para actividad verificada de ICE y defensa comunitaria.", url: "https://miracmn.org", category: "advocacy" },
  { name: "ISAIAH Minnesota", blurb: "Coalición multirracial basada en fe, organizando para la justicia racial y económica.", url: "https://isaiahmn.org", category: "faith" },
  { name: "CTUL — Centro de Trabajadores Unidos en Lucha", short: "CTUL", blurb: "Organización liderada por trabajadores de bajos salarios. Clínicas contra el robo de salarios y entrenamientos de Conozca Sus Derechos en el trabajo.", url: "https://ctul.net", category: "labor" },
  { name: "COPAL Minnesota", blurb: "Organización Latinx por la justicia racial. Derechos de los trabajadores, inmigración, y participación cívica.", url: "https://www.copalmn.org", category: "advocacy" },
  { name: "MN Interfaith Coalition on Immigration", blurb: "Coalición de comunidades de fe que ofrece acompañamiento, santuario, y apoyo pastoral.", category: "faith" }
];

const categoryLabels: Record<CoalitionPartner["category"], string> = {
  advocacy: "Defensa",
  faith: "Fe",
  service: "Servicio directo",
  legal: "Legal",
  labor: "Trabajo"
};

export default function PartnersPageES() {
  return (
    <>
      <TranslationBanner lang="es" englishHref="/partners" />
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Coalición"
          title="En comunidad con."
          lede="El trabajo es más grande que cualquier organización individual. Estos son los socios con quienes nos mantenemos — a través de la fe, el trabajo, la asistencia legal, y el servicio directo. Si su organización debería estar en esta lista, contáctenos."
        />
      </section>

      <section className="container-wide pb-12">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((p) => (
            <li key={p.name}>
              <article className="card flex h-full flex-col gap-3 p-6">
                <div className="flex items-center gap-4">
                  {p.logo ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={asset(p.logo)}
                      alt={p.name}
                      width={56}
                      height={56}
                      className="h-14 w-14 shrink-0"
                    />
                  ) : (
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-indigo-700/10 font-serif text-xl text-indigo-700">
                      {(p.short ?? p.name).slice(0, 1)}
                    </div>
                  )}
                  <div>
                    <p className="eyebrow">{categoryLabels[p.category]}</p>
                    <h3 className="mt-0.5 font-serif text-lg leading-snug">
                      {p.short ?? p.name}
                    </h3>
                    {p.short && <p className="text-xs text-ink-muted">{p.name}</p>}
                  </div>
                </div>
                <p className="text-sm text-ink-soft">{p.blurb}</p>
                {p.url && (
                  <a href={p.url} target="_blank" rel="noreferrer" className="btn-link mt-auto inline-flex pt-2 text-sm">
                    Visitar sitio <Arrow />
                  </a>
                )}
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-wide pb-24">
        <div className="card grid items-center gap-6 p-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow">Para organizaciones</p>
            <h3 className="font-serif text-2xl md:text-3xl">
              Manténgase con nosotros, públicamente.
            </h3>
            <p className="mt-3 text-ink-soft">
              Apoyamos y amplificamos el trabajo de los socios — eventos,
              declaraciones conjuntas, cartas abiertas. Envíenos una nota
              sobre su organización y lo que podríamos hacer juntos.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link href="/es/contact?topic=coalition" className="btn-primary" hrefLang="es">
              Contactar <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
