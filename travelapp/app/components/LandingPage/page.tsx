"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import bgimgtwo from '../../../public/Images/bgimg.jpg';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import VideoModal from './videomodal';
import PlayArrowIcon from '@mui/icons-material/PlayArrow'; // Import PlayArrowIcon
import paris from '../../../public/Images/paris.png'
import mountain from '../../../public/Images/mountain.jpg'
import country from '../../../public/Images/bg-country.jpg'
import { useRouter } from 'next/navigation'; // Import the useRouter hook




const Page = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter(); // Initialize the router


  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSignUp = () => {
    // Navigate to the home page when Sign Up button is clicked
    router.push('/signup');
  };

  return (
    <div className="relative h-screen  ">
      <div className="absolute inset-0">
        <Image src={bgimgtwo} alt="background image" layout="fill" objectFit="cover" />
        <div className='relative flex w-10/12 ml-20 justify-between'>
          <div className='flex'>
            <TravelExploreIcon className='mt-3 ml-4 text-5xl text-gray-700 text-opacity-75' />
            <h2 className='text-5xl mt-3 text-gray-700 text-opacity-75 font-mono'>Traveling</h2>
          </div>
          <div>
            <button className='bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mt-4' onClick={handleSignUp}>
              Sign Up
            </button>
          </div>
        </div>
        <div className=' align-middle flex justify-center mt-36  '>
          <div className='relative  '>
          <p className='font-bold text-white text-8xl' >Let's Explore The world</p>
          <div className='mt-10 bg-slate-50  rounded-2xl h-20  w-8/12  ml-40 font-mono'>
          <p className='  text-gray-600 text-2xl text-center  pt-2'>  
The world is a book, and those who do not travel read only one page.</p>
          </div>
        
        </div>
        </div>
        <div className="relative flex align-middle justify-center mt-10">
          <button
            className="text-white rounded  border border-white-200 p-2 font-bold hover:bg-slate-400  w-36"
            onClick={handleOpenModal}
          >
            <PlayArrowIcon /> Play video
          </button>
        </div>
        <VideoModal isOpen={isModalOpen} onClose={handleCloseModal} />
       
      </div>
      
    </div>
  );
};

export default Page;
