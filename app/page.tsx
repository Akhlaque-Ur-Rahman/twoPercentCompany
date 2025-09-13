
import FeaturedLandSection from '@/components/layout/FeaturedLandSection'
import FeaturedPropertySection from '@/components/layout/FeaturedPropertySection'
import HeroSection from '@/components/layout/HeroSection'
import HomeCTASection from '@/components/layout/HomeCTASection'
import Navbar from '@/components/layout/Navbar'
import TestimonialSection from '@/components/TestimonialSection'
import React from 'react'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <HomeCTASection/>
      <FeaturedPropertySection/>
      <FeaturedLandSection/>
      <TestimonialSection/>
      
      
      
      
    </div>
  )
}

export default Home
