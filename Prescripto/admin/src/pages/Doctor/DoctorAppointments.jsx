import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "./../../context/AppContext";
import { assets } from "./../../assets/assets";

const DoctorAppointments = () => {
  const {
    dToken,
    getAppointments,
    appointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  const months = [
    "",
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
    return date[0] + " " + months[date[1]] + " " + date[2];
  };

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);
  return (
    <>
      <div className="w-full max-w-6xl m-5 mx-auto">
        <p className="mb-3 text-lg font-medium">All Appointments</p>
        <div className="bg-white border rounded text-sm max-h-[70vh] min-h-[50vh] overflow-y-scroll">
          <div className="max-sm:hidden grid grid-cols-[0.5fr_3fr_1fr_1fr_2fr_1fr_1fr] gap-1 border-b px-6 py-3">
            <p>#</p>
            <p>Patient</p>
            <p>Payment</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Fees</p>
            <p>Action</p>
          </div>
          {appointments && appointments.length > 0 ? (
            appointments.map((item, index) => (
              <div
                key={index}
                className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid items-center grid-cols-[0.5fr_3fr_1fr_1fr_2fr_1fr_1fr] gap-1 text-gray-700 border-b px-6 py-3 hover:bg-gray-200"
              >
                <p className="max-sm:hidden">{index + 1}</p>
                <div className="flex items-center gap-2">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={item.userData.image}
                    alt=""
                  />
                  <p className="text-sm">{item.userData.name}</p>
                </div>
                <div>
                  <p
                    className={`text-xs inline border border-primary px-2 rounded-full ${
                      item.payment ? "text-green-600" : ""
                    }`}
                  >
                    {item.payment ? "Online" : "Cash"}
                  </p>
                </div>
                <p className="max-sm:hidden">{item.userData.age}</p>
                <div>
                  <p>{item.slotTime}</p>
                  <p>{formatDate(item.slotDate)}</p>
                </div>
                <p>
                  {item.doctorData.fees}
                  {currency}
                </p>
                <div className="flex items-center gap-2">
                  {!item.isCompleted && !item.cancelled ? (
                    <>
                      <img
                        onClick={() => cancelAppointment(item._id)}
                        className="w-10 h-10 cursor-pointer rounded-full"
                        src={assets.cancel_icon}
                        alt=""
                      />
                      <img
                        onClick={() => completeAppointment(item._id)}
                        className="w-10 h-10 cursor-pointer rounded-full"
                        src={assets.tick_icon}
                        alt=""
                      />
                    </>
                  ) : item.isCompleted ? (
                    <p className="text-green-600">Completed</p>
                  ) : (
                    <p className="text-red-600">Cancelled</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-4">No appointments found</div>
          )}
        </div>
      </div>
      ;
    </>
  );
};

export default DoctorAppointments;
