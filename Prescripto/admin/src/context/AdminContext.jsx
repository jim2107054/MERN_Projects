import React, { createContext, useState } from "react";
import axios from "axios";
import toast from 'react-toastify'

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):localStorage.getItem(''));
  //   const backendUrl = process.env.VITE_BACKEND_URL;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  //create state variable for doctors list
  const [doctorsList, setDoctorsList] = useState([]);

  const getAllDoctors = async ()=>{
    try {
      const {data} = await axios.post(backendUrl+'/api/admin/all-doctors',{headers:{aToken}});
      if(data.success){
        console.log(data.doctors);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const value = {
    aToken,
    setAToken,
    backendUrl,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
