import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../authentication/AuthenticationContext";
import JobCard from "../../components/jobcards/JobCard";
import Navbar2 from "../../components/navbar2/Navbar2";
import Subheader from "../../components/subheader/Subheader";
import db from "../../FirebaseInit";
import { getUserDetails } from "../../utils/firebase-queries";
import styles from "./SavedJobs.module.css";

const SavedJobs = () => {
  const { user } = useContext(AuthenticationContext);
  console.log(user?.uid);
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    getUserDetails(user?.uid).then((u) => {
      u.data()?.saved_jobs?.map(async (job_id) => {
        console.log(job_id);
        const job = await getDoc(
          doc(db, "Mirats_Job_Portal", "All_Jobs", "Jobs", String(job_id))
        );
        console.log(job.data());
        setSavedJobs((prevArr) => [...prevArr, job.data()]);
      });
    });
  }, [user]);
  console.log(savedJobs);
  return (
    <>
      <Navbar2 />

      <div className={styles.container}>
        <div className={styles.saved_jobs_title}>
          {user && <p>Your Saved Jobs</p>}
        </div>
        <div className={styles.job_container}>
          {/* <hr /> */}
          {user ? (
            savedJobs.length ? (
              savedJobs?.map((job) => <JobCard job={job} />)
            ) : (
              <p className={styles.no_job_found}>No Saved Jobs</p>
            )
          ) : (
            <p className={styles.login_first} style={{ color: "red" }}>
              Login to view Saved Jobs
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default SavedJobs;
