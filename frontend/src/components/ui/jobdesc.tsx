import * as React from "react";
import Navbar from "../shared/navbar";
import { Button } from "./button";

const JobDescription = () => {
  const isApplied = false; // Change to true if already applied

  return (
    <div className="p-6">
      <Navbar />

      <div className="max-w-5xl mx-auto my-10 bg-white p-6 rounded-xl shadow-md">
        {/* Job Header */}
        <div className="flex items-center justify-between">
          <div>
            {/* Job Title */}
            <h1 className="font-bold text-2xl mb-4">Frontend Developer</h1>

            {/* Job Details Badges */}
            <div className="flex gap-3 flex-wrap">
              <span className="text-blue-700 font-bold bg-blue-100 px-3 py-1 rounded-lg">
                12 Positions
              </span>
              <span className="text-red-600 font-bold bg-red-100 px-3 py-1 rounded-lg">
                Part Time
              </span>
              <span className="text-purple-700 font-bold bg-purple-100 px-3 py-1 rounded-lg">
                24 LPA
              </span>
            </div>
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
          <h2 className="font-semibold text-lg">Job Description</h2>

          <div className="mt-2 space-y-2">
            <p>
              <span className="font-semibold">Role: </span>Frontend Developer
            </p>
            <p>
              <span className="font-semibold">Location: </span>Hyderabad
            </p>
            <p>
              <span className="font-semibold">Description: </span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesentium
              similique sed dolor!
            </p>
            <p>
              <span className="font-semibold">Experience: </span>2 yrs
            </p>
            <p>
              <span className="font-semibold">Salary: </span>12 LPA
            </p>
            <p>
              <span className="font-semibold">Total Applicants: </span>4
            </p>
            <p>
              <span className="font-semibold">Posted Date: </span>17-07-2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
