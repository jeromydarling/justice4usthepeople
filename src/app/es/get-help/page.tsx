import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { TranslationBanner } from "@/components/TranslationBanner";

export const metadata: Metadata = {
  title: "Buscar ayuda",
  description:
    "Mapa vivo de recursos en las Twin Cities — ayuda legal, comida, vivienda, salud, y más.",
  alternates: { languages: { en: "/get-help", es: "/es/get-help", so: "/so/get-help" } }
};

export default function GetHelpPageES() {
  return (
    <>
      <TranslationBanner lang="es" englishHref="/get-help" />
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Buscar ayuda"
          title="Un mapa vivo de a dónde acudir."
          lede="Mantenido por vecinos que usan estos recursos. Toque una categoría para filtrar; toque un marcador para ver horarios, idiomas, y un teléfono directo."
        />
        <Link
          href="/find-loved-one"
          hrefLang="es"
          className="mt-6 inline-block rounded-2xl border-2 border-ember-300 bg-ember-50 px-4 py-2.5 text-sm font-medium leading-snug text-ember-700 no-underline transition hover:bg-ember-100"
        >
          Si acaban de detener a un ser querido → vea los siguientes pasos
        </Link>
      </section>

      <section className="container-wide pb-12">
        <div className="grid gap-6 md:grid-cols-3">
          <Tile
            color="#22304d"
            label="Ayuda legal"
            text="Asesoría legal de inmigración, defensa contra el desalojo, y orientación familiar."
          />
          <Tile
            color="#a8512a"
            label="Comida"
            text="Despensas, comidas calientes, y entregas. Sin papeles. Sin preguntas."
          />
          <Tile
            color="#754811"
            label="Vivienda"
            text="Alivio de alquiler, refugios de emergencia, y línea directa de derechos del inquilino."
          />
          <Tile
            color="#3a4d77"
            label="Salud"
            text="Clínicas de escala variable, salud mental, y cuidado dental — sin importar el seguro."
          />
          <Tile
            color="#dc972f"
            label="Santuario"
            text="Coalición de comunidades de fe ofreciendo acompañamiento y apoyo pastoral."
          />
          <Tile
            color="#854020"
            label="Respuesta rápida"
            text="Línea directa de 24 horas para verificar actividad de ICE y enviar observadores."
          />
        </div>

        <div className="mt-10 card grid items-center gap-6 p-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow">Mapa interactivo completo</p>
            <h3 className="font-serif text-2xl md:text-3xl">
              ~30 organizaciones de las Twin Cities, en el mapa.
            </h3>
            <p className="mt-3 text-ink-soft">
              El mapa interactivo con direcciones, teléfonos, y horarios está
              en la versión en inglés. Cada recurso tiene su propia página de
              detalles.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link href="/get-help" className="btn-primary" hrefLang="en">
              Abrir el mapa <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Tile({ color, label, text }: { color: string; label: string; text: string }) {
  return (
    <div className="card p-5">
      <span
        className="inline-block h-3 w-3 rounded-full"
        style={{ background: color }}
      />
      <p className="mt-2 font-serif text-lg">{label}</p>
      <p className="mt-1 text-sm text-ink-soft">{text}</p>
    </div>
  );
}
