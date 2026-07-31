"use client";
import React from "react";
import Image from "next/image";
import { HomeCTASectionData } from "@/data/HomeCTASectionData";

const HomeCTASection = () => {
  return (
    <div className="page-px section-y border-b border-header-stroke">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-header-stroke">
        {HomeCTASectionData.map((item) => {
          const ArrowIcon = item.arrow;
          return (
            <div
              key={item.id}
              className="flex flex-col gap-3 lg:px-6 first:lg:pl-0 last:lg:pr-0"
            >
              <div className="flex items-start justify-between gap-3">
                <Image
                  src={item.icon}
                  height={40}
                  width={40}
                  alt=""
                  aria-hidden
                  sizes="40px"
                  className="object-contain w-10 h-10"
                />
                <ArrowIcon
                  className="w-4 h-4 text-arrow-icon shrink-0 mt-1"
                  aria-hidden
                />
              </div>
              <h2 className="type-body font-medium text-body leading-snug">
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
