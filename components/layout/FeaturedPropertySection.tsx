import React from "react";
import PropertyGrid from "@/components/PropertyGrid";
import SectionHeader from "@/components/ui/SectionHeader";

const FeaturedPropertySection = () => {
  return (
    <section className="page-px section-y space-y-6 lg:space-y-8 border-b border-header-stroke">
      <div className="space-y-2">
        <p className="type-label text-primary">Homes</p>
        <SectionHeader
          title="Featured Properties"
          description="Handpicked residences across Patna — apartments and houses ready for your next move."
          action={{ label: "View All Properties", href: "/properties" }}
          actionVariant="secondary"
          actionAlwaysVisible
        />
      </div>
      <PropertyGrid />
    </section>
  );
};

export default FeaturedPropertySection;
