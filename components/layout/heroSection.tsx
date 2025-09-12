"use client";

import React from "react";
import Image from "next/image";
import { heroSectionData } from "@/data/heroSectionData";
import Link from "next/link";

const HeroSection = () => {
  const { heading, description, imageMain, imageOverlay, buttons, cards } =
    heroSectionData;

  return (
    <div className="bg-main-bg p-[24px] lg:pl-[40px] lg:pr-0 lg:pt-0 lg:pb-0 relative gap-[32px] lg:gap-[16px] flex flex-col lg:flex-row w-full">
      {/* Right Box (Image First on Mobile) */}
      <div className="hero-right-box relative w-full lg:w-1/2 order-1 lg:order-2 h-[300px] sm:h-[400px] lg:h-auto">
        <Image
          src={imageOverlay}
          fill
          alt="abstract"
          sizes="(max-width: 768px) 100vw, 50vw"
          className="absolute top-0 left-0 h-full w-full object-cover bg-no-repeat"
        />
        <Image
          src={imageMain}
          fill
          alt="Building"
          sizes="(max-width: 768px) 100vw, 50vw"
          className="h-full w-full object-cover bg-bottom bg-no-repeat relative z-10"
        />
        <div className="absolute bottom-0 left-0 lg:top-1/5 lg:left-0 lg:-translate-x-1/2 w-[72px] h-[72px] lg:w-[88px] lg:h-[88px]">
          <Image
            src="/images/Sub.png"
            alt="Decorative-circle"
            fill
            sizes="72px, (min-width: 1024px) 88px"
            className="object-contain"
          />
        </div>
      </div>

      {/* Left Box */}
      <div className="hero-left-box xl:pt-[80px] xl:pb-[160px] flex flex-col justify-center items-start w-full lg:w-1/2 order-2 lg:order-1">
        {/* Heading + Description */}
        <div>
          <h2 className="text-white font-semibold text-[clamp(24px,5vw,48px)] leading-tight">
            {heading}
          </h2>
          <p className="text-secondary-text text-[clamp(16px,2.5vw,16px)] mt-2">
            {description}
          </p>
        </div>

        {/* Buttons */}
        <div className="hero-left-btn-box w-full xl:py-[40px] gap-[16px] flex flex-col lg:flex-row mt-6">
          {buttons.map((btn) => (
            <Link
              key={btn.id}
              href={btn.link}
              className={`block rounded-[12px] text-center ${
                btn.type === "primary"
                  ? "bg-primary text-white lg:px-[24px] lg:py-[20px] py-[16px] px-0"
                  : "border border-header-stroke text-white lg:px-[52px] lg:py-[20px] py-[16px] px-0"
              }`}
            >
              {btn.label}
            </Link>
          ))}
        </div>

        {/* Cards (Dynamic) */}
        <div className="hero-left-cards-box w-full grid grid-cols-2 sm:grid-cols-3 gap-[16px] mt-6">
          {cards.map((card, idx) => (
            <div
              key={card.id}
              className={`lg:p-[16px] py-[24px] space-y-2 rounded-[12px] bg-2nd-bg text-center lg:text-left ${
                idx === cards.length - 1 && cards.length % 2 !== 0
                  ? "col-span-2 sm:col-span-1"
                  : ""
              }`}
            >
              <h2 className="text-[clamp(24px,4vw,32px)] font-semibold">
                {card.value}
              </h2>
              <p className="text-[clamp(16px,2.5vw,16px)] text-secondary-text">
                {card.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
