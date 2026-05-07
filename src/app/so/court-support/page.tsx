import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { TranslationBanner } from "@/components/TranslationBanner";

export const metadata: Metadata = {
  title: "Taageero maxkamadeed",
  description:
    "Iska diiwaan geli si aad u raacto deggan dhageysasho socdaalka. Saf bulsho ee maxkamadda waxay u tahay dadka badan farqi u dhexeeya cabsi iyo sharaf.",
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
          lede="Saf bulsho ee maxkamadda waxay u tahay dadka badan farqi u dhexeeya cabsi iyo sharaf. Waxaan abaabulnaa raacitaan maxkamadeed Twin Cities oo dhan — mararka qaarkood laba maalmood ka hor ogeysiis — kuna maaheysid kaligaa."
        />
      </section>

      <section className="container-wide pb-12">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="card p-6 md:p-8">
              <p className="eyebrow">Iska diiwaan geli</p>
              <h3 className="mt-2 font-serif text-2xl">Noo sheeg sida aad u caawin karto.</h3>
              <p className="mt-3 text-sm text-ink-soft">
                Foomka buuxa ee iska-diiwaangelinta wali wuxuu Ingiriis ku
                qoran yahay. Wuxuu weydiinaa magacaaga, email, telefoon,
                luqado, hilig, iyo inaad wadi karto baabuur ilaa maxkamad.
                Waa gaaban.
              </p>
              <p className="mt-3 text-sm text-ink-soft">
                Ka dib markii aad gudbiso, isku-duwe ayaa kula soo xidhiidhi
                doona toddobaad gudahood — iyo maalin gudahood haddii ay
                jirto dhageysasho firfircoon jadwalka.
              </p>
              <Link href="/court-support" hrefLang="en" className="btn-primary mt-5">
                Buuxi foomka Ingiriisiga <Arrow />
              </Link>
              <p className="mt-3 text-xs text-ink-muted">
                Ma rabtaa inaad la hadasho qof? Soo wac 612-424-1785.
                Mutadawiciin laba-luqadood ayaa qaadi kara macluumaadkaaga
                telefoonka.
              </p>
            </div>
          </div>

          <aside className="md:col-span-5">
            <div className="card p-6 md:p-8">
              <p className="eyebrow">Sida ay u eg tahay</p>
              <ol className="mt-3 list-decimal space-y-3 pl-5 text-sm text-ink-soft">
                <li>
                  Waxaan kuu soo dirnaa fariin 24-72 saac kahor dhageysashada
                  oo wadata taariikhda, maxkamadda, iyo waxa la xirto
                  (dhar shaqo; T-shirts isku mid ah waa ikhtiyaar oo waan bixinaa).
                </li>
                <li>
                  Waxaad timaadaa 20 daqiiqo hore, kula kulan qoyska oo wadajir
                  u fadhiisataan saxda.
                </li>
                <li>
                  Maxkamadda kuma hadli kartid. Markhaati ma tihid. Waxaad tahay deggan.
                </li>
                <li>
                  Dhageysashada ka dib, fariin gaaban ayaad isku-bedeshaan,
                  wadajir baad uga baxdaan, qoysku waa garan inaanay keligood ahayn.
                </li>
              </ol>
              <p className="mt-5 text-sm text-ink-muted">
                Marna lama wadaagno macluumaadkaaga xidhiidhka. Waxaad
                joojin kartaa ama bixi kartaa wakhti kasta.
              </p>
            </div>
            <div className="card mt-6 p-6 md:p-8">
              <p className="eyebrow">Habab kale oo aad u caawin karto</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link href="/so/take-action" className="btn-link" hrefLang="so">
                    Eeg dhammaan doorarka mutadawac <Arrow />
                  </Link>
                </li>
                <li>
                  <Link href="/so/find-loved-one" className="btn-link" hrefLang="so">
                    Haddii la xiray qof aad jeceshahay <Arrow />
                  </Link>
                </li>
                <li>
                  <Link href="/so/donate" className="btn-link" hrefLang="so">
                    Bixi sanduuqa sharciga <Arrow />
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
