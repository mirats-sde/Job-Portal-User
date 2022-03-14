import React, { useContext, useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import Navbar2 from "../../components/navbar2/Navbar2";
import Subheader from "../../components/subheader/Subheader";
import { Job_context } from "./JobContext";
import styles from "./job.module.css";
import SidebarFilter from "../../components/sidebar-filter/SidebarFilter";
import JobCard from "../../components/jobcards/JobCard";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AuthenticationContext } from "../../authentication/AuthenticationContext";
// Loader
import CircularProgress from "@mui/material/CircularProgress";
import db from "../../FirebaseInit";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../FirebaseInit";

import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import LoadingScreen from "../loading/LoadingScreen";

function Job() {
  // Job context
  let {
    jobs,
    allFilters,
    setAllFilters,
    applied_filter_jobs,
    loader,
    setOpenSnackBar,
    openSnackBar,
    Alert,
    handleSnackbarClose,
    filterfound,
    setFilterFound,
    jobcards,
    setJobCards,
  } = useContext(Job_context);
  const navigate = useNavigate();
  // Authentication context
  let {
    user,
    snackbar,
    set_snackbar,
    setLoadingScreen,
    loadingScreen,
    interval,
  } = useContext(AuthenticationContext);

  // useEffect(() => {
  //   console.log(interval);
  //   if (interval === undefined) {
  //     clearInterval(interval);
  //   }
  // });
  // let [filterByDateJobs,setFilterByDateJobs]=useState(jobs)

  // If Email is verified then allow to view jobs page else redirect to verify email section
  useEffect(() => {
    setLoadingScreen(true);
    // console.log(auth.currentUser)
    if (user) {
      // console.log("Verified", auth?.currentUser.emailVerified);
      if (!auth?.currentUser.emailVerified) {
        navigate("/register/verifyemailaddress");
        set_snackbar({
          show: true,
          msg: "You have to verify email address to view jobs",
          severity: "error",
        });
        setOpenSnackBar(true);
      }
    }

    setLoadingScreen(false);
  }, [user]);

  // Snackbar
  useEffect(() => {
    if (snackbar?.show) setOpenSnackBar(snackbar?.show);
  }, [snackbar]);

  // Apply Filters
  useEffect(() => {
    // console.log("Filter ")
    setFilterFound(false);
    if (Object.keys(allFilters).length !== 0) {
      for (let key in allFilters) {
        if (allFilters[key].length !== 0) {
          setFilterFound(true);
        }
        if (applied_filter_jobs.hasOwnProperty(key)) {
          console.log(key + " -> " + applied_filter_jobs[key]);
        }
      }
    }

    // Set the Job card
  }, [allFilters]);

  // If Filter found then set applied filter jobs else set the whole jobs in jobcards
  useEffect(() => {
    // console.log("filter found", filterfound, allFilters);
    if (filterfound) {
      // console.log("Inside filter found", applied_filter_jobs);
      console.log("Entered here and applied filter jobs", applied_filter_jobs);
      setJobCards(applied_filter_jobs);
    } else {
      console.log("Setting all the jobs");
      setJobCards(jobs);
    }
  }, [filterfound, jobs, applied_filter_jobs, allFilters]);

  const [sorter, setSorter] = React.useState("");

  // Filter By date
  const handleSortChange = (event) => {
    setSorter(event.target.value);
    console.log(event.target.value);
    switch (event.target.value) {
      case "sort_by_date":
        setJobCards(
          jobs.sort(function (a, b) {
            console.log("entered sort by date cases");
            return a.date_added.toDate() - b.date_added.toDate();
          })
        );
        break;
      case "sort_by_relevance":
        setJobCards(
          jobs.sort(function (a, b) {
            console.log("entered sort by relevance cases");
            return a.job_id - b.job_id;
          })
        );
        break;
    }
  };

  // console.log(allFilters)

  return (
    <>
      {loadingScreen && <LoadingScreen />}

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
        <Navbar2 />
        <Subheader totaljobs={jobcards.length} />
        <div className={styles.mainjob_container}>
          <div className={styles.sidebar_container}>
            <SidebarFilter
              allFilters={allFilters}
              setAllFilters={setAllFilters}
            />
          </div>
          <div className={styles.job_card_container}>
            <div className={styles.jobcard_title}>
              <div className={styles.left_jobcard_title}>
                <p>Turn on Job alerts for your Search</p>
                {/* Job alerts Switch (defaultChecked) */}
                <Switch />
              </div>
              <div className={styles.right_jobcard_title}>
                <FormControl fullWidth className={styles.sort_selector}>
                  <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sorter}
                    label="Sort"
                    defaultValue={"sort_by_relevance"}
                    onChange={handleSortChange}
                  >
                    <MenuItem value={"sort_by_relevance"}>
                      Sort By Relevance
                    </MenuItem>
                    <MenuItem value={"sort_by_date"}>Sort By Date</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className={styles.jobcard_container}>
              {loader ? (
                <CircularProgress color="inherit" />
              ) : jobcards.length !== 0 ? (
                jobcards.map((job) => {
                  return <JobCard job={job} />;
                })
              ) : (
                <h1>No Jobs Found</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Job;
