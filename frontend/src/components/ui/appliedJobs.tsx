import * as React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

const jobData = [
  { date: "17-07-2025", role: "Driver", company: "Tata", status: "Selected" },
  { date: "18-07-2025", role: "Software Engineer", company: "Infosys", status: "Pending" },
  { date: "19-07-2025", role: "Analyst", company: "Deloitte", status: "Rejected" },
  { date: "20-07-2025", role: "Designer", company: "Adobe", status: "Selected" },
  { date: "21-07-2025", role: "Product Manager", company: "Amazon", status: "Pending" },
];

// Utility function to handle status badge styles
const getStatusClass = (status) => {
  switch (status) {
    case "Selected":
      return "bg-green-100 text-green-700 border border-green-400";
    case "Pending":
      return "bg-yellow-100 text-yellow-700 border border-yellow-400";
    case "Rejected":
      return "bg-red-100 text-red-700 border border-red-400";
    default:
      return "bg-gray-100 text-gray-700 border border-gray-400";
  }
};

const AppliedJobs = () => {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-md">
      <h1 className="text-lg font-semibold text-gray-800 mb-4">Applied Jobs</h1>
      
      <Table>
        <TableCaption className="text-gray-600">A list of jobs you have applied for.</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-gray-700 font-semibold">Date</TableHead>
            <TableHead className="text-gray-700 font-semibold">Job Role</TableHead>
            <TableHead className="text-gray-700 font-semibold">Company</TableHead>
            <TableHead className="text-right text-gray-700 font-semibold">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobData.length > 0 ? (
            jobData.map((job, index) => (
              <TableRow key={index} className="hover:bg-gray-50 transition-all">
                <TableCell className="text-gray-800">{job.date}</TableCell>
                <TableCell className="text-gray-800 font-medium">{job.role}</TableCell>
                <TableCell className="text-gray-800">{job.company}</TableCell>
                <TableCell className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(job.status)}`}>
                    {job.status}
                  </span>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="4" className="text-center text-gray-500 py-4">
                No jobs applied yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobs;
