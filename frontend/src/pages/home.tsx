import CategoryCarousel from '@/components/shared/categoryCarousel'
import Footer from '@/components/shared/footer'
import HeroSection from '@/components/shared/heroSection'
import LatestJobs from '@/components/shared/latestJobs'
import Navbar from '@/components/shared/navbar'
import * as React from 'react'


const Home = () => {
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <CategoryCarousel/>
        <LatestJobs/>
        <Footer/>        
    </div>
  )
}

export default Home