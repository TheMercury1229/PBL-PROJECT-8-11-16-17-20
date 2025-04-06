import * as React from "react";
import LatestJobCard from './latestJobCard';
import { PreferredJobOutput } from '@/types/types';
import axios from "axios";

const LatestJobs = () => {
  const [jobs, setJobs] = React.useState<PreferredJobOutput[] | null>(null);

  React.useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/users/get-preferred-job", {
          withCredentials: true,
        });
        setJobs(response.data.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    }

    getData();
  }, []);

  if (!jobs) {
    return <div>Loading...</div>;
  }

  return (
    <div className='max-w-7xl mx-auto my-20'>
      <h1 className='text-4xl font-bold'>
        <span className='text-[#0039a6]'>Latest </span>Job Openings
      </h1>

      <div className='grid grid-cols-3 gap-4 my-5'>
        {jobs.map((job, index) => (
          <LatestJobCard
            object={job}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestJobs;
