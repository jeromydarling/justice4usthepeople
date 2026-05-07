import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { TranslationBanner } from "@/components/TranslationBanner";

export const metadata: Metadata = {
  title: "Nuestros valores",
  description:
    "Los principios bajo nuestro trabajo: dignidad, solidaridad, subsidiariedad, y el bien común — escritos en lenguaje vecinal sencillo.",
  alternates: { languages: { en: "/values", es: "/es/values", so: "/so/values" } }
};

const principles = [
  {
    title: "Cada persona, una vida irrepetible",
    plain: "Dignidad",
    body:
      "Empezamos por una sola convicción: cada persona lleva un valor que ningún gobierno, sueldo, o trámite puede otorgar ni revocar. Ciudadana o no. Con techo o no. El trabajo empieza por mirarnos los unos a los otros.",
    quote: "\"La medida de una comunidad es a quién considera plenamente humano.\""
  },
  {
    title: "Nos pertenecemos los unos a los otros",
    plain: "Solidaridad",
    body:
      "Lo que hiere a uno de nosotros nos hiere a todos. No aceptamos ninguna versión de seguridad comprada dejando a alguien expuesto. El vecino en problemas hoy es la razón por la que nos organizamos en primer lugar.",
    quote: "\"La libertad de nadie está terminada mientras la de alguien sea parcial.\""
  },
  {
    title: "Las decisiones, lo más cerca posible de la gente",
    plain: "Subsidiariedad",
    body:
      "La ayuda debería llegar del nivel más cercano a la necesidad — la cuadra, el edificio, el salón parroquial, la tienda — y solo después de la ciudad, el estado, el país. Resistimos el impulso de aplastar lo que los vecindarios hacen mejor por sí mismos.",
    quote: "\"El primer respondedor es la persona de al lado.\""
  },
  {
    title: "Una comunidad que funciona para los más frágiles",
    plain: "El bien común",
    body:
      "Aquí la política se juzga con una prueba simple: ¿amplía el círculo de personas que pueden florecer, o lo estrecha? El bien común no es un compromiso entre intereses — es el suelo en el que acordamos que nadie cae.",
    quote: "\"Lo que nos debemos los unos a los otros no es una sobra. Es la mesa.\""
  },
  {
    title: "Primer asiento a la mesa para los de menor margen",
    plain: "Cuidado preferencial",
    body:
      "Cuando tomamos una decisión, las personas más afectadas no son consultadas al final — son la primera voz. Especialmente las personas a quienes el resto de la ciudad ha dejado de escuchar.",
    quote: "\"La parte más baja de la escala salarial es la parte más alta de nuestra agenda.\""
  },
  {
    title: "Recibir al extraño no es opcional",
    plain: "Hospitalidad",
    body:
      "La mayoría de nosotros descendemos de alguien que llegó sin nada. La ética de la bienvenida no es una virtud extranjera — es la fundadora. La extendemos porque se nos extendió a nosotros.",
    quote: "\"Lo que una comunidad llama extraño hoy es lo que se llama a sí misma mañana.\""
  },
  {
    title: "Trabajo, justo y honrado",
    plain: "Dignidad del trabajo",
    body:
      "Un empleo debería pagar lo suficiente para vivir una vida — para descansar, para criar una familia, para pertenecer a un vecindario. Los trabajadores son los autores de su trabajo, no sus instrumentos.",
    quote: "\"La dignidad no es un beneficio del nivel salarial más alto.\""
  },
  {
    title: "Cuidado del lugar que compartimos",
    plain: "Custodia",
    body:
      "La tierra, los lagos, el clima — estos no son materia prima. Son la herencia que entregamos al próximo grupo de vecinos. Organizamos por vivienda y comida del mismo modo que organizamos por el mundo que las sostiene.",
    quote: "\"No heredamos la tierra. La sostenemos por un minuto.\""
  }
];

export default function ValuesPageES() {
  return (
    <>
      <TranslationBanner lang="es" englishHref="/values" />
      <section className="container-page py-20 md:py-28">
        <SectionHeader
          eyebrow="Lo que sostenemos"
          title="Los principios bajo el trabajo."
          lede="Un breve recorrido por la gramática moral de esta organización. Ocho ideas, cada una antigua, cada una ordinaria, cada una nuestra."
        />
      </section>

      <section className="container-page pb-20 md:pb-28">
        <ol className="grid gap-10 md:gap-14">
          {principles.map((p, i) => (
            <li key={p.plain} className="grid gap-6 md:grid-cols-12">
              <div className="md:col-span-3">
                <p className="font-serif text-5xl text-ember-500/80">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-ember-700">
                  {p.plain}
                </p>
              </div>
              <div className="md:col-span-9">
                <h3 className="font-serif text-2xl md:text-3xl">{p.title}</h3>
                <p className="mt-3 max-w-prose text-ink-soft">{p.body}</p>
                <p className="pull-quote mt-4 border-l-2 border-ember-400 pl-4 italic text-ink/80">
                  {p.quote}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-wide pb-24">
        <div className="card grid items-center gap-8 p-8 md:grid-cols-12 md:p-12">
          <div className="md:col-span-8">
            <h3 className="font-serif text-3xl">
              Estos no son lemas. Son la rúbrica con la que nos calificamos.
            </h3>
            <p className="mt-4 text-ink-soft">
              Cada programa, cada dólar, cada reunión se sostiene contra
              estos. Si nos equivocamos, díganos. El trabajo pertenece al
              vecindario, no a nosotros.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
            <Link href="/es/take-action" className="btn-primary" hrefLang="es">
              Pase a la acción <Arrow />
            </Link>
            <Link href="/es/contact" className="btn-ghost" hrefLang="es">
              Cuéntenos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
