import type { Metadata } from "next";
import { NewsFeed } from "@/components/NewsFeed";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "News & Updates",
  description:
    "Live ICE updates and immigration coverage from the outlets and community accounts we trust."
};

export default function NewsPage() {
  return (
    <>
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Watching together"
          title="ICE updates & local news."
          lede="A live, multi-source feed — Minnesota Public Radio, Sahan Journal, Star Tribune, and national immigration desks. Filter by topic or source. We never edit headlines."
        />
      </section>

      <section className="container-wide pb-20">
        <NewsFeed />
      </section>

      <section className="container-wide pb-24">
        <div className="card grid items-center gap-6 p-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow">Got a tip?</p>
            <h3 className="font-serif text-2xl md:text-3xl">
              Share what you're seeing.
            </h3>
            <p className="mt-2 text-ink-soft">
              Verified ICE activity, court roll-calls, raids, or local
              policy moves. We'll pass it to our rapid-response network.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <a className="btn-primary" href="tel:+16124241785">
              Call our hotline · 612-424-1785
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
