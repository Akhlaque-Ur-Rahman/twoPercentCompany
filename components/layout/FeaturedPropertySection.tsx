import React from "react";
import PropertyGrid from "@/components/PropertyGrid";
import SectionHeader from "@/components/ui/SectionHeader";

const FeaturedPropertySection = () => {
  return (
    <div className="page-px section-y lg:space-y-6 border-b border-header-stroke">
      <SectionHeader
        title="Featured Properties"
        description="Explore our handpicked selection of featured properties. Each listing offers a glimpse into exceptional homes and investments available through 2% Company."
        action={{ label: "View All Properties", href: "/properties" }}
        actionVariant="secondary"
      />
      <PropertyGrid />
    </div>
  );
};

export default FeaturedPropertySection;
