import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "./../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData,backendUrl } =
    useContext(DoctorContext);

  const {currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);

  const updateDocrProfile = async () => {
    try {
      const updatedData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };
      const { data } = await axios.post(
        backendUrl + "/api/doctors/update-profile",
        updatedData,
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);
  return (
    profileData && (
      <>
        <div>
          <div className="flex flex-col gap-4 m-5 md:mx-10">
            <div>
              <img
                className="bg-primary/80 w-full sm:max-w-64 rounded-lg"
                src={profileData.image}
                alt=""
              />
            </div>

            <div className="flex-1 border border-stone-100 rounded p-8 py-7 bg-white">
              {/*--------- Doctor Info. => name,degree,experience -------*/}
              <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
                {profileData.name}
              </p>
              <div className="flex items-center gap-2 mt-1 text-gray-600">
                <p>
                  {profileData.degree}-{profileData.speciality}
                </p>
                <button className="py-0.5 px-2 border text-xs rounded-full">
                  {profileData.experience}
                </button>
              </div>
              {/*--------- Doctor About -------*/}
              <div>
                <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
                  About
                </p>
                <p className="text-sm text-gray-700 max-w-[700px] mt-1">
                  {profileData.about}
                </p>
              </div>
              <p className="text-gray-600 font-medium mt-3">
                <p>
                  Appointment Fees:{" "}
                  <span className="text-gray-800">
                    {isEdit ? (
                      <input
                        type="number"
                        value={profileData.fees}
                        onChange={(e) => {
                          setProfileData((prev) => ({
                            ...prev,
                            fees: e.target.value,
                          }));
                        }}
                      />
                    ) : (
                      profileData.fees
                    )}
                    {currency}
                  </span>
                </p>
              </p>
              <div className="flex gap-2 py-1">
                <p>Address:</p>
                <p>
                  {isEdit ? (
                    <input
                      type="text"
                      value={profileData.address}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    profileData.address
                  )}
                </p>
              </div>

              <div className="flex gap-1 pt-2">
                <input
                  checked={profileData.available}
                  onChange={() =>
                    isEdit &&
                    setProfileData((prev) => ({
                      ...prev,
                      available: !profileData.available,
                    }))
                  }
                  type="checkbox"
                  name=""
                  id=""
                />
                <label htmlFor="">Available</label>
              </div>

              {/*------ Edit & Update Button------*/}
              {isEdit ? (
                <button
                  onClick={() => updateDocrProfile()}
                  className="px-4 py-1 border border-primary text-sm rounded mt-5 hover:bg-primary hover:text-white hover:scale-105 transition-all duration-500"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="px-4 py-1 border border-primary text-sm rounded mt-5 hover:bg-green-500 hover:text-white hover:scale-105 transition-all duration-500"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default DoctorProfile;
