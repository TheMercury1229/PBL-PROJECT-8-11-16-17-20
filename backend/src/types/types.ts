import { Preferance } from "@prisma/client"

export type MLJobType = {
    title : string,
    description : string,
}

export type MLSkillsType = {
    name : string
}

export type RecruiterJob = {
    latitude : string,
    longitude : string,
    location : string,
    preference : Preferance,
    qualifications : string,
    experience : string
}

export type TitleAndSkills = {
    title : string, //title of the job in mlJob
    skills : string[] //skills of this particular job in MLSKILLS
}