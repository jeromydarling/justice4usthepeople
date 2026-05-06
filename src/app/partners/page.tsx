import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Coalition Partners",
  description:
    "The organizations we stand with — across faith, labor, advocacy, and direct service in Minnesota."
};

type CoalitionPartner = {
  name: string;
  short?: string;
  blurb: string;
  url?: string;
  logo?: string; // /public path
  category: "advocacy" | "faith" | "service" | "legal" | "labor";
};

// To add a partner: drop a logo SVG/PNG into /public/partners/, add a block
// here with the path, and push. Logos render in a 9-square grid; favor square
// or near-square crops at 1:1.
const partners: CoalitionPartner[] = [
  {
    name: "African Education Development Society",
    short: "AEDS",
    blurb:
      "East African community development, education, and youth programming in the Twin Cities.",
    logo: "/partners/aeds.svg",
    category: "service"
  },
  {
    name: "Somali Youth Link",
    short: "S.Y.L.",
    blurb:
      "Mentorship, leadership, and advocacy with and for Somali youth in Minnesota.",
    logo: "/partners/syl.svg",
    category: "service"
  },
  {
    name: "Immigrant Law Center of Minnesota",
    short: "ILCM",
    blurb:
      "Direct immigration legal services, naturalization clinics, and Know-Your-Rights training statewide.",
    url: "https://www.ilcm.org",
    category: "legal"
  },
  {
    name: "MIRAC — MN Immigrant Rights Action Committee",
    short: "MIRAC",
    blurb:
      "Coordinates Minnesota's rapid-response network for verified ICE activity and community defense.",
    url: "https://miracmn.org",
    category: "advocacy"
  },
  {
    name: "ISAIAH Minnesota",
    blurb:
      "Multiracial faith coalition organizing for racial and economic justice.",
    url: "https://isaiahmn.org",
    category: "faith"
  },
  {
    name: "CTUL — Centro de Trabajadores Unidos en Lucha",
    short: "CTUL",
    blurb:
      "Worker-led organizing for low-wage workers. Wage-theft clinics and KYR-at-work trainings.",
    url: "https://ctul.net",
    category: "labor"
  },
  {
    name: "COPAL Minnesota",
    blurb:
      "Latinx-led racial-justice organization. Workers' rights, immigration, and civic engagement.",
    url: "https://www.copalmn.org",
    category: "advocacy"
  },
  {
    name: "MN Interfaith Coalition on Immigration",
    blurb:
      "A coalition of faith communities offering accompaniment, sanctuary, and pastoral support.",
    category: "faith"
  }
];

const categoryLabels: Record<CoalitionPartner["category"], string> = {
  advocacy: "Advocacy",
  faith: "Faith",
  service: "Direct service",
  legal: "Legal",
  labor: "Labor"
};

export default function PartnersPage() {
  return (
    <>
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Coalition"
          title="In community with."
          lede="The work is bigger than any one organization. These are the partners we stand with — across faith, labor, legal aid, and direct service. If you're an organization that should be on this list, get in touch."
        />
      </section>

      <section className="container-wide pb-12">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((p) => (
            <li key={p.name}>
              <article className="card flex h-full flex-col gap-3 p-6">
                <div className="flex items-center gap-4">
                  {p.logo ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={asset(p.logo)}
                      alt={p.name}
                      width={56}
                      height={56}
                      className="h-14 w-14 shrink-0"
                    />
                  ) : (
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-indigo-700/10 font-serif text-xl text-indigo-700">
                      {(p.short ?? p.name).slice(0, 1)}
                    </div>
                  )}
                  <div>
                    <p className="eyebrow">{categoryLabels[p.category]}</p>
                    <h3 className="mt-0.5 font-serif text-lg leading-snug">
                      {p.short ?? p.name}
                    </h3>
                    {p.short && (
                      <p className="text-xs text-ink-muted">{p.name}</p>
                    )}
                  </div>
                </div>
                <p className="text-sm text-ink-soft">{p.blurb}</p>
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-link mt-auto inline-flex pt-2 text-sm"
                  >
                    Visit site <Arrow />
                  </a>
                )}
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-wide pb-24">
        <div className="card grid items-center gap-6 p-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow">For organizations</p>
            <h3 className="font-serif text-2xl md:text-3xl">
              Stand with us, publicly.
            </h3>
            <p className="mt-3 text-ink-soft">
              We endorse and amplify partner work — events, joint statements,
              open letters. Send a note about your org and what we might do
              together.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link href="/contact?topic=coalition" className="btn-primary">
              Reach out <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
