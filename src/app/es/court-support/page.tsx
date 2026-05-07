import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { TranslationBanner } from "@/components/TranslationBanner";

export const metadata: Metadata = {
  title: "Apoyo en la corte",
  description:
    "Voluntariado para acompañar a un vecino a la corte de inmigración. Una fila de comunidad en la galería es, para muchas personas, la diferencia entre el miedo y la dignidad.",
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
          lede="Una fila de comunidad en la galería es, para muchas personas, la diferencia entre el miedo y la dignidad. Coordinamos acompañamiento en cortes en las Twin Cities — a veces con dos días de aviso — y nunca le enviaremos sola."
        />
      </section>

      <section className="container-wide pb-12">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="card p-6 md:p-8">
              <p className="eyebrow">Inscríbase</p>
              <h3 className="mt-2 font-serif text-2xl">Cuéntenos cómo puede ayudar.</h3>
              <p className="mt-3 text-sm text-ink-soft">
                El formulario completo de inscripción está en inglés por ahora.
                Pide su nombre, email, teléfono, idiomas, disponibilidad
                típica, y si puede manejar a / desde una corte. Es corto.
              </p>
              <p className="mt-3 text-sm text-ink-soft">
                Después de enviar, un coordinador se pondrá en contacto en
                un plazo de una semana — y dentro de un día si hay una
                audiencia activa en el calendario.
              </p>
              <Link href="/court-support" hrefLang="en" className="btn-primary mt-5">
                Llenar el formulario en inglés <Arrow />
              </Link>
              <p className="mt-3 text-xs text-ink-muted">
                ¿Prefiere hablar primero? Llame al 612-424-1785. Voluntarios
                bilingües pueden tomar su información por teléfono.
              </p>
            </div>
          </div>

          <aside className="md:col-span-5">
            <div className="card p-6 md:p-8">
              <p className="eyebrow">Cómo se ve</p>
              <ol className="mt-3 list-decimal space-y-3 pl-5 text-sm text-ink-soft">
                <li>
                  Le enviamos un texto 24–72 horas antes de una audiencia con
                  la fecha, la corte, y qué ponerse (vestimenta de oficina;
                  las camisetas iguales son opcionales y las proveemos).
                </li>
                <li>
                  Llega 20 minutos antes, conoce a la familia en el vestíbulo,
                  y se sientan juntos en la galería.
                </li>
                <li>
                  No habla en la corte. No es testigo. Es vecina.
                </li>
                <li>
                  Después de la audiencia, hace un resumen breve, salen
                  juntos, y la familia sabe que no está sola.
                </li>
              </ol>
              <p className="mt-5 text-sm text-ink-muted">
                Nunca compartimos su información de contacto. Puede pausar o
                retirarse en cualquier momento.
              </p>
            </div>
            <div className="card mt-6 p-6 md:p-8">
              <p className="eyebrow">Otras formas de ayudar</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link href="/es/take-action" className="btn-link" hrefLang="es">
                    Ver todos los roles de voluntariado <Arrow />
                  </Link>
                </li>
                <li>
                  <Link href="/es/find-loved-one" className="btn-link" hrefLang="es">
                    Si detuvieron a un ser querido <Arrow />
                  </Link>
                </li>
                <li>
                  <Link href="/es/donate" className="btn-link" hrefLang="es">
                    Donar al fondo legal <Arrow />
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
