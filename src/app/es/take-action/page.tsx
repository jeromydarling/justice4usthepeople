import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { site } from "@/lib/site";
import { Arrow } from "@/components/ProgramCard";
import { TranslationBanner } from "@/components/TranslationBanner";

export const metadata: Metadata = {
  title: "Pase a la acción",
  description:
    "Sea voluntario, capacítese como observador de respuesta rápida, asista a un taller de Conozca Sus Derechos, o reciba actualizaciones del movimiento.",
  alternates: { languages: { en: "/take-action", es: "/es/take-action", so: "/so/take-action" } }
};

export default function TakeActionPageES() {
  return (
    <>
      <TranslationBanner lang="es" englishHref="/take-action" />
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Pase a la acción"
          title="Un movimiento es algo que se hace, no algo que se observa."
          lede="Cinco maneras de aparecer esta semana. Elija la que se ajuste al tiempo que tiene — quince minutos es una contribución real."
        />
      </section>

      <section className="container-wide pb-16">
        <ul className="grid gap-6 md:grid-cols-2">
          <Action
            num="01"
            title="Hágase observador de respuesta rápida"
            body="Cuando aparece ICE, los observadores capacitados protegen la dignidad y documentan lo que sucede. La próxima capacitación es el sábado — únase a la lista y le enviaremos la ubicación."
            cta={{ href: "#volunteer", label: "Ser voluntario" }}
          />
          <Action
            num="02"
            title="Sea anfitrión de una noche de Conozca Sus Derechos"
            body="¿Tiene un salón comunitario, garaje, o porche trasero? Nosotros llevamos las tarjetas, los aperitivos, y un capacitador bilingüe. Doce vecinos son quórum."
            cta={{ href: "/es/know-your-rights", label: "Conozca sus derechos", lang: "es" }}
          />
          <Action
            num="03"
            title="Maneje una ruta de entrega"
            body="Un sábado por la mañana, una mini-van, diez cajas de comestibles. Las rutas van de 9 AM a mediodía por Minneapolis y St. Paul."
            cta={{ href: "#volunteer", label: "Inscribirme para manejar" }}
          />
          <Action
            num="04"
            title="Comprométase con $20/mes"
            body="Una pequeña donación recurrente es el regalo más útil que recibimos. El dinero predecible nos permite decir sí cuando llega una emergencia."
            cta={{ href: "/es/membership", label: "Hacerse miembro", lang: "es" }}
          />
          <Action
            num="05"
            title="Ponga un letrero en su jardín"
            body="El letrero es pequeño, la señal es grande. Compre uno, póngalo, y dígale a sus vecinos por qué."
            cta={{ href: "/store", label: "Conseguir un letrero", lang: "en" }}
          />
          <Action
            num="06"
            title="Pase un dato a la línea directa"
            body="¿Vio actividad de ICE? ¿Escuchó una fecha en corte? ¿Fue testigo de algo? Llámenos — lo enviaremos al respondedor adecuado."
            cta={{ href: site.contact.phoneHref, label: `Llame al ${site.contact.phone}` }}
          />
        </ul>
      </section>

      <section id="volunteer" className="container-wide pb-24">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow">Inscripción de voluntarios</p>
            <h2 className="mt-3">Cuéntenos dónde quiere conectarse.</h2>
            <p className="mt-4 text-ink-soft">
              Emparejamos voluntarios según lo que pueden ofrecer y lo que
              es urgente en la red esta semana. Espere una respuesta humana
              real en pocos días.
            </p>
            <p className="mt-6 text-sm text-ink-muted">
              Cada rol tiene capacitación, apoyo, y un compañero. No será
              enviada a una situación difícil sola.
            </p>
          </div>
          <div className="md:col-span-7">
            <div className="card p-6 md:p-8">
              <p className="eyebrow">Formulario de voluntario</p>
              <h3 className="mt-2 font-serif text-xl">¿Listo para inscribirse?</h3>
              <p className="mt-3 text-sm text-ink-soft">
                El formulario completo de voluntarios está en inglés por
                ahora — solicita su nombre, email, idiomas, disponibilidad,
                y notas. Los campos son cortos.
              </p>
              <Link href="/take-action#volunteer" hrefLang="en" className="btn-primary mt-5">
                Abrir el formulario <Arrow />
              </Link>
              <p className="mt-3 text-xs text-ink-muted">
                ¿Prefiere hablar primero? Llame al{" "}
                <a className="btn-link" href={site.contact.phoneHref}>
                  {site.contact.phone}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Action({
  num,
  title,
  body,
  cta
}: {
  num: string;
  title: string;
  body: string;
  cta: { href: string; label: string; lang?: string };
}) {
  return (
    <li className="card flex flex-col gap-3 p-6 md:p-7">
      <div className="flex items-baseline gap-3">
        <span className="font-serif text-3xl text-ember-500/80">{num}</span>
        <h3 className="text-xl">{title}</h3>
      </div>
      <p className="text-ink-soft">{body}</p>
      <Link
        href={cta.href}
        hrefLang={cta.lang}
        className="btn-link mt-1 inline-flex"
      >
        {cta.label} <Arrow />
      </Link>
    </li>
  );
}
