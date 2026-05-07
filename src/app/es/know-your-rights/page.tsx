// The English /know-your-rights page is already bilingual (English + Spanish
// side-by-side), so the /es route just renders the same component with
// Spanish-first metadata. No translation banner — the content is real.
import type { Metadata } from "next";
import KYRPage from "@/app/know-your-rights/page";

export const metadata: Metadata = {
  title: "Conozca sus derechos",
  description:
    "Tarjetas bilingües sobre qué decir, qué firmar y qué hacer. Descargables como PDF e imprimibles.",
  alternates: { languages: { en: "/know-your-rights", es: "/es/know-your-rights", so: "/so/know-your-rights" } }
};

export default KYRPage;
