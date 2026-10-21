import type { Metadata, Viewport } from "next";
import "./globals.css";
import FloatingConnect from "./components/FloatingConnect";
import GoogleAnalytics from "./components/GoogleAnalytics";
import CookieConsent from "./components/CookieConsent";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#091427",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nova-growth-six.vercel.app"),
  title: "Nova Growth | Global SEO & Digital Marketing Agency",
  description: "Scale your organic traffic, high-intent leads, and revenue with custom SEO, web development, content marketing, and link building.",
  verification: {
    google: "eeg9kD9YKpMbiK9peLhAiYLzjjS7nDfw3sonfKdFrrU",
  },
  alternates: {
    canonical: "https://nova-growth-six.vercel.app",
  },
  openGraph: {
    title: "Nova Growth | Global SEO & Digital Marketing Agency",
    description: "Scale your organic traffic, high-intent leads, and revenue with custom SEO, web development, content marketing, and link building.",
    url: "https://nova-growth-six.vercel.app",
    siteName: "Nova Growth Agency",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nova Growth | Global SEO & Digital Marketing Agency",
    description: "Scale your organic traffic, high-intent leads, and revenue with custom SEO, web development, content marketing, and link building.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://nova-growth-six.vercel.app/#organization",
      name: "Nova Growth",
      url: "https://nova-growth-six.vercel.app",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+919694953370",
        contactType: "customer support",
        email: "shrahul270@gmail.com",
        availableLanguage: ["English", "Hindi"],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://nova-growth-six.vercel.app/#website",
      url: "https://nova-growth-six.vercel.app",
      name: "Nova Growth",
      publisher: {
        "@id": "https://nova-growth-six.vercel.app/#organization",
      },
    },
    {
      "@type": "ProfessionalService",
      name: "Nova Growth Agency",
      url: "https://nova-growth-six.vercel.app",
      telephone: "+919694953370",
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
    <html lang="en" className="overflow-x-hidden max-w-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-[#0a0a0f] text-white antialiased overflow-x-hidden max-w-full w-full">
        <GoogleAnalytics />
        {children}
        {/* Sabhi pages par 3D animated connect popup */}
        <FloatingConnect />
        {/* GDPR/CCPA Compliant Cookie Consent Banner */}
        <CookieConsent />
      </body>
    </html>
  );
}