import * as React from "react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { Button } from "./button";

const jobHistory = [
  { date: "12-07-2025", role: "Electrician", company: "Reliance" },
  { date: "15-07-2025", role: "Security Guard", company: "HDFC" },
  { date: "17-07-2025", role: "Driver", company: "Tata" },
  { date: "20-07-2025", role: "Warehouse Manager", company: "Flipkart" },
  { date: "22-07-2025", role: "Helper", company: "Zomato" },
  { date: "25-07-2025", role: "Plumber", company: "L&T" },
  { date: "28-07-2025", role: "Electrician", company: "Adani" },
];

const History = () => {
  const [showAll, setShowAll] = useState(false);

  // Show only top 5 jobs unless expanded
  const displayedJobs = showAll ? jobHistory : jobHistory.slice(0, 5);

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-md">
      <h1 className="text-lg font-semibold text-gray-800 mb-4">Job History</h1>

      <Table>
        <TableCaption className="text-gray-600">
          A record of jobs you have completed.
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-gray-700 font-semibold">Date</TableHead>
            <TableHead className="text-gray-700 font-semibold">Job Role</TableHead>
            <TableHead className="text-gray-700 font-semibold">Company</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedJobs.length > 0 ? (
            displayedJobs.map((job, index) => (
              <TableRow key={index} className="hover:bg-gray-50 transition-all">
                <TableCell className="text-gray-800">{job.date}</TableCell>
                <TableCell className="text-gray-800 font-medium">{job.role}</TableCell>
                <TableCell className="text-gray-800">{job.company}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="3" className="text-center text-gray-500 py-4">
                No job history available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* View All / Show Less Toggle Button */}
      {jobHistory.length > 5 && (
        <div className="flex justify-center mt-4">
          <Button variant="outline" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show Less" : "View All"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default History;
