import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";

export const metadata: Metadata = {
  title: "Know Your Rights",
  description:
    "What to do at the door, in a car stop, and at work. Plain-language cards, ready to print or share."
};

const scenarios = [
  {
    title: "If ICE comes to your door",
    points: [
      "You do not have to open the door. Officers need a judicial warrant signed by a judge — an ICE administrative warrant is not enough.",
      "Ask them to slip the warrant under the door. Look for a judge's signature and your correct address.",
      "You have the right to remain silent. Say: \"I do not consent to a search and I am exercising my right to remain silent.\"",
      "You have the right to a lawyer. Do not sign anything you don't understand."
    ]
  },
  {
    title: "If you're stopped in a car",
    points: [
      "Pull over safely. Keep your hands visible. The driver must show license, registration, and insurance.",
      "Passengers do not have to answer questions about immigration status. Say: \"I want to remain silent.\"",
      "Do not lie. Do not show false documents. You can decline to show foreign documents.",
      "Ask: \"Am I free to go?\" If yes, leave calmly."
    ]
  },
  {
    title: "If immigration comes to your workplace",
    points: [
      "Your employer cannot let agents into non-public areas without a judicial warrant.",
      "You have the right to remain silent and to decline to sign anything.",
      "Ask for a lawyer before answering questions about where you were born or how you entered.",
      "Note details — names, badge numbers, vehicles — and call the hotline as soon as it's safe."
    ]
  }
];

export default function KYRPage() {
  return (
    <>
      <section className="container-page py-16 md:py-20">
        <SectionHeader
          eyebrow="Know your rights"
          title="What to say. What to sign. What to do."
          lede="Plain-language cards drawn from immigration legal aid groups. Print them, screenshot them, and share them with the people in your life. Right now is a fine time to learn this."
        />
      </section>

      <section className="container-page pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          {scenarios.map((s) => (
            <article key={s.title} className="card flex h-full flex-col gap-4 p-6">
              <h3 className="font-serif text-xl">{s.title}</h3>
              <ul className="space-y-3 text-sm text-ink-soft">
                {s.points.map((p, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-0.5 text-ember-600">●</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="card p-8 md:p-10">
          <p className="eyebrow">Languages</p>
          <h3 className="mt-2 font-serif text-2xl">Cards available in your language.</h3>
          <p className="mt-3 text-ink-soft">
            We're translating these cards into Spanish, Somali, Hmong, Amharic,
            Oromo, and Karen. Drop your translated PDF into{" "}
            <code>/public/kyr/</code> and link it here.
          </p>
          <ul className="mt-4 grid gap-2 text-sm md:grid-cols-3">
            {["English", "Español", "Soomaali", "Hmoob", "አማርኛ", "Afaan Oromoo"].map((lang) => (
              <li key={lang}>
                <a className="btn-link" href={`/kyr/${lang.toLowerCase()}.pdf`}>
                  Download — {lang}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page pb-24">
        <div className="card grid items-center gap-6 p-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <h3 className="font-serif text-2xl md:text-3xl">
              Host a Know-Your-Rights night.
            </h3>
            <p className="mt-3 text-ink-soft">
              We bring a bilingual trainer, the cards, and the snacks. Twelve
              neighbors is a quorum.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link href="/take-action#volunteer" className="btn-primary">
              Sign up to host <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
