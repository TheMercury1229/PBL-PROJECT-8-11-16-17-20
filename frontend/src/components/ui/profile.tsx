import * as React from "react";
import Navbar from "../shared/navbar";
import AppliedJobs from "./appliedJobs";
import Avatar from "react-avatar";
import { Button } from "./button";
import { Pen, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import ProfileEditForm from "./ProfileEditForm";
import History from "./history";

const skills = ["Cleaning", "Warden", "Driver", "Electrician"];

const Profile = () => {
  const [open, setOpen] = useState(false);

  // Profile state (initial values)
  const [profile, setProfile] = useState({
    name: "User Name",
    bio: "Passionate worker with expertise in multiple domains.",
    email: "xxxx@gmail.com",
    phone: "1234567890",
    avatar: "", // Avatar URL
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      {/* Profile Container */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow-md">
        {/* Profile Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-5">
            <Avatar
              className="h-24 w-24 border border-gray-300"
              size="80"
              round={true}
              name={profile.name}
              src={profile.avatar}
              color="#0039a6"
            />
            <div>
              <h1 className="font-semibold text-2xl text-gray-800">{profile.name}</h1>
              <p className="text-gray-600 text-sm">{profile.bio}</p>
            </div>
          </div>

          {/* Edit Profile Button */}
          <Button
            onClick={() => setOpen(true)}
            className="self-start border border-gray-300 hover:border-gray-400 transition"
            variant="outline"
          >
            <Pen className="w-5 h-5 text-gray-600" />
          </Button>
        </div>

        {/* Contact Info */}
        <div className="my-5 space-y-3">
          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="w-5 h-5 text-[#0039a6]" />
            <span>{profile.email}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Phone className="w-5 h-5 text-[#FF033E]" />
            <span>{profile.phone}</span>
          </div>
        </div>

        {/* Skills Section */}
        <div>
          <h1 className="text-lg font-semibold text-gray-800">Skills</h1>
          {skills.length > 0 ? (
            <div className="flex gap-2 mt-2 flex-wrap">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-[#0039a6] text-white px-3 py-1 rounded-lg text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-gray-600">NA</span>
          )}
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-md p-6 mt-5">
        <h1 className="text-lg font-semibold text-gray-800 mb-4">Applied Jobs</h1>
        <AppliedJobs />
      </div>

      {/* Job History Section - Styled Similarly to Applied Jobs */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-md p-6 mt-5">
        <h1 className="text-lg font-semibold text-gray-800 mb-4">Job History</h1>
        <History />
      </div>

      {/* Dialog for Editing Profile */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <ProfileEditForm profile={profile} setProfile={setProfile} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
