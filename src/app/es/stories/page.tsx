import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { TranslationBanner } from "@/components/TranslationBanner";

export const metadata: Metadata = {
  title: "Historias",
  description:
    "Momentos reales, vecinos reales — qué pasa cuando una comunidad se mantiene unida. Nombres cambiados y detalles ocultos para proteger la privacidad.",
  alternates: { languages: { en: "/stories", es: "/es/stories", so: "/so/stories" } }
};

type Story = { id: string; title: string; lede: string; body: string; tag: string };

const stories: Story[] = [
  {
    id: "rosa-rent",
    title: "Cuando llegó la carta del alquiler",
    lede: "Una madre de dos abrió un aviso de desalojo de 14 días. Doce días después, firmó un nuevo contrato.",
    body:
      "Rosa llamó a la línea directa un martes. Para el jueves, un voluntario la había guiado por sus opciones, para el sábado se había impugnado la solicitud de desalojo, y en dos semanas nuestro fondo de alivio había pagado el saldo atrasado directamente a su arrendador. Conservó su apartamento, sus hijos siguieron en la escuela, y Rosa volvió al mes siguiente — para ser voluntaria.",
    tag: "Alivio de alquiler y servicios"
  },
  {
    id: "amir-court",
    title: "Aparecer en la corte",
    lede: "Un estudiante universitario de primera generación entró solo a la corte de inmigración. No salió solo.",
    body:
      "La audiencia de Amir se programó en Bloomington con dos días de aviso. Nuestros voluntarios de apoyo en corte lo recibieron en el vestíbulo con camisetas iguales, se sentaron en la galería, y esperaron con su familia. El juez concedió la continuación. Amir nos contó después que lo único que recuerda es voltear y ver la fila de vecinos detrás de él.",
    tag: "Acompañamiento en la corte"
  },
  {
    id: "ana-grocery",
    title: "Comestibles, y algo más",
    lede: "Lo que comenzó como una entrega de despensa se convirtió en una red vecinal.",
    body:
      "Ana vino a una distribución de sábado por primera vez en octubre. Para diciembre, estaba ayudando a organizar la ruta — traduciendo para los recién llegados, empacando cajas, viajando con las entregas. La comida era la puerta; el trabajo era reconstruir el tipo de tejido vecinal que nuestra ciudad solía dar por sentado.",
    tag: "Alivio de comida"
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
          lede="Los nombres y detalles han sido cambiados donde se nos pidió. Los vecinos son reales, las llamadas fueron reales, los desenlaces son reales."
        />
      </section>

      <section className="container-wide pb-12">
        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((s) => (
            <li key={s.id}>
              <article className="card flex h-full flex-col gap-4 p-6">
                <p className="eyebrow">{s.tag}</p>
                <h3 className="font-serif text-2xl leading-snug">{s.title}</h3>
                <p className="text-ink-soft">{s.lede}</p>
                <p className="border-l-2 border-ember-300 pl-4 text-sm text-ink-soft">{s.body}</p>
              </article>
            </li>
          ))}
        </ul>

        <p className="mt-12 max-w-2xl text-sm text-ink-muted">
          <strong className="text-ink">Una nota sobre consentimiento y privacidad.</strong>{" "}
          Cada historia publicada aquí fue compartida con permiso explícito.
          Los detalles identificadores — nombres, empleadores, direcciones,
          sedes de corte — se cambian a menos que la persona haya pedido
          mantenerlos. Nunca publicamos un nombre o una fotografía sin permiso.
        </p>
      </section>

      <section className="container-wide pb-24">
        <div className="card grid items-center gap-6 p-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow">¿Quiere compartir la suya?</p>
            <h3 className="font-serif text-2xl md:text-3xl">
              Su historia puede cambiar la mente de alguien.
            </h3>
            <p className="mt-3 text-ink-soft">
              Hablaremos primero de lo que se siente cómoda compartiendo —
              qué compartir, qué cambiar, qué mantener. Usted mantiene el control.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link href="/es/contact?topic=story" className="btn-primary" hrefLang="es">
              Hablar con nosotros <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
