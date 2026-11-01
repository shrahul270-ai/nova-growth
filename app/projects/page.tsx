import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Case Studies & Client Results | Balaji Prime Media",
  description:
    "Real client outcomes: discover how we helped B2B SaaS, e-commerce, and high-ticket service brands achieve dramatic increases in organic traffic, rankings, and ARR.",
  alternates: {
    canonical: "https://balajiprimemedia.in/projects",
  },
  openGraph: {
    title: "Case Studies & Client Results | Balaji Prime Media",
    description:
      "Real client outcomes: discover how we helped brands achieve dramatic increases in organic traffic, rankings, and ARR.",
    url: "https://balajiprimemedia.in/projects",
    siteName: "Balaji Prime Media",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies & Client Results | Balaji Prime Media",
    description:
      "Real client outcomes: discover how we helped brands achieve dramatic increases in organic traffic, rankings, and ARR.",
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
