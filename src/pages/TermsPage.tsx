import React from 'react';
import { FileText, Info } from 'lucide-react';

export const TermsPage: React.FC = () => {
  const lastUpdated = 'October 2026';

  return (
    <div className="flex-1 pb-20">
      {/* Header Banner */}
      <section className="bg-white border-b border-slate-200/80 pt-12 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full px-3.5 py-1 mb-4 shadow-xs">
            <FileText className="w-3.5 h-3.5" />
            <span>Legal Agreement</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Terms of Use
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
                This document is a standard Terms of Use template for client-side digital utility tools. It includes disclaimers of warranty regarding compression outcomes and serverless operations. Please review and insert your organization details in highlighted bracketed placeholders prior to public publishing.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 space-y-8 text-slate-600 leading-relaxed text-sm sm:text-base">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p>
              By accessing and using YousaTools (<span className="bg-amber-100 text-amber-900 px-1 py-0.5 rounded font-mono text-xs font-semibold">https://yousatools.com</span>), you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">2. Permitted Use</h2>
            <p>
              YousaTools grants you a personal, non-exclusive, non-transferable, revocable license to use our browser utilities for personal, educational, or commercial file optimization tasks.
            </p>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-xs sm:text-sm">
              <li>Attempt to disrupt, overload, or compromise website integrity or network delivery.</li>
              <li>Circumvent or tamper with client-side utility constraints or license notices.</li>
              <li>Use the website for any unlawful, defamatory, or fraudulent purpose.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">3. User Responsibility for Content</h2>
            <p>
              Because all image and file processing occurs locally on your own computer or device, YousaTools has no custody or control over the files you choose to process. You retain full ownership, copyright, and responsibility for the images and content you compress or download through this platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">4. No Guarantee of Particular Compression Results</h2>
            <p>
              Compression results depend strictly on the input image dimensions, intrinsic entropy, color variations, format characteristics, and browser Canvas implementation. YousaTools makes no representations or warranties that any specific image will achieve a particular file-size reduction percentage or that compression will always decrease file weight without visual changes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">5. Disclaimer of Warranties</h2>
            <p>
              YousaTools is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without warranties of any kind, whether express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that our tools will be uninterrupted, error-free, or compatible with every browser version.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">6. Limitation of Liability</h2>
            <p>
              In no event shall YousaTools, its owners, developers, or affiliates be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the website, including but not limited to loss of data, corrupted files, or business interruption, even if advised of the possibility of such damages.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">7. Intellectual Property</h2>
            <p>
              The YousaTools brand name, logo, website interface, custom styling, code, and documentation are the intellectual property of <span className="bg-amber-100 text-amber-900 px-1 py-0.5 rounded font-mono text-xs font-semibold">[Website Owner / Organization Name]</span> and are protected by applicable copyright and trademark laws.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">8. Changes to These Terms</h2>
            <p>
              We reserve the right to modify these Terms of Use at any time. Continued use of the website following any modifications constitutes your acknowledgment and acceptance of the revised terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">9. Contact Information</h2>
            <p>
              For legal inquiries or questions concerning these Terms of Use:
            </p>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs sm:text-sm font-mono">
              <p><strong>Owner:</strong> <span className="bg-amber-100 text-amber-900 px-1 py-0.5 rounded">[Website Owner / Organization Name]</span></p>
              <p><strong>Contact:</strong> <span className="bg-amber-100 text-amber-900 px-1 py-0.5 rounded">[Insert Contact Email Here]</span></p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
