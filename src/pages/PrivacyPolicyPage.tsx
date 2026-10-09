import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const lastUpdated = 'October 2026';

  return (
    <div className="flex-1 pb-20">
      {/* Header Banner */}
      <section className="bg-white border-b border-slate-200/80 pt-12 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-full px-3.5 py-1 mb-4 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Privacy Policy</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Privacy Policy
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Owner Customization Notice */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-indigo-50/80 border border-indigo-200 text-indigo-900 text-xs sm:text-sm">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-bold text-indigo-950">Notice for Website Owner / Publisher:</h3>
              <p className="text-indigo-800 leading-relaxed">
                This document is a comprehensive template tailored to the architectural reality of YousaTools (local browser-based image processing, zero file transmission). Items enclosed in brackets (e.g., <code className="bg-indigo-100 px-1 py-0.5 rounded font-mono">[Website Owner Name]</code>) should be customized with your formal legal identity and contact details prior to public commercial launch.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 space-y-8 text-slate-600 leading-relaxed text-sm sm:text-base">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">1. Introduction</h2>
            <p>
              Welcome to YousaTools (operated by <span className="bg-amber-100 text-amber-900 px-1 py-0.5 rounded font-mono text-xs font-semibold">[Website Owner / Organization Name]</span>, accessible at <span className="bg-amber-100 text-amber-900 px-1 py-0.5 rounded font-mono text-xs font-semibold">https://yousatools.com</span>). We respect your privacy and are committed to protecting any information associated with your use of our website.
            </p>
            <p>
              This Privacy Policy explains how our services handle your data, with particular emphasis on our client-side processing architecture.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">2. Browser-Based Image Processing (Zero Server Transmission)</h2>
            <p>
              The defining principle of YousaTools is local execution:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                <strong>No Server Uploads:</strong> When you use our Image Compressor, your files (JPEG, PNG, WebP) are processed exclusively inside your web browser’s local memory using the HTML5 Canvas API and Blob API.
              </li>
              <li>
                <strong>Zero File Storage:</strong> Your images are never transmitted over the internet to our servers or third-party servers. We cannot view, copy, log, or retain your photographs.
              </li>
              <li>
                <strong>Immediate Memory Cleansing:</strong> Temporary image preview URLs (Object URLs) are released and revoked whenever you reset the tool, upload another image, or close the browser tab.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">3. Information We Collect</h2>
            <p>
              In its default configuration, YousaTools does not require user account registration, passwords, credit card information, or user logins. We do not maintain a user database.
            </p>
            <p>
              <strong>Contact Inquiries:</strong> If you reach out directly via email or our contact form, we receive the information you voluntarily submit (such as your name, email address, and message contents) solely to reply to your inquiry. We do not sell or share contact details with advertisers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">4. Cookies and Local Storage</h2>
            <p>
              YousaTools does not use tracking cookies or persistent tracking beacons to monitor your browsing across the web. Modern browsers may use temporary session cache to load static assets (scripts, stylesheets, fonts) efficiently.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">5. Advertising and Google AdSense Disclosure</h2>
            <p>
              To maintain YousaTools as a free service, we may display third-party advertisements in designated non-intrusive ad placements in the future, such as through Google AdSense:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                Third-party vendors, including Google, use cookies to serve ads based on a user&rsquo;s prior visits to this website or other websites.
              </li>
              <li>
                Google&rsquo;s use of advertising cookies enables it and its partners to serve ads to users based on their visit to our sites and/or other sites on the Internet.
              </li>
              <li>
                Users may opt out of personalized advertising by visiting Google&rsquo;s <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">Ads Settings</a> or by opting out through <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">aboutads.info</a>.
              </li>
            </ul>
            <p className="text-xs text-slate-500 italic">
              Note: In the initial production launch, ad scripts remain disabled until formal publisher onboarding is finalized.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">6. Third-Party Hosting and Content Delivery</h2>
            <p>
              This website is hosted on static content delivery network infrastructure (e.g., Cloudflare Pages). Like all web hosting providers, standard web server logs (which may record IP addresses, browser user-agents, and requested asset URLs) are processed automatically for network performance, DDoS defense, and security integrity.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">7. Data Security</h2>
            <p>
              Because your uploaded files never travel across the internet, you retain absolute confidentiality over sensitive photographs and personal documents. All communications with YousaTools are encrypted via Transport Layer Security (HTTPS).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">8. Changes to This Privacy Policy</h2>
            <p>
              We may revise this Privacy Policy periodically to reflect updates to our utilities or changes in legal regulations. When changes occur, the updated date at the top of this document will be revised accordingly.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">9. Contact and Inquiries</h2>
            <p>
              If you have any questions or feedback regarding this Privacy Policy, please contact:
            </p>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs sm:text-sm font-mono">
              <p><strong>Entity:</strong> <span className="bg-amber-100 text-amber-900 px-1 py-0.5 rounded">[Website Owner / Organization Name]</span></p>
              <p><strong>Website:</strong> https://yousatools.com</p>
              <p><strong>Email:</strong> <span className="bg-amber-100 text-amber-900 px-1 py-0.5 rounded">[Insert Contact Email Here]</span></p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
