from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import pandas as pd
import working_with_db as wwd 

app = FastAPI()

# Define request body model
class JobRequest(BaseModel):
    skills: List[str]
    experience: str
    location: str
    preference: str

@app.get("/")
def read_root():

    return "hi"

@app.post("/recommend-job")
def recommend_job_route(request: JobRequest):
    # Call the recommend_job function with request data
    result_df = wwd.recommend_job(
        skills=request.skills,
        experience=request.experience,
        location=request.location,
        preference=request.preference
    )
    # print(result)
    result_json = result_df.to_dict(orient="records")
    
    return {"recommended_jobs": result_json}
    # return {"recommended_jobs": result}
