import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { Arrow } from "@/components/ProgramCard";
import { TranslationBanner } from "@/components/TranslationBanner";

export const metadata: Metadata = {
  title: "Contáctenos",
  description: "Llame, envíenos un mensaje, o use uno de nuestros formularios. Una persona real le responderá.",
  alternates: { languages: { en: "/contact", es: "/es/contact", so: "/so/contact" } }
};

export default function ContactPageES() {
  return (
    <>
      <TranslationBanner lang="es" englishHref="/contact" />
      <section className="container-page py-16 md:py-20">
        <p className="eyebrow">Contáctenos</p>
        <h1 className="mt-2">Respondemos cada mensaje.</h1>
        <p className="mt-5 max-w-2xl text-lg text-ink-soft">
          La forma más rápida de comunicarse con nosotros es por teléfono —
          pero si el correo o este formulario funciona mejor, también lo
          recibiremos. Personas reales leen cada mensaje.
        </p>
      </section>

      <section className="container-wide pb-24">
        <div className="grid gap-10 md:grid-cols-12">
          <aside className="md:col-span-5">
            <div className="card p-6 md:p-8">
              <h3 className="text-2xl">Líneas directas</h3>
              <ul className="mt-4 space-y-3 text-base">
                <li>
                  <span className="block text-xs uppercase tracking-wider text-ink-muted">Teléfono</span>
                  <a className="btn-link text-lg" href={site.contact.phoneHref}>
                    {site.contact.phone}
                  </a>
                </li>
                <li>
                  <span className="block text-xs uppercase tracking-wider text-ink-muted">Correo electrónico</span>
                  <a className="btn-link" href={`mailto:${site.contact.email}`}>
                    {site.contact.email}
                  </a>
                </li>
                <li>
                  <span className="block text-xs uppercase tracking-wider text-ink-muted">Dónde</span>
                  {site.contact.address}
                </li>
              </ul>
              <hr className="my-6 border-ink/10" />
              <p className="text-sm text-ink-muted">
                ¿Prensa, alianzas, o quiere que hablemos en algún lugar?
                Añada el tema a su mensaje — lo enrutaremos.
              </p>
            </div>
          </aside>

          <div className="md:col-span-7">
            <div className="card p-6 md:p-8">
              <p className="eyebrow">Formulario web</p>
              <h3 className="mt-2 font-serif text-2xl">Envíenos un mensaje.</h3>
              <p className="mt-3 text-sm text-ink-soft">
                El formulario web completo (con campos para nombre, email,
                tema, y mensaje) está en inglés por ahora. Es corto y le
                responderemos en menos de 48 horas.
              </p>
              <p className="mt-3 text-sm text-ink-soft">
                ¿Prefiere escribir en español? Mande un correo a{" "}
                <a className="btn-link" href={`mailto:${site.contact.email}`}>
                  {site.contact.email}
                </a>
                {" "}directamente — leeremos y responderemos.
              </p>
              <Link href="/contact" hrefLang="en" className="btn-primary mt-5">
                Abrir el formulario en inglés <Arrow />
              </Link>
            </div>

            <div className="card mt-6 p-6 md:p-8 ring-2 ring-ember-300">
              <p className="eyebrow text-ember-700">¿Es urgente?</p>
              <h3 className="mt-2 font-serif text-2xl">Llame ahora.</h3>
              <p className="mt-3 text-sm text-ink-soft">
                Si la situación no puede esperar, llame a nuestra línea
                directa de 24 horas. Voluntarios bilingües le atienden.
              </p>
              <a className="btn-primary mt-5" href={site.contact.phoneHref}>
                {site.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
