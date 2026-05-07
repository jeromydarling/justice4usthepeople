import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { TranslationBanner } from "@/components/TranslationBanner";

export const metadata: Metadata = {
  title: "Qiyamkayaga",
  description:
    "Mabaadi'da hoos-jirta shaqadayada: sharaf, wadajir, hoos-bixin, iyo dan-guud — oo lagu qoray luuqada deggan ee fudud.",
  alternates: { languages: { en: "/values", es: "/es/values", so: "/so/values" } }
};

const principles = [
  {
    title: "Qof kasta, nolol mar dhalan karta",
    plain: "Sharaf",
    body:
      "Waxaan ka bilownaa hal aaminsanaan: qof kasta wuxuu sitaa qiimo aanay dawladu, mushaharku, ama waraaqo siin karin oo aanay qaadi karin. Muwaadin ahaan ama maaha. Guri leh ama maaha. Shaqadu waxay ku bilaabataa kuwa kale aragga.",
    quote: "\"Cabbiraadda bulshadu waa qofka ay u aragto inuu si buuxda u yahay aadan-aaminsan.\""
  },
  {
    title: "Waxaan isu nahay deganayaal",
    plain: "Wadajir",
    body:
      "Waxa midkayaga waxyeeleeya wuu na dhammaan waxyeeleeya. Ma aqbalno nooc kasta oo amaan ah oo lagu iibsado iyada oo qof kale lagaga tagayo. Deggan dhibaata maanta uguma haya sababta aan markii hore u abaabulnay.",
    quote: "\"Xorriyadda cidna ma dhammaada inta tan qof kale ay qayb tahay.\""
  },
  {
    title: "Go'aamada, sida ugu suurtagalka u dhow dadka",
    plain: "Hoos-bixin",
    body:
      "Caawimaadu waa inay ka timaado heerka u dhow baahida — sahda, dhismaha, qolka kaniisada, dukaanka — kaddib oo keliya magaalada, gobolka, dalka. Waxaan iska dhaadhicinno dareenka in aan dhaadhinno waxa xaafadaha si fiican u qaban karaan iyaga laftooda.",
    quote: "\"Jawaab celiyaha koowaad waa qofka derisaad.\""
  },
  {
    title: "Bulsho u shaqayso kuwa ugu jilicsan",
    plain: "Dan-guud",
    body:
      "Siyaasadda halkan waxaa lagu xukumaa imtixaan fudud: ma sii ballaariyaa goobta dadka u barwaaqo karaa, ma ka cidhiidhinaysaa? Dan-guudku ma aha is-tanaasul danaha u dhexeeyo — waa dhulka aan ku heshiinno in cidna kuma dhici karto.",
    quote: "\"Waxa aan iska leennahay isma ihi hadhid. Waa miiska.\""
  },
  {
    title: "Kursi koowaad miiska kuwa ugu marka yar",
    plain: "Daryeel doorshe ah",
    body:
      "Markii aan go'aan gaarno, dadka ay sida ugu badan saamayso lagama tashado dhammaadka — waa codka koowaad. Gaar ahaan dadka ee magaaladda intooda kale joojiyay inay maqlaan.",
    quote: "\"Hoosta jaranjarada mushaharka waa korka ajandayaga.\""
  },
  {
    title: "Soo dhowaynta qariibka ma aha ikhtiyaar",
    plain: "Soo dhowayn",
    body:
      "Inta badanayadu waxaan ka soo farcannay qof yimi waxba la'aan. Anshaxa soo dhowayntu ma aha sifo shisheeye — waa midka aasaaska ah. Waxaan u fidinaa sababtoo ah waa la noo fidiyay.",
    quote: "\"Waxa bulshadu maanta loogu yeero qariib waa waxa hadhow naftooda u yeerto.\""
  },
  {
    title: "Shaqo, caadil oo la sharfay",
    plain: "Sharafta shaqada",
    body:
      "Shaqadu waa inay bixiso wax ku filan in lagu noolaado nolol — in la nasto, in qoys la koriyo, xaafad lagu jiro. Shaqaalaha waa qoraallada shaqadooda, ma aha qalabkeeda.",
    quote: "\"Sharaftu ma aha faa'iido heerka mushahar ee ugu sarreeya.\""
  },
  {
    title: "Daryeel goobta aan wadaagno",
    plain: "Hayn",
    body:
      "Dhulka, harooyinka, hawlka — kuwani ma aha alaab ceeriin. Waa dhaxalka aan u gudbino kooxda xigta ee deggan. Waxaan u abaabulaa guriyeyn iyo cunto sida aan u abaabulnaa adduunkii uu hayo.",
    quote: "\"Dhulka ma dhaxlin. Waxaan u haynaa daqiiqo.\""
  }
];

export default function ValuesPageSO() {
  return (
    <>
      <TranslationBanner lang="so" englishHref="/values" />
      <section className="container-page py-20 md:py-28">
        <SectionHeader
          eyebrow="Waxaan haynno"
          title="Mabaadi'da hoos-jirta shaqada."
          lede="Socod gaaban ee naxariista anshaxa hay'addan. Sideed fikrad, mid kasta oo qadiimi ah, mid kasta oo caadi ah, mid kasta oo annaga."
        />
      </section>

      <section className="container-page pb-20 md:pb-28">
        <ol className="grid gap-10 md:gap-14">
          {principles.map((p, i) => (
            <li key={p.plain} className="grid gap-6 md:grid-cols-12">
              <div className="md:col-span-3">
                <p className="font-serif text-5xl text-ember-500/80">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-ember-700">{p.plain}</p>
              </div>
              <div className="md:col-span-9">
                <h3 className="font-serif text-2xl md:text-3xl">{p.title}</h3>
                <p className="mt-3 max-w-prose text-ink-soft">{p.body}</p>
                <p className="pull-quote mt-4 border-l-2 border-ember-400 pl-4 italic text-ink/80">
                  {p.quote}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-wide pb-24">
        <div className="card grid items-center gap-8 p-8 md:grid-cols-12 md:p-12">
          <div className="md:col-span-8">
            <h3 className="font-serif text-3xl">
              Kuwani ma aha hadalkii. Waa cabbirka aan naftayada ku qoryo.
            </h3>
            <p className="mt-4 text-ink-soft">
              Barnaamij kasta, doolar kasta, kulan kasta waxaa lagu xukumaa
              kuwan. Haddii aan khaldano, na sheeg. Shaqadu waxay leedahay
              xaafadda, maaha annaga.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
            <Link href="/so/take-action" className="btn-primary" hrefLang="so">
              Hawl gal <Arrow />
            </Link>
            <Link href="/so/contact" className="btn-ghost" hrefLang="so">
              Noo sheeg
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
