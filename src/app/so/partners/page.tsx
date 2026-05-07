import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { asset } from "@/lib/asset";
import { TranslationBanner } from "@/components/TranslationBanner";

export const metadata: Metadata = {
  title: "Iskaashiyada isbahaysiga",
  description:
    "Hay'adaha aan kala shaqayno — diin, shaqo, difaac, iyo adeegyo toos ah ee Minnesota.",
  alternates: { languages: { en: "/partners", es: "/es/partners", so: "/so/partners" } }
};

type CoalitionPartner = {
  name: string;
  short?: string;
  blurb: string;
  url?: string;
  logo?: string;
  category: "advocacy" | "faith" | "service" | "legal" | "labor";
};

const partners: CoalitionPartner[] = [
  { name: "African Education Development Society", short: "AEDS", blurb: "Horumarinta bulshada Bariga Afrika, waxbarashada, iyo barnaamijyada dhalinyarada Twin Cities.", logo: "/partners/aeds.svg", category: "service" },
  { name: "Somali Youth Link", short: "S.Y.L.", blurb: "Maamulis, hoggaan, iyo difaac la dhalinyarada Soomaaliyeed ee Minnesota.", logo: "/partners/syl.svg", category: "service" },
  { name: "Immigrant Law Center of Minnesota", short: "ILCM", blurb: "Adeegyo sharci socdaalka, kiliinikada muwaadinnimada, iyo tababar Conozca Sus Derechos gobolka oo dhan.", url: "https://www.ilcm.org", category: "legal" },
  { name: "MIRAC — MN Immigrant Rights Action Committee", short: "MIRAC", blurb: "Wuxuu iskuduwa shabakadda jawaab celinta degdega ah ee Minnesota dhaqdhaqaaqa la xaqiijiyay ee ICE iyo difaaca bulshada.", url: "https://miracmn.org", category: "advocacy" },
  { name: "ISAIAH Minnesota", blurb: "Iskaashi diineed isir-badan oo u abaabula caddaalad jinsi iyo dhaqaale.", url: "https://isaiahmn.org", category: "faith" },
  { name: "CTUL — Centro de Trabajadores Unidos en Lucha", short: "CTUL", blurb: "Urur shaqaale-hogaamiyay oo ah shaqaalaha mushaharka hooseeya. Kiliinigyo dhicitaan mushaarka iyo tababar KYR shaqada.", url: "https://ctul.net", category: "labor" },
  { name: "COPAL Minnesota", blurb: "Urur Latinx ah ee caddaaladda jinsiga. Xuquuqda shaqaalaha, socdaalka, iyo lugaashiga muwaadiniinta.", url: "https://www.copalmn.org", category: "advocacy" },
  { name: "MN Interfaith Coalition on Immigration", blurb: "Iskaashi bulshooyinka diinta ah oo bixiya raacid, magangelyo, iyo taageero diineed.", category: "faith" }
];

const categoryLabels: Record<CoalitionPartner["category"], string> = {
  advocacy: "Difaac",
  faith: "Diin",
  service: "Adeeg toos ah",
  legal: "Sharci",
  labor: "Shaqo"
};

export default function PartnersPageSO() {
  return (
    <>
      <TranslationBanner lang="so" englishHref="/partners" />
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Isbahaysi"
          title="Bulsho ahaan."
          lede="Shaqada way ka weyn tahay urur kasta. Kuwani waa kuwa aan u jiilan nahay — diin, shaqo, caawimaad sharci, iyo adeeg toos ah. Haddii ururkaaga ay tahay inuu ku jiro liiskan, nala soo xiriir."
        />
      </section>

      <section className="container-wide pb-12">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((p) => (
            <li key={p.name}>
              <article className="card flex h-full flex-col gap-3 p-6">
                <div className="flex items-center gap-4">
                  {p.logo ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={asset(p.logo)}
                      alt={p.name}
                      width={56}
                      height={56}
                      className="h-14 w-14 shrink-0"
                    />
                  ) : (
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-indigo-700/10 font-serif text-xl text-indigo-700">
                      {(p.short ?? p.name).slice(0, 1)}
                    </div>
                  )}
                  <div>
                    <p className="eyebrow">{categoryLabels[p.category]}</p>
                    <h3 className="mt-0.5 font-serif text-lg leading-snug">
                      {p.short ?? p.name}
                    </h3>
                    {p.short && <p className="text-xs text-ink-muted">{p.name}</p>}
                  </div>
                </div>
                <p className="text-sm text-ink-soft">{p.blurb}</p>
                {p.url && (
                  <a href={p.url} target="_blank" rel="noreferrer" className="btn-link mt-auto inline-flex pt-2 text-sm">
                    Booqo goobta <Arrow />
                  </a>
                )}
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-wide pb-24">
        <div className="card grid items-center gap-6 p-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow">Hay'adaha</p>
            <h3 className="font-serif text-2xl md:text-3xl">Nala istaag, dadweynaha hortooda.</h3>
            <p className="mt-3 text-ink-soft">
              Waxaan taageernaa oo cod siinnaa shaqada lammaanaha — dhacdooyin,
              hadallo wadajir ah, waraaqo furan. Soo dir qoraal ku saabsan
              ururkaaga iyo waxa aan wada qaban karno.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link href="/so/contact?topic=coalition" className="btn-primary" hrefLang="so">
              Nala soo xiriir <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
