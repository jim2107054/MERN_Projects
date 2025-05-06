import React from 'react'
import { assets } from './../assets/assets';

const Contact = () => {
  return (
    <div>
        {/*---------Header part-----------*/}
        <div className='flex items-center justify-center text-xl font-light text-gray-800 my-16'>
          <p>CONTACT <span className='font-bold'>US</span></p>
        </div>
        {/*---------Last part-----------*/}
        <div className='flex  flex-col lg:flex-row gap-10 lg:gap-16 mx-1'>
          {/*------------Left Part---------*/}
          <img className='w-full lg:w-1/3 rounded-md' src={assets.contact_image} alt="" />
          {/*------------Right Part---------*/}
          <div>
            <div className='flex flex-col gap-5 text-gray-800 font-light'>
              <p className='font-bold'>OUR OFFICE</p>
              <div>
              <p>54709 Willms Station</p>
              <p>Suite 350, Washington, USA</p>
              </div>
              <div>
                <p>Tel: (415)555-0125</p>
                <p>Email: prescripto@gmail.com</p>
              </div>
              <p className='font-bold mt-5 lg:mt-8'>CAREERS AT PRESCRIPTO</p>
              <p>Learn more about our teams and job openings</p>
            </div>
            <button className='border border-blue-800 px-8 py-3 rounded-sm my-3 hover:bg-primary transition-all duration-500 hover:scale-105 hover:text-white hover:border-none'>Explore Jobs</button>
          </div>
        </div>
    </div>
  )
}

export default Contact