import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Balaji Prime Media | Schedule a Growth Strategy Call",
  description:
    "Get in touch with Balaji Prime Media. Book a dedicated discovery session to audit your website, discuss high-impact guest posting, or plan a global SEO rollout.",
  alternates: {
    canonical: "https://balajiprimemedia.in/contact",
  },
  openGraph: {
    title: "Contact Balaji Prime Media | Schedule a Growth Strategy Call",
    description:
      "Get in touch with Balaji Prime Media. Book a dedicated discovery session to audit your website, discuss high-impact guest posting, or plan a global SEO rollout.",
    url: "https://balajiprimemedia.in/contact",
    siteName: "Balaji Prime Media",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Balaji Prime Media | Schedule a Growth Strategy Call",
    description:
      "Get in touch with Balaji Prime Media. Book a dedicated discovery session to audit your website, discuss high-impact guest posting, or plan a global SEO rollout.",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
