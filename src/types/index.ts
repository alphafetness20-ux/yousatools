export type ToolCategory = 'all' | 'image' | 'jpeg' | 'png' | 'webp';

export type ToolStatus = 'available' | 'coming_soon';

export interface ToolItem {
  id: string;
  name: string;
  category: ToolCategory;
  categoryLabel: string;
  description: string;
  path: string;
  status: ToolStatus;
  badgeLabel?: string;
  tags: string[];
}

export type OutputFormatChoice = 'original' | 'webp' | 'jpeg' | 'png';

export interface CompressOptions {
  quality: number; // 0.10 to 1.00
  outputFormat: OutputFormatChoice;
  maxWidthOrHeight?: number;
}

export interface CompressionResult {
  originalFileName: string;
  originalSize: number;
  originalWidth: number;
  originalHeight: number;
  originalMime: string;
  originalUrl: string;

  compressedBlob: Blob;
  compressedUrl: string;
  compressedSize: number;
  compressedWidth: number;
  compressedHeight: number;
  compressedMime: string;

  quality: number;
  bytesSaved: number;
  percentSaved: number;
  isLarger: boolean;
  processingTimeMs: number;
  outputFormat: 'jpeg' | 'png' | 'webp';
}
