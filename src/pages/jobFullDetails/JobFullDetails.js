import React, { useContext } from "react";
import styles from "./jobfulldetails.module.css";
import { useParams } from "react-router-dom";
import Navbar2 from "../../components/navbar2/Navbar2";
import Subheader from "../../components/subheader/Subheader";
import { Job_context } from "../job/JobContext";
import { JobFullDetailsContext } from "./JobFullDetailsContext";
import JobDetailedCard from "../../components/jobdetailedcard/JobDetailedCard";
import JobCard from "../../components/jobcards/JobCard";

import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import job_detailed_image from "../../assets/images/job_detailed_image.png";

function JobFullDetails() {
  let {
    jobs,
    save_jobApplicationState,
    setSaveJobapplicationState,
    set_snackbar,
    snackbar,
    openSnackBar,
    setOpenSnackBar,
    Alert,
    handleSnackbarClose,
  } = useContext(Job_context);
  console.log(snackbar, openSnackBar);
  //Fetching particular job
  // Job details is for particular Job Object
  let { job_id, job_details } = useContext(JobFullDetailsContext);

  console.log(job_details?.qualification);

  return (
    <div className={styles.jobContainer}>
      {/* All Snackbar  */}
      {snackbar?.show && (
        <Snackbar
          open={openSnackBar}
          autoHideDuration={5000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.msg}
          </Alert>
        </Snackbar>
      )}
      {/* <button className={styles.apply_button}>Apply</button> */}
      <Navbar2 />
      {/* <Subheader totaljobs={jobs.length} /> */}

      <div className={styles.container}>
        <div className={styles.image_container}>
          <img src={job_detailed_image} />
        </div>
        <div className={styles.job_container}>
          <JobDetailedCard job={job_details} />
        </div>
      </div>
    </div>
  );
}

export default JobFullDetails;
