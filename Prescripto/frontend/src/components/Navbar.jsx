import React, { useState } from "react";
import { assets } from "../assets/assets";
import profilo_pic from '../assets/assets_frontend/profile_pic.png'
import dropdownIcon from "../assets/assets_frontend/dropdown_icon.svg"
import { NavLink, useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  // if we have the token, that means we are logged in
  const [token, setToken] = useState(true);

  const handleLogout = () => {
    setToken(false);
    navigate('/')
  }

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img className="w-44 cursor-pointer" src={assets.admin_logo} alt="logo" />
      <ul className="hidden md:flex items-start gap-5 text-xl font-medium">
        <NavLink to="/">
          <li className="Navbar-li">Home</li>
          <hr className="Navbar-li-hr" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="Navbar-li">All Doctors</li>
          <hr className="Navbar-li-hr" />
        </NavLink>
        <NavLink to="/about">
          <li className="Navbar-li">About</li>
          <hr className="Navbar-li-hr" />
        </NavLink>
        <NavLink to="/contact">
          <li className="Navbar-li">Contact</li>
          <hr className="Navbar-li-hr" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token ? (
          <div className=" flex items-center gap-2 cursor-pointer group relative">
            {/* when the used is logged in, show the dropdown menu with profile icon and logout button */}
            <img className="w-12 rounded-full" src={profilo_pic} alt="Profile" />
            <img className="w-2.5" src={dropdownIcon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-300 rounded flex flex-col gap-2 p-4">
                <p onClick={()=> navigate('/my-profile')} className="hover:text-black cursor-pointer">My Profile</p>
                <p onClick={()=> navigate('/my-appointments')} className="hover:text-black cursor-pointer">My Appointment</p>
                <p onClick={()=>handleLogout()} className="hover:text-black cursor-pointer">Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button
            className="bg-primary hover:scale-105 transition-all duration-300 text-white px-8 py-3 rounded-lg font-light hidden md:block"
            onClick={() => navigate("/login")}
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
