import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import "../app/globals.css";
import { copy, SITE_URL, type Lang } from "@/lib/site";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" });
const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument", display: "swap" });

export const pageMeta = (lang: Lang) => {
  const c = copy[lang];
  const path = lang === "fr" ? "/" : "/en";
  return {
    metadataBase: new URL(SITE_URL),
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: path, languages: { fr: "/", en: "/en", "x-default": "/" } },
    openGraph: { title: c.metaTitle, description: c.metaDescription, url: path, siteName: "Avyro", locale: lang === "fr" ? "fr_TN" : "en_US", type: "website" as const },
    twitter: { card: "summary" as const, title: c.metaTitle, description: c.metaDescription },
  };
};

export default function Shell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Avyro",
    url: SITE_URL,
    areaServed: { "@type": "Country", name: "Tunisia" },
    description: copy[lang].metaDescription,
    inLanguage: lang,
    priceRange: "TND",
  };
  return (
    <html lang={lang} className={`${display.variable} ${sans.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
