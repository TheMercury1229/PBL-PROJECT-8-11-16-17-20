import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Signup from "./components/auth/signup";
import Login from "./components/auth/login";
import Jobs from "./components/ui/jobs";
import Browse from "./components/browse";
import Profile from "./components/ui/profile";
import Jobdesc from "./components/ui/jobdesc";
import RecJobs from "./components/ui/RecJobs";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/recruiter-jobs" element={<RecJobs />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/jobdesc" element={<Jobdesc />} />
    </Routes>
  );
}
export default App;
