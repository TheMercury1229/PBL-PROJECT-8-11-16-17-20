export interface UserState {
    id : string;
    fullName: string;
    email: string;
    mobile: string;
    password: string;
    role: string;
    loggedIn: boolean;
    setId: (id: string) => void;
    setFullName: (name: string) => void;
    setEmail: (email: string) => void;
    setMobile: (mobile: string) => void;
    setPassword: (password: string) => void;
    setRole: (role: string) => void;
    setLoggedIn: (status: boolean) => void;
}

export type TitleAndSkills = {
    title: string; // Job title from mlJob
    skills: string[]; // Selected skills from MLSKILLS
  };


export interface JobState{
    mlJobId: string;
    jobRecruiterId: string;
    title: string;
    description: string;
    location: string;
    salaryRange : string;
    preference : string;
    qualification : string;
    experience : string;    
}

export const roleValue = {
    jobSeeker :"JOB_SEEKER",
    jobRecruiter : "JOB_RECRUITER"
}

