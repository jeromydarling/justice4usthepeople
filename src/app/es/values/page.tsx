import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { TranslationBanner } from "@/components/TranslationBanner";

export const metadata: Metadata = {
  title: "Nuestros valores",
  description:
    "Dignidad, solidaridad, subsidiariedad, y el bien común. Los principios que sostienen el trabajo.",
  alternates: { languages: { en: "/values", es: "/es/values", so: "/so/values" } }
};

const values = [
  {
    title: "Dignidad",
    body:
      "Cada persona — ciudadana, inmigrante, vecina, extraña — lleva un valor que ninguna política puede otorgar ni revocar. Comenzamos por aquí, siempre."
  },
  {
    title: "Solidaridad",
    body:
      "Nos pertenecemos los unos a los otros. La seguridad de nadie se construye dejando expuesto a otra persona. Estamos juntos en esto."
  },
  {
    title: "Subsidiariedad",
    body:
      "Las decisiones pertenecen lo más cerca posible de las personas a quienes afectan. Lo local primero. Siempre."
  },
  {
    title: "El bien común",
    body:
      "Una comunidad que funciona para los más frágiles entre nosotros es una comunidad que funciona en absoluto. Esa es nuestra medida."
  }
];

export default function ValuesPageES() {
  return (
    <>
      <TranslationBanner lang="es" englishHref="/values" />
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Nuestros valores"
          title="Los principios bajo el trabajo."
          lede="No somos religiosos sobre mucho, excepto sobre esto: cada persona lleva una dignidad inquebrantable, y una comunidad se juzga por cómo trata a quienes tienen menos margen."
        />
      </section>

      <section className="container-wide pb-24">
        <ul className="grid gap-6 md:grid-cols-2">
          {values.map((v) => (
            <li key={v.title}>
              <article className="card flex h-full flex-col gap-3 p-8">
                <h3 className="font-serif text-2xl">{v.title}</h3>
                <p className="text-ink-soft">{v.body}</p>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-12 card grid items-center gap-6 p-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow">Para profundizar</p>
            <h3 className="font-serif text-2xl md:text-3xl">
              ¿Quiere leer la versión completa?
            </h3>
            <p className="mt-3 text-ink-soft">
              La página de valores en inglés tiene más detalle sobre cómo
              estos principios moldean nuestro trabajo cada día.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link href="/values" className="btn-primary" hrefLang="en">
              Leer en inglés <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
