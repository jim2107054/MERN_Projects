import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20">
      {/*------------Left Side-------------*/}
      <div className="md:w-1/2 flex flex-col justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl  text-white font-semibold leading-tight">
          Book Appointment <br /> With Trusted Doctors
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <img src={assets.group_profiles} alt="" />
          <p className="">
            Simply browse through our extensive list of doctors, <br className="hidden sm:block"/> schedule
            your appointment hassle-free.
          </p>
        </div>
        <a className="bg-white px-4 py-1 flex gap-3 m-auto md:m-0 h-12 w-1/3 rounded-lg items-center hover:scale-105 transition-all duration-300" href="#speciality">
          Book Appointment <img src={assets.arrow_icon} alt="" className="text-3xl" />
        </a>
      </div>
      {/*-----------Right Side-------------*/}
      <div className="md:w-1/2 relative">
        <img src={assets.header_img} className="w-full md:absolute bottom-0 h-full rounded-lg" />
      </div>
    </div>
  );
};

export default Header;
