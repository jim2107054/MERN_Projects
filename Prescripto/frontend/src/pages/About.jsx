import React from 'react'
import { assets } from './../assets/assets';

const About = () => {
  return (
    <div>
        <div>
          <div className='flex items-center justify-center text-xl font-light text-gray-700 my-10'>
            <p>ABOUT <span className='font-semibold'>US</span></p>
          </div>
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
        </div>
    </div>
  )
}

export default About