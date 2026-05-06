import type { Metadata } from "next";
import { stripeLinks, site } from "@/lib/site";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";

export const metadata: Metadata = {
  title: "Donate",
  description: "Give securely — every dollar becomes rent paid, groceries delivered, or a court fee covered."
};

const presets: { amount: string; label: string; impact: string; key: keyof typeof stripeLinks.donate }[] = [
  { amount: "25",  label: "$25",  impact: "A week of groceries for a family of three.", key: "25" },
  { amount: "50",  label: "$50",  impact: "A consultation with an immigration attorney.", key: "50" },
  { amount: "100", label: "$100", impact: "Half a month's utilities for a household in crisis.", key: "100" },
  { amount: "250", label: "$250", impact: "A month of back-rent that stops an eviction.", key: "250" }
];

export default function DonatePage() {
  return (
    <>
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Donate"
          title="Funded by neighbors. Spent on neighbors."
          lede="Every contribution becomes something a family in our network can use this week — rent paid, groceries delivered, a court fee covered. We're small on overhead and long on follow-through."
        />
      </section>

      <section className="container-wide pb-16">
        <div className="grid gap-6 md:grid-cols-4">
          {presets.map((p) => {
            const link = stripeLinks.donate[p.key];
            const wired = link && !link.includes("xxx");
            return (
              <article key={p.amount} className="card flex h-full flex-col gap-4 p-6 text-center">
                <p className="font-serif text-4xl text-indigo-800">{p.label}</p>
                <p className="text-sm text-ink-soft">{p.impact}</p>
                {wired ? (
                  <a className="btn-primary mt-auto self-stretch" href={link} target="_blank" rel="noreferrer">
                    Give {p.label}
                  </a>
                ) : (
                  <span className="mt-auto text-xs text-ember-700">
                    Setup: <code>NEXT_PUBLIC_STRIPE_DONATE_{p.amount}</code>
                  </span>
                )}
              </article>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <CustomCard />
          <GoFundMeCard />
        </div>
      </section>

      <section className="container-wide pb-24">
        <div className="card grid gap-6 p-8 md:grid-cols-12 md:p-10">
          <div className="md:col-span-7">
            <p className="eyebrow">Where your dollar goes</p>
            <h3 className="mt-2 font-serif text-2xl md:text-3xl">
              Most of what you give is delivered to a household within seven days.
            </h3>
          </div>
          <ul className="md:col-span-5 space-y-3">
            <Bar label="Rental & utility relief" pct={42} />
            <Bar label="Food relief" pct={28} />
            <Bar label="Legal navigation" pct={22} />
            <Bar label="Operations & supplies" pct={8} />
          </ul>
        </div>
        <p className="mt-3 text-xs text-ink-muted">
          Sample allocation. Replace with your live numbers in <code>src/app/donate/page.tsx</code>.
        </p>
      </section>
    </>
  );
}

function CustomCard() {
  const link = stripeLinks.donate.custom;
  const wired = link && !link.includes("xxx");
  return (
    <article className="card flex flex-col gap-4 p-8">
      <p className="eyebrow">Choose your amount</p>
      <h3 className="font-serif text-2xl">Give a one-time gift in any amount.</h3>
      <p className="text-ink-soft">
        Secure checkout via Stripe. You'll see the amount field on the next page.
      </p>
      {wired ? (
        <a href={link} target="_blank" rel="noreferrer" className="btn-primary self-start">
          Open secure checkout <Arrow />
        </a>
      ) : (
        <p className="text-sm text-ember-700">
          Setup: paste your Stripe Payment Link into <code>NEXT_PUBLIC_STRIPE_DONATE_CUSTOM</code>.
        </p>
      )}
    </article>
  );
}

function GoFundMeCard() {
  return (
    <article className="card flex flex-col gap-4 p-8">
      <p className="eyebrow">Or use our existing campaign</p>
      <h3 className="font-serif text-2xl">Prefer GoFundMe?</h3>
      <p className="text-ink-soft">
        We still accept gifts through our long-running GoFundMe page. Same destination, same impact.
      </p>
      <a
        href={site.gofundmeUrl}
        target="_blank"
        rel="noreferrer"
        className="btn-ghost self-start"
      >
        Open the GoFundMe <Arrow />
      </a>
      <p className="text-xs text-ink-muted">
        Note: GoFundMe doesn't allow embedding, so the campaign opens in a new tab.
      </p>
    </article>
  );
}

function Bar({ label, pct }: { label: string; pct: number }) {
  return (
    <li>
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span className="text-ink-muted">{pct}%</span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-ink/5">
        <div className="h-full rounded-full bg-indigo-700" style={{ width: `${pct}%` }} />
      </div>
    </li>
  );
}

