import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { TranslationBanner } from "@/components/TranslationBanner";

export const metadata: Metadata = {
  title: "Qiyamkayaga",
  description: "Sharaf, wadajir, hoos-bixin, iyo dan-guud.",
  alternates: { languages: { en: "/values", es: "/es/values", so: "/so/values" } }
};

const values = [
  {
    title: "Sharaf",
    body:
      "Qof kasta — muwaadin, soo-galooti, deggan, ama qariib — wuxuu sitaa qiimo aan siyaasad lana siin ama lala qaadi karin."
  },
  {
    title: "Wadajir",
    body:
      "Waxaan isu nahay deganayaal. Aamin la'aanta cidna laguma dhisi karo iyada oo qof kale lagaga tagayo. Wadajir bay nahay."
  },
  {
    title: "Hoos-bixin",
    body:
      "Go'aamadu waxay leeyihiin u dhowaanshaha dadka ay saamaynayaan. Maxalliga hore. Mar walba."
  },
  {
    title: "Dan-guud",
    body:
      "Bulshada u shaqayso kuwa ugu jilicsan ee naga mid ah waa bulsho dhab ah u shaqayso. Halkaasaa cabbiraadayadu joogtaa."
  }
];

export default function ValuesPageSO() {
  return (
    <>
      <TranslationBanner lang="so" englishHref="/values" />
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Qiyamkayaga"
          title="Mabaadi'da hoos-jirta shaqada."
          lede="Diin ahaan dhab uma nihin wax badan, marka laga reebo arrintaan: qof kasta wuxuu sitaa sharaf aan la dhaqaajin karin."
        />
      </section>

      <section className="container-wide pb-24">
        <ul className="grid gap-6 md:grid-cols-2">
          {values.map((v) => (
            <li key={v.title}>
              <article className="card flex h-full flex-col gap-3 p-8">
                <h3 className="font-serif text-2xl">{v.title}</h3>
                <p className="text-ink-soft">{v.body}</p>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-12 card grid items-center gap-6 p-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow">Nooca buuxa</p>
            <h3 className="font-serif text-2xl md:text-3xl">
              Ma rabtaa nooca buuxa?
            </h3>
            <p className="mt-3 text-ink-soft">
              Bogga qiyamka oo Ingiriis ah wuxuu leeyahay faahfaahin badan.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link href="/values" className="btn-primary" hrefLang="en">
              Eeg Ingiriisi <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
