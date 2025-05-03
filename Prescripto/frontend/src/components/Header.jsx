import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 py-3 md:px-10 lg:px-20'>
        {/*------------Left Side-------------*/}
        <div className="md:w-1/2 flex flex-col items-center justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
            <p>Book Appointment <br/> With Trusted Doctors</p>
            <div className="">
                <img src={assets.group_profiles} alt="" />
                <p className="">
                    Simply browse through our extensive list of doctors, <br/> schedule your appointment hassle-free.
                </p>
            </div>
            <a href=''>
                Book Appointment <img src={assets.arrow_icon} alt="" className="" />
            </a>
        </div>
        {/*-----------Right Side-------------*/}
        <div className="md:w-1/2">
            <img src={assets.header_img} alt="" />
        </div>
    </div>
  )
}

export default Header