import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { TranslationBanner } from "@/components/TranslationBanner";

export const metadata: Metadata = {
  title: "Wararka iyo cusbooneysiinta",
  description: "Wararka tooska ah ee ICE iyo daboolnaanta socdaalka.",
  alternates: { languages: { en: "/news", es: "/es/news", so: "/so/news" } }
};

export default function NewsPageSO() {
  return (
    <>
      <TranslationBanner lang="so" englishHref="/news" />
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Wadajir aragga"
          title="Wararka ICE iyo wararka maxalliga ah."
          lede="Feed nool oo isha-badan — Minnesota Public Radio, Sahan Journal, Star Tribune, iyo qoraallada qaranka. Marna ma sax inno cinwaanada."
        />
      </section>

      <section className="container-wide pb-24">
        <div className="card p-8">
          <p className="eyebrow">Feed-ka buuxa</p>
          <h3 className="mt-2 font-serif text-2xl">Feed-ka tooska ah waa Ingiriis.</h3>
          <p className="mt-3 text-ink-soft">
            Wararka waxaa laga keenaa goobaha daboolaya socdaalka. Isticmaal
            shaandhada bogga buuxa si aad u hesho daboolnaan gaar ah.
          </p>
          <Link href="/news" hrefLang="en" className="btn-primary mt-5">
            Fur feed-ka buuxa <Arrow />
          </Link>
        </div>
      </section>
    </>
  );
}
