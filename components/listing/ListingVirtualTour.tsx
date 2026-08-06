import React from "react";
import { ExternalLink } from "lucide-react";
import { DEFAULT_VIRTUAL_TOUR_URL } from "@/data/PropertyData";

type ListingVirtualTourProps = {
  url?: string;
  title?: string;
};

export default function ListingVirtualTour({
  url = DEFAULT_VIRTUAL_TOUR_URL,
  title = "360° virtual tour",
}: ListingVirtualTourProps) {
  const src = url?.trim() || DEFAULT_VIRTUAL_TOUR_URL;

  return (
    <section
      id="virtual-tour"
      aria-labelledby="virtual-tour-heading"
      className="scroll-mt-28 space-y-4"
    >
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h2 id="virtual-tour-heading" className="type-section text-body">
            {title}
          </h2>
          <p className="type-caption text-secondary-text mt-1">
            Walk the space remotely — open fullscreen for the best experience.
          </p>
        </div>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 type-caption font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg rounded-sm"
        >
          Open tour
          <ExternalLink size={14} aria-hidden />
        </a>
      </div>

      <div className="relative w-full overflow-hidden rounded-card border border-header-stroke bg-2nd-bg aspect-[16/10]">
        <iframe
          title={`${title} embed`}
          src={src}
          className="absolute inset-0 h-full w-full border-0"
          allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
