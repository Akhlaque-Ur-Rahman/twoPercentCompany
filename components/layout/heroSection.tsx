import { X } from "lucide-react";
import React from "react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="bg-main-bg pl-6 pr-6 relative flex flex-col lg:flex-row w-full">
      
      {/* Right Box (Image First on Mobile) */}
      <div className="hero-right-box relative w-full lg:w-1/2 order-1 lg:order-2 h-[300px] sm:h-[400px] lg:h-auto">
        <Image
          src="/images/AbstractDesign1.png"
          fill
          alt="abstract"
          className="absolute top-0 left-0 h-full w-full object-cover"
        />
        <Image
          src="/images/ImageMainDesktop.png"
          fill
          alt="Building"
          className="h-full w-full object-contain relative z-10"
        />
      </div>

      {/* Left Box */}
      <div className="hero-left-box xl:pt-[80px] xl:pb-[72px] flex flex-col justify-center items-start w-full lg:w-1/2 order-2 lg:order-1">
        <div>
          <h2 className="text-white font-semibold text-[clamp(28px,5vw,48px)] leading-tight">
            Discover Your Dream Property with Estatein
          </h2>
          <p className="text-secondary-text text-[clamp(14px,2.5vw,16px)] mt-2">
            Discover Your Dream Property with Estatein
          </p>
        </div>

        {/* Buttons */}
        <div className="hero-left-btn-box w-full xl:py-[40px] gap-[16px] flex flex-col sm:flex-row mt-6">
          <button className="block border border-header-stroke px-6 py-3 sm:px-12 sm:py-4 rounded-[12px] text-white">
            Learn More
          </button>
          <button className="block px-6 py-3 sm:px-8 sm:py-4 bg-primary text-white rounded-[12px]">
            Browse Properties
          </button>
        </div>

        {/* Cards */}
        <div className="hero-left-cards-box w-full flex flex-col sm:flex-row gap-[16px] mt-6">
          <div className="p-[16px] rounded-[12px] bg-2nd-bg flex-1">
            <h2 className="text-[clamp(20px,4vw,32px)] font-semibold">200+</h2>
            <p className="text-[clamp(14px,2.5vw,16px)] text-secondary-text">
              Happy Customer
            </p>
          </div>
          <div className="p-[16px] rounded-[12px] bg-2nd-bg flex-1">
            <h2 className="text-[clamp(20px,4vw,32px)] font-semibold">10k+</h2>
            <p className="text-[clamp(14px,2.5vw,16px)] text-secondary-text">
              Properties For Clients
            </p>
          </div>
          <div className="p-[16px] rounded-[12px] bg-2nd-bg flex-1">
            <h2 className="text-[clamp(20px,4vw,32px)] font-semibold">16+</h2>
            <p className="text-[clamp(14px,2.5vw,16px)] text-secondary-text">
              Years of Experience
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
