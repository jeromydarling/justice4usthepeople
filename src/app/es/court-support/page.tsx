import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { TranslationBanner } from "@/components/TranslationBanner";

export const metadata: Metadata = {
  title: "Apoyo en la corte",
  description:
    "Voluntariado para acompañar a vecinos a la corte de inmigración.",
  alternates: { languages: { en: "/court-support", es: "/es/court-support", so: "/so/court-support" } }
};

export default function CourtSupportPageES() {
  return (
    <>
      <TranslationBanner lang="es" englishHref="/court-support" />
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Apoyo en la corte"
          title="Siéntese en la galería. Sea la fila de vecinos."
          lede="Una fila de comunidad en la galería es, para muchas personas, la diferencia entre el miedo y la dignidad. Coordinamos acompañamiento en cortes en las Twin Cities."
        />
      </section>

      <section className="container-wide pb-12">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7 card p-8">
            <p className="eyebrow">Cómo se ve</p>
            <ol className="mt-3 list-decimal space-y-3 pl-5 text-sm text-ink-soft">
              <li>
                Le enviamos un texto 24–72 horas antes de una audiencia con la
                fecha, la corte, y qué ponerse (vestimenta de oficina; las
                camisetas iguales son opcionales y las proveemos).
              </li>
              <li>
                Llega 20 minutos antes, conoce a la familia en el vestíbulo,
                y se sientan juntos en la galería.
              </li>
              <li>
                No habla en la corte. No es testigo. Es vecina.
              </li>
              <li>
                Después de la audiencia, hace un resumen breve, salen juntos,
                y la familia sabe que no está sola.
              </li>
            </ol>
            <p className="mt-5 text-sm text-ink-muted">
              Nunca compartimos su información de contacto. Puede pausar o
              retirarse en cualquier momento.
            </p>
          </div>
          <div className="md:col-span-5 card p-8">
            <p className="eyebrow">Inscríbase</p>
            <h3 className="mt-2 font-serif text-2xl">¿Listo para empezar?</h3>
            <p className="mt-3 text-sm text-ink-soft">
              El formulario de inscripción está en inglés por ahora. Es
              corto — nombre, email, idiomas, disponibilidad, y notas.
            </p>
            <Link href="/court-support" hrefLang="en" className="btn-primary mt-5">
              Llenar el formulario <Arrow />
            </Link>
            <p className="mt-3 text-xs text-ink-muted">
              ¿Prefiere hablar primero? Llame al 612-424-1785.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
