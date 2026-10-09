import React, { useState, useMemo } from 'react';
import { Link, useRouter } from '../context/RouterContext';
import { TOOLS_DATA } from '../data/tools';
import { ToolCategory } from '../types';
import { AdSlot } from '../components/AdSlot';
import {
  Search,
  Sparkles,
  Shield,
  Zap,
  Lock,
  Smartphone,
  ArrowRight,
  Sliders,
  ChevronDown,
  CheckCircle2,
  FileImage,
  X,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigate } = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'all'>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Filter tools based on search and selected format tab
  const filteredTools = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return TOOLS_DATA.filter((tool) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        tool.category === selectedCategory ||
        (selectedCategory === 'image' && tool.category === 'image');

      if (!matchesCategory) return false;

      if (!q) return true;
      const matchName = tool.name.toLowerCase().includes(q);
      const matchDesc = tool.description.toLowerCase().includes(q);
      const matchCat = tool.categoryLabel.toLowerCase().includes(q);
      const matchTags = tool.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchName || matchDesc || matchCat || matchTags;
    });
  }, [searchQuery, selectedCategory]);

  const faqs = [
    {
      q: 'Are my images uploaded to a remote server?',
      a: 'No. YousaTools operates 100% client-side inside your web browser using HTML5 Canvas, File, and Blob APIs. Your photos never leave your computer or phone, guaranteeing absolute privacy and confidentiality.',
    },
    {
      q: 'Is the Image Compressor completely free to use?',
      a: 'Yes. YousaTools Image Compressor is 100% free with no subscription, account registration, usage caps, or hidden paywalls.',
    },
    {
      q: 'Which image formats are supported?',
      a: 'YousaTools supports JPEG (JPG), PNG, and WebP images up to 20 MB. You can compress images in their original format or convert PNG/JPEG to WebP for enhanced web efficiency.',
    },
    {
      q: 'Why didn’t my PNG image shrink as much as a JPEG?',
      a: 'Standard browser Canvas implementations encode PNG using lossless compression, which preserves pixel data but cannot be adjusted with lossy quality settings. For substantial size reductions on PNG graphics, our compressor allows converting to modern WebP format while preserving transparency.',
    },
    {
      q: 'Does YousaTools work on mobile browsers?',
      a: 'Yes. The entire website and all tool workflows are fully responsive and optimized for mobile browsers including iOS Safari and Android Chrome.',
    },
  ];

  const handleToolClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex-1 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200/80 pt-12 pb-16 lg:pt-20 lg:pb-24">
        {/* Subtle grid background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Quiet clean metadata line */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full px-3.5 py-1 mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fast, Browser-Native Image Compressor</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight text-balance leading-[1.15]">
            Free Online Image Compressor <br className="hidden sm:inline" />
            <span className="text-indigo-600">Compress Photos Instantly</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Reduce image file sizes for JPEG, PNG, and WebP in seconds. All compression runs locally on your device with 100% privacy and zero server uploads.
          </p>

          {/* Search Box */}
          <div className="mt-8 sm:mt-10 max-w-xl mx-auto">
            <div className="relative flex items-center shadow-sm rounded-xl">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search compressor (e.g., jpeg, png, webp, reduce mb)..."
                className="block w-full pl-11 pr-10 py-3.5 sm:py-4 text-sm sm:text-base bg-white border border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 text-slate-900 placeholder-slate-400 transition-all outline-none"
                aria-label="Search compression options"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {searchQuery && (
              <p className="mt-2 text-xs text-slate-500 text-left px-1">
                Found {filteredTools.length} {filteredTools.length === 1 ? 'option' : 'options'} matching &ldquo;{searchQuery}&rdquo;
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Featured Primary Tool Spotlight: Image Compressor */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-10">
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-6 sm:p-8 lg:p-10 text-white shadow-xl border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2.5 py-0.5 rounded">
                  Live & Ready
                </span>
                <span className="text-xs text-slate-300">Browser Image Compressor</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Client-Side Image Compressor
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                Compress JPEG, PNG, and WebP images quickly with custom quality settings. See original vs compressed file sizes in real time, inspect visual clarity, and download your optimized files without uploading a single byte to an external server.
              </p>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  JPEG, PNG & WebP
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  10% to 100% Quality Slider
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Up to 20 MB Files
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Zero Server Uploads
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link
                to="/image-compressor"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-md text-sm whitespace-nowrap text-center"
              >
                <span>Launch Image Compressor</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-[12px] text-slate-400 text-center lg:text-left">
                No account or installation required
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Format Optimization Options */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Image Compression by Format
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Select your target image format or launch the universal compressor
            </p>
          </div>

          {/* Segmented Filter Control */}
          <div className="flex items-center p-1 bg-slate-200/70 rounded-xl text-xs font-medium self-start sm:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Formats ({TOOLS_DATA.length})
            </button>
            <button
              onClick={() => setSelectedCategory('jpeg')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === 'jpeg'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              JPEG / JPG
            </button>
            <button
              onClick={() => setSelectedCategory('png')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === 'png'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              PNG
            </button>
            <button
              onClick={() => setSelectedCategory('webp')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === 'webp'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              WebP
            </button>
          </div>
        </div>

        {/* Tools Grid or Empty State */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {filteredTools.map((tool) => (
              <div
                key={tool.id}
                onClick={() => handleToolClick(tool.path)}
                className="group relative flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-indigo-300 hover:shadow-md cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                      <FileImage className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{tool.categoryLabel}</span>
                    </span>

                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                      Ready to Use
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                  <span className="text-indigo-600 group-hover:text-indigo-700 inline-flex items-center gap-1 transition-transform group-hover:translate-x-0.5">
                    Open Compressor <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[11px] text-slate-400">
                    100% In-Browser
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 mt-8 p-8">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              No matching options found
            </h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              We couldn’t find any options matching &ldquo;{searchQuery}&rdquo;. Try another search term.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
            >
              Reset Search Filter
            </button>
          </div>
        )}
      </section>

      {/* Ad slot reserved for future AdSense deployment */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <AdSlot slotId="home-banner-01" />
      </div>

      {/* Benefits / Why YousaTools Section */}
      <section id="why-yousatools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Why Use YousaTools Image Compressor?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Built from the ground up for speed, transparency, and personal privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">100% Client-Side Privacy</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Your photos are processed strictly inside your local browser. They are never sent to remote servers or stored anywhere.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">Instant Execution</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              No server queues, upload delays, or network latency. Your device’s hardware accelerates compression directly in memory.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">No Account Required</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              No sign-up forms, email verification, or subscriptions. Just open the tool and compress your images immediately.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">Cross-Device Ready</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Optimized for phones, tablets, laptops, and desktop workstations with clean layouts and accessible controls.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24 scroll-mt-20">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              How Image Compression Works
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Three simple steps to optimize your files without software downloads
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-lg shadow-sm">
                1
              </div>
              <h3 className="text-base font-semibold text-slate-900">Select Your Image</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Open the Image Compressor and drop your JPEG, PNG, or WebP photo up to 20 MB directly from your device.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-lg shadow-sm">
                2
              </div>
              <h3 className="text-base font-semibold text-slate-900">Fine-Tune Quality</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Adjust the compression quality slider from 10% to 100% and choose whether to maintain format or convert to WebP.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-lg shadow-sm">
                3
              </div>
              <h3 className="text-base font-semibold text-slate-900">Compare & Download</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Inspect before-and-after file sizes, verify the image fidelity on screen, and download the compressed result instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Answers to common questions about YousaTools and image compression
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={faq.q}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-semibold text-slate-900 hover:text-indigo-600 transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ml-4 ${
                      isOpen ? 'rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in-50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
