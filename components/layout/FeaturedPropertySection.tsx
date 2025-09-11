import Image from 'next/image'
import React from 'react'
import PropertyShowcase from '../PropertySlider'


const FeaturedPropertySection = () => {
  return (
    <div className='px-[40px] py-[16px] lg:space-y-[16px] rounded-[16px]'>
      <div>
        <Image
            src='/svg/Stars.svg'
            height={0}
            width={0}
            alt='Stars'
            className='size-[56px]'
        />
      </div>
      <div className="heading-btn-box  flex justify-between  items-center">
        <div className="text-box">
            <h2 className='mx-auto'>Featured Properties</h2>
            <p className='text-secondary-text'>
                Explore our handpicked selection of featured properties. Each listing offers a glimpse into exceptional homes and investments available through Estatein.
            </p>
        </div>
        <div className="view-all-btn rounded-[12px] h-fit self-center bg-2nd-bg borde-2 border-header-stroke flex justify-center items-center text-nowrap">
            <button className='px-4 py-2 lg:px-[24px] lg:py-[16px]'>View All Properties</button>
        </div>
      </div>
      <PropertyShowcase/>
      

    </div>
  )
}

export default FeaturedPropertySection
