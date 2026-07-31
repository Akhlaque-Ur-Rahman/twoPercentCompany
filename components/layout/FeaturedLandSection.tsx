import React from "react";
import LandGrid from "@/components/PlotGrid";
import SectionHeader from "@/components/ui/SectionHeader";

const FeaturedLandSection = () => {
  return (
    <div className="page-px section-y lg:space-y-6 border-b border-header-stroke">
      <SectionHeader
        title="Featured Lands"
        description="Explore prime plots and land for investment or development."
        action={{ label: "View All Plots", href: "/plots" }}
        actionVariant="secondary"
      />
      <LandGrid />
    </div>
  );
};

export default FeaturedLandSection;
