// components/LandSection.tsx
import Image from "next/image";
import React from "react";
import LandGrid from "../LandGrid";

const FeaturedLandSection = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-[40px] py-6 lg:py-[16px] lg:space-y-[16px] rounded-[16px]">
      {/* Icon */}
      <div className="flex justify-center lg:justify-start">
        <Image
          src="/svg/Stars.svg"
          height={0}
          width={0}
          alt="Stars"
          className="size-[40px] sm:size-[48px] lg:size-[56px]"
        />
      </div>

      {/* Heading + Button */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0">
        <div className="text-center lg:text-left max-w-[800px]">
          <h2 className="text-[20px] sm:text-[22px] lg:text-[24px] font-semibold">
            Featured Land Listings
          </h2>
          <p className="text-secondary-text text-[14px] sm:text-[15px] lg:text-[16px] mt-2">
            Explore prime plots and land for investment or development.
          </p>
        </div>
        <div className="rounded-[12px] h-fit bg-2nd-bg border-2 border-header-stroke">
          <button className="px-4 py-2 sm:px-5 sm:py-2.5 lg:px-[24px] lg:py-[16px] text-[14px] sm:text-[15px] lg:text-[16px] font-medium">
            View All Lands
          </button>
        </div>
      </div>

      {/* Grid */}
      <LandGrid />
    </div>
  );
};

export default FeaturedLandSection;
