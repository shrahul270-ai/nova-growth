import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | High-ROI Digital Marketing & SEO",
  description:
    "Explore our full suite of digital solutions: High-Intent SEO, Next.js Web Development, Content Marketing, Link Building, and Maintenance for global businesses.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
