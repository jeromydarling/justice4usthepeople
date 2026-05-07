import type { Metadata } from "next";
import { stripeLinks, site } from "@/lib/site";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { TranslationBanner } from "@/components/TranslationBanner";

export const metadata: Metadata = {
  title: "Donar",
  description: "Done de manera segura — cada dólar se convierte en alquiler pagado, comestibles entregados, o tasas de corte cubiertas.",
  alternates: { languages: { en: "/donate", es: "/es/donate", so: "/so/donate" } }
};

const presets: { amount: string; label: string; impact: string; key: keyof typeof stripeLinks.donate }[] = [
  { amount: "25",  label: "$25",  impact: "Una semana de comestibles para una familia de tres.", key: "25" },
  { amount: "50",  label: "$50",  impact: "Una consulta con un abogado de inmigración.", key: "50" },
  { amount: "100", label: "$100", impact: "Medio mes de servicios para un hogar en crisis.", key: "100" },
  { amount: "250", label: "$250", impact: "Un mes de alquiler atrasado que detiene un desalojo.", key: "250" }
];

export default function DonatePageES() {
  return (
    <>
      <TranslationBanner lang="es" englishHref="/donate" />
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Donar"
          title="Financiado por vecinos. Gastado en vecinos."
          lede="Cada contribución se convierte en algo que una familia de nuestra red puede usar esta semana — alquiler pagado, comestibles entregados, una tasa de corte cubierta. Bajo en gastos generales, largo en seguimiento."
        />
      </section>

      <section className="container-wide pb-16">
        <div className="grid gap-6 md:grid-cols-4">
          {presets.map((p) => {
            const link = stripeLinks.donate[p.key];
            const wired = link && !link.includes("xxx");
            return (
              <article key={p.amount} className="card flex h-full flex-col gap-4 p-6 text-center">
                <p className="font-serif text-4xl text-indigo-800">{p.label}</p>
                <p className="text-sm text-ink-soft">{p.impact}</p>
                {wired ? (
                  <a className="btn-primary mt-auto self-stretch" href={link} target="_blank" rel="noreferrer">
                    Donar {p.label}
                  </a>
                ) : (
                  <span className="mt-auto text-xs text-ember-700">
                    Configuración: <code>NEXT_PUBLIC_STRIPE_DONATE_{p.amount}</code>
                  </span>
                )}
              </article>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <CustomCard />
          <GoFundMeCard />
        </div>
      </section>

      <section className="container-wide pb-24">
        <div className="card grid gap-6 p-8 md:grid-cols-12 md:p-10">
          <div className="md:col-span-7">
            <p className="eyebrow">A dónde va su dólar</p>
            <h3 className="mt-2 font-serif text-2xl md:text-3xl">
              La mayor parte de lo que da llega a un hogar dentro de siete días.
            </h3>
          </div>
          <ul className="md:col-span-5 space-y-3">
            <Bar label="Alivio de alquiler y servicios" pct={42} />
            <Bar label="Alivio de comida" pct={28} />
            <Bar label="Navegación legal" pct={22} />
            <Bar label="Operaciones y suministros" pct={8} />
          </ul>
        </div>
        <p className="mt-3 text-xs text-ink-muted">
          Asignación de muestra. Reemplace con sus números reales.
        </p>
      </section>
    </>
  );
}

function CustomCard() {
  const link = stripeLinks.donate.custom;
  const wired = link && !link.includes("xxx");
  return (
    <article className="card flex flex-col gap-4 p-8">
      <p className="eyebrow">Elija su monto</p>
      <h3 className="font-serif text-2xl">Done una vez en cualquier monto.</h3>
      <p className="text-ink-soft">
        Pago seguro vía Stripe. Verá el campo del monto en la siguiente página.
      </p>
      {wired ? (
        <a href={link} target="_blank" rel="noreferrer" className="btn-primary self-start">
          Abrir pago seguro <Arrow />
        </a>
      ) : (
        <p className="text-sm text-ember-700">
          Configuración: pegue su Stripe Payment Link en <code>NEXT_PUBLIC_STRIPE_DONATE_CUSTOM</code>.
        </p>
      )}
    </article>
  );
}

function GoFundMeCard() {
  return (
    <article className="card flex flex-col gap-4 p-8">
      <p className="eyebrow">O use nuestra campaña existente</p>
      <h3 className="font-serif text-2xl">¿Prefiere GoFundMe?</h3>
      <p className="text-ink-soft">
        Todavía aceptamos donaciones a través de nuestra página de GoFundMe.
        Mismo destino, mismo impacto.
      </p>
      <a href={site.gofundmeUrl} target="_blank" rel="noreferrer" className="btn-ghost self-start">
        Abrir GoFundMe <Arrow />
      </a>
      <p className="text-xs text-ink-muted">
        Nota: GoFundMe no permite incrustación, así que la campaña abre en una pestaña nueva.
      </p>
    </article>
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
