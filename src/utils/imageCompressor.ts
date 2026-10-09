import { CompressOptions, CompressionResult, OutputFormatChoice } from '../types';

export const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB
export const SUPPORTED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

/**
 * Format bytes into clean human-readable units (B, KB, MB)
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(Math.abs(bytes)) / Math.log(k));
  const formatted = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
  return `${formatted} ${sizes[i]}`;
}

/**
 * Validates selected file size and supported MIME type
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: 'No file selected.' };
  }

  // Type check: handle standard mimes
  const isSupportedType =
    SUPPORTED_MIME_TYPES.includes(file.type.toLowerCase()) ||
    /\.(jpe?g|png|webp)$/i.test(file.name);

  if (!isSupportedType) {
    return {
      valid: false,
      error: 'Unsupported image format. YousaTools currently supports JPEG, PNG, and WebP images.',
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File is too large (${formatBytes(file.size)}). The maximum upload limit is ${formatBytes(MAX_FILE_SIZE_BYTES)}.`,
    };
  }

  return { valid: true };
}

/**
 * Resolves target MIME type and clean file extension
 */
export function resolveTargetFormat(
  originalMime: string,
  originalName: string,
  choice: OutputFormatChoice
): { targetMime: string; targetExt: string; formatLabel: 'jpeg' | 'png' | 'webp' } {
  let resolvedMime = originalMime.toLowerCase();

  // Fallback if MIME type was blank from file system
  if (!resolvedMime || resolvedMime === 'application/octet-stream') {
    if (/\.png$/i.test(originalName)) resolvedMime = 'image/png';
    else if (/\.webp$/i.test(originalName)) resolvedMime = 'image/webp';
    else resolvedMime = 'image/jpeg';
  }

  if (choice === 'webp') {
    return { targetMime: 'image/webp', targetExt: 'webp', formatLabel: 'webp' };
  }
  if (choice === 'jpeg') {
    return { targetMime: 'image/jpeg', targetExt: 'jpg', formatLabel: 'jpeg' };
  }
  if (choice === 'png') {
    return { targetMime: 'image/png', targetExt: 'png', formatLabel: 'png' };
  }

  // Choice is 'original'
  if (resolvedMime === 'image/png') {
    return { targetMime: 'image/png', targetExt: 'png', formatLabel: 'png' };
  }
  if (resolvedMime === 'image/webp') {
    return { targetMime: 'image/webp', targetExt: 'webp', formatLabel: 'webp' };
  }
  return { targetMime: 'image/jpeg', targetExt: 'jpg', formatLabel: 'jpeg' };
}

/**
 * Client-side browser image compression via Canvas API & Blob API
 */
export async function compressImage(
  file: File,
  options: CompressOptions
): Promise<CompressionResult> {
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const startTime = performance.now();
  const originalUrl = URL.createObjectURL(file);

  return new Promise<CompressionResult>((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      try {
        const originalWidth = img.naturalWidth || img.width;
        const originalHeight = img.naturalHeight || img.height;

        if (originalWidth === 0 || originalHeight === 0) {
          URL.revokeObjectURL(originalUrl);
          reject(new Error('Image has invalid dimensions or failed to decode.'));
          return;
        }

        let targetWidth = originalWidth;
        let targetHeight = originalHeight;

        // Optional downscaling safeguard for monstrous photos (> 8000px) to prevent browser memory exhaustion
        const maxConstraint = options.maxWidthOrHeight || 8192;
        if (targetWidth > maxConstraint || targetHeight > maxConstraint) {
          if (targetWidth > targetHeight) {
            targetHeight = Math.round((targetHeight * maxConstraint) / targetWidth);
            targetWidth = maxConstraint;
          } else {
            targetWidth = Math.round((targetWidth * maxConstraint) / targetHeight);
            targetHeight = maxConstraint;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) {
          URL.revokeObjectURL(originalUrl);
          reject(new Error('Unable to initialize HTML5 Canvas rendering context.'));
          return;
        }

        // Enable high-quality bicubic smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        const { targetMime, formatLabel } = resolveTargetFormat(
          file.type,
          file.name,
          options.outputFormat
        );

        // If converting to JPEG, draw solid white background to prevent black transparent areas
        if (targetMime === 'image/jpeg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, targetWidth, targetHeight);
        }

        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        // Quality setting: clamp between 0.1 and 1.0
        const clampedQuality = Math.min(Math.max(options.quality, 0.1), 1.0);

        canvas.toBlob(
          (blob) => {
            // Free canvas memory buffer
            canvas.width = 0;
            canvas.height = 0;

            if (!blob) {
              URL.revokeObjectURL(originalUrl);
              reject(
                new Error(
                  `Browser failed to encode image into ${targetMime.replace('image/', '').toUpperCase()} format.`
                )
              );
              return;
            }

            const endTime = performance.now();
            const compressedUrl = URL.createObjectURL(blob);
            const originalSize = file.size;
            const compressedSize = blob.size;
            const bytesSaved = originalSize - compressedSize;
            const percentSaved =
              originalSize > 0
                ? Number((((originalSize - compressedSize) / originalSize) * 100).toFixed(1))
                : 0;

            const isLarger = compressedSize > originalSize;

            resolve({
              originalFileName: file.name,
              originalSize,
              originalWidth,
              originalHeight,
              originalMime: file.type || 'image/jpeg',
              originalUrl,

              compressedBlob: blob,
              compressedUrl,
              compressedSize,
              compressedWidth: targetWidth,
              compressedHeight: targetHeight,
              compressedMime: targetMime,

              quality: clampedQuality,
              bytesSaved,
              percentSaved,
              isLarger,
              processingTimeMs: Math.round(endTime - startTime),
              outputFormat: formatLabel,
            });
          },
          targetMime,
          clampedQuality
        );
      } catch (err) {
        URL.revokeObjectURL(originalUrl);
        reject(err instanceof Error ? err : new Error('Unexpected error during canvas compression.'));
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(originalUrl);
      reject(
        new Error(
          'Could not load or decode image. The file may be corrupted or in an unsupported variation.'
        )
      );
    };

    img.src = originalUrl;
  });
}

/**
 * Triggers a client-side file download for the compressed Blob
 */
export function downloadBlob(blob: Blob, originalName: string, outputFormat: string): void {
  const baseName = originalName.substring(0, originalName.lastIndexOf('.')) || originalName;
  const extension = outputFormat === 'jpeg' ? 'jpg' : outputFormat;
  const fileName = `${baseName}-compressed.${extension}`;

  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = fileName;
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();

  // Clean up
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);
  }, 100);
}
