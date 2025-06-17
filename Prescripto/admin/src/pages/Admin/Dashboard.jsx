import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "./../../assets/assets";

const Dashboard = () => {
  const { dashData, getDashData, aToken } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken, getDashData]);

  return (
    <>
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300">
            <img className="w-14" src={assets.doctor_icon} alt="" />
            <div>
              <p className="text-xl font-medium text-gray-800">
                {dashData?.doctors ?? 0}
              </p>
              <p className="text-gray-600">Doctors</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-xl font-medium text-gray-800">
                {dashData?.appointments ?? 0}
              </p>
              <p className="text-gray-600">Appointments</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-medium text-gray-800">
                {dashData?.users ?? 0}
              </p>
              <p className="text-gray-600">Patients</p>
            </div>
          </div>
        </div>
        {/*---------- Latest Appointments Section ----------*/}
        <div className="mt-8 bg-white">
          <div className="flex gap-2 items-center p-4 rounded-t border mt-8">
            <img src={assets.list_icon} alt="" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Latest Appointments
            </h2>
          </div>
          <div className="bg-white p-4 rounded border-2 border-gray-100">
            {dashData.latestAppointments &&
            dashData.latestAppointments.length > 0 ? (
              // Map through latest appointments and display them
              dashData.latestAppointments.map((item, index) => (
                <div className="flex gap-5" key={index}>
                  <img className="w-14" src={item.doctorData.image} alt="" />
                  <div>
                    <p>{item.doctorData.name}</p>
                    <p>{item.slotDate}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No latest appointments found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
