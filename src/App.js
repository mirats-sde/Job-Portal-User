import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar/Navbar";

import Job from "./pages/job/Job";
import JobFullDetails from "./pages/jobFullDetails/JobFullDetails";
import { Routes, Route, Link } from "react-router-dom";
import JobContext from "./pages/job/JobContext";
import JobFullDetailsContextProvider from "./pages/jobFullDetails/JobFullDetailsContext";
// import Register from "./pages/registerAndLoginUser/Register";
// import Login from "./pages/registerAndLoginUser/Login";
import AuthenticationProvider from "./authentication/AuthenticationContext";
import SavedJobs from "./pages/savedJobs/SavedJobs";
import AppliedJobs from "./pages/appliedJobs/AppliedJobs";
import EmployeeDetails from "./pages/employeeDetails/EmployeeDetails";
import EmployeeDetailsContextProvider from "./pages/employeeDetails/EmployeeDetailsContext";
import RegisterPage from "./pages/registerAndLogin/RegisterPage";
import LoginPage from "./pages/registerAndLogin/LoginPage";
import LoadingScreen from "./pages/loading/LoadingScreen";

import Home from "./pages/Home";
import ExploreTeams from "./pages/ExploreTeams";
import Programs from "./pages/Programs";
import Resources from "./pages/Resources";
import Students from "./pages/Students";
import UserProfile from "./pages/userprofile/UserProfile";
// import Navbar from "./navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Navbar2 from "./components/navbar2/Navbar2";
//working
function App() {
  return (
    <div className="App">
      <AuthenticationProvider>
        <EmployeeDetailsContextProvider>
          <JobContext>
            <Routes>
              {/* User Profile */}
              <Route exact path="/userprofile" element={<UserProfile />} />

              <Route exact path="/" element={<Home />} />
              <Route path="/exploreteams" element={<ExploreTeams />} />
              <Route path="/students" element={<Students />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/resources" element={<Resources />} />

              <Route exact path="/jobs" element={<Job />} />

              <Route
                exact
                path="/jobs/job_details/:job_id"
                element={
                  <JobFullDetailsContextProvider>
                    <JobFullDetails />
                  </JobFullDetailsContextProvider>
                }
              />

              <Route
                element={<RegisterPage />}
                exact
                path="/register/:registertype"
              />
              <Route element={<LoginPage />} exact path="/login" />
              <Route path="/jobs/saved-jobs" exact element={<SavedJobs />} />
              <Route
                path="/jobs/applied-jobs"
                exact
                element={<AppliedJobs />}
              />
              <Route
                path="/employeedetails"
                exact
                element={<EmployeeDetails />}
              />

              {/* Loading Screen */}
              {/* <Route path='/loading' exact element={<LoadingScreen/>} /> */}
            </Routes>
          </JobContext>
        </EmployeeDetailsContextProvider>
      </AuthenticationProvider>
    </div>
  );
}

export default App;
