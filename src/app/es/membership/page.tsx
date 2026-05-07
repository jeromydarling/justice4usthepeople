import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { stripeLinks } from "@/lib/site";
import { Arrow } from "@/components/ProgramCard";
import { TranslationBanner } from "@/components/TranslationBanner";

export const metadata: Metadata = {
  title: "Membresía",
  description: "Hágase miembro sostenedor — la columna vertebral predecible de este trabajo.",
  alternates: { languages: { en: "/membership", es: "/es/membership", so: "/so/membership" } }
};

export default function MembershipPageES() {
  return (
    <>
      <TranslationBanner lang="es" englishHref="/membership" />
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Membresía"
          title="Sea la parte estable de la respuesta."
          lede="Una pequeña donación recurrente — $5, $10, $25 al mes — es el regalo más útil que recibimos. Es dinero predecible que nos permite decir sí cuando una emergencia llega un martes."
        />
      </section>

      <section className="container-wide pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          <Tier
            tier="Vecino"
            price="Dé lo que pueda"
            href="#tell-us"
            blurb="Algunos meses son más apretados que otros. Aparezca como pueda — $5, $50, o solo su tiempo. La membresía empieza con un saludo."
            tone="neutral"
            ctaLabel="Únase abajo"
          />
          <Tier
            tier="Sostenedor"
            price="$10 / mes"
            href={stripeLinks.membership.monthly}
            envVar="NEXT_PUBLIC_STRIPE_MEMBERSHIP_MONTHLY"
            blurb="El nivel por defecto — una pequeña donación recurrente que suma muchos comestibles, tasas de corte, y alquiler. Cancele cuando quiera."
            tone="primary"
            ctaLabel="Elegir este nivel"
          />
          <Tier
            tier="Ancla"
            price="$250 / año"
            href={stripeLinks.membership.annual}
            envVar="NEXT_PUBLIC_STRIPE_MEMBERSHIP_ANNUAL"
            blurb="Un regalo anual que financia el alquiler de emergencia y los servicios atrasados de una familia — todo de una vez. Le enviaremos un informe de fin de año."
            tone="ember"
            ctaLabel="Elegir este nivel"
          />
        </div>
      </section>

      <section id="tell-us" className="container-wide pb-24">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow">Formulario de membresía</p>
            <h2 className="mt-3">Cuéntenos un poco sobre usted.</h2>
            <p className="mt-4 text-ink-soft">
              Le agregaremos al boletín mensual y le enviaremos el paquete
              de bienvenida. Si eligió un nivel recurrente, el pago seguro
              abre en una pestaña nueva después de enviar.
            </p>
            <p className="mt-6 text-sm text-ink-muted">
              ¿Prefiere una donación única?{" "}
              <Link href="/es/donate" hrefLang="es" className="btn-link inline-flex">
                Visite nuestra página de donaciones <Arrow />
              </Link>
            </p>
          </div>
          <div className="md:col-span-7">
            <div className="card p-6 md:p-8">
              <p className="eyebrow">Formulario completo</p>
              <h3 className="mt-2 font-serif text-xl">¿Listo para inscribirse?</h3>
              <p className="mt-3 text-sm text-ink-soft">
                El formulario de membresía está en inglés por ahora — pide
                nombre, email, nivel, y notas opcionales.
              </p>
              <Link href="/membership#tell-us" hrefLang="en" className="btn-primary mt-5">
                Abrir formulario <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Tier({
  tier,
  price,
  href,
  envVar,
  blurb,
  tone,
  ctaLabel
}: {
  tier: string;
  price: string;
  href: string;
  envVar?: string;
  blurb: string;
  tone: "neutral" | "primary" | "ember";
  ctaLabel: string;
}) {
  const wired = href && !href.includes("xxx") && (href.startsWith("http") || href.startsWith("#"));
  const cls = tone === "primary" ? "ring-2 ring-indigo-700" : tone === "ember" ? "ring-2 ring-ember-400" : "ring-1 ring-ink/10";
  return (
    <article className={`card flex h-full flex-col gap-4 p-6 ${cls}`}>
      <p className="eyebrow">{tier}</p>
      <p className="font-serif text-3xl text-indigo-800">{price}</p>
      <p className="flex-1 text-ink-soft">{blurb}</p>
      {wired ? (
        <a href={href} target={href.startsWith("#") ? undefined : "_blank"} rel="noreferrer" className="btn-primary self-start">
          {ctaLabel} <Arrow />
        </a>
      ) : (
        <span className="text-xs text-ember-700">
          Configuración: pegue su Stripe Payment Link en <code>{envVar}</code>.
        </span>
      )}
    </article>
  );
}
