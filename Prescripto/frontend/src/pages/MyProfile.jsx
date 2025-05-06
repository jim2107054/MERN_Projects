import React, { useState } from 'react'
import { assets } from './../assets/assets';

const MyProfile = () => {

  const [userData, setUserData] = useState({
    name:'jim',
    image:assets.profile_pic,
    email:'jim@gmail.com',
    phone:'01700000000',
    address:'Dhaka, Bangladesh',
    gender:'Male',
    age:25
  })

  return (
    <div>
       <img src={userData.image} alt="" /> 
    </div>
  )
}

export default MyProfile