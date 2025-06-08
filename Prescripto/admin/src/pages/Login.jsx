import { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Admin");
  const { setAToken, backendUrl } = useContext(AdminContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (state === "Admin") {
        console.log("inside admin login");
        // Admin login logic
        const { data } = await axios.post(
          backendUrl + "api/admin/admin-login",
          { email, password }
        );
        console.log(data);
        if (data.success) {
          // console.log(data.token);
          localStorage.setItem("aToken", data.token); // Store token in local storage, so that when we reload the page, admin will still be logged in
          setAToken(data.token);
          toast.success("Login successful!");
        }
        else{
          toast.error(data.message || "Login failed. Please check your credentials.");
        }
      } else {
        // Doctor login logic can be added here
      }
    } catch (error) {
      // console.error("Login failed:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <form
        onSubmit={onSubmitHandler}
        className="flex min-h-[80vh] items-center"
      >
        <div className="flex flex-col gap-3 m-auto p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
          <p className="text-2xl font-semibold m-auto">
            <span className="mr-2 text-primary">{state}</span>Login
          </p>
          <div className="w-full">
            <p>Email</p>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="email"
              required
            />
          </div>
          <div className="w-full">
            <p>Password</p>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="password"
              required
            />
          </div>
          <button className="bg-primary text-white w-full py-2 rounded-md text-base hover:bg-green-600 transition-all duration-300">
            Login
          </button>
          {state === "Admin" ? (
            <p className="m-auto gap-3 text-sm mt-2">
              Doctor Login{" "}
              <span
                className="text-primary cursor-pointer"
                onClick={() => setState("Doctor")}
              >
                click here
              </span>
            </p>
          ) : (
            <p className="m-auto gap-3 flex text-sm mt-2">
              Admin Login
              <span
                className="text-primary  cursor-pointer"
                onClick={() => setState("Admin")}
              >
                click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
