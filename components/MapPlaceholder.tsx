import React from "react";

/** Skeleton shown while Leaflet MapSection hydrates (dynamic import). */
const MapPlaceholder: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div
      className={`w-full ${className}`}
      role="status"
      aria-live="polite"
      aria-label="Loading map"
    >
      <div className="h-[min(52vw,17.5rem)] sm:h-80 md:h-[25rem] lg:h-[28.75rem] w-full rounded-media border border-header-stroke bg-2nd-bg overflow-hidden relative">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-2nd-bg via-header-stroke/40 to-2nd-bg" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="type-caption text-secondary-text z-10">Loading map…</p>
        </div>
      </div>
    </div>
  );
};

export default MapPlaceholder;
