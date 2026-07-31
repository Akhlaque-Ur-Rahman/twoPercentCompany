"use client";
import React from "react";
import Image from "next/image";
import { HomeCTASectionData } from "@/data/HomeCTASectionData";

const HomeCTASection = () => {
  return (
    <div className="home-cta-section page-px py-0 lg:py-4 lg:border-2 lg:border-header-stroke rounded-media">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-2 lg:border-none border-header-stroke p-3 lg:p-0 rounded-media">
        {HomeCTASectionData.map((item) => {
          const ArrowIcon = item.arrow;
          return (
            <div
              key={item.id}
              className="p-4 space-y-4 rounded-media bg-2nd-bg border-2 border-header-stroke w-full"
            >
              <div className="flex justify-end text-arrow-icon items-center">
                <ArrowIcon className="w-5 h-5 lg:h-7 lg:w-7" />
              </div>

              <div className="w-full flex justify-center items-center">
                <Image
                  src={item.icon}
                  height={48}
                  width={48}
                  alt={item.title}
                  sizes="48px"
                  className="object-contain w-12 h-12"
                />
              </div>

              <h2 className="text-center type-body font-medium text-body">
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
