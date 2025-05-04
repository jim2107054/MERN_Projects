import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-800' id='speciality'>
        <h1 className='text-3xl font-medium'>Find by Speciality</h1>
        <p className="sm:w-1/3 text-center text-base">Simply browse through our extensive list of doctors schedule
        your appointment hassle-free.</p>
        <div className="flex flex-row gap-6 pt-5 w-full overflow-scroll justify-center">
            {
                specialityData.map((item,index)=>{
                    return (
                        <Link 
                        onClick={()=>scrollTo(0,0)}
                        className='flex flex-col items-center cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500'
                        to={`/doctors/${item.speciality}`} key={index}>
                            <img src={item.image} alt="" className='w-16 sm:w-24 mb-2' />
                            <p className="text-center">{item.speciality}</p>
                        </Link>
                    );
                })
            }
        </div>
    </div>
  )
}

export default SpecialityMenu