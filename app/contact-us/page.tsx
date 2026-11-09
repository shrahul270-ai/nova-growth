import type { Metadata } from "next";
import ContactClient from "../contact/ContactClient";

export const metadata: Metadata = {
  title: "Contact Us - Balaji Prime Media | Schedule a Growth Strategy Call",
  description:
    "Get in touch with Balaji Prime Media. Book a dedicated discovery session to audit your website, discuss high-impact guest posting, or plan a global SEO rollout.",
  alternates: {
    canonical: "https://balajiprimemedia.in/contact-us",
  },
  openGraph: {
    title: "Contact Us - Balaji Prime Media | Schedule a Growth Strategy Call",
    description:
      "Get in touch with Balaji Prime Media. Book a dedicated discovery session to audit your website, discuss high-impact guest posting, or plan a global SEO rollout.",
    url: "https://balajiprimemedia.in/contact-us",
    siteName: "Balaji Prime Media",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - Balaji Prime Media | Schedule a Growth Strategy Call",
    description:
      "Get in touch with Balaji Prime Media. Book a dedicated discovery session to audit your website, discuss high-impact guest posting, or plan a global SEO rollout.",
  },
};

export default function ContactUsPage() {
  return <ContactClient />;
}
