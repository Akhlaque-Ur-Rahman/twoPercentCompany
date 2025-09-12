"use client";
import React from "react";
import Image from "next/image";
import { HomeCTASectionData } from "@/data/HomeCTASectionData";

const HomeCTASection = () => {
  return (
    <div className="home-cta-section px-[24px] py-0 lg:px-[16px] lg:py-[16px] lg:border-2 lg:border-header-stroke rounded-[16px]">
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-[16px] border-2 lg:border-none border-header-stroke p-[12px] lg:p-0 rounded-[16px]">
      {HomeCTASectionData.map((item) => {
        const ArrowIcon = item.arrow;
        return (
          <div
            key={item.id}
            className="p-[16px] space-y-[16px] rounded-[16px] bg-2nd-bg border-2 border-header-stroke w-full"
          >
            {/* Arrow */}
            <div className="flex justify-end text-arrow-icon items-center  ">
              <ArrowIcon  className="w-5 h-5 lg:h-7 lg:w-7"/>
            </div>

            {/* Icon */}
            <div className="w-full flex justify-center items-center">
              <Image
                src={item.icon}
                height={0}
                width={0}
                alt={item.title}
                className="object-contain w-[48px] h-[48px]"
              />
            </div>

            {/* Title */}
            <h2 className="text-center text-[clamp(14px,2vw,16px)] font-medium text-white ">
              {item.title}
            </h2>
          </div>
        );
      })}
    </div>
    </div>
  );
};

export default HomeCTASection;
