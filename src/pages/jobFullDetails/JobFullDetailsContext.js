import { async } from "@firebase/util";
import React, { useEffect, useState, useContext } from "react";
import { Job_context } from "../job/JobContext";
import { AuthenticationContext } from "../../authentication/AuthenticationContext";
import { createContext } from "react";
import { useParams } from "react-router-dom";
import db from "../../FirebaseInit";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";

let JobFullDetailsContext = createContext();

function JobFullDetailsContextProvider({ children }) {
  let {
    save_jobApplicationState,
    setSaveJobapplicationState,
    SurfOverSavedJobs,
    setSavedJobsArray,
    saved_jobs_array,
    applied_jobApplicationState,
    setAppliedJobapplicationState,
  } = useContext(Job_context);

  let { user } = useContext(AuthenticationContext);
  let { job_id } = useParams();

  let [job_details, setJob_details] = useState({});

  //   Particular job detail
  async function JOB_DETAILS(job_id) {
    const jd = doc(db, "Mirats_Job_Portal", "All_Jobs", "Jobs", String(job_id));
    const docSnap = await getDoc(jd);
    setJob_details(docSnap.data());
  }

  //   Job is saved to a particular user or not
  async function JobSavedOrNotFunction(job_id, user_id) {
    const docRef = doc(db, "Mirats_Job_Portal", "All_Users", "Users", user_id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      if (docSnap.data()?.saved_jobs) {
        setSaveJobapplicationState(false); // Setting state as false so that if job is not saved then state will be false
        docSnap.data()?.saved_jobs.forEach((savedjobs) => {
          // if (savedjobs?.job_id == job_id) {
          if (savedjobs == job_id) {
            // console.log("Job application is saved", job_id);
            setSaveJobapplicationState(true);
          }
        });
      }
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document for saved jobs!");
    }
  }
  //   Job is applied to a particular user or not
  async function JobAppliedOrNotFunction(job_id, user_id) {
    const docRef = doc(db, "Mirats_Job_Portal", "All_Users", "Users", user_id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      if (docSnap.data()?.applied_jobs) {
        setAppliedJobapplicationState(false); // Setting state as false so that if job is not saved then state will be false
        docSnap.data()?.applied_jobs.forEach((appliedjob) => {
          console.log("applied jobs are", appliedjob);
          if (appliedjob?.job_id == job_id) {
            // if (savedjobs == job_id) {
            console.log("Job application is applied", job_id);
            setAppliedJobapplicationState(true);
          }
        });
      }
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document for applied jobs!");
    }
  }

  // if (save_jobApplicationState) {
  //   console.log("save found for", job_id, typeof job_id);
  // } else {
  //   console.log("job is not saved", job_id, typeof job_id);
  // }

  if (applied_jobApplicationState) {
    console.log("applied found for", job_id, typeof job_id);
  } else {
    console.log("job is not applied", job_id, typeof job_id);
  }

  // Use Effect to run the Job saved or not function
  // Functioanlity to remove the Saved job function is also called in this useeffect
  useEffect(() => {
    // console.log(user?.uid)
    if (user?.uid) {
      // To check whether job is saved or not
      JobSavedOrNotFunction(String(job_id), String(user?.uid))
        .then(() => {
          console.log("job saved or not fetched successfully");
        })
        .catch((er) => {
          console.log("Something went wrong in JOb saved or not function");
        });

      // To check whether job is applied or not
      JobAppliedOrNotFunction(String(job_id), String(user?.uid))
        .then(() => {
          console.log("Job applied or not fetched successfully");
        })
        .catch((er) => {
          console.log(er.message);
        });
      // This is also from Job Context
      // To remove the Saved job first we have to set the saved jobs so that we can filter out the unsaved job from it
      setSavedJobsArray([]);
      if (user) {
        // From JobContext
        SurfOverSavedJobs();
      }
    }
    // console.log(user.uid)
  }, [user, job_id]);

  useEffect(() => {
    if (job_id) {
      JOB_DETAILS(job_id);
    }
  }, [job_id]);

  return (
    <>
      <JobFullDetailsContext.Provider value={{ job_id, job_details }}>
        {children}
      </JobFullDetailsContext.Provider>
    </>
  );
}

export default JobFullDetailsContextProvider;
export { JobFullDetailsContext };
