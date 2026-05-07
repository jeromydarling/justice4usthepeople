import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { TranslationBanner } from "@/components/TranslationBanner";

export const metadata: Metadata = {
  title: "Sheekooyin",
  description:
    "Daqiiqado dhab ah, deganayaal dhab ah — waxa dhacaya marka bulshadu wadajirto. Magacyo iyo faahfaahin la beddelay si loo ilaaliyo asturnaanta.",
  alternates: { languages: { en: "/stories", es: "/es/stories", so: "/so/stories" } }
};

type Story = { id: string; title: string; lede: string; body: string; tag: string };

const stories: Story[] = [
  {
    id: "rosa-rent",
    title: "Markii warqaddii kirada timid",
    lede: "Hooyo laba carruur ah ayaa furtay ogeysiis 14-maalmood ah oo guriga laga saarayo. Laba iyo toban maalmood ka dib, waxay saxiixday qandaraas cusub.",
    body:
      "Rosa khadka tooska ah ayey wacday Talaadadii. Khamiistii, mutadawac ayaa kula tagay ikhtiyaarrada, Sabtiga waxaa la wax ka qabtay codsigii saaridda, oo laba toddobaad gudahood sanduuqayaga caawimaada kirada wuxuu si toos ah u bixiyay xisaabta dib u dhacday milkiilihii guriga. Way haysatay aqalkii, carruurteedu way joogeen iskuulkii, Rosa-na bishii dambe way soo noqotay — si ay u mutadawac noqoto.",
    tag: "Caawimaad kirada iyo adeegyada"
  },
  {
    id: "amir-court",
    title: "Inaad maxkamadda ka muuqato",
    lede: "Arday jaamacadeed jiil koowaad ah ayaa keligii galay maxkamadda socdaalka. Keligiina kama bixin.",
    body:
      "Dhageysashada Amir waxaa lagu jadweeyey Bloomington oo laba maalmood ogeysiis ah. Mutadawiciinta taageerada maxkamadeed ayaa lagu kulmay vestibul iyaga oo xidhan T-shirts isku mid ah, wuxuu fadhiisteen saxda, oo waxay la sugeen qoyskiisa. Garsooruhu wuxuu siiyay sii wadid. Amir wuxuu noo sheegay markii dambe in waxa keliya ee uu xasuusto uu yahay isagoo dib u eegaya oo arkaya safka deganayaasha gadaashiisa ka muuqday.",
    tag: "Raacid maxkamadeed"
  },
  {
    id: "ana-grocery",
    title: "Cunto, iyo wax ka badan",
    lede: "Wixii ku bilaabmay sida gaarsiin bakhaarka cuntada ayaa noqday shabakad deggan.",
    body:
      "Ana waxay yimid qaybinta Sabtida markii ugu horreysay Oktoobar. Markay timid Diseembar, waxay caawinaysay abaabulka waddada — turjumaad u samaynaysay kuwa cusub, sanduuqyada iska gelinaysay, gaadiidkana raacaysay. Cuntadu waxay ahayd albaabka; shaqadu waxay ahayd dib u dhis nooca dharka deggan ee magaaladayadu xisaab maaheen.",
    tag: "Caawimaad cunto"
  }
];

export default function StoriesPageSO() {
  return (
    <>
      <TranslationBanner lang="so" englishHref="/stories" />
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Sheekooyin"
          title="Shaqada, in qaab bani-aadminimo ah."
          lede="Magacyada iyo faahfaahinta waa la beddelay halka la weydiiyay. Deganayaashu waa dhab ah, wicitaannada waa dhab ahaayeen, natiijooyinkuna waa dhab ah."
        />
      </section>

      <section className="container-wide pb-12">
        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((s) => (
            <li key={s.id}>
              <article className="card flex h-full flex-col gap-4 p-6">
                <p className="eyebrow">{s.tag}</p>
                <h3 className="font-serif text-2xl leading-snug">{s.title}</h3>
                <p className="text-ink-soft">{s.lede}</p>
                <p className="border-l-2 border-ember-300 pl-4 text-sm text-ink-soft">{s.body}</p>
              </article>
            </li>
          ))}
        </ul>

        <p className="mt-12 max-w-2xl text-sm text-ink-muted">
          <strong className="text-ink">Qoraal ku saabsan oggolaansho iyo asturnaan.</strong>{" "}
          Sheeko kasta oo halkan lagu daabaco waxaa lala wadaagay ogolaansho
          cad. Faahfaahinta lagu garto — magacyo, shaqo, ciwaanno,
          maxkamado — waa la beddelaa ilaa qofka sheega laga codsado inaan
          la beddelin. Marna kuma daabacno magac ama sawir oggolaansho la'aan.
        </p>
      </section>

      <section className="container-wide pb-24">
        <div className="card grid items-center gap-6 p-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow">Ma rabtaa inaad sheekadaada wadaagto?</p>
            <h3 className="font-serif text-2xl md:text-3xl">
              Sheekadaadu waxay beddeli kartaa maskaxda qof.
            </h3>
            <p className="mt-3 text-ink-soft">
              Waxaan marka hore ka hadli doonnaa waxa aad raaxoono inaad
              wadaagto — waxa la wadaago, waxa la beddelo, waxa la haynno.
              Adigu waxaad sii hayseysaa xukunka.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link href="/so/contact?topic=story" className="btn-primary" hrefLang="so">
              Nala hadal <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
