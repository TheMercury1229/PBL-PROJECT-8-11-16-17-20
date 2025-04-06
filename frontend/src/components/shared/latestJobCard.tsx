import { Badge } from '../ui/badge'
import * as React from 'react'

const latestJobCard = () => {
  return (
    <div className='p-5 round-md shadow-xl bg-white border-gray-100 cursor-pointer'>
      <div>
      <h1 className='font-medium text-lg'>Company Name</h1>
      <p className='text-sm text-gray-500'>India</p>
      </div>
      <div>
        <h1 className='font-bold text-lg'>Job Title</h1>
        <p className='text-sm text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora sequi rerum veniam voluptates? Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
      </div>
      <div className='felx items-center gap-2 mt-4'>
      
      </div>
    </div>
  )
}

export default latestJobCard