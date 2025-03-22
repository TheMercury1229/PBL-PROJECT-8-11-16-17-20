import * as React from "react";
import Navbar from "../shared/navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Signup = () => {
  const [input, setInput] = React.useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "jobseeker",
  });

  const [step, setStep] = React.useState(1);
  const [additionalInfo, setAdditionalInfo] = React.useState({
    qualification: "",
    experience: "",
    gender: "",
    location: "",
    skills: "",
    preferredJob: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const additionalInfoHandler = (e) => {
    setAdditionalInfo({ ...additionalInfo, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input, additionalInfo);
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form onSubmit={(e) => e.preventDefault()} className="w-1/2 border border-gray-200 shadow-lg rounded-xl p-6 my-10 bg-white">
          <h1 className="flex items-center justify-center font-semibold text-2xl mb-6 text-gray-800">Create Your Account 🚀</h1>

          {step === 1 && (
            <>
              <div className="mb-4">
                <Label htmlFor="fullname" className="text-gray-700 font-medium">Full Name</Label>
                <Input type="text" name="fullname" placeholder="Your Name" value={input.fullname} onChange={changeEventHandler} required className="mt-1 px-4 py-2 border rounded-md w-full focus:ring focus:ring-blue-300" />
              </div>

              <div className="mb-4">
                <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                <Input type="email" name="email" placeholder="xxxx@gmail.com" value={input.email} onChange={changeEventHandler} required className="mt-1 px-4 py-2 border rounded-md w-full focus:ring focus:ring-blue-300" />
              </div>

              <div className="mb-4">
                <Label htmlFor="phoneNumber" className="text-gray-700 font-medium">Phone Number</Label>
                <Input type="text" name="phoneNumber" placeholder="1234567890" value={input.phoneNumber} onChange={changeEventHandler} required className="mt-1 px-4 py-2 border rounded-md w-full focus:ring focus:ring-blue-300" />
              </div>

              <div className="mb-4">
                <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                <Input type="password" name="password" placeholder="pass@123" value={input.password} onChange={changeEventHandler} required className="mt-1 px-4 py-2 border rounded-md w-full focus:ring focus:ring-blue-300" />
              </div>

              <Button onClick={() => setStep(2)} className="w-full my-4 bg-[#0039a6] text-white font-medium py-2 rounded-md hover:bg-blue-700 transition-all">Next</Button>
            </>
          )}

          {step === 2 && (
            <>
              <Label className="text-gray-700 font-medium">Qualification</Label>
              <select name="qualification" onChange={additionalInfoHandler} className="w-full border rounded-md p-2 mb-3">
                <option value="10th">10th</option>
                <option value="12th">12th</option>
                <option value="graduate">Graduate</option>
                <option value="other">Other</option>
              </select>

              <Label className="text-gray-700 font-medium">Experience (Years)</Label>
              <Input type="number" name="experience" onChange={additionalInfoHandler} className="w-full border rounded-md p-2 mb-3" />

              <Label className="text-gray-700 font-medium">Gender</Label>
              <select name="gender" onChange={additionalInfoHandler} className="w-full border rounded-md p-2 mb-3">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <Label className="text-gray-700 font-medium">Location</Label>
              <select name="location" onChange={additionalInfoHandler} className="w-full border rounded-md p-2 mb-3">
                {['Yavatmal', 'Amravati', 'Nagpur', 'Bhandara', 'Gadchiroli', 'Ahmednagar', 'Ratnagiri', 'Jalna', 'Nanded', 'Beed'].map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>

              <Button onClick={() => setStep(3)} className="w-full bg-[#0039a6] text-white py-2 rounded-md hover:bg-blue-700">Next</Button>
            </>
          )}

          {step === 3 && (
            <>
              <Label className="text-gray-700 font-medium">Skills</Label>
              <select name="skills" onChange={additionalInfoHandler} className="w-full border rounded-md p-2 mb-3">
                {['Troubleshooting', 'Attention to Detail', 'Time Management', 'Cleaning', 'Safety Practices', 'Housekeeping', 'Installation', 'Wiring', 'Knowledge of Codes and Regulations', 'Circuit Design'].map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>

              <Label className="text-gray-700 font-medium">Preferred Job</Label>
              <select name="preferredJob" onChange={additionalInfoHandler} className="w-full border rounded-md p-2 mb-3">
                {['Electrician', 'Maid', 'Pump Operator', 'Mechanic', 'Agricultural Worker', 'Construction Worker', 'Miner', 'Factory Worker', 'Janitor', 'JCB Driver'].map(job => (
                  <option key={job} value={job}>{job}</option>
                ))}
              </select>

              <Button onClick={submitHandler} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">Sign Up</Button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;