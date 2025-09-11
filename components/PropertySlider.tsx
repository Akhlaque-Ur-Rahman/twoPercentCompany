import { BedDouble } from "lucide-react";
import Image from "next/image";
import React from "react";

const PropertySlider = () => {
  const properties = Array.from({ length: 5 });

  return (
    <div className="lg:py-[24px] lg:px-0 py-6 px-4 space-y-[16px]">
      {/* Row 1 - 3 Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px]">
        {properties.slice(0, 3).map((_, i) => (
          <div
            key={i}
            className="card lg:p-[24px] p-4 gap-[16px] flex flex-col rounded-[24px] border-2 border-header-stroke"
          >
            {/* Image */}
            <div className="w-full flex justify-center bg-cover">
              <Image
                src="/images/seasidevilla.png"
                height={240}
                width={394}
                alt="seaside villa"
                className="rounded-[16px] w-full object-cover"
              />
            </div>

            {/* Title + Desc */}
            <div className="w-full">
              <h2 className="text-[20px] sm:text-[22px] lg:text-[24px] font-semibold">
                Seaside Serenity Villa
              </h2>
              <p className="text-secondary-text text-[14px] sm:text-[15px] lg:text-[16px]">
                A stunning 4-bedroom, 3-bathroom villa in a peaceful suburban
                neighborhood..
              </p>
            </div>

            {/* Tags */}
            <div className="card-category-tags w-full flex flex-wrap items-center gap-[12px]">
              {Array.from({ length: 3 }).map((_, j) => (
                <div
                  key={j}
                  className="px-[8px] py-[4px] rounded-full bg-2nd-bg flex items-center gap-[4px]"
                >
                  <BedDouble width={20} height={20} />
                  <p className="font-semibold text-[14px] sm:text-[15px] lg:text-[16px]">
                    4-Bedroom
                  </p>
                </div>
              ))}
            </div>

            {/* Price + Button */}
            <div className="price-btn-container py-[8px] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="price-box flex items-center sm:items-start flex-col gap-[6px]">
                <p className="text-secondary-text text-[14px] sm:text-[15px]">
                  Price
                </p>
                <p className="text-[20px] sm:text-[22px] lg:text-[24px] font-semibold">
                  ₹1,250,000
                </p>
              </div>
              <button className="w-full sm:w-auto px-[20px] sm:px-[24px] lg:px-[32px] py-[10px] sm:py-[12px] lg:py-[16px] rounded-[16px] bg-primary font-semibold text-[14px] sm:text-[15px] lg:text-[16px]">
                View Property Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Row 2 - 2 Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
        {properties.slice(3, 5).map((_, i) => (
          <div
            key={i + 3}
            className="card lg:p-[24px] p-4 gap-[16px] flex flex-col rounded-[24px] border-2 border-header-stroke"
          >
            {/* Image */}
            <div className="w-full flex justify-center bg-cover">
              <Image
                src="/images/seasidevilla.png"
                height={240}
                width={394}
                alt="seaside villa"
                className="rounded-[16px] w-full object-cover"
              />
            </div>

            {/* Title + Desc */}
            <div className="w-full">
              <h2 className="text-[20px] sm:text-[22px] lg:text-[24px] font-semibold">
                Seaside Serenity Villa
              </h2>
              <p className="text-secondary-text text-[14px] sm:text-[15px] lg:text-[16px]">
                A stunning 4-bedroom, 3-bathroom villa in a peaceful suburban
                neighborhood..
              </p>
            </div>

            {/* Tags */}
            <div className="card-category-tags w-full flex flex-wrap items-center gap-[12px]">
              {Array.from({ length: 3 }).map((_, j) => (
                <div
                  key={j}
                  className="px-[8px] py-[4px] rounded-full bg-2nd-bg flex items-center gap-[4px]"
                >
                  <BedDouble width={20} height={20} />
                  <p className="font-semibold text-[14px] sm:text-[15px] lg:text-[16px]">
                    4-Bedroom
                  </p>
                </div>
              ))}
            </div>

            {/* Price + Button */}
            <div className="price-btn-container py-[8px] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="price-box flex items-center sm:items-start flex-col gap-[6px]">
                <p className="text-secondary-text text-[14px] sm:text-[15px]">
                  Price
                </p>
                <p className="text-[20px] sm:text-[22px] lg:text-[24px] font-semibold">
                  ₹1,250,000
                </p>
              </div>
              <button className="w-full sm:w-auto px-[20px] sm:px-[24px] lg:px-[32px] py-[10px] sm:py-[12px] lg:py-[16px] rounded-[16px] bg-primary font-semibold text-[14px] sm:text-[15px] lg:text-[16px]">
                View Property Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertySlider;
