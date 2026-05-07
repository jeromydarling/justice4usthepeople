import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { TranslationBanner } from "@/components/TranslationBanner";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contáctenos",
  description: "Llame, envíenos un mensaje, o use uno de nuestros formularios.",
  alternates: { languages: { en: "/contact", es: "/es/contact", so: "/so/contact" } }
};

export default function ContactPageES() {
  return (
    <>
      <TranslationBanner lang="es" englishHref="/contact" />
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Contáctenos"
          title="Una persona real le responderá."
          lede="Si necesita ayuda urgente, llame. Para todo lo demás, escriba — leemos cada mensaje y respondemos en menos de 48 horas."
        />
      </section>

      <section className="container-wide pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="card p-6">
            <p className="eyebrow">Llámenos</p>
            <h3 className="mt-2 font-serif text-xl">Línea directa</h3>
            <p className="mt-2 text-sm text-ink-soft">
              Voluntarios bilingües atienden 24 horas. Si la situación no
              puede esperar, marque ahora.
            </p>
            <a className="btn-primary mt-4 inline-flex" href={site.contact.phoneHref}>
              {site.contact.phone}
            </a>
          </div>

          <div className="card p-6">
            <p className="eyebrow">Escríbanos</p>
            <h3 className="mt-2 font-serif text-xl">Correo electrónico</h3>
            <p className="mt-2 text-sm text-ink-soft">
              Para asuntos no urgentes: prensa, alianzas, dudas sobre el
              sitio, ofrecimientos de tiempo o talento.
            </p>
            <a
              className="btn-link mt-4 inline-flex"
              href={`mailto:${site.contact.email}`}
            >
              {site.contact.email} <Arrow />
            </a>
          </div>

          <div className="card p-6">
            <p className="eyebrow">Formulario</p>
            <h3 className="mt-2 font-serif text-xl">Formulario web</h3>
            <p className="mt-2 text-sm text-ink-soft">
              El formulario completo está en inglés por ahora — un formulario
              traducido viene pronto. Mientras tanto, llame o escriba.
            </p>
            <Link href="/contact" hrefLang="en" className="btn-link mt-4 inline-flex">
              Abrir formulario <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
