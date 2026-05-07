import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { TranslationBanner } from "@/components/TranslationBanner";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nala soo xiriir",
  description: "Soo wac, fariin noo soo dir, ama isticmaal mid ka mid ah foomamayadayada.",
  alternates: { languages: { en: "/contact", es: "/es/contact", so: "/so/contact" } }
};

export default function ContactPageSO() {
  return (
    <>
      <TranslationBanner lang="so" englishHref="/contact" />
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Nala soo xiriir"
          title="Qof dhab ah ayaa kuu jawaabi doona."
          lede="Haddii aad u baahan tahay caawimaad degdeg ah, soo wac. Wax kasta oo kale, qor — waxaan akhrinaa fariin kasta oo aan ku jawaabnaa wax ka yar 48 saac gudahooda."
        />
      </section>

      <section className="container-wide pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="card p-6">
            <p className="eyebrow">Soo wac</p>
            <h3 className="mt-2 font-serif text-xl">Khadka tooska ah</h3>
            <p className="mt-2 text-sm text-ink-soft">
              Mutadawiciin laba-luqadood ayaa jawaab celiya 24 saac.
            </p>
            <a className="btn-primary mt-4 inline-flex" href={site.contact.phoneHref}>
              {site.contact.phone}
            </a>
          </div>

          <div className="card p-6">
            <p className="eyebrow">Qor</p>
            <h3 className="mt-2 font-serif text-xl">Email</h3>
            <p className="mt-2 text-sm text-ink-soft">
              Arrimo aan dagdag ahayn: warbaahin, iskaashi, su'aalo bogga.
            </p>
            <a className="btn-link mt-4 inline-flex" href={`mailto:${site.contact.email}`}>
              {site.contact.email} <Arrow />
            </a>
          </div>

          <div className="card p-6">
            <p className="eyebrow">Foom</p>
            <h3 className="mt-2 font-serif text-xl">Foomka shabakada</h3>
            <p className="mt-2 text-sm text-ink-soft">
              Foomka buuxa wali waa Ingiriis. Inta lagu sugayo, soo wac ama qor.
            </p>
            <Link href="/contact" hrefLang="en" className="btn-link mt-4 inline-flex">
              Fur foomka <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
