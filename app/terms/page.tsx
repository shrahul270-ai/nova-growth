import React from "react";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Balaji Prime Media",
  description: "Read the service agreement and terms of engagement for Balaji Prime Media digital marketing and SEO services.",
  alternates: {
    canonical: "https://balajiprimemedia.in/terms",
  },
};

export default function TermsOfServicePage() {
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
            // SERVICE AGREEMENT
          </span>
          <h1 className="font-bebas text-4xl sm:text-6xl tracking-[0.14em] text-white uppercase leading-none">
            TERMS OF SERVICE
          </h1>
          <p className="text-xs font-mono text-neutral-500 mt-3">
            Last Updated: November 1, 2026 • Balaji Prime Media
          </p>
        </div>

        <div className="space-y-10 text-sm leading-relaxed text-neutral-300 font-normal">
          <section className="space-y-6">
            <h2 className="font-bebas text-2xl sm:text-3xl tracking-[0.14em] text-white uppercase border-b border-white/10 pb-3">
              CORE TERMS &amp; SERVICE DELIVERABLES
            </h2>
            <div className="space-y-3">
              <h3 className="font-bebas text-lg tracking-[0.12em] uppercase text-white">1. Agreement to Terms</h3>
              <p>
                By accessing our website (<a href="https://balajiprimemedia.in" className="text-[#681fe4] hover:underline">balajiprimemedia.in</a>) or contracting <strong>Balaji Prime Media</strong> for Search Engine Optimization, High-DA Guest Posting, Web Development, or Digital Strategy, you agree to be bound by these Terms of Service.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-bebas text-lg tracking-[0.12em] uppercase text-white">2. Scope of Services &amp; Deliverables</h3>
              <p>
                Balaji Prime Media provides tailored digital marketing services as defined in individual client scopes, invoices, or proposals:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-neutral-300">
                <li><strong>SEO &amp; Link Building:</strong> High-DA editorial placements, manual outreach, and on-page technical optimizations executed using white-hat industry practices.</li>
                <li><strong>Publisher Marketplace:</strong> Media placements across vetted websites (DR 50–90+) with permanent do-follow links guaranteed for the contracted publication lifespan.</li>
                <li><strong>Turnaround Times (TAT):</strong> Standard link building and guest posts are delivered within 7 to 14 business days, accompanied by live URL proof reports.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-bebas text-lg tracking-[0.12em] uppercase text-white">3. Payments, Retainers &amp; Invoicing</h3>
              <p>
                All projects require invoice settlement prior to deliverable launch unless an ongoing monthly retainer agreement is in place. Payments are accepted via Stripe, PayPal, Wise, and International Bank Wire. All quoted fees are transparent with no hidden subscription charges.
              </p>
            </div>
          </section>

          <section className="space-y-6 pt-6">
            <h2 className="font-bebas text-2xl sm:text-3xl tracking-[0.14em] text-white uppercase border-b border-white/10 pb-3">
              LEGAL DISCLAIMERS &amp; CONFIDENTIALITY
            </h2>
            <div className="space-y-3">
              <h3 className="font-bebas text-lg tracking-[0.12em] uppercase text-white">4. Organic Search Disclaimers</h3>
              <p>
                Search engines (including Google, Bing, and AI search engines) frequently update algorithms and rankings based on proprietary criteria. While Balaji Prime Media implements proven, data-backed optimization protocols, we maintain absolute ethical honesty and do not claim guaranteed #1 rankings, as no third party controls third-party search algorithms.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-bebas text-lg tracking-[0.12em] uppercase text-white">5. Client Confidentiality</h3>
              <p>
                We treat all client data, proprietary strategies, analytics access, and campaign details with strict commercial confidentiality. Non-Disclosure Agreements (NDAs) are available upon request for enterprise partnerships.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-bebas text-lg tracking-[0.12em] uppercase text-white">6. Inquiries &amp; Legal Notices</h3>
              <div className="bg-[#0c0818] p-6 rounded-[4px] border border-white/10 space-y-1.5 text-xs font-mono">
                <p><strong className="text-white font-bebas text-sm tracking-[0.12em] uppercase">Balaji Prime Media Legal Department</strong></p>
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
