import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import React, { useContext, useEffect, useState } from "react";
import styles from "./jobcard.module.css";
import { Link, useParams } from "react-router-dom";
import { AuthenticationContext } from "../../authentication/AuthenticationContext";
import { getUserDetails } from "../../utils/firebase-queries";

function JobCard({ job }) {
  const { savedJobs, user } = useContext(AuthenticationContext);
  const [savedJobsId, setSavedJobsId] = useState([]);
  useEffect(() => {
    getUserDetails(user?.uid).then((res) => setSavedJobsId(res));
  }, [savedJobs, user]);
  // console.log(savedJobsId);
  return (
    <>
      <Link to={`/jobs/job_details/${job.job_id}`} className={styles.linker}>
        <div className={styles.jobcard}>
          <div className={styles.card_header}>
            <div className={styles.card_title_container}>
              <h2>{job.job_title}</h2>
            </div>
            <div className={styles.option_container}>
              <div>
                <ShareIcon /> <p>Share</p>{" "}
              </div>
              {/* <div
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  console.log(e);
                }}
              >
                <BookmarkBorderIcon /> <p>Save</p>{" "}
              </div> */}
            </div>
          </div>
          {/* Company Name and Location  */}
          <div className={styles.subheader_container}>
            <div className={styles.shc}>
              <ApartmentIcon />
              <p className={styles.company_name}>{job.company_name}</p>
            </div>
            <div className={styles.shc}>
              <LocationOnIcon />
              <p>
                {" "}
                <span style={{ fontWeight: "bold" }}>In-Office</span> :{" "}
                {job?.job_location}{" "}
              </p>
            </div>
          </div>
          <hr />
          {/* Qualifications  */}
          <div className={styles.qualification_container}>
            <p className={styles.qualification_title}>Qualification: </p>
            <ul>
              {/* {job.qualification.map((qual) => {
                return <li>{qual}</li>;
              })} */}
              {job?.brief_description.split("\\n").map((description, index) => {
                if (index < 3) return <li>{description}</li>;
              })}
            </ul>
          </div>
          <div className={styles.footer}>
            <button>Expand</button>
          </div>
        </div>
      </Link>
    </>
  );
}

export default JobCard;
