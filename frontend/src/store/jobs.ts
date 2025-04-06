import { JobState } from "@/types/types";
import { create } from "zustand";

export const useJobStore = create<JobState>((set) => ({
    mlJobId: "",
    jobRecruiterId: "",
    title: "",
    description: "",
    location: "",
    salaryRange : "",
    preference : "",
    qualification : "",
    experience : "",
    setJobId: (mlJobId :string) => set(() => ({ mlJobId })),
    setJobRecruiterId: (jobRecruiterId :string) => set(() => ({ jobRecruiterId })),
    setTitle: (title :string) => set(() => ({ title })),
    setDescription: (description :string) => set(() => ({ description })),
    setLocation: (location :string) => set(() => ({ location })),
    setSalary: (salaryRange :string) => set(() => ({ salaryRange })),
    setPreference: (preference :string) => set(() => ({ preference })),
    setQualification: (qualification :string) => set(() => ({ qualification })),
    setExperience: (experience:string) => set(() => ({ experience })),
    
}));