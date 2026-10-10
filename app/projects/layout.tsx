import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies & Client Results | Nova Growth",
  description:
    "Explore proven growth case studies: +340% organic revenue for US E-Commerce, 50k+ mobile downloads, and #1 Google Map Pack rankings in the UK.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
