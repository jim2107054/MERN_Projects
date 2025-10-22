import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import dropdownIcon from "../assets/assets_frontend/dropdown_icon.svg"
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
const Navbar = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  // if we have the token, that means we are logged in
  const {token,setToken,userData} = useContext(AppContext)

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    setShowMenu(false);
    // redirect to login page after logout
    navigate('/login')
  }

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img onClick={()=>navigate('/')} className="w-44 cursor-pointer" src={assets.logo} alt="logo" />
      <ul className="hidden md:flex items-start gap-5 text-base lg:text-xl font-medium">
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
        {/* Admin Button - always visible */}
        <button
          className="border border-primary text-primary hover:bg-primary hover:text-white px-4 py-1.5 rounded-md font-light transition-all duration-300"
          onClick={() => window.location.href = 'https://doctor-admin-swart.vercel.app/'}
          title="Admin Login"
        >
          Admin
        </button>
        
        {(token || localStorage.getItem('token')) && userData ? (
          <div className=" flex items-center gap-2 cursor-pointer group relative">
            {/* when the used is logged in, show the dropdown menu with profile icon and logout button */}
            <img className="w-12 h-12 rounded-full" src={userData.image} alt="Profile" />
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
            onClick={() => navigate("/signup")}
          >
            Create Account
          </button>
        )}

        <img onClick={()=>setShowMenu(true)} className="w-7 md:hidden cursor-pointer" src={assets.menu_icon} alt="" />
        {/*-------- Mobile Menu ----------*/}
        <div className={` ${showMenu ? "fixed w-full":"h-0 w-0"} md:hidden right-0 top-0 bottom-0 bg-gray-700 z-20 overflow-hidden transition-all`} >
          <div className="flex items-center justify-between px-5 py-4">
            <img className="w-36" src={assets.logo} alt="" />
            <img className="w-8 " onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt="" />
          </div>
          <ul className="flex flex-col items-center gap-5 text-xl font-medium mt-5 text-white">
            <NavLink onClick={()=> setShowMenu(false)} to="/">
              <li className="Navbar-li">Home</li>
            </NavLink>
            <NavLink onClick={()=> setShowMenu(false)} to="/doctors">
              <li className="Navbar-li">All Doctors</li>
            </NavLink>
            <NavLink onClick={()=> setShowMenu(false)} to="/about">
              <li className="Navbar-li">About</li>
            </NavLink>
            <NavLink onClick={()=> setShowMenu(false)} to="/contact">
              <li className="Navbar-li">Contact</li>
            </NavLink>
            <button
              className="border border-white text-white hover:bg-white hover:text-gray-700 px-4 py-2 rounded-lg font-light transition-all duration-300 text-lg mt-3"
              onClick={() => {
                window.location.href = 'http://localhost:5174';
                setShowMenu(false);
              }}
            >
              Admin
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
