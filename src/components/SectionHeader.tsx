import { ReactNode } from "react";
import clsx from "clsx";

export function SectionHeader({
  eyebrow,
  title,
  lede,
  align = "left",
  className
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <header
      className={clsx(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3">{title}</h2>
      {lede && (
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">{lede}</p>
      )}
    </header>
  );
}
