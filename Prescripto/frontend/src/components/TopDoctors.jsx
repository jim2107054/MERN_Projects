import React, { useEffect, useState } from 'react'
import { doctors } from '../assets/assets'

const TopDoctors = () => {
  const [visible, setVisible] = useState(true);
  useEffect(()=>{
    const inverval = setInterval(()=>{
      setVisible(v=>!v);
    },800)
    return () => clearInterval(inverval);
  },[]);

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-base">Simply browse through our extensive list of doctors</p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {
          doctors.slice(0,10).map((doctor,index)=>(
            <div className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500" key={index}>
              <img src={doctor.image} alt="" className="bg-blue-100" />
              <div className="p-4">
                <div className="flex items-center gap-2 text-center text-base text-green-500">
                <p className={`w-2 h-2 rounded-full bg-green-500
                  ${visible?"opacity-100":"opacity-0"}`}></p><p>Available</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{doctor.name}</p>
                <p className="text-gray-700 text-base">{doctor.speciality}</p>
              </div>
            </div>
          ))
        }
      </div>
      <button>more</button>
    </div>
  )
}

export default TopDoctors