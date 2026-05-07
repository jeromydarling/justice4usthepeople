// The English /know-your-rights page is bilingual (English + Spanish
// side-by-side). This /so route renders the same component with
// Somali-first metadata. Somali content for the cards themselves is on the
// roadmap; for now visitors get the bilingual EN+ES card with download
// links and printable PDF.
import type { Metadata } from "next";
import KYRPage from "@/app/know-your-rights/page";

export const metadata: Metadata = {
  title: "Ogow xuquuqdaada",
  description:
    "Kaadhadh laba-luqadood ee ku saabsan waxa la yiraahdo, waxa la saxiixo iyo waxa la sameeyo. La soo dejin karo PDF.",
  alternates: {
    languages: {
      en: "/know-your-rights",
      es: "/es/know-your-rights",
      so: "/so/know-your-rights"
    }
  }
};

export default KYRPage;
