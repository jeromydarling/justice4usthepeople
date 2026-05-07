import Link from "next/link";

// Small notice shown at the top of every machine-translated page so visitors
// know the page is an AI draft and can fall back to the English original
// if anything reads awkwardly. Keep tone humble, not alarming.
export function TranslationBanner({
  lang,
  englishHref
}: {
  lang: "es" | "so";
  englishHref: string;
}) {
  const text =
    lang === "es"
      ? {
          eyebrow: "Traducción en revisión",
          body:
            "Esta página es una traducción preliminar. Si algo no está claro, puede consultar la versión en inglés.",
          link: "Ver en inglés"
        }
      : {
          eyebrow: "Tarjamadda waa la dib u eegayaa",
          body:
            "Boggan waxaa lagu tarjumay si toos ah. Haddii wax aanad fahmin, fadlan eeg nooca Ingiriisiga.",
          link: "Eeg Ingiriisi"
        };
  return (
    <div className="border-b border-ember-300 bg-ember-50">
      <div className="container-wide flex flex-wrap items-center justify-between gap-3 py-3 text-sm">
        <p className="text-ember-900">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ember-700">
            {text.eyebrow}
          </span>
          <span className="ml-3">{text.body}</span>
        </p>
        <Link
          href={englishHref}
          hrefLang="en"
          className="btn-link text-xs"
        >
          {text.link} →
        </Link>
      </div>
    </div>
  );
}
