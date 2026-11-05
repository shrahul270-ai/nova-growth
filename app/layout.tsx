import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import FloatingConnect from "./components/FloatingConnect";
import GoogleAnalytics from "./components/GoogleAnalytics";
import CookieConsent from "./components/CookieConsent";
import AnimatedBackground from "./components/AnimatedBackground";

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
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/logo-symbol.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/images/logo-icon-192.png",
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
        url: "/images/logo-original.png",
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
    images: ["/images/logo-original.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://balajiprimemedia.in/#organization",
      name: "Balaji Prime Media",
      url: "https://balajiprimemedia.in",
      logo: "https://balajiprimemedia.in/images/logo.png",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+917690868932",
        contactType: "customer support",
        email: "support@balajiprimemedia.in",
        availableLanguage: ["English", "Hindi"],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://balajiprimemedia.in/#website",
      url: "https://balajiprimemedia.in",
      name: "Balaji Prime Media",
      publisher: {
        "@id": "https://balajiprimemedia.in/#organization",
      },
    },
    {
      "@type": "ProfessionalService",
      name: "Balaji Prime Media",
      url: "https://balajiprimemedia.in",
      telephone: "+917690868932",
      priceRange: "$$$",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} overflow-x-hidden max-w-full`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&family=Lexend:wght@300;400;500&family=Google+Sans+Flex:opsz,wght@9..144,100..900&family=Inter+Tight:wght@400;500;600&family=Manrope:wght@400;500;600;700;800&family=Geist:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://db.onlinewebfonts.com/c/ca3d10781128664daddf89bf2e2d1305?family=Graphik+LCG+Regular+Regular"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* Google Official Preferred Sources Script */}
        <script async src="https://news.google.com/swg/js/v1/publisher.js" />
      </head>
      <body className="bg-[#0a0a0f] text-white antialiased overflow-x-hidden max-w-full w-full">
        <GoogleAnalytics />
        {/* Living Animated Background for All Pages (Particles, Aurora & Glow) */}
        <AnimatedBackground />
        {children}
        {/* Sabhi pages par 3D animated connect popup */}
        <FloatingConnect />
        {/* GDPR/CCPA Compliant Cookie Consent Banner */}
        <CookieConsent />
      </body>
    </html>
  );
}