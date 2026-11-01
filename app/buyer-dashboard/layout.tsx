import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buyer Dashboard | Balaji Prime Media",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function BuyerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
