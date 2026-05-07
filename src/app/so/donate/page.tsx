import type { Metadata } from "next";
import { stripeLinks, site } from "@/lib/site";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { TranslationBanner } from "@/components/TranslationBanner";

export const metadata: Metadata = {
  title: "Deeq",
  description: "Si ammaan ah u deeq — doolar kasta wuxuu noqdaa kiro la bixiyay, raashin la geeyay, ama kharash maxkamadeed la bixiyay.",
  alternates: { languages: { en: "/donate", es: "/es/donate", so: "/so/donate" } }
};

const presets: { amount: string; label: string; impact: string; key: keyof typeof stripeLinks.donate }[] = [
  { amount: "25",  label: "$25",  impact: "Toddobaad oo cunto qoyska saddex qof.", key: "25" },
  { amount: "50",  label: "$50",  impact: "Tashiwaraysi qareen socdaalka.", key: "50" },
  { amount: "100", label: "$100", impact: "Bil bar oo adeegyo guri xaalad qaboojin ah.", key: "100" },
  { amount: "250", label: "$250", impact: "Bil oo kiro ah oo joojiyaa kala saarid.", key: "250" }
];

export default function DonatePageSO() {
  return (
    <>
      <TranslationBanner lang="so" englishHref="/donate" />
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Deeq"
          title="Maalin kasta deganayaal ayaa maalgeliya. Maalin kasta deganayaal ayaa loo isticmaalaa."
          lede="Tabarruc kasta wuxuu noqdaa wax qoys ka mid ah shabakadayada uu isticmaali karo toddobaadkaan — kiro la bixiyay, raashin la geeyay, kharash maxkamadeed la dabooley."
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
                    Bixi {p.label}
                  </a>
                ) : (
                  <span className="mt-auto text-xs text-ember-700">
                    Habayn: <code>NEXT_PUBLIC_STRIPE_DONATE_{p.amount}</code>
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
            <p className="eyebrow">Halka doolarkaagu u tagayo</p>
            <h3 className="mt-2 font-serif text-2xl md:text-3xl">
              Inta badan waxa aad bixiso waxaa lagu gaarsiiyaa qoys toddoba maalmood gudahood.
            </h3>
          </div>
          <ul className="md:col-span-5 space-y-3">
            <Bar label="Caawimaad kirada iyo adeegyada" pct={42} />
            <Bar label="Caawimaad cunto" pct={28} />
            <Bar label="Hagid sharci" pct={22} />
            <Bar label="Hawlaha iyo alaabta" pct={8} />
          </ul>
        </div>
      </section>
    </>
  );
}

function CustomCard() {
  const link = stripeLinks.donate.custom;
  const wired = link && !link.includes("xxx");
  return (
    <article className="card flex flex-col gap-4 p-8">
      <p className="eyebrow">Door qaddarkaaga</p>
      <h3 className="font-serif text-2xl">Bixi mar qaddar kasta.</h3>
      <p className="text-ink-soft">
        Lacag-bixin ammaan ah Stripe. Waxaad arki doontaa goobta qaddarka bogga xiga.
      </p>
      {wired ? (
        <a href={link} target="_blank" rel="noreferrer" className="btn-primary self-start">
          Fur lacag-bixin ammaan ah <Arrow />
        </a>
      ) : (
        <p className="text-sm text-ember-700">
          Habayn: ku dheji Stripe Payment Link <code>NEXT_PUBLIC_STRIPE_DONATE_CUSTOM</code>.
        </p>
      )}
    </article>
  );
}

function GoFundMeCard() {
  return (
    <article className="card flex flex-col gap-4 p-8">
      <p className="eyebrow">Ama isticmaal ololeheenna jira</p>
      <h3 className="font-serif text-2xl">Ma doortaa GoFundMe?</h3>
      <p className="text-ink-soft">
        Wali waxaan aqbalnaa hibooyinka boggayaga GoFundMe. Isla meel, isla saamayn.
      </p>
      <a href={site.gofundmeUrl} target="_blank" rel="noreferrer" className="btn-ghost self-start">
        Fur GoFundMe <Arrow />
      </a>
      <p className="text-xs text-ink-muted">
        Ogow: GoFundMe ma ogola gelinta tooska ah, sidaa darteed ololuhu wuxuu ku furmayaa tab cusub.
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
