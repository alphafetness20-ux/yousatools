import React, { useState } from 'react';
import { useRouter, Link } from '../context/RouterContext';
import { Menu, X, Layers, ArrowRight } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentPath, navigate } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Image Compressor', path: '/image-compressor' },
    { label: 'How It Works', path: '/#how-it-works' },
    { label: 'Why YousaTools', path: '/#why-yousatools' },
    { label: 'About', path: '/about' },
  ];

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    if (path.startsWith('/#')) {
      const targetHash = path.replace('/', '');
      if (currentPath === '/') {
        const el = document.querySelector(targetHash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          const el = document.querySelector(targetHash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    } else {
      navigate(path);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Zone 1: Brand Wordmark */}
          <Link
            to="/"
            className="flex items-center gap-2.5 text-slate-900 group focus:outline-none"
            aria-label="YousaTools Home"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <Layers className="w-5 h-5 text-indigo-400" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap">
              Yousa<span className="text-indigo-600">Tools</span>
            </span>
          </Link>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium text-slate-600"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive =
                link.path === currentPath ||
                (link.path === '/image-compressor' && currentPath === '/image-compressor');

              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.path)}
                  className={`px-3.5 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-indigo-600 bg-indigo-50/70 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/image-compressor"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition-colors shadow-sm whitespace-nowrap shrink-0"
            >
              <span>Compress Image</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.path)}
                className="text-left w-full px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-100">
            <Link
              to="/image-compressor"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-base font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
            >
              <span>Launch Image Compressor</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
