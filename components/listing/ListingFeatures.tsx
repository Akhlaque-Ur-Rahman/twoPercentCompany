import React from "react";
import { iconForFeatureLabel } from "@/lib/featureIcons";

type ListingFeaturesProps = {
  features: string[];
  title?: string;
};

export default function ListingFeatures({
  features,
  title = "Features & amenities",
}: ListingFeaturesProps) {
  if (!features.length) return null;

  return (
    <section id="features" aria-labelledby="features-heading" className="scroll-mt-28">
      <h2 id="features-heading" className="type-section text-body mb-2">
        {title}
      </h2>
      <p className="type-caption text-secondary-text mb-5 max-w-prose">
        Highlights to verify on your visit — confirm what matters for your home.
      </p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {features.map((feature) => {
          const Icon = iconForFeatureLabel(feature);
          return (
            <li
              key={feature}
              className="flex items-center gap-3 border-b border-header-stroke py-3"
            >
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-control border border-header-stroke text-primary bg-2nd-bg/50">
                <Icon size={16} aria-hidden />
              </span>
              <span className="type-body text-body font-medium">{feature}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
