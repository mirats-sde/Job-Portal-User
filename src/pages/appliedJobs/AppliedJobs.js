import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../authentication/AuthenticationContext";
import JobCard from "../../components/jobcards/JobCard";
import Navbar2 from "../../components/navbar2/Navbar2";
import Subheader from "../../components/subheader/Subheader";
import db from "../../FirebaseInit";
import { getUserDetails } from "../../utils/firebase-queries";
import styles from "./AppliedJobs.module.css";

const AppliedJobs = () => {
  const { user } = useContext(AuthenticationContext);
  // console.log(user?.uid);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    console.log("called outside user");
    if (user) {
      console.log("called inside user");
      getUserDetails(user?.uid).then((u) => {
        u.data()?.applied_jobs?.map(async (appliedjob) => {
          // console.log(appliedjob);
          const job = await getDoc(
            doc(
              db,
              "Mirats_Job_Portal",
              "All_Jobs",
              "Jobs",
              String(appliedjob?.job_id)
            )
          );
          console.log(job.data());
          setAppliedJobs((prevArr) => [...prevArr, job.data()]);
        });
      });
    }
  }, [user]);
  console.log(appliedJobs);
  return (
    <>
      <div>
        <Navbar2 />
      </div>
      <div className={styles.container}>
        <div className={styles.saved_jobs_title}>
          {user && <p>Applied Jobs</p>}
        </div>
        <div className={styles.job_container}>
          {/* <hr /> */}
          {user ? (
            appliedJobs.length ? (
              appliedJobs?.map((job) => <JobCard job={job} />)
            ) : (
              <p className={styles.no_job_found}>No Applied Jobs</p>
            )
          ) : (
            <p className={styles.login_first} style={{ color: "red" }}>
              Login to view Applied Jobs
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AppliedJobs;
