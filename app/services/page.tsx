import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "SEO, Web Development & Growth Services | Balaji Prime Media",
  description:
    "Explore our full-funnel digital growth services: Data-Driven SEO, ultra-fast Next.js web development, editorial link building, and digital PR for global brands.",
  alternates: {
    canonical: "https://balajiprimemedia.in/services",
  },
  openGraph: {
    title: "SEO, Web Development & Growth Services | Balaji Prime Media",
    description:
      "Full-funnel digital growth services: Data-Driven SEO, ultra-fast Next.js web development, editorial link building, and digital PR.",
    url: "https://balajiprimemedia.in/services",
    siteName: "Balaji Prime Media",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO, Web Development & Growth Services | Balaji Prime Media",
    description:
      "Full-funnel digital growth services: Data-Driven SEO, ultra-fast Next.js web development, editorial link building, and digital PR.",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
