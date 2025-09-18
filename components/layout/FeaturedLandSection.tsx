// components/LandSection.tsx
'use client'
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LandGrid from "@/components/PlotGrid";


const FeaturedLandSection = () => {
  return (
    <div className="px-6 sm:px-6 lg:px-[40px] py-6 lg:py-[16px] lg:space-y-[16px] rounded-[16px] border-b-2 border-header-stroke">
      {/* Icon */}
      <div className="">
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
          <h2 className="text-[20px] sm:text-[22px] lg:text-[40px] font-semibold">
            Featured Lands
          </h2>
          <p className="text-secondary-text text-[14px] sm:text-[15px] lg:text-[16px] mt-2">
            Explore prime plots and land for investment or development.
          </p>
        </div>
        <div className="view-all-btn rounded-[12px] h-fit bg-2nd-bg border-2 border-header-stroke  justify-center items-center text-nowrap hidden lg:flex">
      <Link href='/properties' className="px-4 py-2 sm:px-5 sm:py-2.5 lg:px-[24px] lg:py-[16px] text-[14px] sm:text-[15px] lg:text-[16px] font-medium">
        View All Properties
      </Link>
    </div>
      </div>

      {/* Grid */}
      <LandGrid/>
    </div>
  );
};

export default FeaturedLandSection;
