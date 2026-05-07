import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { TranslationBanner } from "@/components/TranslationBanner";

export const metadata: Metadata = {
  title: "Historias",
  description:
    "Momentos reales — qué pasa cuando una comunidad se mantiene unida. Nombres y detalles cambiados para proteger la privacidad.",
  alternates: { languages: { en: "/stories", es: "/es/stories", so: "/so/stories" } }
};

const stories = [
  {
    tag: "Alivio de alquiler y servicios",
    title: "Cuando llegó la carta del alquiler",
    body:
      "Una madre de dos abrió un aviso de desalojo de 14 días. Doce días después, firmó un nuevo contrato. Llamó un martes. Para el sábado, nuestro fondo de alivio había pagado el saldo atrasado directamente a su arrendador."
  },
  {
    tag: "Acompañamiento en la corte",
    title: "Aparecer en la corte",
    body:
      "Un estudiante universitario de primera generación entró solo a la corte de inmigración. No salió solo. Nuestros voluntarios lo encontraron en el vestíbulo y se sentaron en la galería. El juez concedió la continuación."
  },
  {
    tag: "Alivio de comida",
    title: "Comida, y algo más",
    body:
      "Lo que comenzó como una entrega de despensa se convirtió en una red vecinal. Ana vino a una distribución del sábado en octubre. Para diciembre, ayudaba a organizar la ruta — traduciendo, empacando, viajando."
  }
];

export default function StoriesPageES() {
  return (
    <>
      <TranslationBanner lang="es" englishHref="/stories" />
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Historias"
          title="El trabajo, en términos humanos."
          lede="Los nombres y detalles han sido cambiados donde se nos pidió. Las personas son reales, las llamadas fueron reales, los desenlaces son reales."
        />
      </section>

      <section className="container-wide pb-12">
        <ul className="grid gap-8 md:grid-cols-3">
          {stories.map((s) => (
            <li key={s.title}>
              <article className="card flex h-full flex-col gap-3 p-6">
                <p className="eyebrow">{s.tag}</p>
                <h3 className="font-serif text-2xl leading-snug">{s.title}</h3>
                <p className="border-l-2 border-ember-300 pl-4 text-sm text-ink-soft">
                  {s.body}
                </p>
              </article>
            </li>
          ))}
        </ul>

        <p className="mt-12 max-w-2xl text-sm text-ink-muted">
          <strong className="text-ink">Sobre el consentimiento y la privacidad.</strong>{" "}
          Cada historia publicada aquí fue compartida con permiso explícito.
          Los detalles identificadores se cambian a menos que la persona pida
          que los mantengamos. Nunca publicamos un nombre o foto sin permiso.
        </p>
      </section>

      <section className="container-wide pb-24">
        <div className="card grid items-center gap-6 p-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow">Versión completa</p>
            <h3 className="font-serif text-2xl md:text-3xl">
              Más historias en inglés.
            </h3>
            <p className="mt-3 text-ink-soft">
              La página completa tiene más vignetas y un formulario para
              compartir su propia historia.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link href="/stories" className="btn-primary" hrefLang="en">
              Ver en inglés <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
