import React from "react";
import SectionHeader from "@/components/ui/SectionHeader";

const CTA = () => {
  return (
    <div
      className="page-px section-y-lg border-t border-header-stroke"
      style={{
        backgroundImage: "url('/images/AbstractDesign2.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left",
      }}
    >
      <SectionHeader
        showStars={false}
        title="Ready to find your next property in Patna?"
        description="Tell us what you need — buy, sell, rent, or invest — and our team will guide you from first enquiry to closing."
        action={{ label: "Contact 2% Company", href: "/contact" }}
        actionVariant="primary"
        actionAlwaysVisible
      />
    </div>
  );
};

export default CTA;
