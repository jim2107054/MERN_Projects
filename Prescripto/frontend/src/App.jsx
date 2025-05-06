import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SignUp from "./pages/SignUp";

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      {/* we have mounted the navbar. So Navbar will be visible on all pages */}
      <Navbar/>
      <Routes>
        {/* home page */}
        <Route path="/" element={<Home />} />
        {/* Here user can see all doctors */}
        <Route path="/doctors" element={<Doctors />} />
        {/* Here user can see all doctors by speciality */}
        <Route path="/doctors/:speciality" element={<Doctors />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/about" element={<About />} />
        {/* Here user can login */}
        <Route path="/login" element={<Login />} />
        {/* Here user can sign up */}
        <Route path="/signup" element={<SignUp />} />
        {/* Here user can see all doctors by speciality */}
        {/* Here user can see his/her profile */}
        <Route path="/my-profile" element={<MyProfile />} />
        {/* Here user can see his/her appointments */}
        <Route path="/my-appointments" element={<MyAppointments />} />
        {/* Here user can book an new appointment */}
        <Route path="/appointment/:docId" element={<Appointment />} />
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
