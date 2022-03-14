import React, { createContext, useEffect, useState, useContext } from "react";
import db from "../../FirebaseInit";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  onSnapshot,
  doc,
  arrayUnion,
  arrayRemove,
  FieldValue,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { AuthenticationContext } from "../../authentication/AuthenticationContext";
import { EmployeeDetails_Context } from "../employeeDetails/EmployeeDetailsContext";
const Job_context = createContext();

function JobContext(props) {
  let {
    user,
    set_snackbar,
    snackbar,
    setOpenSnackBar,
    openSnackBar,
    interval,
  } = useContext(AuthenticationContext);

  let { isPreviousResume } = useContext(EmployeeDetails_Context);
  // console.log("previous resume", isPreviousResume);
  let [jobs, setJobs] = useState([]);
  const [allFilters, setAllFilters] = useState({});
  let [jobcards, setJobCards] = useState([]);

  let [applied_filter_jobs, setApplied_filter_jobs] = useState([]);
  //Filter found then true else false
  let [filterfound, setFilterFound] = useState(false);

  let [loader, setLoader] = useState(false);

  // State to show the saved icon and applied icon
  let [save_jobApplicationState, setSaveJobapplicationState] = useState(false);
  let [applied_jobApplicationState, setAppliedJobapplicationState] =
    useState(false);

  // useState for removing the saved jobs
  let [saved_jobs_array, setSavedJobsArray] = useState([]);

  // useEffect(() => {
  //   console.log("clearing interval useeffect");
  //   if (interval !== undefined) {
  //     console.log("Clearing interval");
  //     clearInterval(interval);
  //   }
  // }, []);

  // Set the Save Job application state to false when user logout
  useEffect(() => {
    if (!user) {
      setSaveJobapplicationState(false);
    }
  }, [user]);

  useEffect(() => {
    setApplied_filter_jobs(jobs);
  }, [jobs]);

  //   Handle Snackbar
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
    set_snackbar({});
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  //Useeffect for Fetching and storing all the jobs from firebase note: Fetching job at very beginning
  async function getAllJobDocuments() {
    const q = query(collection(db, "Mirats_Job_Portal", "All_Jobs", "Jobs"));
    setLoader(true);
    const querySnapshot = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setJobs((prear) => [...prear, doc.data()]);
        setLoader(false);
      });
    });
  }

  useEffect(() => {
    setJobs([]);
    getAllJobDocuments().then(() => {
      // console.log("All job documents fetched successfully");
    });
  }, []);

  // useeffect for showing jobcards according to filter on every filter change
  useEffect(() => {
    console.log("All filters is ", allFilters);
    for (let filterkey in allFilters) {
      // Filtering Organizations( company name ), job types and departments as well

      if (!filterfound || Object.keys(allFilters).length === 1) {
        console.log("If filterfound is false");
        if (Array.isArray(allFilters[filterkey])) {
          setApplied_filter_jobs(
            // if(allFilters)
            jobs.filter((job) => {
              return allFilters[filterkey].includes(job?.[filterkey]);
            })
          );
        }
        //Job title
        if (filterkey === "job_title") {
          setApplied_filter_jobs(
            jobs.filter((job) => {
              return job?.job_title
                .toLowerCase()
                .includes(allFilters[filterkey].toLowerCase());
            })
          );
        }
        // Skills And Qualification Filter
        if (filterkey === "skills_required") {
          setApplied_filter_jobs(
            jobs.filter((job) => {
              for (let i = 0; i < job.skills_required.length; i++) {
                if (
                  job?.skills_required[i]?.label.includes(
                    allFilters["skills_required"]
                  ) ||
                  job?.skills_required[i]?.value.includes(
                    allFilters["skills_required"]
                  )
                ) {
                  return job;
                }
              }
              //Check inside the description
              if (job?.brief_description.includes(allFilters[filterkey])) {
                return job;
              }
            })
          );
        }
        // Job Location
        if (filterkey === "job_location") {
          setApplied_filter_jobs(
            jobs.filter((job) => {
              for (let i = 0; i < allFilters?.job_location.length; i++) {
                if (allFilters?.job_location[i]?.value === job?.job_location) {
                  // console.log(job)
                  return job;
                }
              }
            })
          );
        }
      } else {
        console.log("If filter found is true");
        if (Array.isArray(allFilters[filterkey])) {
          setApplied_filter_jobs(
            // if(allFilters)
            jobcards.filter((job) => {
              return allFilters[filterkey].includes(job?.[filterkey]);
            })
          );
        }
        //Job title
        if (filterkey === "job_title") {
          setApplied_filter_jobs(
            jobcards.filter((job) => {
              return job?.job_title
                .toLowerCase()
                .includes(allFilters[filterkey].toLowerCase());
            })
          );
        }
        // Skills And Qualification Filter
        if (filterkey === "skills_required") {
          setApplied_filter_jobs(
            jobcards.filter((job) => {
              for (let i = 0; i < job.skills_required.length; i++) {
                if (
                  job?.skills_required[i]?.label.includes(
                    allFilters["skills_required"]
                  ) ||
                  job?.skills_required[i]?.value.includes(
                    allFilters["skills_required"]
                  )
                ) {
                  return job;
                }
              }
            })
          );
        }
        // Job Location
        if (filterkey === "job_location") {
          setApplied_filter_jobs(
            jobcards.filter((job) => {
              for (let i = 0; i < allFilters?.job_location.length; i++) {
                if (allFilters?.job_location[i]?.value === job?.job_location) {
                  // console.log(job)
                  return job;
                }
              }
            })
          );
        }
      }
    }
  }, [allFilters]);
  console.log("applied filter jobs in job context", applied_filter_jobs);

  // Save Job application
  async function SaveJobApplication(job_id) {
    // console.log("Entered save job application");
    // console.log(user?.uid);
    if (user) {
      await setDoc(
        doc(db, "Mirats_Job_Portal", "All_Users", "Users", user?.uid),
        {
          // saved_jobs: arrayUnion({ job_id: job_id, date_saved: new Date() }),
          saved_jobs: arrayUnion(job_id),
        },
        { merge: true }
      );
      setSaveJobapplicationState(true);
    } else {
      set_snackbar({
        show: true,
        severity: "error",
        msg: "You have to Login to Save the Job",
      });
    }
  }
  // Apply Job application
  async function ApplyJobApplication(job_id) {
    if (user) {
      //To check the resume is uploaded by user or not
      if (isPreviousResume) {
        await setDoc(
          doc(db, "Mirats_Job_Portal", "All_Users", "Users", user?.uid),
          {
            applied_jobs: arrayUnion({
              job_id: job_id,
              date_applied: new Date(),
            }),
          },
          { merge: true }
        );

        await setDoc(
          doc(db, "Mirats_Job_Portal", "All_Jobs", "Jobs", job_id),
          {
            applied_candidates: arrayUnion(user?.uid),
          },
          { merge: true }
        );

        setAppliedJobapplicationState(true);
      } else {
        set_snackbar({
          show: true,
          severity: "error",
          msg: "You have to Upload your Resume to apply the job",
        });
        setOpenSnackBar(true);
      }
    } else {
      set_snackbar({
        show: true,
        severity: "error",
        msg: "You have to Login to Apply the Job",
      });
      setOpenSnackBar(true);
    }
  }

  // Fetching all saved jobs of a particular user
  async function SurfOverSavedJobs() {
    const ref = doc(db, "Mirats_Job_Portal", "All_Users", "Users", user?.uid);
    let docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      docSnap.data()?.saved_jobs.map((job) => {
        // console.log("The job application is", job);
        setSavedJobsArray((prevar) => [...prevar, job]);
      });
    } else {
      console.log("No Saved Jobs Found");
    }
  }

  // console.log("Saved jobs are", saved_jobs_array);

  // Removing the saved Job application from a user
  // This is used in FullDetailsContext **
  async function RemoveSaveJobApplication(job_id) {
    // console.log("Entered save job application");
    if (user) {
      console.log(user?.uid);
      const ref = doc(db, "Mirats_Job_Portal", "All_Users", "Users", user?.uid);
      await updateDoc(ref, {
        // saved_jobs: saved_jobs_array.filter((jb) => jb?.job_id !== job_id),
        saved_jobs: arrayRemove(job_id),
      });
      setSaveJobapplicationState(false);
    } else {
      set_snackbar({ show: false, msg: "You have to Login First" });
    }
  }

  // console.log("applied filter jobs are", applied_filter_jobs);
  return (
    <>
      <Job_context.Provider
        value={{
          jobs,
          allFilters,
          setAllFilters,
          applied_filter_jobs,
          loader,
          SaveJobApplication, //Save Job Application
          RemoveSaveJobApplication,
          save_jobApplicationState,
          setSaveJobapplicationState,
          SurfOverSavedJobs,
          setSavedJobsArray,
          saved_jobs_array,
          ApplyJobApplication, //Apply for the Job
          applied_jobApplicationState,
          setAppliedJobapplicationState,
          set_snackbar,
          snackbar,
          openSnackBar,
          setOpenSnackBar,
          Alert,
          handleSnackbarClose,
          filterfound,
          setFilterFound,
          jobcards,
          setJobCards,
        }}
      >
        {props.children}
      </Job_context.Provider>
    </>
  );
}

export default JobContext;
export { Job_context };
