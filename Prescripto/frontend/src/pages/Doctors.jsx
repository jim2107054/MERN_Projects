import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const {speciality} = useParams();
  const navigate = useNavigate();

  //Specialist doctors will be shown in the right side of the page
  const [filterDoc, setFilterDoc] = useState([]);
  const [filter, setFilter] = useState(false)
  
  const {doctors} = useContext(AppContext);

  //Filter the doctors based on the speciality
  const applyFilter = ()=>{
    if(speciality){
      setFilterDoc(doctors.filter((doctor)=>(
        doctor.speciality.toLowerCase() === speciality.toLowerCase()
      )))
    }
    else{
      setFilterDoc(doctors);
    }
  }

  useEffect(()=>{
    applyFilter();
  },[doctors,speciality])

  //specialitys
  const handleGeneralPhysician = () => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician');
  const handleGynecologist = () => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist');
  const handleDermatologist = () => speciality === 'Dermatologist' ? navigate('/doctors'):navigate('/doctors/Dermatologist');
  const handlePediatricians = () => speciality === 'Pediatricians' ? navigate('/doctors'):navigate('/doctors/Pediatricians');
  const handleNeurologist = () => speciality === 'Neurologist' ? navigate('/doctors'): navigate('/doctors/Neurologist');
  const handleGastroenterologist = () => speciality === 'Gastroenterologist' ? navigate('/doctors'): navigate('/doctors/Gastroenterologist');
  

  return (
    <div>
        <p className="text-gray-800 text-xl font-medium">Browse through the doctors specialist.</p>
        <div className="flex flex-col sm:flex-row items-start gap-5 mt-6">
          <button onClick={()=>setFilter(!filter)} className={`w-fit mt-2 bg-primary px-7 py-2 rounded-xl text-white font-light hover:scale-105 transition-all duration-300 ${filter?"hidden":"visible"}`}>Filters</button>
          {
            filter && (
            <div className='flex flex-col gap-4 text-xl text-gray-900'>
            <p onClick={handleGeneralPhysician} className={`SpecialistDoctors ${speciality==="General physician"?"bg-indigo-200 text-black":""}`}>General physician</p>
            <p onClick={handleGynecologist} className={`SpecialistDoctors ${speciality==="Gynecologist"?"bg-indigo-200 text-black":""}`}>Gynecologist</p>
            <p onClick={handleDermatologist} className={`SpecialistDoctors ${speciality==="Dermatologist"?"bg-indigo-200 text-black":""}`}>Dermatologist</p>
            <p onClick={handlePediatricians} className={`SpecialistDoctors ${speciality==="Pediatricians"?"bg-indigo-200 text-black":""}`}>Pediatricians</p>
            <p onClick={handleNeurologist} className={`SpecialistDoctors ${speciality==="Neurologist"?"bg-indigo-200 text-black":""}`}>Neurologist</p>
            <p onClick={handleGastroenterologist} className={`SpecialistDoctors ${speciality==="Gastroenterologist"?"bg-indigo-200 text-black":""}`}>Gastroenterologist</p>
          </div>
            )
          }
          <div className="w-full p-2 grid grid-cols-auto gap-4 gap-y-6">
            {
              filterDoc.map((doctor,index)=>(
                <div onClick={()=>navigate(`/appointment/${doctor._id}`)} className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500" key={index}>
                  <img src={doctor.image} alt="" className="bg-blue-100" />
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-center text-base text-green-500">
                    <p className="w-2 h-2 rounded-full bg-green-500"></p><p>Available</p>
                    </div>
                    <p className="text-gray-900 text-lg font-medium">{doctor.name}</p>
                    <p className="text-gray-700 text-base">{doctor.speciality}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
    </div>
  )
}

export default Doctors