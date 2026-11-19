import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import FloatingConnect from "./components/FloatingConnect";
import AIVoiceWidget from "./components/AIVoiceWidget";
import GoogleAnalytics from "./components/GoogleAnalytics";
import CookieConsent from "./components/CookieConsent";
import AnimatedBackground from "./components/AnimatedBackground";
import AutoLoginPopup from "./components/AutoLoginPopup";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#091427",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://balajiprimemedia.in"),
  title: "Balaji Prime Media | Global SEO & Digital Growth Agency",
  description: "Scale your organic traffic, high-intent leads, and revenue with custom SEO, web development, content marketing, and link building by Balaji Prime Media.",
  verification: {
    google: "eeg9kD9YKpMbiK9peLhAiYLzjjS7nDfw3sonfKdFrrU",
  },
  alternates: {
    canonical: "https://balajiprimemedia.in",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/images/logo-symbol.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Balaji Prime Media | Global SEO & Digital Growth Agency",
    description: "Scale your organic traffic, high-intent leads, and revenue with custom SEO, web development, content marketing, and link building by Balaji Prime Media.",
    url: "https://balajiprimemedia.in",
    siteName: "Balaji Prime Media",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/bpm-complete-logo.png",
        width: 1015,
        height: 377,
        alt: "Balaji Prime Media Official Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Balaji Prime Media | Global SEO & Digital Growth Agency",
    description: "Scale your organic traffic, high-intent leads, and revenue with custom SEO, web development, content marketing, and link building by Balaji Prime Media.",
    images: ["/images/bpm-complete-logo.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://balajiprimemedia.in/#organization",
      name: "Balaji Prime Media",
      legalName: "Balaji Prime Media",
      alternateName: ["BPM Digital Agency", "Balaji Prime Media Global"],
      url: "https://balajiprimemedia.in",
      logo: {
        "@type": "ImageObject",
        url: "https://balajiprimemedia.in/images/bpm-complete-logo.png",
        width: 1015,
        height: 377,
        caption: "Balaji Prime Media Logo",
      },
      image: "https://balajiprimemedia.in/images/bpm-complete-logo.png",
      description:
        "Global digital marketing, technical SEO, high-DA guest posting, and Next.js web development agency driving scalable organic revenue for US, UK, and overseas enterprises.",
      telephone: "+917690868932",
      email: "support@balajiprimemedia.in",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Malviya Nagar",
        addressLocality: "Jaipur",
        addressRegion: "Rajasthan",
        postalCode: "302017",
        addressCountry: "IN",
      },
      sameAs: [
        "https://wa.me/917690868932",
        "https://t.me/balajiprimemedia",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+917690868932",
          contactType: "customer support",
          email: "support@balajiprimemedia.in",
          availableLanguage: ["English", "Hindi"],
          areaServed: ["US", "GB", "CA", "AU", "AE", "IN", "DE"],
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://balajiprimemedia.in/#website",
      url: "https://balajiprimemedia.in",
      name: "Balaji Prime Media",
      publisher: {
        "@id": "https://balajiprimemedia.in/#organization",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://balajiprimemedia.in/blog?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://balajiprimemedia.in/#professionalservice",
      name: "Balaji Prime Media - SEO, Guest Posting & Web Development Agency",
      url: "https://balajiprimemedia.in",
      telephone: "+917690868932",
      email: "support@balajiprimemedia.in",
      priceRange: "$$$",
      image: "https://balajiprimemedia.in/images/bpm-complete-logo.png",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Malviya Nagar",
        addressLocality: "Jaipur",
        addressRegion: "Rajasthan",
        postalCode: "302017",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 26.8533,
        longitude: 75.8052,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
      ],
      areaServed: [
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Country", name: "Canada" },
        { "@type": "Country", name: "Australia" },
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "Country", name: "Germany" },
        { "@type": "Country", name: "India" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Core Digital Growth Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Technical SEO & Organic Revenue Scaling",
              description: "Full-funnel keyword clustering, Core Web Vitals optimization, and international SERP domination.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "High-DA Guest Posting & Backlinks",
              description: "Manual white-hat outreach on vetted DR 50+ to DR 90+ authoritative publications.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Next.js & Full-Stack Web Development",
              description: "Headless, sub-second web applications and conversion-optimized digital platforms.",
            },
          },
        ],
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} overflow-x-hidden max-w-full light`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Unified Plus Jakarta Sans Font Scale */}
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        {/* Google & Multi-Platform Official Favicon Specifications */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* Google Official Preferred Sources Script */}
        <script async src="https://news.google.com/swg/js/v1/publisher.js" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{document.documentElement.classList.remove("dark");document.documentElement.classList.add("light");}catch(e){}})()`,
          }}
        />
      </head>
      <body className="bg-white text-slate-900 antialiased overflow-x-hidden max-w-full w-full font-sans">
        <GoogleAnalytics />
        {children}
        {/* Consolidated Single Floating Action (Fixes Issue 4: visual noise & overlap) */}
        <FloatingConnect />
        {/* GDPR/CCPA Compliant Cookie Consent Banner */}
        <CookieConsent />
      </body>
    </html>
  );
}