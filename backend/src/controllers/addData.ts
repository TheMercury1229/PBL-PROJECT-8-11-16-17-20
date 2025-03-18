import { Request, Response, NextFunction, RequestHandler } from "express";
import db from "../config/db";
import { EmploymentType } from "@prisma/client";

export const addData: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {  // Ensure the return type is Promise<void>
    try {
        const { title, description, salary, employmentType } = req.body;

        // Validate EmploymentType
        if (!Object.values(EmploymentType).includes(employmentType)) {
            res.status(400).json({ error: "Invalid employment type" });
            return;
        }

        await db.mLJob.create({
            data: {
                title,
                description,
                salary,
                employmentType: employmentType as EmploymentType,
            },
        });

        res.json({ message: "done" }); // ✅ Remove return statement
    } catch (error) {
        console.error("Error adding job:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
type skill = {
    name : string,
    mlJobId : string
} 
const skills : skill[] = [
    {//cook
        mlJobId: "cm8d2qxj0000ctl3wpia6icqo",
        name : "Cooking Techniques,Food Preparation,Food Safety,Menu Planning,Time Management,Teamwork"
    },
    {//carpenter
        mlJobId: "cm8d2ps8h0009tl3wtou016z9",
        name : "Woodworking,Blueprint Reading,Construction,Joinery,Hand and Power Tool Operation,Framing"
    },
    {//jcb_driver
        mlJobId: "cm8d2rfm1000etl3wmyesllcl",
        name : "Heavy Machinery Operation,Site Preparation,Excavation, Safety Practices,Vehicle Maintenance"
    },
    {//factory_worker
        mlJobId: "cm8d2rmop000ftl3wu1wnxp7p",
        name : "Assembly Line Operation,Machine Operation,Quality Control,Packing,Safety Procedures,Inventory Management"
    },
    {//plumber
        mlJobId: "cm8d2s6l5000gtl3w7me9tmwv",
        name : "Pipe Installation,Troubleshooting,Water Systems,Plumbing Codes,Drainage Systems,Welding"
    },
    {//farm_labur
        mlJobId: "cm8d2skva000htl3wt25mxosh",
        name : "Crop Harvesting, Planting,Irrigation,Fertilization,Pest Control,Machinery Operation"
    },
    {//lift_technician
        mlJobId: "cm8d2srjh000itl3w7dcp1fek",
        name : "Lift Installation,Troubleshooting,Maintenance,Safety Regulations,Electrical Systems,Hydraulic Systems"
    },
    {//machinist
        mlJobId: "cm8d2syl4000jtl3wfw6g0gny",
        name : "Machine Operation,Metalworking,CNC Programming,Blueprint Reading,Welding,Maintenance"
    },
    {//factory_worker
        mlJobId: "cm8d2tw4j000ktl3wamab7x2a",
        name : "Assembly Line Operation,Machine Operation,Quality Control,Packing,Safety Procedures,Inventory Management"
    },
    {//bus_driver
        mlJobId: "cm8d2uhxn000ltl3wgyq2lhox",
        name : "Safe Driving,Traffic Regulations,Route Planning,Vehicle Maintenance,Customer Service"
    },
    {//fisherman
        mlJobId: "cm8d2vm2o000ntl3wvn578x3t",
        name : "Net Handling, Boat Operation,Fish Identification,Marine Safety, Fishing Techniques"
    },
    {//painter
        mlJobId: "cm8d2vx54000otl3woyacxk95",
        name : "Surface Preparation,Paint Application,Mixing Paints,Attention to Detail,Safety Protocols"
    },
    {//warehouse_worder
        mlJobId: "cm8d2wntp000ptl3wheote901",
        name : "Inventory Management,Forklift Operation,Stocking, Packing,Shipping,Safety Practices"
    },
   

]

function convertToSnakeCaseArray(input: string): string[] {
    return input
        .split(",") // Split by commas
        .map(s => s.trim()) // Remove extra spaces
        .map(s => s.toLowerCase().replace(/\s+/g, "_")); // Convert to snake_case
}
async function convert(input : string) : Promise<string[]> {
    return new Promise((resolve,reject)=>{
        const array = input
        .split(",") // Split by commas
        .map(s => s.trim()) // Remove extra spaces
        .map(s => s.toLowerCase().replace(/\s+/g, "_"));
        resolve(array);
    })
}
export const addSkills: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {  // Ensure the return type is Promise<void>
    try {

        for(var i = 0 ;i < skills.length;i++)
        {
            const names = await convert(skills[i].name);
            for(var j =0 ;j<names.length;j++)
            {
                await db.mLSkill.create({
                    data : {
                        name : names[j],
                        mlJobId : skills[i].mlJobId
                    }
                })
            }
        }
        
        console.log(skills);
        res.json({ message: "done" }); // ✅ Remove return statement
    } catch (error) {
        console.error("Error adding job:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};