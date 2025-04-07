import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Signup from "./pages/signup";

import Jobs from "./components/ui/jobs";
import Browse from "./components/browse";
import Profile from "./components/ui/profile";
import Jobdesc from "./components/ui/jobdesc";
import RecJobs from "./pages/RecJobs";
import InitUser from "./components/auth/InitUser";
import Login from "./pages/login";
import JobApplication from "./pages/JobApplication";

function App() {
  return (
    <>
      {/* <InitUser></InitUser> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recruiter-jobs" element={<RecJobs />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/jobdesc" element={<Jobdesc />} />
        <Route path="/job-app" element={<JobApplication />} />
      </Routes>
    </>
  );
}
export default App;
