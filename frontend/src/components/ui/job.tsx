import * as React from "react";
import { Button } from "./button";
import { Bookmark } from "lucide-react";
import { Badge } from "../ui/badge";
import Avatar from "react-avatar";

const Job = () => {
  return (
    <div className="p-5 rounded-lg shadow-md bg-white border border-gray-200 transition-all hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">📅 2 days ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 my-3">
        <Avatar src=" " size="40" round={true} />
        <div>
          <h1 className="font-medium text-lg">Company Name</h1>
          <p className="text-sm text-gray-500">📍 India</p>
        </div>
      </div>

      {/* Job Description */}
      <div>
        <h1 className="font-bold text-lg my-2">Software Engineer</h1>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          deleniti corrupti necessitatibus exercitationem explicabo.
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className="text-[#0039a6] font-bold bg-gray-100">🧑‍💼 12 Positions</Badge>
        <Badge className="text-[#FF033E] font-bold bg-gray-100">🕒 Part Time</Badge>
        <Badge className="text-[#6A0572] font-bold bg-gray-100">💰 15K</Badge>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 mt-5">
        <Button variant="outline">📄 Details</Button>
        <Button className="bg-[#0039a6] hover:bg-[#002a80] text-white">💾 Save for Later</Button>
      </div>
    </div>
  );
};

export default Job;
