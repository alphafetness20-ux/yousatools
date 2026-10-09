import React from 'react';
import { Link } from '../context/RouterContext';
import { Layers, ShieldCheck, Zap, Sliders, ArrowRight, Heart } from 'lucide-react';
import { AdSlot } from '../components/AdSlot';

export const AboutPage: React.FC = () => {
  return (
    <div className="flex-1 pb-20">
      {/* Header Banner */}
      <section className="bg-white border-b border-slate-200/80 pt-12 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full px-3.5 py-1 mb-4 shadow-xs">
            <Layers className="w-3.5 h-3.5" />
            <span>About YousaTools</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Making Everyday Digital Tasks Simple & Private
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            YousaTools is a free online utility website focused on providing fast, browser-native tools that respect your time, bandwidth, and personal data.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        {/* The Mission */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Our Purpose
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Most online utility websites today are weighed down by forced account signups, slow cloud queues, aggressive popups, and intrusive tracking. When you simply need to reduce a photo’s file size for an email or compress a document for an online application, the process shouldn’t require handing over personal data or waiting in a remote processing queue.
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            YousaTools was created to prove that web utilities can be clean, fast, and respectful. By executing computation directly inside modern web browsers using HTML5 Canvas and native Web APIs, we deliver instant results while guaranteeing that your confidential photos and documents never leave your computer or mobile device.
          </p>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Privacy by Architecture</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We do not upload your images to remote servers. All file processing occurs locally in your browser’s volatile memory.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No Barriers</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              No registration forms, no subscriptions, no credit card prompts, and no daily usage quotas. Tools are free for everyone.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Practical & Focused</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We prioritize real, functioning tools built with care rather than misleading mockups or bloated features.
            </p>
          </div>
        </div>

        {/* Roadmap */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Image Optimization Roadmap
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            YousaTools is dedicated to browser-based image optimization. Here is what we are building:
          </p>

          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Phase 1: Universal Image Compressor (Live & Active)</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Direct in-browser JPEG, PNG, and WebP compression with custom quality slider (10% to 100%), instant side-by-side comparison previews, and single-click downloads with zero server uploads.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                2
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Phase 2: Multi-Image Batch Compression (In Progress)</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Support for dragging multiple photos at once, processing them concurrently in browser web workers, and downloading as an optimized ZIP bundle.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                3
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Phase 3: Next-Gen AVIF Encoding (Planned)</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Client-side WebAssembly-powered AVIF compression for even smaller file footprints on ultra-modern web platforms.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-8 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold">Ready to optimize your images?</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Start compressing your photos right now with 100% privacy.
            </p>
          </div>
          <Link
            to="/image-compressor"
            className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-sm rounded-xl transition-colors shrink-0 flex items-center gap-2 shadow-sm"
          >
            <span>Launch Image Compressor</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <AdSlot slotId="about-bottom-01" />
      </main>
    </div>
  );
};
