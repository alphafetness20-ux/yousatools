import React from 'react';

interface AdSlotProps {
  slotId?: string;
  format?: 'auto' | 'horizontal' | 'rectangle';
  className?: string;
}

/**
 * Google AdSense Readiness Component
 *
 * NOTE FOR SITE OWNER:
 * To enable real advertisements after obtaining an approved Google AdSense publisher account:
 * 1. Set ENABLE_ADSENSE to true below.
 * 2. Replace ADSENSE_CLIENT_ID with your valid publisher ID (e.g. "ca-pub-XXXXXXXXXXXXXXXX").
 * 3. Provide the assigned slotId for each placement.
 *
 * Per Google AdSense policy and UX standards:
 * - Ads are placed with generous margins away from upload/compression/download buttons to prevent accidental clicks.
 * - By default, this component renders nothing (or an invisible placeholder) until configured.
 * - Never place fake or misleading ads.
 */
const ENABLE_ADSENSE = false; // Set to true after AdSense account approval
const ADSENSE_CLIENT_ID = 'ca-pub-REPLACE_WITH_YOUR_ID';

export const AdSlot: React.FC<AdSlotProps> = ({
  slotId = '0000000000',
  format = 'auto',
  className = '',
}) => {
  if (!ENABLE_ADSENSE) {
    // When ads are not yet configured, render a subtle non-intrusive container or null
    return null;
  }

  return (
    <div
      className={`my-8 flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 text-center ${className}`}
      aria-label="Advertisement"
    >
      <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400 mb-2">
        Advertisement
      </span>
      <div className="w-full flex items-center justify-center min-h-[90px] overflow-hidden">
        {/* AdSense ins tag */}
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};
