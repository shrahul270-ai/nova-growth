import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "SEO Insights, Link Building & Web Strategy Blog | Balaji Prime Media",
  description:
    "Actionable search engine optimization guides, core update analysis, international link building strategies, and modern Next.js web engineering tips.",
  alternates: {
    canonical: "https://balajiprimemedia.in/blog",
  },
  openGraph: {
    title: "SEO Insights, Link Building & Web Strategy Blog | Balaji Prime Media",
    description:
      "Actionable search engine optimization guides, core update analysis, international link building strategies, and modern Next.js web engineering tips.",
    url: "https://balajiprimemedia.in/blog",
    siteName: "Balaji Prime Media",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://balajiprimemedia.in/images/blog/ecommerce-seo-scaling.jpg",
        secureUrl: "https://balajiprimemedia.in/images/blog/ecommerce-seo-scaling.jpg",
        width: 1200,
        height: 630,
        alt: "Balaji Prime Media SEO Insights & Blog",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Insights, Link Building & Web Strategy Blog | Balaji Prime Media",
    description:
      "Actionable search engine optimization guides, core update analysis, international link building strategies, and modern Next.js web engineering tips.",
    site: "@balajiprimemedia",
    creator: "@balajiprimemedia",
    images: ["https://balajiprimemedia.in/images/blog/ecommerce-seo-scaling.jpg"],
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
