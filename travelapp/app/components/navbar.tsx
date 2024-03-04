"use client"
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CommonBtn from './commonbtn';

const Navbar = () => {
const router = useRouter();

  const navigateToExperiences = () => {
    router.push('/experiences');
  };

  return (

<div className=' flex justify-center align-middle  '>
    <div className=" relative  w-8/12   h-14 top-7  rounded-3xl bg-white text-stone-950 ">
      <div className="flex items-center  gap-40 mt-3 ml-6 ">
        <div className="flex items-center">
          <svg
            className="w-6 h-6 "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 2C6.686 2 4 4.686 4 8c0 1.907.75 3.62 2 4.889V18l4-4 4 4v-5.111C15.25 11.62 16 9.907 16 8c0-3.314-2.686-6-6-6zm0 9.333C8.207 11.333 7.333 10.46 7.333 9.333S8.207 7.333 9.333 7.333 11.333 8.207 11.333 9.333 10.46 11.333 9.333 11.333z" />
          </svg>
          <span className=" text-xl font-bold ">Tourist</span>
        </div>
        <ul className="flex font-bold">
          <li className="mx-2">
            <Link href="/">Home</Link>
          </li>
          <li
            className="mx-2 cursor-pointer hover:text-yellow-300"
            onClick={navigateToExperiences}
          >
            Experiences
          </li>  
          <li className="mx-2">About</li>
          <li className="mx-2">Reviews</li>
          <li className="mx-2">Contact</li>
        </ul>
        <CommonBtn buttonText="Log out" onClick={() => {}} />

    </div>
    </div>
    </div>
  );
};

export default Navbar;