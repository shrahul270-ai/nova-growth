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
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Insights, Link Building & Web Strategy Blog | Balaji Prime Media",
    description:
      "Actionable search engine optimization guides, core update analysis, international link building strategies, and modern Next.js web engineering tips.",
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
