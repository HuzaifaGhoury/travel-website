import React from 'react'
import Image from 'next/image';
import signupimg from '../../public/Images/signupimg.jpg' 
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';


const page = () => {
  return (
<div className=' bg-gray-200 w-screen h-screen   pl-72  pt-24'>
<div className=' w-9/12 h-5/6 flex  shadow-lg'>
<div className='w-6/12 '>
  <Image src={signupimg} alt='signupbg' objectFit="cover" className="w-full h-full" />
</div>
<div className='w-6/12'>
  <p className='text-center text-2xl font-mono font-bold underline mb-4'>SIGN UP!</p>

  <form className='flex flex-col gap-4'>
    <div className='relative'>
      <input
        type='text'
        placeholder='Username'
        className='border border-gray-300 p-2 pl-10 rounded'
      />
      <FaUser className='absolute left-3 top-2 text-gray-500' />
    </div>

    <div className='relative'>
      <input
        type='email'
        placeholder='Email'
        className='border border-gray-300 p-2 pl-10 rounded'
      />
      <FaEnvelope className='absolute left-3 top-2 text-gray-500' />
    </div>

    <div className='relative'>
      <input
        type='password'
        placeholder='Password'
        className='border border-gray-300 p-2 pl-10 rounded'
      />
      <FaLock className='absolute left-3 top-2 text-gray-500' />
      <FaEye className='absolute right-3 top-2 text-gray-500 cursor-pointer' />
    </div>

    <div className='relative'>
      <input
        type='password'
        placeholder='Confirm Password'
        className='border border-gray-300 p-2 pl-10 rounded'
      />
      <FaLock className='absolute left-3 top-2 text-gray-500' />
      <FaEyeSlash className='absolute right-3 top-2 text-gray-500 cursor-pointer' />
    </div>

    <button
      type='submit'
      className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-all duration-300'
    >
      Sign Up
    </button>
  </form>
</div>



</div>
</div>
  )
}

export default page;