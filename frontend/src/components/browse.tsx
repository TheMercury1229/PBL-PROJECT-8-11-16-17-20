import * as React from "react";
import Navbar from "./shared/navbar";
import Job from "./ui/job";

const randomJobs = [1, 2, 3, 4, 5, 6, 7];

const Browse = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4">
        <h1 className="font-bold text-2xl my-6 text-gray-800">
          🔎 Search Results ({randomJobs.length})
        </h1>
        {randomJobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {randomJobs.map((item, index) => (
              <Job key={index} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No jobs found. Try searching again!</p>
        )}
      </div>
    </div>
  );
};

export default Browse;
