import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";

export const metadata: Metadata = {
  title: "Our Values",
  description:
    "The principles under our work: dignity, solidarity, subsidiarity, and the common good — written in plain neighbor language."
};

// Catholic Social Teaching themes, translated into plain civic / neighbor
// language. Religious vocabulary is intentionally absent; the moral grammar
// is kept intact. Edit freely.
const principles = [
  {
    title: "Every person, an unrepeatable life",
    plain: "Dignity",
    body:
      "We start from a single conviction: every person carries a worth no government, paycheck, or paperwork can grant or revoke. Citizen or not. Housed or not. The work begins by seeing each other.",
    quote: "“The measure of a community is who it sees as fully human.”"
  },
  {
    title: "We belong to one another",
    plain: "Solidarity",
    body:
      "What hurts one of us hurts all of us. We don't accept any version of safety that's bought by leaving someone else exposed. The neighbor in trouble today is the reason we organized in the first place.",
    quote: "“Nobody's freedom is finished while anybody's is partial.”"
  },
  {
    title: "Decisions, as close to the people as possible",
    plain: "Subsidiarity",
    body:
      "Help should arrive from the level closest to the need — the block, the building, the parish hall, the storefront — and only then from the city, the state, the country. We resist the impulse to bigfoot what neighborhoods can do best themselves.",
    quote: "“The first responder is the person next door.”"
  },
  {
    title: "A community that works for the most fragile",
    plain: "The common good",
    body:
      "Policy is judged here by a simple test: does it widen the circle of people who can flourish, or narrow it? A common good isn't a compromise between interests — it's the floor we agree no one falls through.",
    quote: "“What we owe each other is not a leftover. It's the table.”"
  },
  {
    title: "First seat at the table for those with the least margin",
    plain: "Preferential care",
    body:
      "When we make a decision, the people most affected are not consulted at the end — they're the first voice. Especially the people the rest of the city has stopped listening to.",
    quote: "“The bottom of the wage scale is the top of our agenda.”"
  },
  {
    title: "Welcoming the stranger is not optional",
    plain: "Hospitality",
    body:
      "Most of us are descended from someone who arrived with nothing. The ethic of welcome is not a foreign virtue — it's the founding one. We extend it because it was extended to us.",
    quote: "“What a community calls a stranger today is what it calls itself tomorrow.”"
  },
  {
    title: "Work, fair and honored",
    plain: "Dignity of work",
    body:
      "A job should pay enough to live a life — to rest, to raise a family, to belong to a neighborhood. Workers are the authors of their work, not its instruments.",
    quote: "“Dignity is not a perk of the highest pay grade.”"
  },
  {
    title: "Care for the place we share",
    plain: "Stewardship",
    body:
      "The land, the lakes, the climate — these are not raw material. They are the inheritance we hand the next set of neighbors. We organize for housing and food the same way we organize for the world that holds them.",
    quote: "“We do not inherit the earth. We hold it for a minute.”"
  }
];

export default function ValuesPage() {
  return (
    <>
      <section className="container-page py-20 md:py-28">
        <SectionHeader
          eyebrow="What we hold"
          title="The principles under the work."
          lede="A short walk through the moral grammar of this organization. Eight ideas, each one ancient, each one ordinary, each one ours."
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
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-ember-700">
                  {p.plain}
                </p>
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
              These aren't slogans. They're the rubric we score ourselves by.
            </h3>
            <p className="mt-4 text-ink-soft">
              Every program, every dollar, every meeting gets held against
              these. If we get it wrong, tell us. The work belongs to the
              neighborhood, not to us.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
            <Link href="/take-action" className="btn-primary">
              Take action <Arrow />
            </Link>
            <Link href="/contact" className="btn-ghost">
              Tell us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
