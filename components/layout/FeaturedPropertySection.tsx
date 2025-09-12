'use client'
import Image from 'next/image'
import React from 'react'
import PropertyGrid from '@/components/PropertyGrid'
import Link from 'next/link'



const FeaturedPropertySection = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-[40px] py-6 lg:py-[16px] lg:space-y-[16px] rounded-[16px]">
  {/* Stars Icon */}
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
  <div className="heading-btn-box flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0">
    {/* Text */}
    <div className="text-box text-center lg:text-left max-w-[800px]">
      <h2 className="text-[20px] sm:text-[22px] lg:text-[24px] font-semibold">
        Featured Properties
      </h2>
      <p className="text-secondary-text text-[14px] sm:text-[15px] lg:text-[16px] mt-2">
        Explore our handpicked selection of featured properties. Each listing
        offers a glimpse into exceptional homes and investments available
        through Estatein.
      </p>
    </div>

    {/* Button */}
    <div className="view-all-btn rounded-[12px] h-fit bg-2nd-bg border-2 border-header-stroke flex justify-center items-center text-nowrap">
      <Link href='/properties' className="px-4 py-2 sm:px-5 sm:py-2.5 lg:px-[24px] lg:py-[16px] text-[14px] sm:text-[15px] lg:text-[16px] font-medium">
        View All Properties
      </Link>
    </div>
  </div>

  {/* Slider */}
  <PropertyGrid />
    </div>

  )
}

export default FeaturedPropertySection
