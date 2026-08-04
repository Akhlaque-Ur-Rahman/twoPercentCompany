import React from "react";
import { HeroStats } from "@/data/HeroSectionData";

const HomeCTASection = () => {
  return (
    <div className="page-px section-y border-b border-header-stroke">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-0 lg:divide-x lg:divide-header-stroke">
        {HeroStats.map((stat) => (
          <div
            key={stat.id}
            className="flex flex-col items-center text-center lg:px-8 first:lg:pl-0 last:lg:pr-0"
          >
            <p className="type-stat text-body leading-none">{stat.value}</p>
            <p className="type-caption text-secondary-text mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCTASection;
