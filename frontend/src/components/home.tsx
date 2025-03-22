import * as React from 'react'
import Navbar from './shared/navbar'
import Footer from './shared/footer'
import HeroSection from './shared/heroSection'
import CategoryCarousel from './shared/categoryCarousel'
import LatestJobs from './shared/latestJobs'

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