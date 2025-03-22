import { BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import Home from "./components/home";
import Signup from "./components/auth/signup";
import Login from "./components/auth/login";
import Jobs from "./components/ui/jobs"
import Browse from "./components/browse";
import Profile from "./components/ui/profile";
import Jobdesc from "./components/ui/jobdesc";
import RecJobs from "./components/ui/RecJobs";


const appRouter = createBrowserRouter([
  {
    path : '/',
    element:<Home/>
  },{
    path : '/login',
    element:<Login/>
  },{
    path : '/',
    element:<Signup/>
  },
])

function App() {
  return (
   <div>
    {/* <Signup/> */}
    {/* <Login/> */}
    <Home/>
    {/* <RecJobs/> */}
    {/* <Jobs/> */}
    {/* <Browse/> */}
    {/* <Profile/> */}
    {/* <Jobdesc/> */}
    {/* <RouterProvider router ={appRouter}/> */}
   </div>
  );
}
export default App;
