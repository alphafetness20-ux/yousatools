import React from 'react';
import { Link } from '../context/RouterContext';
import { Layers, ShieldCheck, Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Mission column */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 text-white focus:outline-none">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Layers className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Yousa<span className="text-indigo-400">Tools</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              YousaTools builds clean, practical browser-based utilities designed to make everyday digital tasks simple, fast, and completely private. Files are processed locally in your browser with zero server uploads.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                100% Client-Side Privacy
              </span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5 text-slate-300">
                <Zap className="w-4 h-4 text-amber-400" />
                Zero Server Uploads
              </span>
            </div>
          </div>

          {/* Tools Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Image Tools
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/image-compressor"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Image Compressor</span>
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded">
                    Active
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/image-compressor" className="hover:text-white transition-colors">
                  JPEG / JPG Compressor
                </Link>
              </li>
              <li>
                <Link to="/image-compressor" className="hover:text-white transition-colors">
                  PNG Compressor & Converter
                </Link>
              </li>
              <li>
                <Link to="/image-compressor" className="hover:text-white transition-colors">
                  WebP Compressor
                </Link>
              </li>
            </ul>
          </div>

          {/* Information & Legal Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Information
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom border & copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} YousaTools. All rights reserved.</p>
          <p className="text-slate-500 text-center sm:text-right">
            Browser-native utilities · No cookies or accounts required · Free forever
          </p>
        </div>
      </div>
    </footer>
  );
};
