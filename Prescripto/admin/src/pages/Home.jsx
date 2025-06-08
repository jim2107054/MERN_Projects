import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";

const Home = () => {
  const { aToken,setAToken } = useContext(AdminContext);
  return (
    <div>
      <h1>We are now in the Home page.</h1>
      <button 
      onClick={()=>localStorage.removeItem('aToken') || setAToken(null)}
      className="bg-blue-500 text-white px-2 py-1 rounded-md">Logout</button>
    </div>
  );
};

export default Home;
