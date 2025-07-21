import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-16 my-10 mt-40 text-base">
        {/*--------- Left Section ----------*/}
        <div className="">
            <img className="mb-5 w-40" src={assets.logo} alt="logo" />
            <p className="w-full md:w-2/3 text-gray-800 leading-6">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>
        {/*--------- Center Section ----------*/}
        <div className="">
            <p className="text-xl font-medium mb-5">Company</p>
            <ul className="flex flex-col gap-2 text-gray-800 font-semibold">
                <li className="cursor-pointer" onClick={()=>{navigate('/'); window.scrollTo(0,0)}}>Home</li>
                <li className="cursor-pointer" onClick={()=>{navigate('/about'); window.scrollTo(0,0)}}>About us</li>
                <li className="cursor-pointer" onClick={()=>{navigate('/contact'); window.scrollTo(0,0)}}>Contact us</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        {/*--------- Right Section ----------*/}
        <div className="">
            <p className="text-xl font-medium mb-5">Get Touch</p>
            <ul className="flex flex-col gap-2 text-gray-800 font-semibold">
                <li>+91 1234567890</li>
                <li>prescripto@gmail.com</li>
            </ul>
        </div>
      </div>
      <div className="">
        {/*----------- copyright text ------------*/}
        <div className="">
            <hr className="border-none outline-none h-0.5 bg-gray-400"/>
            <p className="py-5 text-base text-center text-gray-600 font-semibold">Copyright 2025@ Prescripto - All Right Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
