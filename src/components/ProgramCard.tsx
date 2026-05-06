import Link from "next/link";
import { ReactNode } from "react";

export type Program = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  // The dignity statement — the human reason this program exists.
  dignityNote: string;
  icon: ReactNode;
  ctaLabel?: string;
};

export function ProgramCard({ p }: { p: Program }) {
  return (
    <article className="card group flex h-full flex-col overflow-hidden">
      <div className="flex items-center gap-3 border-b border-ink/10 bg-bone-100 px-6 py-5">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-indigo-900 text-ember-200">
          {p.icon}
        </span>
        <div>
          <h3 className="text-xl">{p.name}</h3>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 px-6 py-6">
        <p className="text-ink-soft">{p.description}</p>
        <p className="border-l-2 border-ember-400 pl-4 font-serif text-base italic text-ink/80">
          {p.dignityNote}
        </p>
        <div className="mt-auto pt-2">
          <Link href={`/get-help/${p.slug}`} className="btn-primary">
            {p.ctaLabel ?? "Apply"}
            <Arrow />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
