import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { site } from "@/lib/site";
import { Arrow } from "@/components/ProgramCard";
import { TranslationBanner } from "@/components/TranslationBanner";

export const metadata: Metadata = {
  title: "Hawl gal",
  description:
    "Mutadawac noqo, u tababbar kormeerayaal jawaab celin degdeg ah, ka qayb gal aqoonsi xuquuq, ama hel cusbooneysiinta.",
  alternates: { languages: { en: "/take-action", es: "/es/take-action", so: "/so/take-action" } }
};

export default function TakeActionPageSO() {
  return (
    <>
      <TranslationBanner lang="so" englishHref="/take-action" />
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Hawl gal"
          title="Dhaqdhaqaaqu waa wax aad sameyso, ma aha wax aad eegtid."
          lede="Shan habab oo aad u jiri karto toddobaadkaan. Door midka ku habboon waqtigaaga — shan iyo toban daqiiqo waa tabarruc dhab ah."
        />
      </section>

      <section className="container-wide pb-16">
        <ul className="grid gap-6 md:grid-cols-2">
          <Action num="01" title="Noqo kormeere jawaab celin degdeg ah" body="Markii ICE timaado, kormeerayaasha tababbarsani waxay ilaaliyaan sharafta oo waxay diiwaan geliyaan waxa dhacaya. Tababar xiga waa Sabtiga — ku biir liiska oo waxaan kuu soo dirnaa goobta." cta={{ href: "#volunteer", label: "Mutadawac" }} />
          <Action num="02" title="Marti gali habeen Conozca Sus Derechos" body="Qol bulsho, garaash, ama balconi dambe ma hayd? Waxaan keenaynaa kaararka, cuntada, iyo tababare laba-luqadood. Laba-iyo-toban deggan waa quorum." cta={{ href: "/so/know-your-rights", label: "Ogow xuquuqdaada", lang: "so" }} />
          <Action num="03" title="Wadi waddo gaarsiin" body="Subax Sabti, hal mini-van, toban sanduuq oo cunto. Waddooyinku waxay socdaan 9 subaxnimo - duhurka oo dhan Minneapolis iyo St. Paul." cta={{ href: "#volunteer", label: "Iska diiwaan geli inaad wado" }} />
          <Action num="04" title="Bilow $20/bishii ah xubin joogto ah" body="Tabarruc yar oo soo noqnoqoda waa hibada ugu faa'iidada badan. Lacag la saadaalin karo waxay nagu ogolaaneysaa inaan nidhaahno haa marka xaalad degdeg ah timaado." cta={{ href: "/so/membership", label: "Noqo xubin", lang: "so" }} />
          <Action num="05" title="Astaan gee deynta cawladaada" body="Astaanta cawladu waa yar tahay, calaamadduna waa wayn tahay. Iibso mid, dhig, oo deganayaashaada u sheeg sababta." cta={{ href: "/store", label: "Hel astaan cawlada", lang: "en" }} />
          <Action num="06" title="Soo dir tilmaan khadka tooska ah" body="Ma aragtay dhaqdhaqaaq ICE? Ma maqashay taariikh maxkamadeed? Ma aad markhaati noqotay? Naga soo wac — waxaan u dirineynaa qofka saxda ah." cta={{ href: site.contact.phoneHref, label: `Soo wac ${site.contact.phone}` }} />
        </ul>
      </section>

      <section id="volunteer" className="container-wide pb-24">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow">Iska-diiwaangelinta mutadawiciinta</p>
            <h2 className="mt-3">Noo sheeg meesha aad rabto inaad ku biirto.</h2>
            <p className="mt-4 text-ink-soft">
              Waxaan isku-mid yeelnaa mutadawiciinta iyadoo lagu salaynayo
              waxa aad bixin karto iyo waxa degdeg ku ah shabakadda toddobaadkaan.
              Filo jawaab toos ah dhowr maalmood gudahood.
            </p>
            <p className="mt-6 text-sm text-ink-muted">
              Door kasta wuxuu leeyahay tababar, taageero, iyo lammaane.
              Lagu diri maayo xaalad adag adoo keligaa ah.
            </p>
          </div>
          <div className="md:col-span-7">
            <div className="card p-6 md:p-8">
              <p className="eyebrow">Foomka mutadawac</p>
              <h3 className="mt-2 font-serif text-xl">Diyaar ma u tahay inaad iska-diiwaan geliso?</h3>
              <p className="mt-3 text-sm text-ink-soft">
                Foomka buuxa ee mutadawiciinta hadda waa Ingiriis — wuxuu
                weydiiyaa magacaaga, email, luqado, hilig, iyo qoraallo.
                Goobaha waa gaaban yihiin.
              </p>
              <Link href="/take-action#volunteer" hrefLang="en" className="btn-primary mt-5">
                Fur foomka <Arrow />
              </Link>
              <p className="mt-3 text-xs text-ink-muted">
                Ma rabtaa inaad la hadasho qof? Soo wac{" "}
                <a className="btn-link" href={site.contact.phoneHref}>
                  {site.contact.phone}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Action({ num, title, body, cta }: { num: string; title: string; body: string; cta: { href: string; label: string; lang?: string } }) {
  return (
    <li className="card flex flex-col gap-3 p-6 md:p-7">
      <div className="flex items-baseline gap-3">
        <span className="font-serif text-3xl text-ember-500/80">{num}</span>
        <h3 className="text-xl">{title}</h3>
      </div>
      <p className="text-ink-soft">{body}</p>
      <Link href={cta.href} hrefLang={cta.lang} className="btn-link mt-1 inline-flex">
        {cta.label} <Arrow />
      </Link>
    </li>
  );
}
