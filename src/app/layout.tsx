import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl = "https://www.sopat.cz";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SOPAT.CZ s.r.o. — hydroizolace plochých střech ČR a Slovensko",
    template: "%s | SOPAT.CZ s.r.o.",
  },
  description:
    "Hydroizolace, sanace a zateplení plochých střech. Vlastní zaměstnanci, ISO 9001, od roku 2000. Realizace po celé České republice i na Slovensku.",
  keywords: [
    "hydroizolace plochých střech Olomouc",
    "sanace střech ČR",
    "ploché střechy Olomouc",
    "izolace střech Blansko",
    "hydroizolace Slovensko",
    "mPVC fólie střecha",
    "SOPAT.CZ",
  ],
  authors: [{ name: "SOPAT.CZ s.r.o." }],
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    siteName: "SOPAT.CZ s.r.o.",
    title: "SOPAT.CZ s.r.o. — hydroizolace plochých střech ČR a Slovensko",
    description:
      "Hydroizolace, sanace a zateplení plochých střech vlastními lidmi. Od roku 2000, po celé ČR i na Slovensku.",
    images: [{ url: "/images/aerial-vsetin.jpg", width: 1581, height: 1030 }],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["RoofingContractor", "LocalBusiness"],
  name: "SOPAT.CZ s.r.o.",
  image: `${siteUrl}/images/aerial-vsetin.jpg`,
  url: siteUrl,
  telephone: "+420585531445",
  email: "info@sopat.cz",
  vatID: "CZ25857282",
  taxID: "25857282",
  foundingDate: "2000",
  slogan: "Střecha, na kterou už nebudete muset myslet.",
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "Sobáčov 3",
      addressLocality: "Mladeč",
      postalCode: "783 21",
      addressCountry: "CZ",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "Holická 568/31",
      addressLocality: "Olomouc – Hodolany",
      postalCode: "772 00",
      addressCountry: "CZ",
    },
  ],
  areaServed: [
    { "@type": "Country", name: "Czech Republic" },
    { "@type": "Country", name: "Slovakia" },
  ],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "ISO 9001",
  },
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hydroizolace plochých střech" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sanace, opravy a rekonstrukce střech" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Zateplení střech" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Izolace spodních staveb proti vlhkosti a radonu" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Klempířské práce" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Opravy a revize hromosvodů" } },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={`${fraunces.variable} ${plexSans.variable} ${plexMono.variable} h-full`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-full bg-paper text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-paper"
        >
          Přejít na hlavní obsah
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
