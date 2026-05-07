import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { TranslationBanner } from "@/components/TranslationBanner";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Donar",
  description:
    "Cada contribución se convierte en alquiler pagado, comestibles entregados, o una consulta legal — usualmente en la misma semana.",
  alternates: { languages: { en: "/donate", es: "/es/donate", so: "/so/donate" } }
};

export default function DonatePageES() {
  return (
    <>
      <TranslationBanner lang="es" englishHref="/donate" />
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Donar"
          title="Financiado por vecinos. Gastado en vecinos."
          lede="Cada contribución se convierte en alquiler pagado, comestibles entregados, o una consulta legal — usualmente en la misma semana. Bajo en gastos generales, largo en seguimiento."
        />
      </section>

      <section className="container-wide pb-24">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card p-8">
            <p className="eyebrow">Donar de manera segura</p>
            <h3 className="mt-2 font-serif text-2xl">A través de Stripe</h3>
            <p className="mt-3 text-ink-soft">
              Donaciones únicas de $25, $50, $100, $250 — o monto personalizado.
              También puede convertirse en miembro mensual o anual.
            </p>
            <Link href="/donate" hrefLang="en" className="btn-primary mt-5">
              Ver opciones de donación <Arrow />
            </Link>
          </div>

          <div className="card p-8">
            <p className="eyebrow">¿Prefiere GoFundMe?</p>
            <h3 className="mt-2 font-serif text-2xl">Campaña existente</h3>
            <p className="mt-3 text-ink-soft">
              Si ya nos conoce a través de GoFundMe, esa campaña sigue
              activa y todavía recibe contribuciones.
            </p>
            <a
              href={site.gofundmeUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost mt-5"
            >
              Ir a GoFundMe <Arrow />
            </a>
          </div>
        </div>

        <div className="mt-10 rounded-lg border border-indigo-200 bg-indigo-50 p-5 text-sm text-indigo-900">
          <p>
            <strong>Cómo se mueve un dólar:</strong> ~42% a alivio de
            alquiler y servicios, ~28% a comida, ~22% a navegación legal,
            ~8% a operaciones y suministros.
          </p>
        </div>
      </section>
    </>
  );
}
