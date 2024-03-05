"use client"
import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import Image from 'next/image';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import signupimg from '../../public/Images/signupimg.jpg';
import { auth, createUserWithEmailAndPassword } from '../../app/firebase'; // Update the path
import { useRouter } from 'next/navigation';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Page = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
const router = useRouter()
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
        // Access the user information using userCredential.user
        console.log('User signed up:', userCredential.user);
        router.push('/home')
        // Redirect to home page or handle navigation as needed
      } catch (error) {
        console.error('Error signing up:', error);
      }
    },
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prev) => !prev);
  };

  const toggleSignInMode = () => {
    setIsSignIn((prev) => !prev);
  };

  return (
    <div className='bg-gray-200 w-screen h-screen flex items-center justify-center'>
      <div className='w-9/12 h-5/6 flex shadow-lg bg-white rounded-lg overflow-hidden'>
        <div className='w-6/12'>
          <Image src={signupimg} alt='signupbg' objectFit='cover' className='w-full h-full' />
        </div>
        <div className='w-6/12 p-8'>
          {isSignIn ? (
            <>
              <p className='text-center text-2xl font-mono font-bold underline mb-4'>SIGN IN</p>
              <form className='flex flex-col gap-4  pl-28 ' onSubmit={formik.handleSubmit}>
                <div className='relative'>
                  <input
                    type='email'
                    placeholder='Email'
                    name='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className='border border-gray-300 p-2 pl-8 rounded-2xl focus:outline-none focus:ring focus:border-blue-300'
                  />
                  <FaEnvelope className='absolute left-3 top-3 text-gray-500' />
                </div>
                <div className='relative'>
                  <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className='border border-gray-300 p-2 pl-8 rounded-2xl focus:outline-none focus:ring focus:border-blue-300'
                  />
                  <FaLock className='absolute left-3 top-3 text-gray-500' />
                  <div
                    className='absolute right-3 top-2 text-gray-500 cursor-pointer'
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>

                <button
                  type='submit'
                  className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-all duration-300  w-48'
                >
                  Sign In
                </button>
              </form>
              <p className='text-center mt-4'>
                Don't have an account?{' '}
                <span className='text-blue-500 cursor-pointer' onClick={toggleSignInMode}>
                  Sign Up
                </span>
              </p>
            </>
          ) : (
            <>
              <p className='text-center text-2xl font-mono font-bold underline mb-4'>SIGN UP!</p>
              <form className='flex flex-col gap-4 pl-28' onSubmit={formik.handleSubmit}>
                <div className='relative'>
                  <input
                    type='text'
                    placeholder='Username'
                    name='username'
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className='border border-gray-300 p-2 pl-8  rounded-2xl focus:outline-none focus:ring focus:border-blue-300'
                  />
                  <FaUser className='absolute left-3 top-3 text-gray-500' />
                </div>

                <div className='relative'>
                  <input
                    type='email'
                    placeholder='Email'
                    name='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className='border border-gray-300 p-2 pl-8 rounded-2xl focus:outline-none focus:ring focus:border-blue-300'
                  />
                  <FaEnvelope className='absolute left-3 top-3 text-gray-500' />
                </div>

                <div className='relative'>
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    placeholder='Password'
                    name='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className='border border-gray-300 p-2 pl-8 rounded-2xl focus:outline-none focus:ring focus:border-blue-300'
                  />
                  <FaLock className='absolute left-3 top-3 text-gray-500' />
                  {/* <div
                    className='absolute right-3 top-2 text-gray-500 cursor-pointer'
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </div> */}
                </div>

                <div className='relative'>
                  <input
                    type={confirmPasswordVisible ? 'text' : 'password'}
                    placeholder='Confirm Password'
                    name='confirmPassword'
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className='border border-gray-300 p-2 pl-8 rounded-2xl focus:outline-none focus:ring focus:border-blue-300'
                  />
                  <FaLock className='absolute left-3 top-3 text-gray-500' />
                  {/* <div
                    className='absolute right-3 top-2 text-gray-500 cursor-pointer'
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  </div> */}
                </div>

                <button
                  type='submit'
                  className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-all duration-300  w-48'
                >
                  Sign Up
                </button>
              </form>
              <p className='text-center mt-4'>
                Already have an account?{' '}
                <span className='text-blue-500 cursor-pointer' onClick={toggleSignInMode}>
                  Sign In
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
