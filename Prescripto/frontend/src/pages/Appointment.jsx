import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AppContext } from './../context/AppContext';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Appointment = () => {
  const {docId} = useParams();
  const {doctors,currencySymbol} = useContext(AppContext)

  const [docInfo, setDocInfo] = useState(null);

  const fetchDocInfo = async () => {
    const docInfo = await doctors.find((doc) => doc._id === docId)
    if (docInfo) {
      setDocInfo(docInfo);
      console.log(docInfo);
    } else {
      console.error("Doctor not found");
    }
  }

  useEffect(()=>{
    fetchDocInfo()
  },[doctors,docId])

  return docInfo && (
    <div>
      {/*--------- Doctors Details -----------*/}
      <div className="flex flex-col md:flex-row gap-5">
        <div className=''>
          <img className='w-full bg-blue-200 sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
        </div>
        <div className='flex-1 border border-gray-700 rounded-lg p-8 py-7 bg-gray-100 mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          {/*---------- DocInfo --- name --- degree --- experience----------*/}
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo.name} <img className='w-5' src={assets.verified_icon} alt="verify" /> </p>
          <div className='flex items-center gap-2 text-gray-600 text-sm mt-1'>
          <p>{docInfo.degree} - {docInfo.speciality}</p>
          <button className='py-0.5 px-2 border text-xs rounded-lg'>{docInfo.experience}</button>
          </div>
          <div>
            <p className='flex items-center gap-2 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" /></p>
            <p className='text-base text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>
          {/* <p>{docInfo.about}</p>
          <p>{docInfo.fees + "$"}</p> */}
          <p className='mt-4 text-gray-800 font-medium'>Appointment fee: <span className='text-gray-950'>{currencySymbol}{docInfo.fees}</span></p>
        </div>
      </div>
    </div>
  )
}

export default Appointment