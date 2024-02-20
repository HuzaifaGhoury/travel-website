"use client"
import React from 'react'
import Image from 'next/image'
import bgimgtwo from '../../../public/Images/bgimg.jpg'
// import travellogo from '../../../public/Images/travellogo.svg'
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { Button } from '@mui/material';

const page = () => {
 
  return (
      <div className="relative h-screen">
      <div className="absolute inset-0">
        <Image src={bgimgtwo} alt="background image" 
        layout="fill" objectFit="cover"/>
    <div className='relative flex    w-10/12  ml-20 justify-between'>
      <div className='flex  '>

    <TravelExploreIcon className='  mt-3 ml-4 text-5xl text-gray-700 text-opacity-75  '/>
    <h2 className=' text-5xl mt-3 text-gray-700 text-opacity-75 font-mono'>Traveling</h2>
      </div>
      <div>
      <button className='bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mt-4  '>
  Sign Up
</button>


     
      </div>
    </div>

      </div>
      </div>
  )
}

export default page