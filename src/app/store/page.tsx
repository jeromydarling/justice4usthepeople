import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/lib/products";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";

export const metadata: Metadata = {
  title: "Store",
  description:
    "Yard signs, t-shirts, and buttons. Every purchase funds the relief programs."
};

export default function StorePage() {
  return (
    <>
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Store"
          title="Wear it. Plant it. Pin it."
          lede="A small line of merch that turns a sidewalk, a lapel, or a front yard into a quiet declaration. Every purchase funds the relief programs — there is no separate margin."
        />
      </section>

      <section className="container-wide pb-20">
        <ul className="grid gap-6 md:grid-cols-3">
          {products.map((p) => {
            const wired = p.paymentLink && !p.paymentLink.includes("xxx");
            return (
              <li key={p.id} className="card flex h-full flex-col overflow-hidden">
                <div
                  className="aspect-[4/5] w-full"
                  style={{ background: p.art }}
                  aria-hidden
                >
                  {p.imageSrc && (
                    <img src={p.imageSrc} alt={p.name} className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-xl">{p.name}</h3>
                    <span className="font-serif text-xl text-indigo-800">{p.price}</span>
                  </div>
                  <p className="text-ink-soft">{p.blurb}</p>
                  <div className="mt-auto pt-2">
                    {!p.inStock ? (
                      <span className="btn-ghost cursor-not-allowed opacity-70">
                        Out of stock — restock soon
                      </span>
                    ) : wired ? (
                      <a
                        href={p.paymentLink}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-primary"
                      >
                        Buy now <Arrow />
                      </a>
                    ) : (
                      <span className="text-xs text-ember-700">
                        Setup: paste Stripe Payment Link into <code>{p.envVar}</code>.
                      </span>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="container-wide pb-24">
        <div className="card grid items-center gap-6 p-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow">Bulk orders</p>
            <h3 className="font-serif text-2xl md:text-3xl">
              Outfitting a block, a school, a parish, a union local?
            </h3>
            <p className="mt-3 text-ink-soft">
              We discount bulk orders and can ship in batches. Send us a note
              with the quantity and the delivery date you need.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link href="/contact?topic=bulk" className="btn-primary">
              Request a quote <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
