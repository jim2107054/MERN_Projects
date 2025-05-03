import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img className="w-44 cursor-pointer" src={assets.admin_logo} alt="logo" />
      <ul className="hidden md:flex items-start gap-5 text-xl font-medium">
        <NavLink to='/'>
          <li className="Navbar-li">Home</li>
          <hr className="Navbar-li-hr" />
        </NavLink>
        <NavLink to='/doctors'>
          <li className="Navbar-li">All Doctors</li>
          <hr className="Navbar-li-hr" />
        </NavLink>
        <NavLink to='/about'>
          <li className="Navbar-li">About</li>
          <hr className="Navbar-li-hr" />
        </NavLink>
        <NavLink to='/contact'>
          <li className="Navbar-li">Contact</li>
          <hr className="Navbar-li-hr" />
        </NavLink>
      </ul>
      <div className="">
        <button>Create Account</button>
      </div>
    </div>
  );
};

export default Navbar;
