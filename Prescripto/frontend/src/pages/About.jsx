import React from 'react'
import { assets } from './../assets/assets';

const About = () => {
  return (
    <div>
        <div>
          {/*------------Heading Part---------*/}
          <div className='flex items-center justify-center text-xl font-light text-gray-700 my-10'>
            <p>ABOUT <span className='font-semibold'>US</span></p>
          </div>
          {/*--------Middle Part------------*/}
          <div className='flex flex-col lg:flex-row gap-5'>
            {/*------------ Left Side -------------*/}
            <div>
              <img className='rounded-lg w-4/5 mx-auto' src={assets.about_image} alt="" />
            </div>
            {/*------------ Right Side -------------*/}
            <div className='flex flex-col gap-5 text-gray-700 font-light w-full'>
              <p>Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
              <p>Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>
              <p className='text-base font-bold mt-5'>Our Vision</p>
              <p>Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
            </div>
          </div>
          {/*---------Last Part----------------*/}
          <div className='flex flex-col gap-5 text-gray-700 font-light m-10'>
            <p className='text-xl text-gray-800'>Why <span className='text-gray-950 font-medium'>Choose Us</span></p>
            <div className='flex flex-col lg:flex-row gap-5 lg:gap-0'>
            <div className='border border-gray-400 hover:bg-primary group px-10 py-8'>
              <p className='text-[18px] text-gray-800 group-hover:text-white font-medium mb-5'>Efficiency</p>
              <p className='text-gray-700 group-hover:text-white'>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
            </div>
            <div className='border border-gray-400 hover:bg-primary group px-10 py-8'>
              <p className='text-[18px] text-gray-800 group-hover:text-white font-medium mb-5'>Convenience</p>
              <p className='text-gray-700 group-hover:text-white'>Access to a network of trusted healthcare professionals in your area.</p>
            </div>
            <div className='border hover:bg-primary group border-gray-400 px-10 py-8'>
              <p className='text-[18px] text-gray-800 group-hover:text-white font-medium mb-5'>Personalization</p>
              <p className='text-gray-700 group-hover:text-white'>Tailored recommendations and reminders to help you stay on top of your health.</p>
            </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default About