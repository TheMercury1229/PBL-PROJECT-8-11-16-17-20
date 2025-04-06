import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { data } from "@/store/jobsAndSkills";
import axios from "axios";
import Navbar from "@/components/shared/navbar";

const RecJobs = () => {
  const [jobTitle, setJobTitle] = useState<string | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [experience, setExperience] = useState<string>("");
  const [education, setEducation] = useState<string>("NILL");
  const [preference, setPreference] = useState<string>("Male");

  const handleSelectedJob = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setJobTitle(value);
    setSelectedSkills([]);
  };

  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedSkills((prev) =>
      checked ? [...prev, value] : prev.filter((skill) => skill !== value)
    );
    console.log("Selected skills:", selectedSkills);
  };

  const selectedJob = data.find((job) => job.job.title === jobTitle);
  const skillList =
    typeof selectedJob?.skills === "string"
      ? selectedJob.skills.split(" ")
      : selectedJob?.skills ?? [];

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Latitude:", latitude);
          console.log("Longitude:", longitude);

          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );

          const geoData = await res.json();
          let location =
            geoData.address.city ||
            geoData.address.town ||
            geoData.address.village ||
            geoData.address.state ||
            "Unknown";

          const lowercaseCity = location.charAt(0).toLowerCase() + location.slice(1);
          console.log("City:", lowercaseCity);

          const jobPayload = {
            title: jobTitle,
            latitude,
            longitude,
            location: "thane",
            qualifications: education || "N/A",
            experience: experience ? `1_to_${experience}_years` : "N/A",
            preferance: preference || "N/A",
            skills: selectedSkills.length > 0 ? selectedSkills : ["N/A"],
          };

          const response = await axios.post(
            "http://localhost:3000/api/v1/jobs/postJob",
            jobPayload,
            {
              withCredentials: true,
            }
          );

          console.log("Job posted successfully:", response.data);
          alert("Job submitted successfully!");
        },
        (error) => {
          console.error("Error getting location", error);
          alert("Please allow location access to submit.");
        }
      );
    } catch (error) {
      console.error("Unexpected error during geolocation or API call:", error);
      alert("Something went wrong while submitting the job.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center py-8 space-y-6">
        <Label className="text-gray-700 font-medium">JOB TITLES</Label>
        <div className="flex flex-wrap justify-center gap-4 max-w-3xl">
          {data.map((job) => (
            <label
              key={job.job.title}
              className="flex items-center space-x-2 bg-white p-2 rounded shadow"
            >
              <input
                type="radio"
                value={job.job.title}
                checked={jobTitle === job.job.title}
                onChange={handleSelectedJob}
              />
              <span>{job.job.title}</span>
            </label>
          ))}
        </div>

        {jobTitle && (
          <>
            <Label className="text-gray-700 font-medium">Skills Required</Label>
            <div className="flex flex-wrap justify-center gap-4 max-w-3xl">
              {skillList.map((skill: string, index: number) => (
                <label
                  key={index}
                  className="flex items-center space-x-2 bg-white p-2 rounded shadow"
                >
                  <input
                    type="checkbox"
                    value={skill}
                    checked={selectedSkills.includes(skill)}
                    onChange={handleSkillChange}
                  />
                  <span>{skill}</span>
                </label>
              ))}
            </div>

            <div className="w-full max-w-md flex flex-col gap-4">
              <div>
                <Label className="text-gray-700">Experience (in years)</Label>
                <input
                  type="number"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="p-2 border border-gray-300 rounded w-full"
                  placeholder="Enter experience"
                />
              </div>

              <div>
                <Label className="text-gray-700">Education</Label>
                <div className="flex flex-wrap gap-4 mt-2">
                  {["NILL", "NILL or 10th", "NILL or 11th", "NILL or 12th"].map((level) => (
                    <label
                      key={level}
                      className="flex items-center space-x-2 bg-white p-2 rounded shadow"
                    >
                      <input
                        type="radio"
                        name="education"
                        value={level}
                        checked={education === level}
                        onChange={(e) => setEducation(e.target.value)}
                      />
                      <span>{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-gray-700">Preference</Label>
                <select
                  value={preference}
                  onChange={(e) => setPreference(e.target.value)}
                  className="p-2 border border-gray-300 rounded w-full"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          </>
        )}

        <Button onClick={handleSubmit}>SUBMIT</Button>
      </div>
    </div>
  );
};

export default RecJobs;









// import React, { useState } from "react";
// import Navbar from "../shared/navbar";
// import { Button } from "@/components/ui/button";

// const RecJobs = () => {
//   const [showApplicants, setShowApplicants] = useState(false);
//   const [selectedApplicants, setSelectedApplicants] = useState([]);

//   // Static Job Postings & Applicants
//   const jobs = [
//     {
//       id: 1,
//       title: "Software Engineer",
//       type: "Full-time",
//       salary: "₹12 LPA",
//       experience: "2+ years",
//       skills: ["JavaScript", "React", "Node.js"],
//       positions: 2,
//       applicants: [
//         { name: "John Doe", profileLink: "#", id: 101 },
//         { name: "Jane Smith", profileLink: "#", id: 102 },
//       ],
//     },
//     {
//       id: 2,
//       title: "Data Analyst",
//       type: "Contract",
//       salary: "₹8 LPA",
//       experience: "1+ years",
//       skills: ["SQL", "Python", "Power BI"],
//       positions: 1,
//       applicants: [{ name: "Robert Johnson", profileLink: "#", id: 103 }],
//     },
//   ];

//   const handleViewApplicants = (applicants) => {
//     setSelectedApplicants(applicants);
//     setShowApplicants(true);
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <Navbar />
      
//       <div className="max-w-4xl mx-auto my-10 p-8 bg-white border border-gray-200 rounded-2xl shadow-lg">
//         <h1 className="text-2xl font-bold text-gray-800 mb-6">🚀 Post a Job</h1>

//         {/* Job Posting Form */}
//         <form className="grid grid-cols-2 gap-4">
//           <input className="border p-3 rounded-lg focus:ring focus:ring-blue-200" type="text" placeholder="Job Role" required />
//           <select className="border p-3 rounded-lg focus:ring focus:ring-blue-200" required>
//             <option value="">Select Job Type</option>
//             <option value="full-time">Full-Time</option>
//             <option value="part-time">Part-Time</option>
//             <option value="contract">Contract</option>
//           </select>
//           <textarea className="border p-3 rounded-lg col-span-2 focus:ring focus:ring-blue-200" placeholder="Job Description" required></textarea>
//           <input className="border p-3 rounded-lg focus:ring focus:ring-blue-200" type="text" placeholder="Skills Required" required />
//           <input className="border p-3 rounded-lg focus:ring focus:ring-blue-200" type="text" placeholder="Salary" required />
//           <input className="border p-3 rounded-lg focus:ring focus:ring-blue-200" type="text" placeholder="Experience Required" required />
//           <input className="border p-3 rounded-lg focus:ring focus:ring-blue-200" type="number" placeholder="Positions Available" required />
          
//           <Button className="col-span-2 bg-[#0039a6] text-white hover:bg-[#00257a] rounded-lg py-3 transition-all">
//             Post Job
//           </Button>
//         </form>

//         {/* Job Listings */}
//         <h2 className="text-xl font-semibold text-gray-800 mt-10 mb-4">📌 Your Job Listings</h2>
//         {jobs.map((job) => (
//           <div key={job.id} className="border rounded-2xl p-5 mb-4 bg-gray-50 shadow-sm hover:shadow-md transition">
//             <h3 className="text-lg font-bold text-gray-800">{job.title}</h3>
//             <p className="text-gray-600 text-sm">{job.type} | 💰 {job.salary} | 📅 {job.experience} experience</p>
//             <p className="text-gray-700 mt-2">🛠 Skills: <span className="font-medium">{job.skills.join(", ")}</span></p>
//             <p className="text-gray-700">👥 Positions: {job.positions}</p>
//             <Button 
//               className="mt-3 bg-[#0039a6] text-white hover:bg-[#00257a] rounded-lg px-5 py-2 transition-all"
//               onClick={() => handleViewApplicants(job.applicants)}
//             >
//               View Applicants ({job.applicants.length})
//             </Button>
//           </div>
//         ))}
//       </div>

//       {/* Applicants Modal */}
//       {showApplicants && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-md">
//           <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full relative">
//             <h2 className="text-2xl font-semibold mb-5 text-gray-800 text-center">📝 Applicants</h2>

//             {selectedApplicants.length > 0 ? (
//               selectedApplicants.map((applicant, index) => (
//                 <div
//                   key={index}
//                   className="flex justify-between items-center bg-gray-100 px-4 py-3 rounded-lg mb-3 hover:bg-gray-200 transition-all"
//                 >
//                   <span className="text-gray-800 font-medium">{applicant.name}</span>
//                   <div className="flex gap-2">
//                     <Button className="bg-[#FF033E] text-white px-3 py-1 hover:bg-[#cc022f] transition-all rounded-md">
//                       View Profile
//                     </Button>
//                     <Button className="bg-[#0039a6] text-white px-3 py-1 hover:bg-[#00257a] transition-all rounded-md">
//                       Hire
//                     </Button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center text-gray-500">No applicants yet.</p>
//             )}

//             <Button 
//               className="w-full mt-4 bg-[#0039a6] text-white hover:bg-[#00257a] rounded-lg py-2 transition-all"
//               onClick={() => setShowApplicants(false)}
//             >
//               Close
//             </Button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecJobs;