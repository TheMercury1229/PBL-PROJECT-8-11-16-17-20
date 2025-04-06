import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { data } from "@/store/jobsAndSkills";
import axios from "axios";
import Navbar from "@/components/shared/navbar";
import {
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Briefcase,
  Cpu,
  GraduationCap,
  Users,
} from "lucide-react";
import { getProperTitle } from "@/lib/utils";

const RecJobs = () => {
  // Form data state
  const [jobTitle, setJobTitle] = useState<string | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [experience, setExperience] = useState<string>("");
  const [education, setEducation] = useState<string>("NILL");
  const [preference, setPreference] = useState<string>("Male");

  // Multi-step form state
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSelectedJob = (value: string) => {
    setJobTitle(value);
    setSelectedSkills([]);
  };

  const handleSkillChange = (value: string) => {
    setSelectedSkills((prev) =>
      prev.includes(value)
        ? prev.filter((skill) => skill !== value)
        : [...prev, value]
    );
  };

  const selectedJob = data.find((job) => job.job.title === jobTitle);
  const skillList =
    typeof selectedJob?.skills === "string"
      ? selectedJob.skills.split(" ")
      : selectedJob?.skills ?? [];

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

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

          const jobPayload = {
            title: jobTitle,
            latitude,
            longitude,
            location: "thane", // Consider using the actual location
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
          setSubmitSuccess(true);
          setIsSubmitting(false);
        },
        (error) => {
          console.error("Error getting location", error);
          alert("Please allow location access to submit.");
          setIsSubmitting(false);
        }
      );
    } catch (error) {
      console.error("Unexpected error during geolocation or API call:", error);
      alert("Something went wrong while submitting the job.");
      setIsSubmitting(false);
    }
  };

  // Next step handler
  const handleNextStep = () => {
    if (currentStep === 1 && !jobTitle) {
      alert("Please select a job title to continue");
      return;
    }

    if (currentStep === 2 && selectedSkills.length === 0) {
      alert("Please select at least one skill to continue");
      return;
    }

    setCurrentStep(currentStep + 1);
  };

  // Previous step handler
  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Reset form
  const handleReset = () => {
    setJobTitle(null);
    setSelectedSkills([]);
    setExperience("");
    setEducation("NILL");
    setPreference("Male");
    setCurrentStep(1);
    setSubmitSuccess(false);
  };

  // Progress indicator
  const ProgressBar = () => {
    const steps = [
      { name: "Job", icon: <Briefcase className="h-5 w-5" /> },
      { name: "Skills", icon: <Cpu className="h-5 w-5" /> },
      { name: "Requirements", icon: <GraduationCap className="h-5 w-5" /> },
      { name: "Review", icon: <Users className="h-5 w-5" /> },
    ];

    return (
      <div className="w-full mb-8">
        <div className="relative">
          {/* Progress line */}
          <div className="absolute top-5 left-0 w-full h-1 bg-slate-200"></div>
          <div
            className="absolute top-5 left-0 h-1 bg-blue-600 transition-all duration-300"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          ></div>

          {/* Step indicators */}
          <div className="relative flex justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full z-10 transition-colors ${
                    index + 1 === currentStep
                      ? "bg-blue-600 text-white"
                      : index + 1 < currentStep
                      ? "bg-green-500 text-white"
                      : "bg-white border-2 border-slate-300 text-slate-500"
                  }`}
                >
                  {index + 1 < currentStep ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    step.icon
                  )}
                </div>
                <span
                  className={`mt-2 text-sm font-medium ${
                    index + 1 === currentStep
                      ? "text-blue-600"
                      : index + 1 < currentStep
                      ? "text-green-500"
                      : "text-slate-500"
                  }`}
                >
                  {step.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Step 1: Job Title Selection
  const renderJobTitleStep = () => {
    return (
      <Card className="w-full max-w-5xl">
        <CardHeader>
          <CardTitle className="text-2xl">Select Job Title</CardTitle>
          <CardDescription>
            Choose the position you're hiring for
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={jobTitle || ""}
            onValueChange={handleSelectedJob}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
          >
            {data.map((job) => (
              <div key={job.job.title} className="relative">
                <RadioGroupItem
                  value={job.job.title}
                  id={job.job.title}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={job.job.title}
                  className="flex items-center justify-between p-4 rounded-md border-2 border-slate-200 hover:border-slate-300 bg-white peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 transition-all cursor-pointer"
                >
                  <span className="font-medium">
                    {getProperTitle(job.job.title)}
                  </span>
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex items-center justify-center peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-500">
                    <CheckCircle className="h-4 w-4 text-white hidden peer-data-[state=checked]:block" />
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleNextStep} disabled={!jobTitle}>
            Next Step
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    );
  };

  // Step 2: Skills Selection
  const renderSkillsStep = () => {
    return (
      <Card className="w-full max-w-5xl">
        <CardHeader>
          <CardTitle className="text-2xl">Select Required Skills</CardTitle>
          <CardDescription>
            For:{" "}
            <Badge variant="outline" className="font-medium ml-1">
              {getProperTitle(jobTitle || "")}
            </Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {skillList.map((skill: string, index: number) => (
              <div key={index} className="flex items-start space-x-2">
                <Checkbox
                  id={`skill-${index}`}
                  checked={selectedSkills.includes(skill)}
                  onCheckedChange={() => handleSkillChange(skill)}
                />
                <Label
                  htmlFor={`skill-${index}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {getProperTitle(skill)}
                </Label>
              </div>
            ))}
          </div>

          {selectedSkills.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Selected Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedSkills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="px-2 py-1">
                    {getProperTitle(skill) || skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrevStep}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button
            onClick={handleNextStep}
            disabled={selectedSkills.length === 0}
          >
            Next Step
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    );
  };

  // Step 3: Requirements (Experience, Education, Preference)
  const renderRequirementsStep = () => {
    return (
      <Card className="w-full max-w-5xl">
        <CardHeader>
          <CardTitle className="text-2xl">Job Requirements</CardTitle>
          <CardDescription>
            Set the qualification requirements for candidates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="experience">Experience (in years)</Label>
            <Input
              id="experience"
              type="number"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="Enter required experience"
              min="0"
            />
          </div>

          <div className="space-y-2">
            <Label>Education Level</Label>
            <RadioGroup value={education} onValueChange={setEducation}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {["NILL", "NILL or 10th", "NILL or 11th", "NILL or 12th"].map(
                  (level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <RadioGroupItem value={level} id={`education-${level}`} />
                      <Label htmlFor={`education-${level}`}>{level}</Label>
                    </div>
                  )
                )}
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="preference">Gender Preference</Label>
            <Select value={preference} onValueChange={setPreference}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select gender preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Any">Any</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrevStep}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button onClick={handleNextStep}>
            Next Step
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    );
  };

  // Step 4: Review and Submit
  const renderReviewStep = () => {
    return (
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Review Job Details</CardTitle>
          <CardDescription>
            Verify all information before posting
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div>
              <h3 className="text-sm font-medium text-slate-500">Job Title</h3>
              <p className="text-lg font-medium">
                {getProperTitle(jobTitle || "")}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-500">
                Required Skills
              </h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {selectedSkills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {getProperTitle(skill)}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-500">Experience</h3>
              <p className="text-base">
                {experience ? `${experience} years` : "Not specified"}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-500">Education</h3>
              <p className="text-base">{education}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-500">
                Gender Preference
              </h3>
              <p className="text-base">{preference}</p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-blue-700 text-sm">
            <p className="flex items-start">
              <svg
                className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Submitting will use your current location data. Please ensure
              location services are enabled.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrevStep}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700"
          >
            {isSubmitting ? "Submitting..." : "Post Job"}
          </Button>
        </CardFooter>
      </Card>
    );
  };

  // Success message
  const renderSuccessMessage = () => {
    return (
      <Card className="w-full max-w-xl">
        <CardContent className="pt-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-green-700 mb-2">
            Job Posted Successfully!
          </h2>
          <p className="text-slate-600 mb-6">
            Your job listing has been submitted and will be available to job
            seekers.
          </p>

          <Button
            onClick={handleReset}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Post Another Job
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">
            Post a New Job
          </h1>
          <p className="text-slate-500 text-center mb-4">
            Create a job listing in just a few steps
          </p>

          {!submitSuccess && <ProgressBar />}

          <div className="flex flex-col items-center justify-center">
            {submitSuccess ? (
              renderSuccessMessage()
            ) : (
              <>
                {currentStep === 1 && renderJobTitleStep()}
                {currentStep === 2 && renderSkillsStep()}
                {currentStep === 3 && renderRequirementsStep()}
                {currentStep === 4 && renderReviewStep()}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecJobs;
