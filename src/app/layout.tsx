import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";
import { asset } from "@/lib/asset";

const ogImage = asset("/og/og-default.png");

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.mission,
  openGraph: {
    title: site.name,
    description: site.mission,
    type: "website",
    siteName: site.name,
    locale: "en_US",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.tagline}`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.mission,
    images: [ogImage]
  },
  icons: {
    icon: "/icon.svg"
  }
};

export const viewport: Viewport = {
  themeColor: "#fbf8f2"
};

// JSON-LD Organization data — helps Google understand who we are and surface
// us in knowledge panels / sitelinks. The same blob is rendered into every
// page via the root layout.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: site.name,
  alternateName: site.shortName,
  url: site.url,
  logo: `${site.url}${asset("/brand/logo-loon.png")}`,
  image: `${site.url}${ogImage}`,
  description: site.mission,
  email: site.contact.email,
  telephone: site.contact.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Twin Cities",
    addressRegion: "MN",
    addressCountry: "US"
  },
  sameAs: [site.social.instagram, site.social.facebook, site.social.bluesky]
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  inLanguage: "en-US"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Editorial type pairing: Fraunces (serif, dignified) + Inter (sans, calm). */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap"
        />
        {/* Structured data — Organization + WebSite. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-indigo-700 focus:px-3 focus:py-2 focus:text-bone-50"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
