import type { Metadata } from "next";
import GuestPostingClient from "./GuestPostingClient";

export const metadata: Metadata = {
  title: "Buy High-Authority Guest Posts & Editorial Backlinks | Balaji Prime Media",
  description:
    "Scale your organic rankings with vetted DR 40–90+ guest posts and contextual editorial backlinks. 100% Do-Follow, natural in-content placements with lifetime indexation warranty.",
  alternates: {
    canonical: "https://balajiprimemedia.in/guest-posting",
  },
  openGraph: {
    title: "Buy High-Authority Guest Posts & Editorial Backlinks | Balaji Prime Media",
    description:
      "Scale your organic rankings with vetted DR 40–90+ guest posts and contextual editorial backlinks. 100% Do-Follow with lifetime indexation warranty.",
    url: "https://balajiprimemedia.in/guest-posting",
    siteName: "Balaji Prime Media",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy High-Authority Guest Posts & Editorial Backlinks | Balaji Prime Media",
    description:
      "Vetted DR 40–90+ guest posts and contextual editorial backlinks with lifetime indexation warranty.",
  },
};

export default function GuestPostingPage() {
  return <GuestPostingClient />;
}
