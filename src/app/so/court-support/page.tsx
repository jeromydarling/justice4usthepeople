import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { TranslationBanner } from "@/components/TranslationBanner";

export const metadata: Metadata = {
  title: "Taageero maxkamadeed",
  description: "Iska diiwaan geli si aad u raacto deggan dhageysasho socdaalka.",
  alternates: { languages: { en: "/court-support", es: "/es/court-support", so: "/so/court-support" } }
};

export default function CourtSupportPageSO() {
  return (
    <>
      <TranslationBanner lang="so" englishHref="/court-support" />
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Taageero maxkamadeed"
          title="Fadhiiso saxda. Noqo safka deggan."
          lede="Saf bulsho ee maxkamadda waxay u tahay dadka badan farqi u dhexeeya cabsi iyo sharaf. Waxaan abaabulnaa raacitaan maxkamadeed Twin Cities oo dhan."
        />
      </section>

      <section className="container-wide pb-24">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7 card p-8">
            <p className="eyebrow">Sida ay u eg tahay</p>
            <ol className="mt-3 list-decimal space-y-3 pl-5 text-sm text-ink-soft">
              <li>
                Waxaan kuu soo dirnaa fariin 24-72 saac kahor dhageysashada
                oo wadata taariikhda, maxkamadda, iyo waxa la xirto.
              </li>
              <li>
                Waxaad timaadaa 20 daqiiqo hore, kula kulan qoyska oo
                wadajir u fadhiisataan saxda.
              </li>
              <li>Maxkamadda kuma hadli kartid. Markhaati ma tihid. Waxaad tahay deggan.</li>
              <li>
                Dhageysashada ka dib, fariin gaaban ayaad isku-bedeshaan,
                wadajir baad uga baxdaan, qoysku waa garan inaanay keligood ahayn.
              </li>
            </ol>
          </div>
          <div className="md:col-span-5 card p-8">
            <p className="eyebrow">Iska diiwaan geli</p>
            <h3 className="mt-2 font-serif text-2xl">Ma diyaar baad tahay?</h3>
            <p className="mt-3 text-sm text-ink-soft">
              Foomka iska-diiwaangelinta wali wuxuu ku qoran yahay Ingiriis.
              Waa gaaban — magac, email, luqado, hilig, iyo qoraallo.
            </p>
            <Link href="/court-support" hrefLang="en" className="btn-primary mt-5">
              Buuxi foomka <Arrow />
            </Link>
            <p className="mt-3 text-xs text-ink-muted">
              Ma rabtaa inaad la hadasho qof? Soo wac 612-424-1785.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
