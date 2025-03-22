import * as React from 'react'
import Navbar from '../shared/navbar'
import FilterCard from './filterCard'
import Job from './job'
import { spawn } from 'child_process'

const jobsarray =[1,2,3,4,5,6,7,8]

const jobs = () => {
  return (
    <div>
        <Navbar/>

        <div className='max-w-7xl mx-auto mt-5 '>
       <div className='flex gap-5'>
            <div className='w-18'>
            <FilterCard/>
            </div>
        {    
            jobsarray.length <=0 ? <span>Job not found</span> :(
                <div className='flex-1 h-[150vh] overflow-y-auto pb-5'>
                   <div className='grid grid-cols-3 gap-4'>
                {
                     jobsarray.map((Item,index)=>(
                        <div>
                            <Job/>
                        </div>
                     ))
                }
                   </div>
                </div>
            )

            
        }
       </div>
        
        </div>
        
    </div>
  )
}

export default jobs