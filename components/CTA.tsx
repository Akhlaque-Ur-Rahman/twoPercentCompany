import React from "react";
import SectionHeader from "@/components/ui/SectionHeader";

const CTA = () => {
  return (
    <div
      className="page-px section-y-lg rounded-media mb-6"
      style={{
        backgroundImage: "url('/images/AbstractDesign2.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left",
      }}
    >
      <SectionHeader
        showStars={false}
        title="Featured Properties"
        description="Explore our handpicked selection of featured properties. Each listing offers a glimpse into exceptional homes and investments available through 2% Company."
        action={{ label: "View All Properties", href: "/properties" }}
        actionVariant="primary"
        actionAlwaysVisible
      />
    </div>
  );
};

export default CTA;
