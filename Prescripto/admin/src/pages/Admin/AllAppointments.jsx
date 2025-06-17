import React from "react";
import { AdminContext } from "../../context/AdminContext";
import { useContext } from "react";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

const AllAppointments = () => {
  const { aToken, getAllAppointments, appointments, backendUrl } =
    useContext(AdminContext);
  const { currency } = useContext(AppContext);

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

  //cancel appointment by admin
  const handleCancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/cancel-appointment",
        { appointmentId },
        { headers: { aToken } }
      );
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        getAllAppointments(); // Refresh the appointments list after cancellation
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);
  return (
    <>
      <div className="w-full max-w-6xl m-5">
        <p className="mb-3 text-lg font-medium">All Appointments</p>
        <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
          <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
            <p>#</p>
            <p>Patient</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Doctor</p>
            <p>Fees</p>
            <p>Actions</p>
          </div>
          {appointments.length > 0 &&
            appointments.map((item, index) => (
              <div
                className="flex flex-wrap justify-between max-sm:gap-2 sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-500 hover:text-white"
                key={index}
              >
                <p className="max-sm:hidden">{index + 1}</p>
                <div className="flex items-center gap-2">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={item.userData.image}
                    alt=""
                  />{" "}
                  <p>{item.userData.name}</p>
                </div>
                <p className="max-sm:hidden">{item.userData.age}</p>
                <div className="flex flex-col">
                  <p>{item.slotTime}</p>
                  <p>{formatDate(item.slotDate)}</p>
                </div>
                <div className="flex group items-center gap-2">
                  <img
                    className="w-10 h-10 bg-gray-400 rounded-full"
                    src={item.doctorData.image}
                    alt=""
                  />
                  <div className="flex flex-col justify-center">
                    <p className="text-gray-800 group-hover:text-white">
                      {item.doctorData.name}
                    </p>
                    <p className="text-xs group-hover:text-white text-gray-500">
                      {item.doctorData.speciality}
                    </p>
                  </div>
                </div>
                <p>
                  {item.doctorData.fees}
                  {currency}
                </p>
                <img
                  onClick={() => handleCancelAppointment(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.cancel_icon}
                  alt=""
                />
              </div>
            ))}
        </div>
      </div>
      ;
    </>
  );
};

export default AllAppointments;
