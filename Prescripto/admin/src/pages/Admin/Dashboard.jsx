import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "./../../assets/assets";

const Dashboard = () => {
  const { dashData, getDashData, aToken, cancelAppointment } =
    useContext(AdminContext);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const formatDate = (slotDate) => {
    const date = slotDate.split("_");
    return date[0] + " " + months[parseInt(date[1]) - 1] + " " + date[2];
  };

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
                <div
                  className="flex gap-5 items-center px-6 py-3 hover:bg-gray-300 justify-between"
                  key={index}
                >
                  <div className="flex items-center gap-3">
                    <img
                      className="w-14 rounded-full"
                      src={item.doctorData.image}
                      alt=""
                    />
                    <div className="flex-1 text-sm">
                      <p className="text-gray-800 font-medium">
                        {item.doctorData.name}
                      </p>
                      <p className="text-gray-600">
                        {formatDate(item.slotDate)}
                      </p>
                    </div>
                  </div>
                  {item.cancelled ? (
                    <p className="text-red-500">Cancelled</p>
                  ) : item.isCompleted ? (
                    <p className="text-green-500">Completed</p>
                  ) : (
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-10 cursor-pointer"
                      src={assets.cancel_icon}
                      alt=""
                    />
                  )}
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
