import * as React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#0039a6] shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-3xl font-bold text-white mx-20">
        KaamKar
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-6 text-white">
        <Link to="/" className="hover:text-gray-300 transition">Home</Link>
        <Link to="/jobs" className="hover:text-gray-300 transition">Jobs</Link>
        <Link to="/aboutus" className="hover:text-gray-300 transition">About Us</Link>
      </div>

      {/* Auth Buttons */}
      <div className="flex space-x-4">
        <button className="text-white hover:text-gray-300 transition">Login</button>
        <button className="bg-white text-[#0039a6] px-4 py-2 rounded-md hover:bg-gray-200 transition">
          Signup
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
