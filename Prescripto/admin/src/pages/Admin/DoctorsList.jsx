import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  const {doctors,getAllDoctors,aToken} = useContext(AdminContext)
  useEffect(()=>{
    getAllDoctors();
  },[aToken])
  return (
    <div>DoctorsList</div>
  )
}

export default DoctorsList