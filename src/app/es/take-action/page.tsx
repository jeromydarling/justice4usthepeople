import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { TranslationBanner } from "@/components/TranslationBanner";

export const metadata: Metadata = {
  title: "Pase a la acción",
  description:
    "Tres formas de mostrar respaldo a sus vecinos: dar, dar tiempo, ser anfitrión.",
  alternates: { languages: { en: "/take-action", es: "/es/take-action", so: "/so/take-action" } }
};

export default function TakeActionPageES() {
  return (
    <>
      <TranslationBanner lang="es" englishHref="/take-action" />
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Pase a la acción"
          title="Tres formas de aparecer."
          lede="Dar dinero. Dar tiempo. Ser anfitrión. Cualquiera de las tres mantiene este trabajo en marcha — y se necesitan las tres."
        />
      </section>

      <section className="container-wide pb-12">
        <div className="grid gap-6 md:grid-cols-3">
          <Link href="/donate" className="card flex flex-col gap-3 p-6 no-underline hover:-translate-y-0.5 hover:shadow-md" hrefLang="en">
            <p className="eyebrow">Dar</p>
            <h3 className="font-serif text-xl">Donaciones</h3>
            <p className="text-sm text-ink-soft">
              Donaciones únicas o recurrentes. Cada dólar se convierte en
              alquiler pagado, comestibles entregados, o una consulta legal.
            </p>
            <span className="btn-link mt-auto inline-flex pt-2 text-sm">
              Donar <Arrow />
            </span>
          </Link>

          <Link href="/court-support" className="card flex flex-col gap-3 p-6 no-underline hover:-translate-y-0.5 hover:shadow-md" hrefLang="en">
            <p className="eyebrow">Dar tiempo</p>
            <h3 className="font-serif text-xl">Apoyo en la corte</h3>
            <p className="text-sm text-ink-soft">
              Acompañe a un vecino a una audiencia de inmigración. Una fila
              de comunidad en la galería cambia el día.
            </p>
            <span className="btn-link mt-auto inline-flex pt-2 text-sm">
              Inscribirme <Arrow />
            </span>
          </Link>

          <Link href="/contact?topic=kyr-host" className="card flex flex-col gap-3 p-6 no-underline hover:-translate-y-0.5 hover:shadow-md" hrefLang="en">
            <p className="eyebrow">Ser anfitrión</p>
            <h3 className="font-serif text-xl">Noche de Conozca Sus Derechos</h3>
            <p className="text-sm text-ink-soft">
              Llevamos un capacitador bilingüe, las tarjetas, y los aperitivos.
              Doce vecinos son quórum.
            </p>
            <span className="btn-link mt-auto inline-flex pt-2 text-sm">
              Coordinar <Arrow />
            </span>
          </Link>
        </div>
      </section>

      <section className="container-wide pb-24">
        <div className="card grid items-center gap-6 p-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow">Versión completa</p>
            <h3 className="font-serif text-2xl md:text-3xl">
              ¿Quiere ver más maneras de involucrarse?
            </h3>
            <p className="mt-3 text-ink-soft">
              La página completa en inglés tiene más detalles sobre roles de
              voluntariado, capacitación, y la red de respuesta rápida.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link href="/take-action" className="btn-primary" hrefLang="en">
              Ver en inglés <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
