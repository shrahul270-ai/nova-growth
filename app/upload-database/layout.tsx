import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upload Database | Balaji Prime Media",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function UploadDatabaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
