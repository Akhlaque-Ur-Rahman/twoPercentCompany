import React from "react";
import LandGrid from "@/components/PlotGrid";
import SectionHeader from "@/components/ui/SectionHeader";

const FeaturedLandSection = () => {
  return (
    <section className="relative border-b border-header-stroke overflow-hidden">
      <div
        className="absolute inset-0 bg-2nd-bg/40 pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, var(--color-primary) 0%, transparent 45%), radial-gradient(circle at 80% 80%, var(--color-primary) 0%, transparent 40%)",
        }}
        aria-hidden
      />
      <div className="relative page-px section-y lg:space-y-6">
        <div className="space-y-2">
          <p className="type-label text-primary">Land &amp; plots</p>
          <SectionHeader
            title="Featured Lands"
            description="Prime plots for investment or development — clear titles, strong locations."
            action={{ label: "View All Plots", href: "/plots" }}
            actionVariant="secondary"
          />
        </div>
        <LandGrid />
      </div>
    </section>
  );
};

export default FeaturedLandSection;
