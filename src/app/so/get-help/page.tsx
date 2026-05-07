import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { TranslationBanner } from "@/components/TranslationBanner";

export const metadata: Metadata = {
  title: "Hel caawimaad",
  description: "Khaariidad nool oo ah khayraadka Twin Cities — caawimaad sharci, cunto, guriyeyn, caafimaad, iyo wax kale.",
  alternates: { languages: { en: "/get-help", es: "/es/get-help", so: "/so/get-help" } }
};

export default function GetHelpPageSO() {
  return (
    <>
      <TranslationBanner lang="so" englishHref="/get-help" />
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Hel caawimaad"
          title="Khaariidad nool oo aad u tagto."
          lede="Waxay ku haystaan deganayaal isticmaala khayraadkaan. Taabasho qaybta si aad u shaandhayso; taabo calaamadda si aad u aragto saacadaha, luqadaha, iyo telefoon toos ah."
        />
        <Link
          href="/find-loved-one"
          hrefLang="so"
          className="mt-6 inline-block rounded-2xl border-2 border-ember-300 bg-ember-50 px-4 py-2.5 text-sm font-medium leading-snug text-ember-700 no-underline transition hover:bg-ember-100"
        >
          Haddii la xiray qof aad jeceshahay → eeg tallaabooyinka soo socda
        </Link>
      </section>

      <section className="container-wide pb-12">
        <div className="grid gap-6 md:grid-cols-3">
          <Tile color="#22304d" label="Caawimaad sharci" text="Tashi sharci socdaalka, difaaca kala saarka, iyo hagid qoyseed." />
          <Tile color="#a8512a" label="Cunto" text="Bakhaarrada raashinka, cuntada kulul, iyo gaarsiinta. Warqado la'aan." />
          <Tile color="#754811" label="Guryo" text="Caawimaad kirada, hoyga degdegga ah, iyo khadka tooska ah ee xuquuqda kireystaha." />
          <Tile color="#3a4d77" label="Caafimaad" text="Kiliinigyo qiima yar, caafimaadka maskaxda, iyo daryeel ilkaha." />
          <Tile color="#dc972f" label="Magangelyo" text="Iskaashi bulshooyinka diinta ee bixiya raacid iyo taageero diineed." />
          <Tile color="#854020" label="Jawaab celinta degdega ah" text="Khadka 24-saac ah si loo xaqiijiyo dhaqdhaqaaqa ICE." />
        </div>

        <div className="mt-10 card grid items-center gap-6 p-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow">Khaariidadda buuxa</p>
            <h3 className="font-serif text-2xl md:text-3xl">~30 hay'ad oo Twin Cities, khaariidadda dushooda.</h3>
            <p className="mt-3 text-ink-soft">
              Khaariidaddu wuxuu Ingiriis ku jiraa. Ciwaannada, telefoonada, iyo
              saacadahu way isku mid yihiin.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link href="/get-help" className="btn-primary" hrefLang="en">
              Fur khaariidadda <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Tile({ color, label, text }: { color: string; label: string; text: string }) {
  return (
    <div className="card p-5">
      <span className="inline-block h-3 w-3 rounded-full" style={{ background: color }} />
      <p className="mt-2 font-serif text-lg">{label}</p>
      <p className="mt-1 text-sm text-ink-soft">{text}</p>
    </div>
  );
}
