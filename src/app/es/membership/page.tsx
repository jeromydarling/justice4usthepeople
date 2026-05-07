import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { TranslationBanner } from "@/components/TranslationBanner";

export const metadata: Metadata = {
  title: "Hacerse miembro",
  description: "Apoye este movimiento con una contribución mensual o anual.",
  alternates: { languages: { en: "/membership", es: "/es/membership", so: "/so/membership" } }
};

export default function MembershipPageES() {
  return (
    <>
      <TranslationBanner lang="es" englishHref="/membership" />
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Hacerse miembro"
          title="Sea parte sostenida del movimiento."
          lede="Una contribución mensual o anual nos da estabilidad para planear más allá de la próxima semana. Los miembros también reciben actualizaciones internas y son los primeros en saber sobre eventos."
        />
      </section>

      <section className="container-wide pb-24">
        <div className="card p-8">
          <p className="eyebrow">Niveles de membresía</p>
          <h3 className="mt-2 font-serif text-2xl">
            Lo que recibe cada miembro:
          </h3>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-ink-soft">
            <li>Resumen mensual interno con lo que estamos viendo y haciendo</li>
            <li>Aviso temprano sobre eventos públicos y entrenamientos</li>
            <li>Una invitación al espacio de coordinación para voluntarios activos</li>
            <li>Reconocimiento (si lo desea) en nuestro informe anual</li>
          </ul>
          <p className="mt-5 text-sm text-ink-muted">
            La página de membresía completa, con los niveles mensuales y
            anuales, está en inglés por ahora.
          </p>
          <Link href="/membership" hrefLang="en" className="btn-primary mt-5">
            Ver niveles y precios <Arrow />
          </Link>
        </div>
      </section>
    </>
  );
}
