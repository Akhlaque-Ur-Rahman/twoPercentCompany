import React from 'react'
import Link from 'next/link'

const CTA = () => {
  return (
    <div className='px-6 sm:px-6 lg:px-[40px] py-6 lg:py-[60px] rounded-[16px]  mb-6' style={{ backgroundImage: "url('/images/AbstractDesign2.png')", backgroundRepeat:'no-repeat', backgroundPosition:'left', }}>
        <div className="heading-btn-box flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0">
        {/* Text */}
        <div className="text-box text-center lg:text-left max-w-[800px]">
          <h2 className="text-[20px] sm:text-[22px] lg:text-[40px] font-bold">
            Featured Properties
          </h2>
          <p className="text-secondary-text text-[14px] sm:text-[15px] lg:text-[16px] mt-2">
            Explore our handpicked selection of featured properties. Each
            listing offers a glimpse into exceptional homes and investments
            available through Estatein.
          </p>
        </div>

        {/* Button */}
        <div className="view-all-btn rounded-[12px] h-fit bg-primary    justify-center items-center text-nowrap flex">
          <Link
            href="/properties"
            className="px-4 py-2 sm:px-5 sm:py-2.5 lg:px-[24px] lg:py-[16px] text-[14px] sm:text-[15px] lg:text-[16px] font-medium"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CTA
