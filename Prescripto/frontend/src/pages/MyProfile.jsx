import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from './../assets/assets';
import { toast } from "react-toastify";
import axios from "axios";

const MyProfile = () => {
  const {userData,setUserData,token,loadUserProfileData,backendUrl} = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false)

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", userData.address);
      formData.append("gender",userData.gender)
      formData.append("age", userData.age);
      if (image) {
        formData.append("image", image);
      }

      const {data} = await axios.post(backendUrl+'/api/user/update-profile',formData,{headers:{token}})
      if(data.success){
        toast.success(data.message)
        setIsEdit(false);
        await loadUserProfileData();// Reload the user data to reflect changes
        setImage(false);
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message);
      console.log("error from catch block")
    }
  }

  return userData && (
    <div className="max-w-xl flex flex-col gap-4 text-base">
      <div className="flex flex-col items-center">
        {
          isEdit ? (
            <label htmlFor="image" className="inline-block relative cursor-pointer">
              <div>
                <img className="w-36 rounded opacity-75" src={image ?URL.createObjectURL(image):userData.image} alt="" />
                <img className="w-10 absolute bottom-12 right-12" src={image ?"":assets.upload_icon} alt="" />
              </div>
              <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden/>
            </label>
          ):(
            <img className="w-32 rounded-lg" src={userData.image} alt="" />
          )
        }
        
        {isEdit ? (
          <input
            className="bg-gray-100 text-xl text-center font-medium mt-4"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="enter your name"
            type="text"
          />
        ) : (
          <h1 className="font-medium text-2xl text-gray-800 mt-4">
            {userData.name}
          </h1>
        )}
        <hr className="bg-blue-600 h-[1.2px] w-full mt-2" />
      </div>
      <div>
        <p className="text-neutral-700 font-medium text-xl underline mt-3">
          CONTACT INFORMATION
        </p>
        <div className="flex flex-col gap-y-2.5 mt-3 text-neutral-800">
          <div className="flex gap-x-12">
            Email <p>{userData.email}</p>
          </div>
          <div className="flex items-center gap-10">
            <p>Phone </p>
            {isEdit ? (
              <input
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
                placeholder="enter your phone"
                type="text"
              />
            ) : (
              <p>{userData.phone}</p>
            )}
          </div>
          <div className="flex gap-7 items-center">
            <p>Address </p>
            {isEdit ? (
              <input
                value={userData.address}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, address: e.target.value }))
                }
                placeholder="enter your address"
                type="text"
              />
            ) : (
              <p>{userData.address}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-3">
        <p className="text-neutral-700 font-medium text-xl">
          Basic Information
        </p>
        <div className="flex flex-col">
          <div className="flex gap-8 items-center">
            <p>Gender </p>
            {isEdit ? (
              <select
                value={userData.gender}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p>{userData.gender}</p>
            )}
          </div>
          <div className="flex gap-14 items-center">
            <p>Age</p>
            {isEdit ? (
              <input
                type="number"
                value={userData.age}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, age: e.target.value }))
                }
              />
            ) : (
              <p>{userData.age}</p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-5">
        {isEdit ? (
          <button
            className="bg-green-500  py-3 rounded-lg text-white text-base font-light w-1/2 md:w-1/3 hover:scale-105 transition-all duration-500"
            onClick={updateUserProfileData}
          >
            Save Information
          </button>
        ) : (
          <button
            className="bg-blue-500 py-3 rounded-lg text-white text-base font-light w-1/2 md:w-1/3 hover:scale-105 transition-all duration-500"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
