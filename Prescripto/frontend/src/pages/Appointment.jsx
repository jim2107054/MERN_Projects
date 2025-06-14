import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "./../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData,setAppointedDoctors } =
    useContext(AppContext);

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);

  const [docSLots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    const docInfo = await doctors.find((doc) => doc._id === docId);
    if (docInfo) {
      setDocInfo(docInfo);
      console.log(docInfo);
    } else {
      console.error("Doctor not found");
    }
  };

  const getAlailableSlots = async () => {
    setDocSlots([]);

    //getting current date
    let today = new Date();
    console.log(today);
    let dd = String(today.getDate()).padStart(2, "0");
    console.log(dd);
    for (let i = 0; i < 7; i++) {
      //getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(currentDate.getDate() + i);
      console.log(currentDate);

      //setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0); //hours,minutes,seconds,milliseconds

      //setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        //for the next days
        currentDate.setHours(10); //10 am
        currentDate.setMinutes(0); //0 minutes
      }

      let timeSlots = [];

      //getting the slots of the doctor
      while (currentDate <= endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1; // Months are zero-based in JavaScript
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime

        const isSlotAvailable = (docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime))? false : true;

        //add slot to array
        if( isSlotAvailable) {
          timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });
        }
        //incrementing the time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Please login to book an appointment");
      return navigate("/login");
    }

    try {
      const date = docSLots[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1; // Months are zero-based in JavaScript
      let year = date.getFullYear();
      // console.log("date is: ",date)
      const slotDate = day + "_" + month + "_" + year;
      // console.log(day, month, year);
      // console.log(slotDate)

      //booking appointment
      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        {
          doctorId: docId,
          slotDate,
          slotTime,
        },
        { headers: { token } }
      );

      const doctor = await doctors.find((doc) => doc._id === docId);

      if (data.success) {
        toast.success("Appointment booked successfully");
        getDoctorsData(); // Refresh the doctors list
        setAppointedDoctors((prev) => [...prev, doctor]); // Add the booked doctor to the appointed doctors list
        // console.log(data);
        // console.log("Appointment booked successfully");
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAlailableSlots();
  }, [docInfo]);

  useEffect(() => {
    console.log(docSLots);
  }, [docSLots]);

  return (
    docInfo && (
      <div>
        {/*--------- Doctors Details -----------*/}
        <div className="flex flex-col md:flex-row gap-5">
          <div className="">
            <img
              className="w-full bg-blue-200 sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt=""
            />
          </div>
          <div className="flex-1 border border-gray-700 rounded-lg p-8 py-7 bg-gray-100 mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            {/*---------- DocInfo --- name --- degree --- experience----------*/}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}{" "}
              <img className="w-5" src={assets.verified_icon} alt="verify" />{" "}
            </p>
            <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-lg">
                {docInfo.experience}
              </button>
            </div>
            <div>
              <p className="flex items-center gap-2 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-base text-gray-500 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>
            <p className="mt-4 text-gray-800 font-medium">
              Appointment fee:{" "}
              <span className="text-gray-950">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>
        {/*--------- Booking Slots -----------*/}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking Slots</p>
          <div className="flex gap-4 mt-4 items-center w-full overflow-x-scroll ">
            {docSLots.length &&
              docSLots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  key={index}
                  className={`text-center cursor-pointer gap-3 border border-blue-500 rounded-md  px-4 py-2 ${
                    index === slotIndex
                      ? "bg-blue-200 text-gray-900"
                      : "bg-white"
                  }`}
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <div className="flex">
                    <p>{item[0] && item[0].datetime.getDate()}</p>
                    <p>/{item[0] && item[0].datetime.getMonth() + 1}</p>
                    <p>/{item[0] && item[0].datetime.getFullYear()}</p>
                  </div>
                </div>
              ))}
          </div>
          <div className="flex gap-4 mt-4 items-center w-full overflow-x-scroll">
            {docSLots.length &&
              docSLots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  key={index}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 border border-blue-400 rounded-full cursor-pointer ${
                    item.time === slotTime
                      ? "bg-blue-200 text-gray-900"
                      : "bg-white"
                  }`}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>
          <button
            onClick={bookAppointment}
            // disabled={!slotTime}
            className="bg-primary px-4 py-2 my-10 rounded-lg
          hover:scale-105 text-white font-light transition-all duration-500 hover:bg-green-600"
          >
            Book an Appointment
          </button>
        </div>
        {/*--------- Related Doctors -----------*/}
        <RelatedDoctors speciality={docInfo.speciality} docId={docInfo._id} />
      </div>
    )
  );
};

export default Appointment;
