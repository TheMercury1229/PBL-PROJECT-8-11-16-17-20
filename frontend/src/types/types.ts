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

export interface PreferredJobOutput {
    recruiterjobid: string;
    job_title: string,
    skills: string;
    salary_range: string;
    location: string;
    preference: string,
    experience: string;
    description : string;
  }

export interface JobWithApplications {
    mlJob: {
      title: string;
      description: string;
    };
    applications: {
      user: {
        fullName: string;
        mobile: string;
        email: string;
        jobSeeker: {
          age: number;
          gender: 'MALE' | 'FEMALE' | 'OTHER';
          education: string;
          experience: string;
        };
      };
    }[];
  }
  