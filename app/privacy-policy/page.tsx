import React from "react";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Balaji Prime Media",
  description: "Learn how Balaji Prime Media collects, uses, and protects your personal and business information.",
  alternates: {
    canonical: "https://balajiprimemedia.in/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#070c18] text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="mb-10 text-center sm:text-left border-b border-gray-800 pb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d97706] mb-2 block">
            Legal & Compliance
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            Last Updated: November 1, 2026 • Balaji Prime Media
          </p>
        </div>

        <div className="space-y-8 text-sm leading-relaxed text-gray-300">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">1. Introduction</h2>
            <p>
              Welcome to <strong>Balaji Prime Media</strong> (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). We provide search engine optimization, web development, content marketing, guest posting, and digital growth services to clients across the United States, United Kingdom, Europe, and globally.
            </p>
            <p>
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at <a href="https://balajiprimemedia.in" className="text-blue-400 hover:underline">https://balajiprimemedia.in</a> or use our services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">2. Information We Collect</h2>
            <p>We may collect information about you in a variety of ways:</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-300">
              <li><strong>Contact & Inbound Details:</strong> Name, work email address, company URL, phone number, and campaign requirements submitted via our inquiry or free audit forms.</li>
              <li><strong>Billing & Invoice Information:</strong> Business name, tax registration or billing address when processing retainer agreements through secure payment processors (Stripe, PayPal, Wise, or Wire Transfer).</li>
              <li><strong>Technical & Analytical Data:</strong> IP address, browser type, operating system, pages viewed, and referral URLs collected automatically through cookies and Google Analytics.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. How We Use Your Information</h2>
            <p>We use the collected information strictly for legitimate business purposes:</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-300">
              <li>To conduct comprehensive SEO audits and prepare customized organic growth proposals.</li>
              <li>To execute link-building placements, guest posts, and technical SEO optimizations.</li>
              <li>To communicate project milestones, monthly reporting, and invoice notifications.</li>
              <li>To safeguard against fraudulent inquiries and ensure website security.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">4. Data Sharing & Third Parties</h2>
            <p>
              We do <strong>not</strong> sell, trade, or rent your personal information to third parties. We share data only with trusted service providers strictly necessary to execute our services:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-300">
              <li>Secure payment processors (Stripe, PayPal, Wise) for PCI-compliant invoice settlement.</li>
              <li>Infrastructure and analytics tools (Vercel, Google Analytics) for uptime and performance monitoring.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">5. International Data Transfers (GDPR & CCPA Compliance)</h2>
            <p>
              If you are accessing our site from the European Economic Area (EEA), the United Kingdom, or the United States, your information is processed in compliance with applicable data protection laws, including GDPR and CCPA. You have the right to request access, correction, or deletion of your personal data at any time.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">6. Contact Our Data Protection Lead</h2>
            <p>
              If you have any questions or requests regarding this Privacy Policy or your personal information, please contact us at:
            </p>
            <div className="bg-[#0b1220] p-4 rounded-xl border border-gray-800 space-y-1 text-xs">
              <p><strong className="text-white">Balaji Prime Media</strong></p>
              <p>Email: <a href="mailto:support@balajiprimemedia.in" className="text-blue-400 hover:underline">support@balajiprimemedia.in</a></p>
              <p>Website: <a href="https://balajiprimemedia.in" className="text-blue-400 hover:underline">https://balajiprimemedia.in</a></p>
              <p>Direct Support: +91 76908 68932</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
