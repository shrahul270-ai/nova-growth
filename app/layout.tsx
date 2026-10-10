import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-handwriting",
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://novagrowth.agency"),
  title: {
    default: "Nova Growth | Global Digital Marketing & Growth Agency",
    template: "%s | Nova Growth Agency",
  },
  description:
    "Nova Growth is a global digital marketing agency helping businesses scale through strategic SEO, high-converting website development, content marketing, and performance-focused digital solutions.",
  keywords: [
    "global digital marketing agency",
    "international SEO services",
    "b2b seo agency usa uk",
    "high converting web development",
    "off page link building",
    "ecommerce seo agency",
    "local business growth",
    "saas marketing agency",
    "content marketing strategy",
  ],
  authors: [{ name: "Nova Growth Agency" }],
  creator: "Nova Growth",
  publisher: "Nova Growth",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nova Growth | Global Digital Marketing Agency",
    description:
      "Grow smarter. Go further. End-to-end SEO, Web Development, and Performance Marketing for high-growth businesses worldwide.",
    url: "https://novagrowth.agency",
    siteName: "Nova Growth",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nova Growth - Digital Marketing Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nova Growth | Global Digital Marketing Agency",
    description:
      "Grow smarter. Go further. Results-driven SEO, Web Development, and Digital Marketing for global businesses.",
    images: ["/og-image.jpg"],
    creator: "@novagrowth",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

import FloatingChat from "./components/FloatingChat";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${caveat.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="antialiased bg-[#f8fbf9] text-[#111827] font-sans selection:bg-[#059669] selection:text-white">
        {children}
        <FloatingChat />
      </body>
    </html>
  );
}