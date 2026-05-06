import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";

export const metadata: Metadata = {
  title: "Stories",
  description:
    "Real moments, real neighbors — what happens when a community stands together. Names changed and details obscured to protect privacy."
};

// Stories are intentionally small and human. Names are pseudonyms; details
// have been generalized. Add new stories by copying a block — Claude can help
// the team rewrite a real case into a privacy-safe vignette on request.
type Story = {
  id: string;
  title: string;
  lede: string;
  body: string;
  tag: string;
};

const stories: Story[] = [
  {
    id: "rosa-rent",
    title: "When the rent letter came",
    lede:
      "A mother of two opened a 14-day notice to vacate. Twelve days later, she signed a new lease.",
    body:
      "Rosa called the hotline on a Tuesday. By Thursday a volunteer had walked her through her options, by Saturday the eviction filing had been challenged, and within two weeks our rental relief fund had paid the back balance directly to her landlord. She kept her apartment, her kids stayed in their school, and Rosa came back the next month — to volunteer.",
    tag: "Rental & utility relief"
  },
  {
    id: "amir-court",
    title: "Showing up in court",
    lede:
      "A first-generation college student walked into immigration court alone. He didn't leave alone.",
    body:
      "Amir's hearing was set in Bloomington with two days notice. Our court-support volunteers met him in the lobby in matching shirts, sat in the gallery, and waited with his family. The judge granted continuance. Amir told us later that the only thing he remembers is looking back and seeing the row of neighbors behind him.",
    tag: "Court accompaniment"
  },
  {
    id: "ana-grocery",
    title: "Groceries, and then some",
    lede:
      "What started as a food-shelf delivery turned into a neighborhood network.",
    body:
      "Ana came to a Saturday distribution for the first time in October. By December, she was helping organize the route — translating for new arrivals, packing boxes, riding along on deliveries. The food was the door; the work was rebuilding the kind of neighborly fabric our city used to take for granted.",
    tag: "Food relief"
  }
];

// Replace these placeholders with the real curated stories from your team.
// Edit `stories` above — each entry becomes a card on this page.
export default function StoriesPage() {
  return (
    <>
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Stories"
          title="The work, in human terms."
          lede="Names and details have been changed where requested. The neighbors are real, the calls were real, the outcomes are real."
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
                <p className="border-l-2 border-ember-300 pl-4 text-sm text-ink-soft">
                  {s.body}
                </p>
              </article>
            </li>
          ))}
        </ul>

        <p className="mt-12 max-w-2xl text-sm text-ink-muted">
          <strong className="text-ink">A note on consent and privacy.</strong>{" "}
          Every story published here was shared with explicit permission.
          Identifying details — names, employers, addresses, court venues — are
          changed unless the storyteller asked us to keep them. We never
          publish a name or photograph someone wasn&rsquo;t asked.
        </p>
      </section>

      <section className="container-wide pb-24">
        <div className="card grid items-center gap-6 p-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow">Want to share yours?</p>
            <h3 className="font-serif text-2xl md:text-3xl">
              Your story can change someone&rsquo;s mind.
            </h3>
            <p className="mt-3 text-ink-soft">
              We&rsquo;ll talk first about what you&rsquo;re comfortable with —
              what to share, what to change, what to keep. You stay in
              control.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link href="/contact?topic=story" className="btn-primary">
              Talk with us <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
