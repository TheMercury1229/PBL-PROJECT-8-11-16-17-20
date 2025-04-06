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
