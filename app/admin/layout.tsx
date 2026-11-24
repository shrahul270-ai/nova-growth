import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal | Balaji Prime Media",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dark bg-[#090d16] min-h-screen text-slate-100 selection:bg-indigo-600 selection:text-white antialiased">
      {children}
    </div>
  );
}
