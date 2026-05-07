import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { TranslationBanner } from "@/components/TranslationBanner";
import { sortEvents, formatDate, formatTime } from "@/lib/events";

export const metadata: Metadata = {
  title: "Dhacdooyin",
  description: "Shir-jaraa'idka, daahirsiyada, baxnaaninta, iyo tababarrada bulshada.",
  alternates: { languages: { en: "/events", es: "/es/events", so: "/so/events" } }
};

export default function EventsPageSO() {
  const { upcoming } = sortEvents();
  return (
    <>
      <TranslationBanner lang="so" englishHref="/events" />
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Dhacdooyin"
          title="Imow. Keen deggan."
          lede="Shir-jaraa'idka, daahirsi, baxnaaninta, tababarro. Ururinkasta waa daqiiqo aan u muuqasanno isu midda kale."
        />
        <Link href="/calendar.ics" className="btn-ghost mt-6 text-sm">
          Iska diiwaan geli jadwalka
        </Link>
      </section>

      <section className="container-wide pb-12">
        {upcoming.length === 0 ? (
          <div className="card p-8">
            <p className="eyebrow">Dhacdooyin soo socda ma jiraan</p>
            <h3 className="mt-2 text-2xl">Mar dambe na soo eeg.</h3>
            <p className="mt-3 text-ink-soft">
              Waxaan jadwaleynaa shir-jaraa'idka, daahirsi, iyo tababarro
              sida xaaladdu u baahato.
            </p>
          </div>
        ) : (
          <ul className="grid gap-6">
            {upcoming.map((e) => (
              <li key={e.slug} className="card p-6">
                <p className="eyebrow">Soo socda</p>
                <h3 className="mt-2 font-serif text-xl">{e.title}</h3>
                <p className="mt-1 text-sm text-ink-soft">
                  {formatDate(e)} · {formatTime(e)} · {e.location.name}
                </p>
                <p className="mt-3 text-sm text-ink-soft">{e.description}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="container-wide pb-24">
        <div className="card grid items-center gap-6 p-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow">Nooca buuxa</p>
            <h3 className="font-serif text-2xl md:text-3xl">Khaariidad, RSVP, iyo wax kale.</h3>
            <p className="mt-3 text-ink-soft">
              Bogga dhacdooyinka oo Ingiriis ah wuxuu leeyahay khaariidad
              firfircoon iyo xiriirin jadwalka dhacdo kasta.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link href="/events" className="btn-primary" hrefLang="en">
              Eeg dhacdooyinka <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
