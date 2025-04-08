import CategoryCarousel from '@/components/shared/categoryCarousel'
import Footer from '@/components/shared/footer'
import HeroSection from '@/components/shared/heroSection'
import LatestJobs from '@/components/shared/LatestJobs'
import Navbar from '@/components/shared/navbar'
import { useUserStore } from '@/store/user'
import * as React from 'react'
import { roleValue } from '@/types/types'

const Home = () => {
  const loggedIn = useUserStore((state) => state.loggedIn);
    const role = useUserStore((state) => state.role);
    
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <CategoryCarousel/>
        {loggedIn&&role==roleValue.jobSeeker&&<LatestJobs/>}
        <Footer/>        
    </div>
  )
}

export default Home