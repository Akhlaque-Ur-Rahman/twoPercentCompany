"use client";
import React from "react";
import PropertyGrid from "@/components/PropertyGrid";
import SectionHeader from "@/components/ui/SectionHeader";

const FeaturedPropertySection = () => {
  return (
    <div className="page-px section-y-sm lg:space-y-2 rounded-media border-b-2 border-header-stroke mb-6">
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
