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
    <div className="min-h-screen bg-[#070c18] text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="mb-10 text-center sm:text-left border-b border-gray-800 pb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d97706] mb-2 block">
            Service Agreement
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            Last Updated: November 1, 2026 • Balaji Prime Media
          </p>
        </div>

        <div className="space-y-8 text-sm leading-relaxed text-gray-300">
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white border-b border-gray-800/80 pb-2">
              Core Terms &amp; Service Deliverables
            </h2>
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-white">1. Agreement to Terms</h3>
              <p>
                By accessing our website (<a href="https://balajiprimemedia.in" className="text-blue-400 hover:underline">balajiprimemedia.in</a>) or contracting <strong>Balaji Prime Media</strong> for Search Engine Optimization, High-DA Guest Posting, Web Development, or Digital Strategy, you agree to be bound by these Terms of Service.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-semibold text-white">2. Scope of Services &amp; Deliverables</h3>
              <p>
                Balaji Prime Media provides tailored digital marketing services as defined in individual client scopes, invoices, or proposals:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-300">
                <li><strong>SEO &amp; Link Building:</strong> High-DA editorial placements, manual outreach, and on-page technical optimizations executed using white-hat industry practices.</li>
                <li><strong>Publisher Marketplace:</strong> Media placements across vetted websites (DR 50–90+) with permanent do-follow links guaranteed for the contracted publication lifespan.</li>
                <li><strong>Turnaround Times (TAT):</strong> Standard link building and guest posts are delivered within 7 to 14 business days, accompanied by live live URL proof reports.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-semibold text-white">3. Payments, Retainers &amp; Invoicing</h3>
              <p>
                All projects require invoice settlement prior to deliverable launch unless an ongoing monthly retainer agreement is in place. Payments are accepted via Stripe, PayPal, Wise, and International Bank Wire. All quoted fees are transparent with no hidden subscription charges.
              </p>
            </div>
          </section>

          <section className="space-y-6 pt-4">
            <h2 className="text-xl font-bold text-white border-b border-gray-800/80 pb-2">
              Legal Disclaimers &amp; Confidentiality
            </h2>
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-white">4. Organic Search Disclaimers</h3>
              <p>
                Search engines (including Google, Bing, and AI search engines) frequently update algorithms and rankings based on proprietary criteria. While Balaji Prime Media implements proven, data-backed optimization protocols, we maintain absolute ethical honesty and do not claim guaranteed #1 rankings, as no third party controls third-party search algorithms.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-semibold text-white">5. Client Confidentiality</h3>
              <p>
                We treat all client data, proprietary strategies, analytics access, and campaign details with strict commercial confidentiality. Non-Disclosure Agreements (NDAs) are available upon request for enterprise partnerships.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-semibold text-white">6. Inquiries &amp; Legal Notices</h3>
              <div className="bg-[#0b1220] p-4 rounded-xl border border-gray-800 space-y-1 text-xs">
                <p><strong className="text-white">Balaji Prime Media Legal Department</strong></p>
                <p>Email: <a href="mailto:support@balajiprimemedia.in" className="text-blue-400 hover:underline">support@balajiprimemedia.in</a></p>
                <p>Website: <a href="https://balajiprimemedia.in" className="text-blue-400 hover:underline">https://balajiprimemedia.in</a></p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
