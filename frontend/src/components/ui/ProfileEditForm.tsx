import React, { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";

interface Profile {
  name: string;
  bio: string;
  email: string;
  phone: string;
  avatar: string;
}

interface ProfileEditFormProps {
  profile: Profile;
  setProfile: (profile: Profile) => void;
  setOpen: (open: boolean) => void;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ profile, setProfile, setOpen }) => {
  const [formData, setFormData] = useState<Profile>(profile);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProfile(formData); // Update Profile state in `Profile.tsx`
    setOpen(false); // Close dialog
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <Label>Name</Label>
        <Input name="name" value={formData.name} onChange={handleChange} required />
      </div>

      {/* Bio */}
      <div>
        <Label>Bio</Label>
        <Input name="bio" value={formData.bio} onChange={handleChange} required />
      </div>

      {/* Email */}
      <div>
        <Label>Email</Label>
        <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>

      {/* Phone */}
      <div>
        <Label>Phone</Label>
        <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
      </div>

      {/* Avatar */}
      <div>
        <Label>Avatar URL</Label>
        <Input name="avatar" value={formData.avatar} onChange={handleChange} />
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full">Save Changes</Button>
    </form>
  );
};

export default ProfileEditForm;
