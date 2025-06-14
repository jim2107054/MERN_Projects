import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from './../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const MyAppointments = () => {

  const {backendUrl,token} = useContext(AppContext)
  const [appointments, setAppointments] = useState([])
  
  const cancledAppointment = (index) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(updatedAppointments);
  }

  const getUserAppointments = async () =>{
    try {
      console.log(token)
      const {data} = await axios.get(backendUrl + "/api/user/appointments",{headers:{token}});
      console.log(data)
      if(data.success){
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(()=>{
    if(token){
      getUserAppointments();
    }else{
      toast.warn("Please login to view your appointments");
    }
  },[token]);

  return (
    <div>
      <p className='pb-3 mt-10 mb-5 font-medium text-zinc-700 border-b-2 text-2xl'>My appointment</p>
      <div>
        {
          appointments.map((item,index)=>(
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b-2' key={index}>
              <div className="">
                <img className='w-32 lg:w-40 bg-indigo-200 rounded-lg' src={item.doctorData.image} alt="" />
              </div>
              <div className='flex-1 my-1 text-base font-light text-zinc-800'>
                <p className='text-gray-900 font-semibold'>{item.doctorData.name}</p>
                <p className='text-sm font-medium mb-2'>{item.doctorData.speciality}</p>
                <p className='text-neutral-900 font-medium mt-1'>Address : </p>
                <p className='text-sm'>{item.doctorData.address}</p>
                <p className='text-sm mt-1'><span className='text-base text-neutral-700 font-medium'>Date & Time : </span>{item.slotDate} | {item.slotTime}</p>
              </div>
              {/*---Basically use this div to make it responsive*/}
              <div></div>
              <div className='flex flex-col gap-2 justify-end'>
                <button className='text-base font-light text-gray-900 text-center sm:min-w-48 py-2 px-8 border border-blue-300 rounded-xl hover:bg-blue-500 hover:scale-105 duration-500 transition-all hover:text-white'>Pay Online</button>
                <button
                onClick={() => cancledAppointment(index)}
                className='text-base font-light text-gray-900 text-center sm:min-w-48 py-2 px-8 border border-blue-300 rounded-xl hover:bg-red-500 hover:scale-105 duration-500 transition-all hover:text-white'>Cancle</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyAppointments