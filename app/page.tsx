import FeaturedPropertySection from '@/components/layout/FeaturedPropertySection'
import HeroSection from '@/components/layout/heroSection'
import HomeCTASection from '@/components/layout/homeCTASection'
import Navbar from '@/components/layout/navbar'
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <HomeCTASection/>
      <FeaturedPropertySection/>
    </div>
  )
}

export default page
