import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { TranslationBanner } from "@/components/TranslationBanner";

export const metadata: Metadata = {
  title: "Si detuvieron a un ser querido",
  description:
    "Qué hacer — paso a paso — si ICE detuvo a alguien que ama. Localizador, referidos a abogados, dinero en la cuenta.",
  alternates: { languages: { en: "/find-loved-one", es: "/es/find-loved-one", so: "/so/find-loved-one" } }
};

export default function FindLovedOnePageES() {
  return (
    <>
      <TranslationBanner lang="es" englishHref="/find-loved-one" />
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Si detuvieron a un ser querido"
          title="Las primeras horas importan. Esto es lo que hay que hacer."
          lede="Mantenga la calma — hay pasos claros, y no tiene que darlos sola. Si prefiere hablar con una persona ahora mismo, llámenos al 612-424-1785."
        />
      </section>

      <section className="container-wide pb-8">
        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Step n={1} title="Encuéntrelo en custodia">
            <p>
              ICE mantiene un localizador público de detenidos. Necesitará un{" "}
              <strong>número A</strong> (el número de nueve dígitos que aparece
              en los documentos de inmigración) <em>o</em> nombre y apellido +
              país de nacimiento y fecha de nacimiento.
            </p>
            <p className="mt-3">
              <a
                href="https://locator.ice.gov/odls/"
                target="_blank"
                rel="noreferrer"
                className="btn-primary text-sm"
              >
                Abrir el localizador de ICE <Arrow />
              </a>
            </p>
            <p className="mt-3 text-xs text-ink-muted">
              El localizador solo muestra adultos (18+) actualmente bajo
              custodia de ICE. Los registros pueden tardar de 6 a 8 horas en
              aparecer después del ingreso.
            </p>
          </Step>

          <Step n={2} title="Anote lo que sabe">
            <p>
              Antes de llamar a alguien, reúna: nombre legal completo, fecha
              de nacimiento, país de ciudadanía, número A si lo sabe, dónde lo
              detuvieron y a qué hora. Un registro escrito y claro ayuda a
              cada abogado que venga después.
            </p>
          </Step>

          <Step n={3} title="Busque un abogado">
            <p>
              Llame a una de estas organizaciones de servicios legales de
              inmigración <em>antes</em> de firmar cualquier cosa que ICE
              ponga frente a su ser querido. Muchas hacen una primera consulta
              sin costo.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
              <li>
                <strong>Immigrant Law Center of MN:</strong> 651-641-1011
              </li>
              <li>
                <strong>The Advocates for Human Rights:</strong> 612-341-3302
              </li>
              <li>
                <strong>Mid-Minnesota Legal Aid:</strong> 612-334-5970
              </li>
            </ul>
          </Step>

          <Step n={4} title="Dinero y comisaría">
            <p>
              La mayoría de los centros de detención permiten depositar dinero
              en la cuenta del detenido para llamadas telefónicas y comisaría.
              Pregunte al centro (sabrá su nombre del paso 1) cuál es su
              sistema de depósito — la mayoría usa{" "}
              <a
                href="https://www.accesscorrections.com"
                target="_blank"
                rel="noreferrer"
                className="btn-link"
              >
                Access Corrections
              </a>{" "}
              o{" "}
              <a
                href="https://www.jpay.com"
                target="_blank"
                rel="noreferrer"
                className="btn-link"
              >
                JPay
              </a>
              .
            </p>
          </Step>

          <Step n={5} title="Visitas y llamadas">
            <p>
              Cada centro tiene sus propias reglas para visitas y llamadas —
              programe por teléfono, lleve identificación con foto, no traiga
              nada más que usted misma. Las llamadas son grabadas; no hable
              de la estrategia del caso por teléfono.
            </p>
          </Step>

          <Step n={6} title="Cuéntenos lo que está pasando">
            <p>
              Podemos conectarla con un voluntario de apoyo en la corte,
              ayudar con transporte al centro de detención, o organizar
              presencia comunitaria en una audiencia. No estará sola en esto.
            </p>
            <p className="mt-3">
              <Link href="/contact?topic=detained" className="btn-ghost text-sm">
                Envíenos un mensaje <Arrow />
              </Link>
            </p>
          </Step>
        </ol>
      </section>

      <section className="container-wide pb-24">
        <div className="card grid items-center gap-6 p-8 md:grid-cols-12 ring-2 ring-ember-300">
          <div className="md:col-span-8">
            <p className="eyebrow text-ember-700">Si está pasando ahora mismo</p>
            <h3 className="font-serif text-2xl md:text-3xl">
              Llame a nuestra línea directa.
            </h3>
            <p className="mt-3 text-ink-soft">
              Voluntarios capacitados pueden guiarla por los próximos 60
              minutos — y enviar observadores si hay una acción de aplicación
              activa.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <a className="btn-primary" href="tel:+16124241785">
              612-424-1785
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function Step({
  n,
  title,
  children
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="card flex flex-col gap-3 p-6">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-indigo-700 font-serif text-bone-50">
          {n}
        </span>
        <h3 className="font-serif text-xl leading-snug">{title}</h3>
      </div>
      <div className="text-sm leading-relaxed text-ink-soft">{children}</div>
    </li>
  );
}
