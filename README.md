# USER STORIES FINALISED
## User Stories for Workers (Job Seekers)
- Authentication:
"As a user, I want to securely sign up or log in to the platform using my email or phone number."

- Onboarding:
"As a user, I want to fill in my profile details (name, skills, experience, location) to get relevant job recommendations."

- Edit Profile:
"As a user, I want to update my profile details anytime to reflect my current skills and preferences."

- Job Search:
"As a user, I want to search for jobs using keywords, location, and filters to find opportunities that match my needs."

- Job Recommendations (AI/ML):
"As a user, I want AI-powered job recommendations based on my skills, location, and past experiences."

- Job Application:
"As a user, I want to apply for a job with a single click and track my application status."

- Chat with Recruiters:
"As a user, I want to directly chat with job recruiters to clarify job details and requirements."

- Ratings and Reviews:
"As a user, I want to receive ratings and reviews from recruiters after completing a job to improve my profile visibility."

- View Job Details:
"As a user, I want to view detailed job descriptions, including salary, requirements, and work location."

- Save Jobs:
"As a user, I want to save jobs I’m interested in so I can apply later."

- Job History:
"As a user, I want to view my job application and work history to track my progress."

- Apply for Multiple Jobs:
"As a user, I want to apply for multiple jobs simultaneously to increase my chances of getting hired."

## User Stories for Job Recruiters
- Authentication for Recruiters:
"As a recruiter, I want to log in or sign up securely using my email or phone number."

- Create Job Postings:
"As a recruiter, I want to create job postings by adding job title, description, salary, location, and skill requirements."

- View Applications:
"As a recruiter, I want to view all applications for a job in one place to assess candidates."

- Shortlist Applicants:
"As a recruiter, I want to shortlist candidates from the applicant pool to focus on the most suitable ones."

- Communicate with Applicants:
"As a recruiter, I want to chat with applicants to discuss job details and finalize hiring."

- Rate Workers:
"As a recruiter, I want to rate workers after job completion to reflect their performance and reliability."

- Edit Job Listings:
"As a recruiter, I want to update or delete job postings to keep them accurate and relevant."

- Hire Directly:
"As a recruiter, I want to hire workers directly from their profile without posting a job."

## Additional Platform Features
- Multilingual Support:
"As a user, I want the platform to support multiple languages for better accessibility."

- Geolocation-Based Recommendations:
"As a user, I want to see job opportunities near my location for convenience."



# Project Setup and Instructions

This guide will help you set up and run the **backend** and **frontend** servers for this project.

---

## Prerequisites

Ensure the following are installed on your system:

- **Node.js** (v14 or later)
- **npm** (Node Package Manager)
- Any **code editor** (e.g., VS Code)

---

## Setting Up the Repository

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/TheMercury1229/PBL-PROJECT-8-11-16-17-20
   ```

2. **Navigate to the Project Directory**:

3. **Install Dependencies**:
   - Navigate to both the `backend` and `frontend` directories separately and run:
     ```bash
     npm install
     ```

---

## Starting the Servers

### Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install dependencies (if not done earlier):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The backend server should now be running.

---

### Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies (if not done earlier):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend server should now be running.

---

## Accessing the Application

- **Frontend**: Visit `http://localhost:3000` in your browser.  
- **Backend**: The backend server will run on the port specified in the backend configuration (e.g., `http://localhost:5000`).

---

## Additional Notes

- If there are any environment variables required, ensure to set them up in `.env` files located in both `backend` and `frontend` directories.  



