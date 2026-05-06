import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { PrintButton } from "@/components/PrintButton";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Know Your Rights",
  description:
    "What to do at the door, in a car stop, and at work. Bilingual cards (English / Español), ready to print, share, or download as PDF."
};

// Bilingual KYR scenarios. To add a third language column, add another lang
// key to each `points` block — the rendering loops keys.
type Scenario = {
  id: string;
  title: { en: string; es: string };
  points: { en: string[]; es: string[] };
};

const scenarios: Scenario[] = [
  {
    id: "door",
    title: {
      en: "If ICE comes to your door",
      es: "Si ICE viene a su puerta"
    },
    points: {
      en: [
        "You do not have to open the door. Officers need a judicial warrant signed by a judge — an ICE administrative warrant is not enough.",
        "Ask them to slip the warrant under the door. Look for a judge's signature and your correct address.",
        "You have the right to remain silent. Say: \"I do not consent to a search and I am exercising my right to remain silent.\"",
        "You have the right to a lawyer. Do not sign anything you don't understand."
      ],
      es: [
        "No tiene que abrir la puerta. Los agentes necesitan una orden judicial firmada por un juez — una orden administrativa de ICE no es suficiente.",
        "Pídales que pasen la orden por debajo de la puerta. Busque la firma de un juez y su dirección correcta.",
        "Tiene derecho a guardar silencio. Diga: \"No doy mi consentimiento para un registro y ejerzo mi derecho a permanecer en silencio.\"",
        "Tiene derecho a un abogado. No firme nada que no entienda."
      ]
    }
  },
  {
    id: "car",
    title: {
      en: "If you're stopped in a car",
      es: "Si la policía la para en un automóvil"
    },
    points: {
      en: [
        "Pull over safely. Keep your hands visible. The driver must show license, registration, and insurance.",
        "Passengers do not have to answer questions about immigration status. Say: \"I want to remain silent.\"",
        "Do not lie. Do not show false documents. You can decline to show foreign documents.",
        "Ask: \"Am I free to go?\" If yes, leave calmly."
      ],
      es: [
        "Estaciónese en un lugar seguro. Mantenga las manos visibles. El conductor debe mostrar licencia, registro y seguro.",
        "Los pasajeros no tienen que responder preguntas sobre su estatus migratorio. Diga: \"Quiero permanecer en silencio.\"",
        "No mienta. No muestre documentos falsos. Puede negarse a mostrar documentos extranjeros.",
        "Pregunte: \"¿Estoy libre para irme?\" Si la respuesta es sí, váyase con calma."
      ]
    }
  },
  {
    id: "work",
    title: {
      en: "If immigration comes to your workplace",
      es: "Si inmigración viene a su trabajo"
    },
    points: {
      en: [
        "Your employer cannot let agents into non-public areas without a judicial warrant.",
        "You have the right to remain silent and to decline to sign anything.",
        "Ask for a lawyer before answering questions about where you were born or how you entered.",
        "Note details — names, badge numbers, vehicles — and call the hotline as soon as it's safe."
      ],
      es: [
        "Su empleador no puede dejar entrar a los agentes a las áreas no públicas sin una orden judicial.",
        "Tiene derecho a permanecer en silencio y a negarse a firmar cualquier cosa.",
        "Pida un abogado antes de responder preguntas sobre dónde nació o cómo entró al país.",
        "Anote detalles — nombres, números de placa, vehículos — y llame a la línea directa tan pronto como sea seguro."
      ]
    }
  }
];

const pdfHref = asset("/kyr/kyr-en-es.pdf");
const pngHref = asset("/kyr/kyr-en-es.png");

export default function KYRPage() {
  return (
    <>
      <section className="container-wide py-16 md:py-20 print:py-6">
        <SectionHeader
          eyebrow="Know your rights · Conozca sus derechos"
          title="What to say. What to sign. What to do."
          lede="Plain-language cards drawn from immigration legal aid groups. Print them, screenshot them, share them. Right now is a fine time to learn this."
        />
        <div className="mt-6 flex flex-wrap gap-3 print:hidden">
          <a href={pdfHref} download className="btn-primary">
            Download bilingual PDF <Arrow />
          </a>
          <a href={pngHref} download className="btn-ghost">
            Download as image
          </a>
          <PrintButton />
        </div>
      </section>

      <section className="container-wide pb-12 print:pb-2">
        <ol className="grid gap-8">
          {scenarios.map((s, i) => (
            <li key={s.id} className="card overflow-hidden p-0 print:break-inside-avoid">
              <div className="flex items-center gap-3 bg-indigo-900 px-4 py-3 text-bone-50 sm:gap-4 sm:px-6 sm:py-4">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ember-400 font-serif text-ink">
                  {i + 1}
                </span>
                <div>
                  <p className="font-serif text-lg leading-tight">{s.title.en}</p>
                  <p className="text-sm text-bone-200/85">{s.title.es}</p>
                </div>
              </div>
              <div className="grid gap-6 p-6 md:grid-cols-2">
                <div>
                  <p className="eyebrow">English</p>
                  <ul className="mt-3 space-y-3 text-sm">
                    {s.points.en.map((p, j) => (
                      <li key={j} className="flex gap-3">
                        <span className="mt-0.5 text-ember-600">●</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:border-l md:border-ink/10 md:pl-6">
                  <p className="eyebrow">Español</p>
                  <ul className="mt-3 space-y-3 text-sm">
                    {s.points.es.map((p, j) => (
                      <li key={j} className="flex gap-3">
                        <span className="mt-0.5 text-ember-600">●</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-wide pb-12 print:hidden">
        <div className="card p-8 md:p-10">
          <p className="eyebrow">More languages · Más idiomas</p>
          <h3 className="mt-2 font-serif text-2xl">
            Somali, Hmong, Amharic, Oromo, Karen — coming soon.
          </h3>
          <p className="mt-3 text-ink-soft">
            We&rsquo;re translating these cards into the languages our
            community most needs. If you&rsquo;d like to translate or
            review a draft, get in touch.
          </p>
          <Link href="/contact?topic=kyr-translation" className="btn-link mt-4 inline-flex">
            Help us translate <Arrow />
          </Link>
        </div>
      </section>

      <section className="container-wide pb-12 print:hidden">
        <div className="card p-8 md:p-10">
          <p className="eyebrow">Established resources</p>
          <h3 className="mt-2 font-serif text-2xl">More from immigration legal experts.</h3>
          <ul className="mt-4 grid gap-3 text-sm md:grid-cols-2">
            <li>
              <a className="btn-link" href="https://www.ilrc.org/red-cards-tarjetas-rojas" target="_blank" rel="noreferrer">
                ILRC Red Cards (multilingual) →
              </a>
              <p className="text-ink-muted">Wallet-size cards in 19+ languages from the Immigrant Legal Resource Center.</p>
            </li>
            <li>
              <a className="btn-link" href="https://www.aclu.org/know-your-rights/immigrants-rights" target="_blank" rel="noreferrer">
                ACLU Immigrants&rsquo; Rights →
              </a>
              <p className="text-ink-muted">Comprehensive guides for home, work, and detention scenarios.</p>
            </li>
            <li>
              <a className="btn-link" href="https://www.ilcm.org" target="_blank" rel="noreferrer">
                Immigrant Law Center of MN →
              </a>
              <p className="text-ink-muted">Local trainings and direct legal services for Minnesotans.</p>
            </li>
            <li>
              <a className="btn-link" href="https://www.unitedwedream.org/about/projects/deportation-defense-care-network/" target="_blank" rel="noreferrer">
                United We Dream Deportation Defense →
              </a>
              <p className="text-ink-muted">National hotline and resources, in English and Spanish.</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="container-wide pb-24 print:hidden">
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

