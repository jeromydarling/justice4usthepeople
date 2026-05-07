import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { TranslationBanner } from "@/components/TranslationBanner";

export const metadata: Metadata = {
  title: "Haddii la xiray qof aad jeceshahay",
  description:
    "Waxa la sameeyo — tallaabo-tallaabo — haddii ICE ay xirtay qof aad jeceshahay.",
  alternates: { languages: { en: "/find-loved-one", es: "/es/find-loved-one", so: "/so/find-loved-one" } }
};

export default function FindLovedOnePageSO() {
  return (
    <>
      <TranslationBanner lang="so" englishHref="/find-loved-one" />
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Haddii la xiray qof aad jeceshahay"
          title="Saacadaha ugu horreeya ayaa muhiim ah."
          lede="Deggan ahaaw — waxaa jira tallaabooyin cad, oo aanad keligaa qaadan doonin. Haddii aad rabto inaad la hadasho qof hadda, naga soo wac 612-424-1785."
        />
      </section>

      <section className="container-wide pb-8">
        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Step n={1} title="Hel meesha xabsiga lagu hayo">
            <p>
              ICE waxay haysaa baaraha guud ee dadka xabsiga ku jira. Waxaad u
              baahan doontaa <strong>lambar A</strong> (lambarka sagaal-tirada
              ee waraaqaha socdaalka) ama magac iyo magaca dambe + dalka
              dhalashada iyo taariikhda dhalashada.
            </p>
            <p className="mt-3">
              <a
                href="https://locator.ice.gov/odls/"
                target="_blank"
                rel="noreferrer"
                className="btn-primary text-sm"
              >
                Fur baaraha ICE <Arrow />
              </a>
            </p>
          </Step>

          <Step n={2} title="Qor waxa aad ogtahay">
            <p>
              Ka hor inta aanad cidna ku wicin, soo uruuri: magaca buuxa,
              taariikhda dhalashada, dalka muwaadinka, lambarka A haddii
              aad ogtahay, halka laga qaaday, iyo waqtigii. Diiwaan qoran ayaa
              caawiya qareen kasta oo dabadeed yimaada.
            </p>
          </Step>

          <Step n={3} title="Hel qareen">
            <p>
              Ka hor inta uusan qof aad jeceshahay saxiixin wax kasta oo
              ICE soo bandhigayso, soo wac mid ka mid ah ururadan caawimada
              sharciga ee socdaalka:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
              <li>
                <strong>Immigrant Law Center of MN:</strong> 651-641-1011
              </li>
              <li>
                <strong>The Advocates for Human Rights:</strong> 612-341-3302
              </li>
              <li>
                <strong>Mid-Minnesota Legal Aid:</strong> 612-334-5970
              </li>
            </ul>
          </Step>

          <Step n={4} title="Lacag iyo dukaanka xabsiga">
            <p>
              Inta badan xarumaha xabsiga waxay ogolaadaan in lacag lagu daro
              xisaabta qofka xabsiga ku jira si loogu sameeyo wicitaano iyo
              alaab. Weydii xarunta nidaamka deebtigeeda — inta badan waxay
              isticmaalaan{" "}
              <a href="https://www.accesscorrections.com" target="_blank" rel="noreferrer" className="btn-link">
                Access Corrections
              </a>{" "}
              ama{" "}
              <a href="https://www.jpay.com" target="_blank" rel="noreferrer" className="btn-link">
                JPay
              </a>
              .
            </p>
          </Step>

          <Step n={5} title="Booqashada iyo wicitaannada">
            <p>
              Xarun kasta waxay leedahay xeerar booqasho iyo wicitaan oo
              gaar ah — qorshe samay telefoonka, kaadhka ID-ga sawirka leh
              waa lama huraan. Wicitaannada waa la duubaa; ha kaga hadlin
              istiraatijiyada kiiska telefoonka.
            </p>
          </Step>

          <Step n={6} title="Noo sheeg waxa dhacaya">
            <p>
              Waxaan kugu xirin karnaa mutadawac taageero maxkamadeed,
              caawin gaadiidka xarunta xabsiga, ama abaabul jiritaan
              bulsho oo dhageysasho. Keligaa kuma sameyn doontid tan.
            </p>
            <p className="mt-3">
              <Link href="/contact?topic=detained" className="btn-ghost text-sm">
                Noo soo dir warbixin <Arrow />
              </Link>
            </p>
          </Step>
        </ol>
      </section>

      <section className="container-wide pb-24">
        <div className="card grid items-center gap-6 p-8 md:grid-cols-12 ring-2 ring-ember-300">
          <div className="md:col-span-8">
            <p className="eyebrow text-ember-700">Haddii ay hadda dhacayso</p>
            <h3 className="font-serif text-2xl md:text-3xl">
              Soo wac khadkayaga taleefanka.
            </h3>
            <p className="mt-3 text-ink-soft">
              Mutadawiciin tababbaran ayaa kuu hagi kara 60 daqiiqo soo
              socota — waxayna soo dirayaan kormeerayaal haddii uu jiro
              dhaqdhaqaaq fulinta firfircoon.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <a className="btn-primary" href="tel:+16124241785">
              612-424-1785
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function Step({
  n,
  title,
  children
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="card flex flex-col gap-3 p-6">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-indigo-700 font-serif text-bone-50">
          {n}
        </span>
        <h3 className="font-serif text-xl leading-snug">{title}</h3>
      </div>
      <div className="text-sm leading-relaxed text-ink-soft">{children}</div>
    </li>
  );
}
