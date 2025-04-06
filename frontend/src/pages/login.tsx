import * as React from "react";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserStore } from "@/store/user";
import Navbar from "@/components/shared/navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = React.useState({
    email: "",
    password: "",
    role: "JOB_SEEKER",
  });
const {
    setId,
    setFullName,
    setEmail,
    setMobile,
    setRole,
    setLoggedIn,
  } = useUserStore();
  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/v1/auth/login", input , {
        withCredentials : true
      });
      setId(response.data.data.id);
      setEmail(response.data.data.email);
      setRole(response.data.data.role);
      setFullName(response.data.data.fullName);
      setMobile(response.data.data.mobile);
      setLoggedIn(true);
      alert("LOGIN SUCCESSFUL")
      navigate("/")
    } catch (error) {
      alert("LOGIN FAILED")
      console.log(error);
    }
    // console.log(input);
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form 
          onSubmit={submitHandler} 
          className="w-1/2 border border-gray-200 shadow-lg rounded-xl p-6 my-10 bg-white"
        >
          <h1 className="flex items-center justify-center font-semibold text-2xl mb-6 text-gray-800">
            Welcome Back! 👋
          </h1>

          {/* Email */}
          <div className="mb-4">
            <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="xxxx@gmail.com"
              value={input.email}
              onChange={changeEventHandler}
              required
              className="mt-1 px-4 py-2 border rounded-md w-full focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="pass@123"
              value={input.password}
              onChange={changeEventHandler}
              required
              className="mt-1 px-4 py-2 border rounded-md w-full focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Radio Group for Role Selection */}
          <div className="my-5">
            <Label className="mb-2 block text-gray-700 font-medium">Select Role</Label>
            <RadioGroup
              className="flex gap-6"
              value={input.role}
              onValueChange={(value) => setInput({ ...input, role: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="jobseeker" id="jobseeker" />
                <Label htmlFor="jobseeker" className="text-gray-600">Jobseeker</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="recruiter" id="recruiter" />
                <Label htmlFor="recruiter" className="text-gray-600">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full my-4 bg-[#0039a6] text-white font-medium py-2 rounded-md hover:bg-blue-700 transition-all">
            Login
          </Button>

          {/* Signup Link */}
          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 font-medium hover:underline">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
