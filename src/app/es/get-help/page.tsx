import type { Metadata } from "next";
import Link from "next/link";
import { ResourceMap } from "@/components/ResourceMap";
import { SectionHeader } from "@/components/SectionHeader";
import { programs } from "@/lib/programs";
import { Arrow } from "@/components/ProgramCard";
import { TranslationBanner } from "@/components/TranslationBanner";

export const metadata: Metadata = {
  title: "Buscar ayuda",
  description:
    "Mapa vivo de recursos en las Twin Cities — ayuda legal, comida, vivienda, salud, santuario, y respuesta rápida.",
  alternates: { languages: { en: "/get-help", es: "/es/get-help", so: "/so/get-help" } }
};

// Spanish translations of the program data — mirrors src/lib/programs.tsx
const programasES: Record<string, { shortName: string; name: string; description: string }> = {
  "rental-utility": {
    shortName: "Alivio de alquiler y servicios",
    name: "Manteniendo a las familias en casa",
    description:
      "Apoyo directo para familias enfrentando desalojo o cortes de servicios después de una pérdida repentina de ingresos o un cambio de estatus."
  },
  food: {
    shortName: "Alivio inmediato de comida",
    name: "Comida en la mesa",
    description:
      "Comestibles entregados y comidas calientes compartidas con vecinos al límite entre cheques, horarios y trámites."
  },
  legal: {
    shortName: "Navegación legal",
    name: "Recursos legales",
    description:
      "Conexión con abogados de inmigración, navegación en la corte, y acompañamiento en audiencias."
  }
};

export default function GetHelpPageES() {
  return (
    <>
      <TranslationBanner lang="es" englishHref="/get-help" />
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Buscar ayuda"
          title="Un mapa vivo de a dónde acudir."
          lede="Mantenido por vecinos que usan estos recursos. Toque una categoría para filtrar; toque un marcador para ver horarios, idiomas, y un teléfono directo."
        />
        <Link
          href="/es/find-loved-one"
          hrefLang="es"
          className="mt-6 inline-block rounded-2xl border-2 border-ember-300 bg-ember-50 px-4 py-2.5 text-sm font-medium leading-snug text-ember-700 no-underline transition hover:bg-ember-100"
        >
          Si acaban de detener a un ser querido → vea los siguientes pasos
        </Link>
        <p className="mt-3 text-xs text-ink-muted">
          Los marcadores y nombres de recursos están en inglés —
          son las organizaciones reales con sus nombres oficiales.
        </p>
        <div id="map" className="mt-10">
          <ResourceMap />
        </div>
      </section>

      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Aplique a nuestros programas"
          title="Tres líneas directas de apoyo, mantenidas por nosotros."
          lede="Cada solicitud es leída por una persona real de nuestro equipo. Si necesita ayuda urgente, llame al 612-424-1785."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {programs.map((p) => {
            const t = programasES[p.slug] ?? {
              shortName: p.shortName,
              name: p.name,
              description: p.description
            };
            return (
              <Link
                key={p.slug}
                href={`/get-help/${p.slug}`}
                hrefLang="en"
                className="card group flex flex-col gap-3 p-6 no-underline transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <p className="eyebrow">{t.shortName}</p>
                <h3 className="text-2xl">{t.name}</h3>
                <p className="text-ink-soft">{t.description}</p>
                <span className="btn-link mt-2 inline-flex">
                  Aplicar <Arrow />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="container-wide pb-24">
        <div className="card grid items-center gap-6 p-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow">¿Falta un recurso?</p>
            <h3 className="font-serif text-2xl md:text-3xl">
              Cuéntenos qué debería estar en este mapa.
            </h3>
            <p className="mt-2 text-ink-soft">
              Agregamos nuevos recursos semanalmente. Envíe el nombre, la
              ubicación, y una frase sobre lo que hacen — verificaremos y
              publicaremos.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link href="/es/contact?topic=resource" className="btn-primary" hrefLang="es">
              Sugerir un recurso <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
