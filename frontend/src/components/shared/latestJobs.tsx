// import React from 'react'
import { useState } from 'react';
import LatestJobCard from './latestJobCard';

const randomJobs=[1,2,3,4,5,6,7,8];


const [jobs , setJobs] = useState<>()


const LatestJobs = () => {
  return (
    <div className='max-w-7xl mx-auto my-20'>
        <h1 className='text-4xl font-bold'><span className='text-[#0039a6]'>Latest </span>Job Openings</h1>
        {/* multiple job card display here */}

        <div className='grid grid-cols-3 gap-4 my-5'>
        {
          randomJobs.slice(0,6).map((item,index)=><LatestJobCard/>)
        }
        </div>
        

    </div>
  )
}

export default LatestJobs