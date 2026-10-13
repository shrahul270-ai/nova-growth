import type { Metadata } from "next";
import "./globals.css";
import FloatingConnect from "./components/FloatingConnect";

export const metadata: Metadata = {
  metadataBase: new URL("https://nova-growth-six.vercel.app"),
  title: "Nova Growth | Global SEO & Digital Marketing Agency",
  description: "Scale your organic traffic, high-intent leads, and revenue with custom SEO, web development, content marketing, and link building.",
  verification: {
    google: "eeg9kD9YKpMbiK9peLhAiYLzjjS7nDfw3sonfKdFrrU",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0f] text-white antialiased">
        {children}
        {/* Sabhi pages par 3D animated connect popup */}
        <FloatingConnect />
      </body>
    </html>
  );
}