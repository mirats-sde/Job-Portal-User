import SearchIcon from "@mui/icons-material/Search";
import { doc, getDoc, onSnapshot, where } from "firebase/firestore";

import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthenticationContext } from "../../authentication/AuthenticationContext";
import db from "../../FirebaseInit";
import styles from "./subheader.module.css";

function Subheader({ totaljobs }) {
  const { user } = useContext(AuthenticationContext);
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const getSavedJobs = async () => {
    const u = onSnapshot(
      doc(db, "Mirats_Job_Portal", "All_Users", "Users", user?.uid),
      (doc) => {
        setSavedJobs(doc.data()?.saved_jobs);
        setAppliedJobs(doc.data()?.applied_jobs);
      }
    );
  };

  useEffect(() => {
    getSavedJobs();
  }, [user]);

  return (
    <>
      <nav className={styles.subheader_navbar}>
        <div className={styles.left_section}>
          <ul>
            <li>
              <SearchIcon className={styles.searchicon} />
            </li>
            <li>
              <span style={{ color: "green" }}>{totaljobs}</span> Jobs Matched
            </li>
          </ul>
        </div>
        <div className={styles.right_section}>
          <ul>
            <li>
              {" "}
              <Link to="/jobs/saved-jobs">
                Saved Jobs (
                <span style={{ color: "green" }}>{savedJobs.length}</span>)
              </Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="/jobs/applied-jobs">
                Applied Jobs (
                <span style={{ color: "green" }}>{appliedJobs.length}</span>)
              </Link>{" "}
            </li>
            <li>
              {" "}
              <p>Job Alerts</p>{" "}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Subheader;
