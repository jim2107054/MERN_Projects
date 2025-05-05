import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = (props) => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const SameSpecialistDoctors = doctors.filter((doc) => {
    return doc.speciality === props.speciality && doc._id !== props.docId;
  });
  // console.log(SameSpecialistDoctors)
  return (
    <div className="w-full mt-10">
      <div className="flex flex-col items-center">
        <p className="text-2xl md:text-3xl text-gray-800 font-medium mt-2">
          Related Doctors
        </p>
        <p className="text-sm md:text-base text-gray-700 font-light">
          Simply browse through our extensive list of trusted doctors.
        </p>
      </div>
      <div className="w-full p-2 grid grid-cols-auto gap-4 gap-y-6 mt-6">
        {SameSpecialistDoctors.length &&
          SameSpecialistDoctors.map((doctor, index) => (
            <div
              onClick={() => navigate(`/appointment/${doctor._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              key={index}
            >
              <img src={doctor.image} alt="" className="bg-blue-100" />
              <div className="p-4">
                <div className="flex items-center gap-2 text-center text-base text-green-500">
                  <p className="w-2 h-2 rounded-full bg-green-500"></p>
                  <p>Available</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">
                  {doctor.name}
                </p>
                <p className="text-gray-700 text-base">{doctor.speciality}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RelatedDoctors;
