import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { TranslationBanner } from "@/components/TranslationBanner";

export const metadata: Metadata = {
  title: "Iskaashigaaga isbahaysiga",
  description: "Hay'adaha aan kala shaqayno — diin, shaqo, qaramaynta sharciga, iyo adeegyada toos ah.",
  alternates: { languages: { en: "/partners", es: "/es/partners", so: "/so/partners" } }
};

export default function PartnersPageSO() {
  return (
    <>
      <TranslationBanner lang="so" englishHref="/partners" />
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Isbahaysi"
          title="Bulsho ahaan."
          lede="Shaqada way ka weyn tahay urur kasta keligood. Kuwani waa kuwa aan u jiilan nahay — diin, shaqo, caawimaad sharci, iyo adeeg toos ah."
        />
      </section>

      <section className="container-wide pb-12">
        <div className="card p-8">
          <p className="eyebrow">Iskaashiyada ugu muhiimsan</p>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            <Partner name="African Education Development Society (AEDS)" category="Adeeg toos ah" blurb="Horumarinta bulshada Bariga Afrika, waxbarashada, iyo barnaamijyada dhalinyarada Twin Cities." />
            <Partner name="Somali Youth Link (S.Y.L.)" category="Adeeg toos ah" blurb="Maamulis, hoggaan, iyo difaac la dhalinyarada Soomaaliyeed ee Minnesota." />
            <Partner name="Immigrant Law Center of Minnesota (ILCM)" category="Sharci" blurb="Adeegyo sharci socdaal, kiliinikada muwaadinnimada, iyo tababarro Conozca Sus Derechos." url="https://www.ilcm.org" />
            <Partner name="MIRAC" category="Difaac" blurb="Wuxuu isku duwaa shabakadda jawaab celinta degdega ah ee Minnesota." url="https://miracmn.org" />
          </ul>
        </div>

        <div className="mt-10 card grid items-center gap-6 p-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow">Liiska buuxa</p>
            <h3 className="font-serif text-2xl md:text-3xl">Eeg dhammaan iskaashiyada.</h3>
            <p className="mt-3 text-ink-soft">
              Bogga buuxa oo wadata calaamadaha, faahfaahinta, iyo qaybaha
              wuxuu ku qoran yahay Ingiriis.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link href="/partners" className="btn-primary" hrefLang="en">
              Eeg Ingiriisi <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Partner({ name, category, blurb, url }: { name: string; category: string; blurb: string; url?: string }) {
  return (
    <li className="rounded-2xl bg-bone-100 p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-ember-700">{category}</p>
      <p className="mt-2 font-serif text-lg leading-snug text-ink">{name}</p>
      <p className="mt-2 text-sm text-ink-soft">{blurb}</p>
      {url && (
        <a href={url} target="_blank" rel="noreferrer" className="btn-link mt-2 inline-flex text-xs">
          Eeg goobta →
        </a>
      )}
    </li>
  );
}
