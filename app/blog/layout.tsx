import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights & Blog | Strategic SEO & Digital Growth",
  description:
    "Actionable digital marketing insights, SEO blueprints, Next.js web development best practices, and international scaling strategies from the Nova Growth team.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
