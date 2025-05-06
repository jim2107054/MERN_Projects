import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onSubmitHandeler = (event) => {
    event.preventDefault();
    console.log("Login clicked", email, password);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col justify-center gap-2 w-full lg:w-1/2 xl:w-2/5 border border-blue-100 shadow-2xl shadow-slate-300 bg-[#d4d4d479] p-5 rounded-lg mt-20">
        <p className="text-gray-800 text-xl font-semibold">Login</p>
        <p className="text-gray-700 font-light">
          Please login in to book an appointment
        </p>
        <form className="flex flex-col my-3" action="">
          <label className="text-base my-1">Email</label>
          <input
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            className="h-10 rounded-md px-5 font-light shadow-sm shadow-gray-400"
            type="email"
            placeholder="prescripto@gmail.com"
          />
          <label className="text-base my-1">Password</label>
          <input
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            className="h-10 rounded-md px-5 font-light shadow-sm shadow-blue-300"
            type="password"
            placeholder="min 6 digits password"
          />
        </form>
        <button
        onClick={onSubmitHandeler}
        className="md:w-2/3 md:self-center border border-blue-300 py-2 rounded-lg text-xl text-white bg-primary hover:scale-105 hover:bg-green-500 transition-all duration-300">
          Login
        </button>
        <p className="flex gap-3 font-light mx-auto my-1">
          Create an new account?{" "}
          <p
            className="text-blue-600 font-medium cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </p>
        </p>
      </div>
    </div>
  );
};

export default Login;
