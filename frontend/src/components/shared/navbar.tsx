import { useUserStore } from "@/store/user";
import * as React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { roleValue } from "@/types/types";
const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      console.log("Logging out")
      const response = await axios.post("http://localhost:3000/api/v1/auth/logout", {}, {
        withCredentials: true,
      });
      console.log(response)
      window.location.reload()
    } catch (error) {
      console.log(error)
      navigate("/")
    }
  }
  const id = useUserStore((state) => state.id);
  const loggedIn = useUserStore((state) => state.loggedIn);
  const role = useUserStore((state) => state.role);
  return (
    <nav className="bg-[#0039a6] shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      {/* <div className="text-3xl font-bold text-white mx-20">
        KaamKar
      </div> */}
      <Link to="/" className="hover:text-gray-300 transition"><div className="text-3xl font-bold text-white mx-20">
        KaamKar
      </div></Link>
      {/* Navigation Links */}
      {/* <div className="hidden md:flex space-x-6 text-white">
        <Link to="/" className="hover:text-gray-300 transition">Home</Link>
        <Link to="/jobs" className="hover:text-gray-300 transition">Jobs</Link>
        <Link to="/aboutus" className="hover:text-gray-300 transition">About Us</Link>
      </div> */}

      {
        role == roleValue.jobSeeker ? (
          <div className="hidden md:flex space-x-6 text-white">
            <Link to="/" className="hover:text-gray-300 transition">Home</Link>
            <Link to="/jobs" className="hover:text-gray-300 transition">Jobs</Link>
            <Link to="/aboutus" className="hover:text-gray-300 transition">About Us</Link>
          </div>
        ) : (
          <div className="hidden md:flex space-x-6 text-white">
            <Link to="/recruiter-jobs" className="hover:text-gray-300 transition">POST JOB</Link>
            <Link to="/aboutus" className="hover:text-gray-300 transition">About Us</Link>
          </div>
        )
      }
      {/* Auth Buttons */}
      {/* <div className="flex space-x-4 items-center">
        <Link to="/login" className="text-white hover:text-gray-300 transition">
          Login
        </Link>
        <Link to='/Signup' className="bg-white text-[#0039a6] px-4 py-2 rounded-md hover:bg-gray-200 transition">
          Signup
        </Link>
      </div> */}
      {
        loggedIn ? (
          <div className="flex space-x-4 items-center">
            <Link to="/profile" className="text-white hover:text-gray-300 transition">
              Profile
            </Link>
            <button onClick={handleLogout} className="bg-white text-[#0039a6] px-4 py-2 rounded-md hover:bg-gray-200 transition">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex space-x-4 items-center">
            <Link to="/login" className="text-white hover:text-gray-300 transition">
              Login
            </Link>
            <Link to='/Signup' className="bg-white text-[#0039a6] px-4 py-2 rounded-md hover:bg-gray-200 transition">
              Signup
            </Link>
          </div>
        )
      }
    </nav>
  );
};

export default Navbar;
