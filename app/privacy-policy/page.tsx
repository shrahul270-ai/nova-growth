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
    <div className="min-h-screen bg-[#07030d] text-neutral-300 flex flex-col font-satoshi selection:bg-[#681fe4] selection:text-white relative overflow-hidden">
      {/* Background Grid Pattern & Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(104,31,228,0.18),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-white-240 opacity-40 pointer-events-none" />

      {/* Top Navbar */}
      <div className="relative z-50">
        <Navbar />
      </div>

      <main className="flex-1 max-w-[1000px] mx-auto px-6 sm:px-12 pt-28 sm:pt-36 pb-20 relative z-10 w-full">
        <div className="mb-12 border-b border-white/10 pb-8">
          <span className="font-bebas text-xs tracking-[0.24em] text-[#681fe4] uppercase block mb-2">
            // LEGAL &amp; COMPLIANCE
          </span>
          <h1 className="font-bebas text-4xl sm:text-6xl tracking-[0.14em] text-white uppercase leading-none">
            PRIVACY POLICY
          </h1>
          <p className="text-xs font-mono text-neutral-500 mt-3">
            Last Updated: November 1, 2026 • Balaji Prime Media
          </p>
        </div>

        <div className="space-y-10 text-sm leading-relaxed text-neutral-300 font-normal">
          <section className="space-y-6">
            <h2 className="font-bebas text-2xl sm:text-3xl tracking-[0.14em] text-white uppercase border-b border-white/10 pb-3">
              DATA COLLECTION &amp; PROCESSING PRINCIPLES
            </h2>
            <div className="space-y-3">
              <h3 className="font-bebas text-lg tracking-[0.12em] uppercase text-white">1. Introduction</h3>
              <p>
                Welcome to <strong>Balaji Prime Media</strong> (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). We provide search engine optimization, web development, content marketing, guest posting, and digital growth services to clients across the United States, United Kingdom, Europe, and globally.
              </p>
              <p>
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at <a href="https://balajiprimemedia.in" className="text-[#681fe4] hover:underline">https://balajiprimemedia.in</a> or use our services.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-bebas text-lg tracking-[0.12em] uppercase text-white">2. Information We Collect</h3>
              <p>We may collect information about you in a variety of ways:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-neutral-300">
                <li><strong>Contact &amp; Inbound Details:</strong> Name, work email address, company URL, phone number, and campaign requirements submitted via our inquiry or free audit forms.</li>
                <li><strong>Billing &amp; Invoice Information:</strong> Business name, tax registration or billing address when processing retainer agreements through secure payment processors (Stripe, PayPal, Wise, or Wire Transfer).</li>
                <li><strong>Technical &amp; Analytical Data:</strong> IP address, browser type, operating system, pages viewed, and referral URLs collected automatically through cookies and Google Analytics.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-bebas text-lg tracking-[0.12em] uppercase text-white">3. How We Use Your Information</h3>
              <p>We use the collected information strictly for legitimate business purposes:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-neutral-300">
                <li>To conduct comprehensive SEO audits and prepare customized organic growth proposals.</li>
                <li>To execute link-building placements, guest posts, and technical SEO optimizations.</li>
                <li>To communicate project milestones, monthly reporting, and invoice notifications.</li>
                <li>To safeguard against fraudulent inquiries and ensure website security.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-6 pt-6">
            <h2 className="font-bebas text-2xl sm:text-3xl tracking-[0.14em] text-white uppercase border-b border-white/10 pb-3">
              PRIVACY RIGHTS &amp; LEGAL COMPLIANCE
            </h2>
            <div className="space-y-3">
              <h3 className="font-bebas text-lg tracking-[0.12em] uppercase text-white">4. Data Sharing &amp; Third Parties</h3>
              <p>
                We do <strong>not</strong> sell, trade, or rent your personal information to third parties. We share data only with trusted service providers strictly necessary to execute our services:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-neutral-300">
                <li>Secure payment processors (Stripe, PayPal, Wise) for PCI-compliant invoice settlement.</li>
                <li>Infrastructure and analytics tools (Vercel, Google Analytics) for uptime and performance monitoring.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-bebas text-lg tracking-[0.12em] uppercase text-white">5. International Data Transfers (GDPR &amp; CCPA Compliance)</h3>
              <p>
                If you are accessing our site from the European Economic Area (EEA), the United Kingdom, or the United States, your information is processed in compliance with applicable data protection laws, including GDPR and CCPA. You have the right to request access, correction, or deletion of your personal data at any time.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-bebas text-lg tracking-[0.12em] uppercase text-white">6. Contact Our Data Protection Lead</h3>
              <p>
                If you have any questions or requests regarding this Privacy Policy or your personal information, please contact us at:
              </p>
              <div className="bg-[#0c0818] p-6 rounded-[4px] border border-white/10 space-y-1.5 text-xs font-mono">
                <p><strong className="text-white font-bebas text-sm tracking-[0.12em] uppercase">Balaji Prime Media Data Office</strong></p>
                <p className="text-neutral-400">Email: <a href="mailto:support@balajiprimemedia.in" className="text-[#681fe4] hover:underline">support@balajiprimemedia.in</a></p>
                <p className="text-neutral-400">Website: <a href="https://balajiprimemedia.in" className="text-[#681fe4] hover:underline">https://balajiprimemedia.in</a></p>
                <p className="text-neutral-400">Direct Support: +91 76908 68932</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
