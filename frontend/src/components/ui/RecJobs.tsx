import { useState } from "react";
import Navbar from "../shared/navbar";
import { Button } from "@/components/ui/button";

const RecJobs = () => {
  const [showApplicants, setShowApplicants] = useState(false);
  const [selectedApplicants, setSelectedApplicants] = useState([]);

  // Static Job Postings & Applicants
  const jobs = [
    {
      id: 1,
      title: "Software Engineer",
      type: "Full-time",
      salary: "₹12 LPA",
      experience: "2+ years",
      skills: ["JavaScript", "React", "Node.js"],
      positions: 2,
      applicants: [
        { name: "John Doe", profileLink: "#", id: 101 },
        { name: "Jane Smith", profileLink: "#", id: 102 },
      ],
    },
    {
      id: 2,
      title: "Data Analyst",
      type: "Contract",
      salary: "₹8 LPA",
      experience: "1+ years",
      skills: ["SQL", "Python", "Power BI"],
      positions: 1,
      applicants: [{ name: "Robert Johnson", profileLink: "#", id: 103 }],
    },
  ];

  const handleViewApplicants = (applicants) => {
    setSelectedApplicants(applicants);
    setShowApplicants(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto my-10 p-8 bg-white border border-gray-200 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">🚀 Post a Job</h1>

        {/* Job Posting Form */}
        <form className="grid grid-cols-2 gap-4">
          <input
            className="border p-3 rounded-lg focus:ring focus:ring-blue-200"
            type="text"
            placeholder="Job Role"
            required
          />
          <select
            className="border p-3 rounded-lg focus:ring focus:ring-blue-200"
            required
          >
            <option value="">Select Job Type</option>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="contract">Contract</option>
          </select>
          <textarea
            className="border p-3 rounded-lg col-span-2 focus:ring focus:ring-blue-200"
            placeholder="Job Description"
            required
          ></textarea>
          <input
            className="border p-3 rounded-lg focus:ring focus:ring-blue-200"
            type="text"
            placeholder="Skills Required"
            required
          />
          <input
            className="border p-3 rounded-lg focus:ring focus:ring-blue-200"
            type="text"
            placeholder="Salary"
            required
          />
          <input
            className="border p-3 rounded-lg focus:ring focus:ring-blue-200"
            type="text"
            placeholder="Experience Required"
            required
          />
          <input
            className="border p-3 rounded-lg focus:ring focus:ring-blue-200"
            type="number"
            placeholder="Positions Available"
            required
          />

          <Button className="col-span-2 bg-[#0039a6] text-white hover:bg-[#00257a] rounded-lg py-3 transition-all">
            Post Job
          </Button>
        </form>

        {/* Job Listings */}
        <h2 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
          📌 Your Job Listings
        </h2>
        {jobs.map((job) => (
          <div
            key={job.id}
            className="border rounded-2xl p-5 mb-4 bg-gray-50 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-lg font-bold text-gray-800">{job.title}</h3>
            <p className="text-gray-600 text-sm">
              {job.type} | 💰 {job.salary} | 📅 {job.experience} experience
            </p>
            <p className="text-gray-700 mt-2">
              🛠️ Skills:{" "}
              <span className="font-medium">{job.skills.join(", ")}</span>
            </p>
            <p className="text-gray-700">👥 Positions: {job.positions}</p>
            <Button
              className="mt-3 bg-[#0039a6] text-white hover:bg-[#00257a] rounded-lg px-5 py-2 transition-all"
              onClick={() => handleViewApplicants(job.applicants)}
            >
              View Applicants ({job.applicants.length})
            </Button>
          </div>
        ))}
      </div>

      {/* Applicants Modal */}
      {showApplicants && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-md">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full relative">
            <h2 className="text-2xl font-semibold mb-5 text-gray-800 text-center">
              📝 Applicants
            </h2>

            {selectedApplicants.length > 0 ? (
              selectedApplicants.map((applicant, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-100 px-4 py-3 rounded-lg mb-3 hover:bg-gray-200 transition-all"
                >
                  <span className="text-gray-800 font-medium">
                    {applicant.name}
                  </span>
                  <div className="flex gap-2">
                    <Button className="bg-[#FF033E] text-white px-3 py-1 hover:bg-[#cc022f] transition-all rounded-md">
                      View Profile
                    </Button>
                    <Button className="bg-[#0039a6] text-white px-3 py-1 hover:bg-[#00257a] transition-all rounded-md">
                      Hire
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No applicants yet.</p>
            )}

            <Button
              className="w-full mt-4 bg-[#0039a6] text-white hover:bg-[#00257a] rounded-lg py-2 transition-all"
              onClick={() => setShowApplicants(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecJobs;
