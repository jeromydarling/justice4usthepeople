import type { Metadata } from "next";
import Link from "next/link";
import { BrandMark } from "@/components/Logo";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { site } from "@/lib/site";

// Página principal en español. Para mejorar las traducciones, ejecute este
// archivo a través de DeepL o pídale a Claude que lo refine. Las páginas
// internas (ej. /get-help, /events, /news) siguen en inglés por ahora —
// están enlazadas con etiquetas que indican el idioma.
export const metadata: Metadata = {
  title: "Justice 4 Us The People · Solidaridad con Minnesota",
  description:
    "Liderazgo inmigrante. Comunidad enraizada. Vecinos para los demás. Recursos, eventos y orientación legal en las Ciudades Gemelas.",
  alternates: {
    languages: {
      en: "/",
      es: "/es",
      so: "/so"
    }
  }
};

export default function HomeES() {
  return (
    <>
      {/* Hero ----------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-bone-50 via-bone-100 to-bone-50">
        <div className="container-wide relative grid items-center gap-12 py-20 md:grid-cols-12 md:py-28 lg:py-32">
          <div className="md:col-span-7">
            <p className="eyebrow">Movimiento liderado por vecinos · {site.city}</p>
            <h1 className="mt-4">
              En solidaridad
              <br />
              <span className="text-indigo-700">con Minnesota.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              Creemos que cada persona lleva una dignidad inquebrantable. La
              justicia es lo que parece el amor en público — y somos vecinos
              antes que nada. Organizamos por vivienda, alimentos y
              protección legal — el tejido cotidiano de una comunidad que se
              niega a dejar caer a ninguno de los suyos.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/get-help" className="btn-primary" hrefLang="en">
                Buscar ayuda <Arrow />
              </Link>
              <Link href="/know-your-rights" className="btn-ghost" hrefLang="en">
                Conozca sus derechos
              </Link>
              <Link href="/donate" className="btn-link" hrefLang="en">
                Donar
              </Link>
            </div>
            <p className="mt-3 text-xs text-ink-muted">
              Las páginas internas siguen en inglés por ahora — pero los
              recursos, las direcciones, y los teléfonos son los mismos.
            </p>
          </div>
          <div className="hidden items-center justify-center md:col-span-5 md:flex">
            <BrandMark mark="loon" className="h-56 w-56" />
          </div>
        </div>
      </section>

      {/* Quick help ----------------------------------------------------- */}
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Si necesita ayuda hoy"
          title="Por dónde empezar."
          lede="Tres líneas directas de apoyo, mantenidas por nuestro equipo. Cada solicitud es leída por una persona real."
        />
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          <Card
            title="Asistencia con renta y servicios"
            blurb="Si recibió un aviso de desalojo, una factura de servicios atrasada, o necesita ayuda para mantener un techo."
            href="/get-help/rental-utility"
          />
          <Card
            title="Alivio de comida"
            blurb="Despensas, comidas calientes, y entregas. Sin papeles. Sin preguntas."
            href="/get-help/food"
          />
          <Card
            title="Orientación legal"
            blurb="Referidos a abogados de inmigración, navegación en la corte, y acompañamiento en audiencias."
            href="/get-help/legal"
          />
        </ul>
      </section>

      {/* Detained section ----------------------------------------------- */}
      <section className="bg-indigo-900 py-16 text-bone-50 md:py-20">
        <div className="container-wide grid items-center gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow text-ember-200">¿Detuvieron a un ser querido?</p>
            <h2 className="mt-3 text-bone-50">
              Las primeras horas importan. Aquí está qué hacer.
            </h2>
            <p className="mt-3 text-bone-100/85">
              Una guía paso a paso: cómo encontrar a alguien en custodia,
              cómo conseguir un abogado, cómo poner dinero en su cuenta, y
              cómo conectarse con apoyo comunitario.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link href="/find-loved-one" className="btn-ember text-ink" hrefLang="en">
              Ver los pasos <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* Hotline -------------------------------------------------------- */}
      <section className="container-wide py-16 md:py-20">
        <div className="card grid items-center gap-6 p-8 md:grid-cols-12 ring-2 ring-ember-300">
          <div className="md:col-span-8">
            <p className="eyebrow text-ember-700">Línea directa 24 horas</p>
            <h3 className="font-serif text-2xl md:text-3xl">
              Si está sucediendo ahora, llame.
            </h3>
            <p className="mt-3 text-ink-soft">
              Voluntarios bilingües le pueden guiar por los próximos 60 minutos
              — y enviar observadores si hay actividad activa de aplicación.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <a className="btn-primary" href={site.contact.phoneHref}>
              612-424-1785
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function Card({
  title,
  blurb,
  href
}: {
  title: string;
  blurb: string;
  href: string;
}) {
  return (
    <li>
      <Link
        href={href}
        hrefLang="en"
        className="card flex h-full flex-col gap-3 p-6 no-underline transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <h3 className="font-serif text-xl">{title}</h3>
        <p className="text-sm text-ink-soft">{blurb}</p>
        <span className="btn-link mt-auto inline-flex pt-2 text-sm">
          Aplicar <Arrow />
        </span>
      </Link>
    </li>
  );
}
