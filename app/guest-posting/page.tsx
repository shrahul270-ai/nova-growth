import type { Metadata } from "next";
import GuestPostingClient from "./GuestPostingClient";

export const metadata: Metadata = {
  title: "Digital PR & Editorial Media Outreach Services | Balaji Prime Media",
  description:
    "Elevate brand authority with white-hat digital PR, editorial outreach, and verified media coverage complying strictly with Google Search Essentials.",
  alternates: {
    canonical: "https://balajiprimemedia.in/guest-posting",
  },
  openGraph: {
    title: "Digital PR & Editorial Media Outreach Services | Balaji Prime Media",
    description:
      "Elevate brand authority with white-hat digital PR, editorial outreach, and verified media coverage complying strictly with Google Search Essentials.",
    url: "https://balajiprimemedia.in/guest-posting",
    siteName: "Balaji Prime Media",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital PR & Editorial Media Outreach Services | Balaji Prime Media",
    description:
      "White-hat digital PR, editorial outreach, and verified media coverage complying strictly with Google Search Essentials.",
  },
};

export default function GuestPostingPage() {
  return <GuestPostingClient />;
}
