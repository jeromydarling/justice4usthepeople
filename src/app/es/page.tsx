import type { Metadata } from "next";
import Link from "next/link";
import { BrandMark } from "@/components/Logo";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { MapPreview } from "@/components/MapPreview";
import { PromoVideoButton } from "@/components/PromoVideo";
import { site } from "@/lib/site";
import { sortEvents, formatDate, formatTime, icsHref } from "@/lib/events";

export const metadata: Metadata = {
  title: "Justice 4 Us The People · Solidaridad con Minnesota",
  description:
    "Liderazgo inmigrante. Comunidad enraizada. Vecinos para los demás. Recursos, eventos y orientación legal en las Twin Cities.",
  alternates: {
    languages: { en: "/", es: "/es", so: "/so" }
  }
};

// Programa data, traducida al español. Mantiene el mismo orden y slugs que
// la versión en inglés en src/lib/programs.tsx para coherencia.
const programasES = [
  {
    slug: "rental-utility",
    shortName: "Alivio de alquiler y servicios",
    name: "Manteniendo a las familias en casa",
    description:
      "Apoyo directo para familias enfrentando desalojo o cortes de servicios después de una pérdida repentina de ingresos o un cambio de estatus.",
    dignity:
      "Un hogar no es un lujo. Es el suelo sobre el que se sostiene una familia mientras resuelve todo lo demás."
  },
  {
    slug: "food",
    shortName: "Alivio inmediato de comida",
    name: "Comida en la mesa",
    description:
      "Comestibles entregados y comidas calientes compartidas con vecinos que están al límite entre cheques, horarios y trámites.",
    dignity:
      "Nadie en nuestra comunidad debería elegir entre comer y pagar el alquiler. El pan es el principio de la justicia."
  },
  {
    slug: "legal",
    shortName: "Navegación legal",
    name: "Recursos legales",
    description:
      "Conexión con abogados de inmigración, navegación en la corte, y acompañamiento en audiencias. Nadie debería entrar a una corte sin alguien al lado.",
    dignity:
      "La ley es para todos, no solo para los que pueden pagarla."
  }
];

export default function HomeES() {
  const { upcoming } = sortEvents();
  const nextEvent = upcoming[0];
  return (
    <>
      {/* Hero ----------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-bone-50 via-bone-100 to-bone-50">
        <Backdrop />
        <div className="container-wide relative grid items-center gap-12 py-20 md:grid-cols-12 md:py-28 lg:py-32">
          <div className="md:col-span-7">
            <p className="eyebrow">Movimiento liderado por vecinos · {site.city}</p>
            <h1 className="mt-4">
              En solidaridad
              <br />
              <span className="text-indigo-700">con Minnesota.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              Creemos que cada persona lleva una dignidad inquebrantable. La
              justicia es lo que parece el amor en público — y somos vecinos
              antes que nada. Organizamos por vivienda, alimentos y
              protección legal — el tejido cotidiano de una comunidad que se
              niega a dejar caer a ninguno de los suyos.
            </p>
            <div className="mt-6">
              <PromoVideoButton label="Ver nuestro promo de 60 segundos" />
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link href="/es/take-action" className="btn-primary" hrefLang="es">
                Pase a la acción <Arrow />
              </Link>
              <Link href="/es/get-help" className="btn-ghost" hrefLang="es">
                ¿Necesita ayuda? Empiece aquí
              </Link>
              <Link href="/es/donate" className="btn-link" hrefLang="es">
                O dé una sola vez
              </Link>
            </div>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-ink/10 pt-6 text-sm">
              <Stat n="3" l="Programas activos" />
              <Stat n="100%" l="Liderado por inmigrantes" />
              <Stat n="MN" l="Twin Cities y más allá" />
            </dl>
          </div>
          <div className="md:col-span-5">
            <HeroEmblem />
          </div>
        </div>
      </section>

      {/* Programas ------------------------------------------------------ */}
      <section className="container-wide py-20 md:py-28">
        <SectionHeader
          eyebrow="Nuestros programas"
          title="Tres puertas. Una respuesta: no está sola."
          lede="Las tres líneas de alivio que mantenemos están diseñadas para los momentos en que la vida cotidiana se rompe — cuando llega un aviso de desalojo, cuando el refrigerador está vacío, cuando una fecha en corte llega sin abogado."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {programasES.map((p) => (
            <ProgramCardES key={p.slug} p={p} />
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-sm text-ink-muted">
          Cada solicitud es leída por una persona real de nuestro equipo. Si
          necesita ayuda urgente, llámenos al{" "}
          <a className="btn-link" href={site.contact.phoneHref}>
            {site.contact.phone}
          </a>
          .
        </p>
      </section>

      {/* Próximo evento ------------------------------------------------- */}
      {nextEvent && (
        <section className="border-y border-ink/10 bg-ember-50">
          <div className="container-wide grid items-center gap-8 py-10 md:grid-cols-12 md:py-12">
            <div className="md:col-span-2">
              <p className="font-serif text-5xl leading-none text-indigo-900">
                {new Date(nextEvent.start).toLocaleDateString("es-US", {
                  day: "numeric",
                  timeZone: "America/Chicago"
                })}
              </p>
              <p className="mt-1 font-serif text-lg text-ember-700">
                {new Date(nextEvent.start).toLocaleDateString("es-US", {
                  month: "short",
                  timeZone: "America/Chicago"
                })}
              </p>
            </div>
            <div className="md:col-span-7">
              <p className="eyebrow">Lo próximo en las calles</p>
              <h3 className="mt-1 font-serif text-2xl">{nextEvent.title}</h3>
              <p className="mt-1 text-sm text-ink-soft">
                {formatDate(nextEvent)} · {formatTime(nextEvent)} ·{" "}
                {nextEvent.location.name}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:col-span-3 md:justify-end">
              <Link href="/es/events" className="btn-ghost" hrefLang="es">Todos los eventos</Link>
              <a href={icsHref(nextEvent)} download={`${nextEvent.slug}.ics`} className="btn-primary">
                Agregar al calendario <Arrow />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Mapa de recursos ----------------------------------------------- */}
      <section className="bg-indigo-900 py-20 text-bone-50 md:py-28">
        <div className="container-wide grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow text-ember-200">Dónde buscar ayuda</p>
            <h2 className="mt-3 text-bone-50">
              Un mapa vivo de recursos en las Twin Cities.
            </h2>
            <p className="mt-4 text-bone-100/85">
              Clínicas de ayuda legal, congregaciones de santuario, despensas
              de comida, salud mental, capacitaciones de Conozca Sus Derechos,
              ropa gratis — mantenido y actualizado por vecinos que los usan.
            </p>
            <Link
              href="/es/get-help"
              className="btn-ember mt-8 text-ink"
              hrefLang="es"
            >
              Abrir el mapa <Arrow />
            </Link>
          </div>
          <div className="md:col-span-7">
            <div className="aspect-[5/4] overflow-hidden rounded-2xl bg-indigo-800 ring-1 ring-bone-50/10">
              <MapPreview fallback={<MapFallbackES />} />
            </div>
          </div>
        </div>
      </section>

      {/* Noticias ------------------------------------------------------- */}
      <section className="container-wide py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader
            eyebrow="Mirando juntos"
            title="Actualizaciones de ICE y noticias locales"
            lede="Un feed en vivo desde los outlets y cuentas comunitarias en quienes confiamos — para que la verdad no dependa de en qué línea de tiempo aparezca."
          />
          <Link href="/es/news" className="btn-link" hrefLang="es">
            Todas las actualizaciones <Arrow />
          </Link>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <NewsCardPlaceholder source="MPR News" tag="Local" />
          <NewsCardPlaceholder source="Sahan Journal" tag="Inmigración" />
          <NewsCardPlaceholder source="ICE Watch MN" tag="Respuesta rápida" />
        </div>
      </section>

      {/* Valores -------------------------------------------------------- */}
      <section className="border-y border-ink/10 bg-bone-100 py-20 md:py-28">
        <div className="container-wide grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow">Lo que sostenemos</p>
            <h2 className="mt-3">Los principios bajo el trabajo.</h2>
            <p className="mt-4 text-ink-soft">
              No somos religiosos sobre mucho, excepto sobre esto: cada persona
              lleva una dignidad inquebrantable, y una comunidad se juzga por
              cómo trata a quienes tienen menos margen.
            </p>
            <Link href="/es/values" className="btn-link mt-6 inline-flex" hrefLang="es">
              Lea nuestros valores <Arrow />
            </Link>
          </div>
          <div className="grid gap-6 md:col-span-8 md:grid-cols-2">
            <Value title="Dignidad">
              Cada persona — ciudadana, inmigrante, vecina, extraña — lleva un
              valor que ninguna política puede otorgar ni revocar.
            </Value>
            <Value title="Solidaridad">
              Nos pertenecemos los unos a los otros. La seguridad de nadie se
              construye dejando a otra persona expuesta.
            </Value>
            <Value title="Subsidiariedad">
              Las decisiones pertenecen lo más cerca posible de las personas a
              quienes afectan. Lo local primero. Siempre.
            </Value>
            <Value title="El bien común">
              Una comunidad que funciona para los más frágiles entre nosotros
              es una comunidad que funciona en absoluto.
            </Value>
          </div>
        </div>
      </section>

      {/* Donaciones ----------------------------------------------------- */}
      <section className="container-wide py-20 md:py-28">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow">Cómo se mueve un dólar</p>
            <h2 className="mt-3">Financiado por vecinos. Gastado en vecinos.</h2>
            <p className="mt-4 text-ink-soft">
              Cada contribución se convierte en alquiler pagado, comestibles
              entregados, o una consulta legal — usualmente en la misma semana.
              Bajo en gastos generales, largo en seguimiento.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/es/donate" className="btn-primary" hrefLang="es">
                Donar de manera segura <Arrow />
              </Link>
              <Link href="/es/membership" className="btn-ghost" hrefLang="es">
                Hacerse miembro
              </Link>
            </div>
            <p className="mt-3 text-xs text-ink-muted">
              ¿Prefiere GoFundMe?{" "}
              <a
                href={site.gofundmeUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-link"
              >
                Use nuestra campaña existente
              </a>
              .
            </p>
          </div>
          <div className="card p-6 md:p-8">
            <p className="eyebrow">A dónde fueron los dólares el último trimestre</p>
            <ul className="mt-4 space-y-3">
              <Bar label="Alivio de alquiler y servicios" pct={42} />
              <Bar label="Alivio de comida" pct={28} />
              <Bar label="Navegación legal" pct={22} />
              <Bar label="Operaciones y suministros" pct={8} />
            </ul>
            <p className="mt-4 text-xs text-ink-muted">
              Asignación de muestra. Reemplace con sus números reales en{" "}
              <code className="mx-1">src/app/es/page.tsx</code>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------------------------

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <dt className="font-serif text-3xl text-indigo-800">{n}</dt>
      <dd className="text-xs uppercase tracking-wider text-ink-muted">{l}</dd>
    </div>
  );
}

function Value({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xl">{title}</h3>
      <p className="mt-2 text-ink-soft">{children}</p>
    </div>
  );
}

function Bar({ label, pct }: { label: string; pct: number }) {
  return (
    <li>
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span className="text-ink-muted">{pct}%</span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-ink/5">
        <div className="h-full rounded-full bg-indigo-700" style={{ width: `${pct}%` }} />
      </div>
    </li>
  );
}

function NewsCardPlaceholder({ source, tag }: { source: string; tag: string }) {
  return (
    <article className="card flex flex-col gap-3 p-5">
      <div className="flex items-center gap-2 text-xs">
        <span className="rounded-full bg-indigo-700/10 px-2 py-0.5 font-medium text-indigo-700">
          {tag}
        </span>
        <span className="text-ink-muted">{source}</span>
      </div>
      <h4 className="font-serif text-lg leading-snug">
        Los titulares en vivo cargan en la página de Noticias.
      </h4>
      <p className="text-sm text-ink-muted">
        Configure los feeds en <code>src/lib/news.ts</code>.
      </p>
    </article>
  );
}

function ProgramCardES({ p }: { p: typeof programasES[number] }) {
  return (
    <Link
      href={`/get-help/${p.slug}`}
      hrefLang="en"
      className="card group flex flex-col gap-3 p-6 no-underline transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <p className="eyebrow">{p.shortName}</p>
      <h3 className="text-2xl">{p.name}</h3>
      <p className="text-ink-soft">{p.description}</p>
      <p className="mt-2 border-l-2 border-ember-300 pl-3 text-sm italic text-ink-soft">
        {p.dignity}
      </p>
      <span className="btn-link mt-2 inline-flex pt-2">
        Aplicar <Arrow />
      </span>
    </Link>
  );
}

function MapFallbackES() {
  return (
    <div className="flex h-full w-full items-center justify-center p-8 text-center text-bone-100/85">
      <p>Mapa interactivo. Necesita configurar el token de Mapbox.</p>
    </div>
  );
}

function Backdrop() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08]" aria-hidden>
      <defs>
        <pattern id="dots-es" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1.2" cy="1.2" r="1.2" fill="#22304d" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots-es)" />
    </svg>
  );
}

function HeroEmblem() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <div className="absolute inset-[10%] rounded-full bg-gradient-to-b from-bone-50 to-ember-100/40 blur-2xl" />
      <div className="absolute inset-[8%] grid place-items-center">
        <BrandMark className="h-full w-full" />
      </div>
      <RadialText text="JUSTICE · 4 · US · THE · PEOPLE · STAND · IN · SOLIDARITY · WITH · MINNESOTA · " />
    </div>
  );
}

function RadialText({ text }: { text: string }) {
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden>
      <defs>
        <path id="circlePathES" d="M200,200 m-186,0 a186,186 0 1,1 372,0 a186,186 0 1,1 -372,0" />
      </defs>
      <text fill="#22304d" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" letterSpacing="6">
        <textPath href="#circlePathES" startOffset="0">{text}</textPath>
      </text>
    </svg>
  );
}
