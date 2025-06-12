import React, { useContext, useState } from "react";
import { assets } from "./../assets/assets";
import { AppContext } from "../context/AppContext";

const MyProfile = () => {
  const {userData,setUserData} = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(true);

  return (
    <div className="max-w-xl flex flex-col gap-4 text-base">
      <div className="flex flex-col items-center">
        <img className="w-32 rounded-lg" src={userData.image} alt="" />
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
          <p className="flex gap-x-12">
            Email <p>{userData.email}</p>
          </p>
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
            onClick={() => setIsEdit(false)}
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
