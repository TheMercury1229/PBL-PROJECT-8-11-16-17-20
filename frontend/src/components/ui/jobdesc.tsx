import * as React from "react";
import { useState } from "react";
import Navbar from "../shared/navbar";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { PreferredJobOutput } from "@/types/types";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  MapPin,
  BadgeDollarSign,
  Clock,
  CheckCircle,
  Loader2
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getProperTitle } from "@/lib/utils";

const JobDescription = () => {
  const [isApplying, setIsApplying] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<{
    status: "idle" | "success" | "error";
    message: string;
  }>({ status: "idle", message: "" });
  
  const location = useLocation();
  const job = location.state as PreferredJobOutput;
  
  // Convert skills string to array if it's a string
  const skillsArray = typeof job.skills === 'string' 
    ? job.skills.split(' ').map(skill => skill.trim()).filter(Boolean)
    : [];

  const handleApply = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsApplying(true);
    setApplicationStatus({ status: "idle", message: "" });
    
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/apply-job",
        {
          recruiterJobId: job.recruiterjobid
        },
        {
          withCredentials: true
        }
      );
      
      if (response.data.data) {
        setApplicationStatus({
          status: "success",
          message: "Your application has been submitted successfully!"
        });
      }
    } catch (error) {
      console.log(error);
      setApplicationStatus({
        status: "error",
        message: "Failed to submit application. Please try again later."
      });
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Card className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Job Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-8 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="font-bold text-3xl mb-2">{getProperTitle(job.job_title)}</h1>
                <div className="flex flex-wrap items-center gap-3 text-blue-100">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{getProperTitle(job.location)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BadgeDollarSign className="h-4 w-4" />
                    <span>{getProperTitle(job.salary_range)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{getProperTitle(job.experience)}</span>
                  </div>
                </div>
              </div>
              
              <Button
                onClick={handleApply}
                disabled={isApplying || applicationStatus.status === "success"}
                className="px-6 py-2 rounded-lg font-semibold shadow-md bg-white text-blue-800 hover:bg-blue-50 transition-all"
              >
                {isApplying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Applying...
                  </>
                ) : applicationStatus.status === "success" ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Applied Successfully
                  </>
                ) : (
                  "Apply Now"
                )}
              </Button>
            </div>
          </div>

          <CardContent className="p-6">
            {/* Status Alert */}
            {applicationStatus.status !== "idle" && (
              <Alert
                className={`mb-6 ${
                  applicationStatus.status === "success"
                    ? "bg-green-50 text-green-800 border-green-200"
                    : "bg-red-50 text-red-800 border-red-200"
                }`}
              >
                <AlertDescription>{applicationStatus.message}</AlertDescription>
              </Alert>
            )}

            {/* Skills Section */}
            {skillsArray.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skillsArray.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1 bg-blue-50 text-blue-700">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Job Details */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Job Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-gray-50 border-none p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Role</p>
                      <p className="font-medium">{getProperTitle(job.job_title)}</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="bg-gray-50 border-none p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{getProperTitle(job.location)}</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="bg-gray-50 border-none p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <BadgeDollarSign className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Salary Range</p>
                      <p className="font-medium">{job.salary_range}</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="bg-gray-50 border-none p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Experience</p>
                      <p className="font-medium">{getProperTitle(job.experience)}</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Job Description */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Description</h3>
              <div className="prose max-w-none text-gray-700">
                <p className="whitespace-pre-line">{job.description}</p>
              </div>
            </div>

            {job.preference && (
              <>
                <Separator className="my-6" />
                <div>
                  <h3 className="font-semibold text-lg mb-3">Preferences</h3>
                  <p className="text-gray-700">{job.preference}</p>
                </div>
              </>
            )}

            {/* Apply Button (Bottom) */}
            <div className="mt-8 flex justify-center">
              <Button
                onClick={handleApply}
                disabled={isApplying || applicationStatus.status === "success"}
                className="px-8 py-6 rounded-lg font-semibold text-lg bg-blue-600 text-white hover:bg-blue-700 transition-all"
              >
                {isApplying ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing Application...
                  </>
                ) : applicationStatus.status === "success" ? (
                  <>
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Applied Successfully
                  </>
                ) : (
                  "Apply for this Position"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobDescription;