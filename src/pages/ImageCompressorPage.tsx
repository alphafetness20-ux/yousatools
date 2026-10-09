import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  compressImage,
  downloadBlob,
  formatBytes,
  validateImageFile,
  MAX_FILE_SIZE_BYTES,
  SUPPORTED_MIME_TYPES,
} from '../utils/imageCompressor';
import { CompressionResult, OutputFormatChoice } from '../types';
import { AdSlot } from '../components/AdSlot';
import {
  UploadCloud,
  FileImage,
  Sliders,
  Download,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  Info,
  Maximize2,
  ChevronDown,
  Eye,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const ImageCompressorPage: React.FC = () => {
  // Input state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalPreviewUrl, setOriginalPreviewUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [inputError, setInputError] = useState<string | null>(null);

  // Settings state
  const [quality, setQuality] = useState<number>(80); // 10% to 100%
  const [outputFormat, setOutputFormat] = useState<OutputFormatChoice>('original');

  // Execution state
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [compressionResult, setCompressionResult] = useState<CompressionResult | null>(null);
  const [processError, setProcessError] = useState<string | null>(null);

  // UI state
  const [previewTab, setPreviewTab] = useState<'both' | 'original' | 'compressed'>('both');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Memory cleanup for object URLs
  const cleanupPreviews = useCallback(() => {
    if (originalPreviewUrl) {
      URL.revokeObjectURL(originalPreviewUrl);
      setOriginalPreviewUrl(null);
    }
    if (compressionResult?.compressedUrl) {
      URL.revokeObjectURL(compressionResult.compressedUrl);
    }
    if (compressionResult?.originalUrl) {
      URL.revokeObjectURL(compressionResult.originalUrl);
    }
  }, [originalPreviewUrl, compressionResult]);

  useEffect(() => {
    return () => {
      cleanupPreviews();
    };
  }, [cleanupPreviews]);

  // Handle file selection
  const handleFileSelect = (file: File) => {
    setInputError(null);
    setProcessError(null);

    const validation = validateImageFile(file);
    if (!validation.valid) {
      setInputError(validation.error || 'Invalid file format or size.');
      return;
    }

    // Clean up previous URLs
    cleanupPreviews();
    setCompressionResult(null);

    const previewUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setOriginalPreviewUrl(previewUrl);

    // If file is PNG, default format to 'original' but we'll show helpful suggestion in the panel
    setOutputFormat('original');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  // Run image compression
  const handleRunCompression = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setProcessError(null);

    try {
      const result = await compressImage(selectedFile, {
        quality: quality / 100,
        outputFormat: outputFormat,
      });

      // Cleanup prior compressed URL if exists
      if (compressionResult?.compressedUrl) {
        URL.revokeObjectURL(compressionResult.compressedUrl);
      }

      setCompressionResult(result);
    } catch (err) {
      setProcessError(
        err instanceof Error ? err.message : 'An error occurred during compression.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // Reset tool
  const handleReset = () => {
    cleanupPreviews();
    setSelectedFile(null);
    setCompressionResult(null);
    setInputError(null);
    setProcessError(null);
    setQuality(80);
    setOutputFormat('original');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Download compressed file
  const handleDownload = () => {
    if (!compressionResult) return;
    downloadBlob(
      compressionResult.compressedBlob,
      compressionResult.originalFileName,
      compressionResult.outputFormat
    );
  };

  const isPng = selectedFile?.type === 'image/png' || /\.png$/i.test(selectedFile?.name || '');

  const faqs = [
    {
      q: 'What is an online image compressor?',
      a: 'An image compressor is a utility that reduces the file size of digital photographs and graphics. By removing redundant color and pixel metadata, it makes images quicker to load on websites, easier to send via email, and significantly more lightweight for mobile browsing.',
    },
    {
      q: 'How does in-browser image compression work?',
      a: 'YousaTools leverages your browser’s native HTML5 Canvas API and WebAssembly image decoders. The image is drawn onto an offscreen canvas in your device’s memory, then re-encoded into the desired target format with the selected quality compression factor. At no point is your image uploaded to any external server.',
    },
    {
      q: 'What is the difference between lossy and lossless compression?',
      a: 'Lossy compression (such as JPEG and lossy WebP) selectively discards high-frequency pixel variations that are imperceptible to human eyes, achieving large file size reductions (typically 50% to 80%). Lossless compression (such as PNG) retains every single pixel identically, making it great for logos and vector icons, but resulting in larger files.',
    },
    {
      q: 'Why didn’t my PNG get smaller when adjusting the quality slider?',
      a: 'According to the HTML5 Canvas specification, browser Canvas encoders process PNG strictly as a lossless format and ignore quality parameters. If you need a smaller file size for a PNG photo or complex graphic, select "Convert to WebP" in our format selector. WebP supports transparent backgrounds while offering genuine lossy and lossless compression.',
    },
    {
      q: 'What is the recommended quality setting?',
      a: 'A quality setting between 75% and 85% is typically the sweet spot for web publishing and email. It usually cuts file size by 50% to 75% while maintaining crisp, clean visuals without visible blur or compression artifacts.',
    },
    {
      q: 'What are the upload and file limits?',
      a: 'YousaTools accepts images up to 20 MB per file, which comfortably accommodates modern high-resolution DSLR and smartphone photos. Supported formats are JPEG, PNG, and WebP.',
    },
  ];

  return (
    <div className="flex-1 pb-20">
      {/* Tool Header Section */}
      <section className="bg-white border-b border-slate-200/80 pt-10 pb-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-full px-3.5 py-1 mb-4 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Private Client-Side Processing</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight text-balance">
            Free Image Compressor Online
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Compress JPEG, PNG, and WebP images directly in your browser. Reduce file sizes, maintain visual fidelity, and download optimized photos with zero server uploads.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
            <span>Supported: JPEG, PNG, WebP</span>
            <span aria-hidden="true">·</span>
            <span>Max file size: {formatBytes(MAX_FILE_SIZE_BYTES, 0)}</span>
            <span aria-hidden="true">·</span>
            <span>No account required</span>
          </div>
        </div>
      </section>

      {/* Main Tool Workspace */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Step 1: Upload or Active Image Card */}
        {!selectedFile ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative rounded-2xl border-2 border-dashed transition-all p-8 sm:p-14 text-center bg-white ${
              dragActive
                ? 'border-indigo-500 bg-indigo-50/50 scale-[0.99]'
                : 'border-slate-300 hover:border-slate-400'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
              onChange={handleInputChange}
              className="sr-only"
              id="file-upload"
            />

            <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-5 shadow-xs">
              <UploadCloud className="w-8 h-8" />
            </div>

            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Select or Drop an Image to Compress
            </h2>

            <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
              Drag and drop your image file here, or browse from your computer or phone.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <label
                htmlFor="file-upload"
                className="w-full sm:w-auto px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-sm rounded-xl cursor-pointer shadow-sm transition-colors text-center"
              >
                Choose Image File
              </label>
            </div>

            <p className="mt-4 text-xs text-slate-400">
              Maximum upload size: 20 MB · Formats: JPEG, PNG, WebP · 100% Client-side
            </p>

            {inputError && (
              <div className="mt-6 inline-flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs text-left max-w-md">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{inputError}</span>
              </div>
            )}
          </div>
        ) : (
          /* Active Image & Controls Container */
          <div className="space-y-6">
            {/* Top Image File Meta Bar */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <FileImage className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 truncate">
                    {selectedFile.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 tabular-nums">
                    <span>{formatBytes(selectedFile.size)}</span>
                    <span aria-hidden="true">·</span>
                    <span className="uppercase font-mono">{selectedFile.type.replace('image/', '')}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                <label
                  htmlFor="file-upload-replace"
                  className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer transition-colors"
                >
                  Change Image
                </label>
                <input
                  id="file-upload-replace"
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                  onChange={handleInputChange}
                  className="sr-only"
                />

                <button
                  type="button"
                  onClick={handleReset}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none"
                  title="Reset and clear tool"
                  aria-label="Reset tool"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Controls Bar */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                {/* Quality Slider Control */}
                <div className="md:col-span-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="quality-slider"
                      className="text-sm font-bold text-slate-900 flex items-center gap-1.5"
                    >
                      <Sliders className="w-4 h-4 text-indigo-600" />
                      <span>Compression Quality</span>
                    </label>
                    <span className="text-sm font-bold text-indigo-600 font-mono tabular-nums bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-md">
                      {quality}%
                    </span>
                  </div>

                  <input
                    id="quality-slider"
                    type="range"
                    min={10}
                    max={100}
                    step={1}
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none"
                  />

                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>10% (Smallest file)</span>
                    <span>80% (Recommended)</span>
                    <span>100% (Highest quality)</span>
                  </div>
                </div>

                {/* Output Format Selector */}
                <div className="md:col-span-3 space-y-2">
                  <label
                    htmlFor="format-select"
                    className="block text-sm font-bold text-slate-900"
                  >
                    Output Format
                  </label>
                  <select
                    id="format-select"
                    value={outputFormat}
                    onChange={(e) => setOutputFormat(e.target.value as OutputFormatChoice)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-slate-800 outline-none"
                  >
                    <option value="original">Original Format</option>
                    <option value="webp">Convert to WebP (Best compression)</option>
                    <option value="jpeg">Convert to JPEG (Broad compatibility)</option>
                    {isPng && <option value="png">Keep PNG (Lossless)</option>}
                  </select>
                </div>

                {/* Compress Button */}
                <div className="md:col-span-3">
                  <button
                    type="button"
                    onClick={handleRunCompression}
                    disabled={isProcessing}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-indigo-400 text-white font-semibold text-sm rounded-xl shadow-sm transition-all whitespace-nowrap cursor-pointer"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Compressing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Compress Image</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* PNG Transparency & Lossless Notice */}
              {isPng && outputFormat !== 'webp' && outputFormat !== 'jpeg' && (
                <div className="flex items-start gap-3 p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900">
                  <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold">Notice for PNG images:</p>
                    <p className="text-amber-800 leading-relaxed">
                      Standard web browser canvas encoders use lossless compression for PNGs and do not support lossy quality reduction. If your PNG file size does not decrease, switch the output format to <strong>&ldquo;Convert to WebP&rdquo;</strong> to achieve 50–80% compression while preserving transparency.
                    </p>
                  </div>
                </div>
              )}

              {/* Process Error */}
              {processError && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{processError}</span>
                </div>
              )}
            </div>

            {/* Compression Results & Comparison Section */}
            {compressionResult && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
                {/* Result Statistics Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                      <span>Compression Results</span>
                      {compressionResult.percentSaved > 0 && (
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                          Saved {compressionResult.percentSaved}%
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Processed in {compressionResult.processingTimeMs}ms at {Math.round(compressionResult.quality * 100)}% quality factor
                    </p>
                  </div>

                  {/* Primary Download CTA */}
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Compressed Image ({formatBytes(compressionResult.compressedSize)})</span>
                  </button>
                </div>

                {/* Metrics Breakdown Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
                    <span className="text-xs text-slate-500 font-medium">Original Size</span>
                    <p className="text-lg sm:text-xl font-bold text-slate-900 font-mono tabular-nums mt-1">
                      {formatBytes(compressionResult.originalSize)}
                    </p>
                    <span className="text-[11px] text-slate-400 uppercase font-mono">
                      {compressionResult.originalMime.replace('image/', '')}
                    </span>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
                    <span className="text-xs text-slate-500 font-medium">Compressed Size</span>
                    <p className="text-lg sm:text-xl font-bold text-slate-900 font-mono tabular-nums mt-1">
                      {formatBytes(compressionResult.compressedSize)}
                    </p>
                    <span className="text-[11px] text-slate-400 uppercase font-mono">
                      {compressionResult.compressedMime.replace('image/', '')}
                    </span>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
                    <span className="text-xs text-slate-500 font-medium">Size Difference</span>
                    <p
                      className={`text-lg sm:text-xl font-bold font-mono tabular-nums mt-1 ${
                        compressionResult.bytesSaved > 0
                          ? 'text-emerald-600'
                          : 'text-amber-600'
                      }`}
                    >
                      {compressionResult.bytesSaved > 0
                        ? `-${formatBytes(compressionResult.bytesSaved)}`
                        : `+${formatBytes(Math.abs(compressionResult.bytesSaved))}`}
                    </p>
                    <span className="text-[11px] text-slate-400">
                      {compressionResult.bytesSaved > 0 ? 'Space reduced' : 'Size increased'}
                    </span>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
                    <span className="text-xs text-slate-500 font-medium">Reduction Rate</span>
                    <p
                      className={`text-lg sm:text-xl font-bold font-mono tabular-nums mt-1 ${
                        compressionResult.percentSaved > 0
                          ? 'text-emerald-600'
                          : 'text-amber-600'
                      }`}
                    >
                      {compressionResult.percentSaved > 0
                        ? `${compressionResult.percentSaved}%`
                        : '0%'}
                    </p>
                    <span className="text-[11px] text-slate-400">
                      {compressionResult.percentSaved > 0 ? 'Calculated savings' : 'No reduction'}
                    </span>
                  </div>
                </div>

                {/* Honest Size Increase Warning */}
                {compressionResult.isLarger && (
                  <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Compressed file is larger than the original.</p>
                      <p className="mt-1 text-amber-800 leading-relaxed">
                        This usually happens if the input file was already heavily compressed, or when re-encoding an optimized PNG without format conversion. You may still download the file, or lower the quality slider (e.g. to 70%) and try converting to WebP for a smaller output.
                      </p>
                    </div>
                  </div>
                )}

                {/* Preview View Mode Tabs */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-slate-500" />
                    <span className="text-sm font-bold text-slate-900">Visual Quality Inspection</span>
                  </div>

                  <div className="flex items-center p-1 bg-slate-100 rounded-lg text-xs font-medium">
                    <button
                      type="button"
                      onClick={() => setPreviewTab('both')}
                      className={`px-3 py-1 rounded-md transition-colors ${
                        previewTab === 'both'
                          ? 'bg-white text-slate-900 shadow-xs font-semibold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Side by Side
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewTab('original')}
                      className={`px-3 py-1 rounded-md transition-colors ${
                        previewTab === 'original'
                          ? 'bg-white text-slate-900 shadow-xs font-semibold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Original
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewTab('compressed')}
                      className={`px-3 py-1 rounded-md transition-colors ${
                        previewTab === 'compressed'
                          ? 'bg-white text-slate-900 shadow-xs font-semibold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Compressed
                    </button>
                  </div>
                </div>

                {/* Visual Image Previews */}
                <div
                  className={`grid gap-6 ${
                    previewTab === 'both' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
                  }`}
                >
                  {/* Original Image Card */}
                  {(previewTab === 'both' || previewTab === 'original') && (
                    <div className="flex flex-col rounded-xl border border-slate-200 bg-slate-50/50 overflow-hidden">
                      <div className="px-4 py-2.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-700">
                        <span>Original Image</span>
                        <span className="font-mono tabular-nums text-slate-500">
                          {formatBytes(compressionResult.originalSize)}
                        </span>
                      </div>
                      <div className="p-4 flex items-center justify-center min-h-[260px] max-h-[460px] bg-[repeating-conic-gradient(#f8fafc_0%_25%,#f1f5f9_0%_50%)] bg-[size:16px_16px] overflow-auto">
                        <img
                          src={compressionResult.originalUrl}
                          alt="Original uncompressed preview"
                          className="max-h-[420px] max-w-full object-contain rounded shadow-xs"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  )}

                  {/* Compressed Image Card */}
                  {(previewTab === 'both' || previewTab === 'compressed') && (
                    <div className="flex flex-col rounded-xl border border-slate-200 bg-slate-50/50 overflow-hidden">
                      <div className="px-4 py-2.5 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between text-xs font-semibold text-emerald-900">
                        <span>Compressed Output</span>
                        <span className="font-mono tabular-nums text-emerald-700">
                          {formatBytes(compressionResult.compressedSize)}
                        </span>
                      </div>
                      <div className="p-4 flex items-center justify-center min-h-[260px] max-h-[460px] bg-[repeating-conic-gradient(#f8fafc_0%_25%,#f1f5f9_0%_50%)] bg-[size:16px_16px] overflow-auto">
                        <img
                          src={compressionResult.compressedUrl}
                          alt="Compressed result preview"
                          className="max-h-[420px] max-w-full object-contain rounded shadow-xs"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Download & Secondary Actions */}
                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    Compress Another Image
                  </button>

                  <button
                    type="button"
                    onClick={handleDownload}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Compressed Image</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Ad slot reserved for future AdSense deployment - Placed safely below tool workspace */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <AdSlot slotId="compressor-mid-01" />
      </div>

      {/* Comprehensive Original Educational Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 space-y-12">
          {/* Article 1: What is an Image Compressor */}
          <article className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              What Is an Image Compressor?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              An image compressor is a digital utility designed to minimize image file weight in bytes without degrading visible photographic quality. High-resolution photos captured with modern smartphone cameras or digital cameras easily exceed 10 to 15 megabytes. While high resolution is beneficial during editing, these massive file sizes lead to sluggish page load times, wasted bandwidth, and strict file-size rejection when sending documents via email or uploading to web portals.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              YousaTools compresses your imagery directly inside your web browser. By fine-tuning compression algorithms directly in JavaScript and HTML5 Canvas, the compressor eliminates redundant information, optimizes color palettes, and strips invisible EXIF camera metadata, generating lean, publication-ready images instantly.
            </p>
          </article>

          {/* Article 2: How to Compress an Image Online */}
          <article className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              How to Compress an Image Online with YousaTools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Step 1</span>
                <h3 className="text-sm font-bold text-slate-900">Upload Your Photo</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Drag and drop any JPEG, PNG, or WebP file up to 20 MB directly into the upload area.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Step 2</span>
                <h3 className="text-sm font-bold text-slate-900">Set Quality Slider</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Adjust the compression slider (80% default). Choose whether to keep original format or convert to WebP.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Step 3</span>
                <h3 className="text-sm font-bold text-slate-900">Inspect & Download</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Compare before and after file sizes, check the visual preview, and save the compressed file to your device.
                </p>
              </div>
            </div>
          </article>

          {/* Article 3: How Image Compression Works Technically */}
          <article className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              How Image Compression Works
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Image compression relies on mathematical transformations that exploit the physiological characteristics of human vision:
            </p>
            <ul className="space-y-3 text-sm text-slate-600 list-disc list-inside">
              <li>
                <strong className="text-slate-900">Chroma Subsampling:</strong> The human eye is significantly more sensitive to variations in luminance (brightness) than chrominance (color). Compression algorithms reduce color resolution while keeping brightness crisp, saving substantial data with negligible visual difference.
              </li>
              <li>
                <strong className="text-slate-900">Discrete Cosine Transform (DCT):</strong> Used primarily in JPEG, this mathematical algorithm converts spatial pixel blocks into frequency components. Extremely high-frequency details that cannot be perceived at standard viewing distances are discarded during the quantization phase.
              </li>
              <li>
                <strong className="text-slate-900">Entropy Encoding:</strong> Once coefficients are quantized, algorithms like Huffman coding or arithmetic coding represent repetitive values using shorter binary sequences, further compacting the output stream.
              </li>
            </ul>
          </article>

          {/* Article 4: Lossy vs Lossless Comparison */}
          <article className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Lossy vs. Lossless Compression
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse border border-slate-200 rounded-lg">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 text-xs uppercase tracking-wider font-semibold">
                    <th className="p-3 border-b border-slate-200">Characteristic</th>
                    <th className="p-3 border-b border-slate-200">Lossy Compression</th>
                    <th className="p-3 border-b border-slate-200">Lossless Compression</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-600 text-xs sm:text-sm">
                  <tr>
                    <td className="p-3 font-semibold text-slate-900">Typical Formats</td>
                    <td className="p-3">JPEG, WebP, AVIF</td>
                    <td className="p-3">PNG, GIF, Lossless WebP</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-900">Data Preservation</td>
                    <td className="p-3">Discards imperceptible pixel details</td>
                    <td className="p-3">Reconstructs 100% of original pixels</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-900">File Size Savings</td>
                    <td className="p-3 font-semibold text-emerald-700">High (50% to 85% reduction)</td>
                    <td className="p-3">Modest (10% to 30% reduction)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-900">Ideal Use Cases</td>
                    <td className="p-3">Photographs, hero banners, blog images</td>
                    <td className="p-3">Logos, screenshots with text, pixel art</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>

          {/* Article 5: Supported Formats Overview */}
          <article className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Supported Image Formats
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">JPEG (.jpg)</h3>
                  <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Universal</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The standard for photography across the web. Does not support transparent backgrounds, but scales smoothly across quality sliders from 10% to 100%.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">PNG (.png)</h3>
                  <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Lossless</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Best for graphics with alpha transparency and sharp text edges. Canvas PNG compression is strictly lossless; converting to WebP is recommended for file size savings.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">WebP (.webp)</h3>
                  <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Recommended</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Modern web standard developed by Google. Delivers 25–35% smaller file sizes than comparable JPEGs at identical quality, while fully supporting transparency.
                </p>
              </div>
            </div>
          </article>

          {/* Article 6: Tips to Reduce Image Size Without Quality Loss */}
          <article className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Tips to Reduce Image Size Without Quality Loss
            </h2>
            <div className="space-y-3 text-sm text-slate-600">
              <p className="leading-relaxed">
                <strong>1. Target 75% to 82% quality:</strong> Going above 90% quality dramatically inflates byte size with virtually zero perceptible improvement on Retina screens or mobile displays.
              </p>
              <p className="leading-relaxed">
                <strong>2. Convert PNGs to WebP:</strong> If you have transparent product photos or banners, converting from PNG to WebP frequently delivers 60% to 80% file reduction while retaining transparent backgrounds.
              </p>
              <p className="leading-relaxed">
                <strong>3. Test side-by-side:</strong> Always use the side-by-side preview inspector before downloading to verify that sharp text and intricate textures are preserved.
              </p>
            </div>
          </article>

          {/* In-Article FAQ Accordion */}
          <article className="space-y-4 pt-6 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Image Compression Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={faq.q}
                    className="rounded-xl border border-slate-200 bg-white overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-4 text-left text-sm font-semibold text-slate-900 hover:text-indigo-600 transition-colors focus:outline-none"
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
                      <div className="px-4 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};
