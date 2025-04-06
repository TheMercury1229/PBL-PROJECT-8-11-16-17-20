import * as React from "react";
import Navbar from "../shared/navbar";
import { Button } from "./button";
import { useLocation } from "react-router-dom";
import { PreferredJobOutput } from "@/types/types";
const JobDescription = () => {
  const isApplied = false; // Change to true if already applied
  const location = useLocation();
  const job = location.state as PreferredJobOutput;
  return (
    <div className="p-6">
      <Navbar />

      <div className="max-w-5xl mx-auto my-10 bg-white p-6 rounded-xl shadow-md">
        {/* Job Header */}
        <div className="flex items-center justify-between">
          <div>
            {/* Job Title */}
            <h1 className="font-bold text-2xl mb-4">{job.job_title}</h1>

            {/* Job Details Badges */}
            
          </div>

          {/* Apply Now Button */}
          <Button
            className={`px-4 py-2 rounded-lg font-semibold ${
              isApplied
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-[#0039a6] text-white hover:bg-[#002a7d]"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>

        {/* Job Description Section */}
        <div className="mt-6 border-t pt-4">
          <h2 className="font-semibold text-lg">{job.description}</h2>

          <div className="mt-2 space-y-2">
            <p>
              <span className="font-semibold">Role: </span>{job.job_title}
            </p>
            <p>
              <span className="font-semibold">Location: </span>{job.location}
            </p>
            <p>
              <span className="font-semibold">Description: </span>
              {job.description}
            </p>
            <p>
              <span className="font-semibold">Experience: </span>{job.experience}
            </p>
            <p>
              <span className="font-semibold">Salary: </span>{job.salary_range}
            </p>
            {/* <p>
              <span className="font-semibold">Total Applicants: </span>4
            </p> */}
            {/* <p>
              <span className="font-semibold">Posted Date: </span>17-07-2024
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
