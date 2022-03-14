import React, { useEffect, useState, useContext } from "react";
import { Job_context } from "../../pages/job/JobContext";
import styles from "./jobdetailedcard.module.css";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareIcon from "@mui/icons-material/Share";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
// import SettingsIcon from "@mui/icons-material/Settings";
// import StarBorderIcon from "@mui/icons-material/StarBorder";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { borderBottom } from "@mui/system";
import { AuthenticationContext } from "../../authentication/AuthenticationContext";
import cx from "classnames";
import { LinkedIn, Usb } from "@mui/icons-material";
import { Link } from "react-router-dom";
import classNames from "classnames";
// import Tooltip from "@mui/material/Tooltip";
import ToolTip from "../toolTip/ToolTip";
import { FaFacebookF } from "react-icons/fa";
import { BsLink, BsTwitter } from "react-icons/bs";
import { GrLinkedinOption } from "react-icons/gr";

function JobDetailedCard({ job }) {
  let { user, set_snackbar, setOpenSnackBar } = useContext(
    AuthenticationContext
  );

  let {
    SaveJobApplication,
    save_jobApplicationState,
    setSaveJobapplicationState,
    RemoveSaveJobApplication,
    ApplyJobApplication,
    applied_jobApplicationState,
    setAppliedJobapplicationState,
  } = useContext(Job_context);

  const accordion = {
    boxShadow: "none",
    // borderBottom:"1px solid gray"
  };

  // Accordions States
  const [expanded_about, setExpanded_about] = React.useState(true);
  const [expanded_what_you_do, setExpanded_what_you_do] = React.useState(true);
  const [expanded_looking_for, setExpanded_looking_for] = React.useState(true);
  const [expanded_roles, setExpanded_roles] = React.useState(true);
  const [expanded_diversity, setExpanded_diversity] = React.useState(true);

  // Save Job Handlers
  function HandleSaveJob() {
    if (!user) {
      set_snackbar({
        show: true,
        severity: "error",
        msg: `You have to Login first `,
      });
      setOpenSnackBar(true);
      return;
    }
    SaveJobApplication(String(job?.job_id)).then(() => {
      // setSaveJobapplicationState(true)
    });
  }
  function HandleRemoveSaveJob() {
    if (!user) {
      set_snackbar({
        show: true,
        severity: "error",
        msg: "You have to Login first",
      });
      setOpenSnackBar(true);
      return;
    }
    // console.log("removing save job is working");
    RemoveSaveJobApplication(String(job?.job_id)).then(() => {
      console.log(job?.job_id, "removed from saved");
      // setSaveJobapplicationState(false)
    });
  }
  function HandleApplyJob() {
    if (!user) {
      set_snackbar({
        show: true,
        severity: "error",
        msg: `You have to Login first `,
      });
      setOpenSnackBar(true);
      return;
    }
    ApplyJobApplication(String(job?.job_id))
      .then(() => {
        //Getting job details from props
        // setSaveJobapplicationState(true)
      })
      .catch((er) => {
        set_snackbar({
          show: true,
          severity: "error",
          msg: er.message,
        });
        setOpenSnackBar(true);
      });
  }
  return (
    <>
      <div className={styles.jobcard} id="jobcardcontainer">
        <div className={styles.card_header}>
          <div className={styles.card_title_container}>
            <h2>{job.job_title}</h2>
          </div>
        </div>
        {/* Company Name and Location  */}
        <div className={styles.subheader_container}>
          <div className={styles.shc}>
            <p className={styles.company_name}>{job?.company_name}</p>
          </div>

          <div className={styles.shc}>
            <p> {job?.workplace_type} </p>
          </div>
          <div className={styles.shc}>
            <p> {job?.employeement_type} </p>
          </div>
          <div className={styles.shc}>
            <p> {job?.department} </p>
          </div>
        </div>

        <div className={styles.saveAndApply_container}>
          <div className={styles.left}>
            {/* Apply Button  */}
            <div className={styles.apply_button_container}>
              {applied_jobApplicationState ? (
                <ToolTip title="You already applied for this job">
                  <div
                    className={styles.button_disabled}
                    id="apply_btn"
                    onClick={HandleApplyJob}
                    disabled
                  >
                    Job Applied
                  </div>
                </ToolTip>
              ) : (
                <button
                  className={styles.apply_button}
                  id="apply_btn"
                  onClick={HandleApplyJob}
                >
                  Apply
                </button>
              )}
            </div>

            {/* Job is Saved or not  */}
            <div className={styles.favourite_container}>
              {save_jobApplicationState ? (
                <div
                  onClick={HandleRemoveSaveJob}
                  className={styles.savejobcontainer}
                >
                  <BookmarkIcon />
                  <label>Job is Saved</label>
                </div>
              ) : (
                <div
                  onClick={HandleSaveJob}
                  className={styles.savejobcontainer}
                >
                  <BookmarkBorderIcon />
                  <label>Save this Job</label>
                </div>
              )}
            </div>
          </div>
          <div className={styles.right}>
            <div>
              <p>Share this listings</p>
            </div>
            <div className={styles.sharethislisting_icons}>
              <a href="">
                <FaFacebookF color="black" size={20} />
              </a>
              <a href="">
                <GrLinkedinOption color="black" size={20} />
              </a>
              <a href="">
                <BsTwitter color="black" size={20} />
              </a>
              <a href="">
                <BsLink color="black" size={30} />
              </a>
            </div>
          </div>
        </div>

        {/* <hr /> */}
        {/* Qualifications  */}
        {/* <div className={styles.qualification_container}>
                    <p className={styles.qualification_title}>Qualification: </p>
                    <ul>
                        {job?.qualification?.map(qual => {
                            return <li>{qual}</li>
                        })}
                    </ul>
                </div> */}

        {/* All Accordions are here  */}
        <div className={styles.about_container}>
          {/* About mirats insights  */}

          <Accordion
            sx={accordion}
            expanded={expanded_about}
            onChange={() => {
              setExpanded_about(!expanded_about);
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                <h2 className={styles.accordion_title}>
                  About Mirats Insights
                </h2>{" "}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className={styles.accordion_description}>
                Millions of people across the world come to Pinterest to find
                new ideas every day. It’s where they get inspiration, dream
                about new possibilities and plan for what matters most. Our
                mission is to help those people find their inspiration and
                create a life they love. In your role, you’ll be challenged to
                take on work that upholds this mission and pushes Pinterest
                forward. You’ll grow as a person and leader in your field, all
                the while helping Pinners make their lives better in the
                positive corner of the internet.
              </Typography>
              <Typography
                className={cx(
                  styles.accordion_description,
                  styles.weighted_accordion_description
                )}
              >
                Pinterest has internet scale personalized recommendation engines
                in 20+ languages, which requires a deep understanding of the
                users and content on our platform. As a taxonomist on the
                Content Knowledge team, you’ll work on constructing Pinterest
                Knowledge Graph, which will make measurably positive impact on
                hundreds of millions of users with improved machine learning
                modeling and featurization breakthroughs on almost all Pinterest
                product surfaces (Discovery, Shopping, Growth, Ads, etc).
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* What you’ll do: */}
          <Accordion
            sx={accordion}
            expanded={expanded_what_you_do}
            onChange={() => {
              setExpanded_what_you_do(!expanded_what_you_do);
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                <h2 className={styles.accordion_title}>What you’ll do:</h2>{" "}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className={styles.accordion_description}>
                <ul>
                  <li>
                    Utilize industry best practice to design and maintain a
                    taxonomy and next generation of knowledge graph that spans a
                    spectrum of contents including food and drink, fashion, DIY,
                    event planning, technology, travel, entertainment etc
                  </li>
                  <li>
                    Utilize industry best practice to design and maintain a
                    taxonomy and next generation of knowledge graph that spans a
                    spectrum of contents including food and drink, fashion, DIY,
                    event planning, technology, travel, entertainment etc
                  </li>
                </ul>
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* What we’re looking for: */}
          <Accordion
            sx={accordion}
            expanded={expanded_looking_for}
            onChange={() => {
              setExpanded_looking_for(!expanded_looking_for);
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                <h2 className={styles.accordion_title}>
                  What we’re looking for:
                </h2>{" "}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className={styles.accordion_description}>
                <ul>
                  <li>
                    Utilize industry best practice to design and maintain a
                    taxonomy and next generation of knowledge graph that spans a
                    spectrum of contents including food and drink, fashion, DIY,
                    event planning, technology, travel, entertainment etc
                  </li>
                  <li>
                    Utilize industry best practice to design and maintain a
                    taxonomy and next generation of knowledge graph that spans a
                    spectrum of contents including food and drink, fashion, DIY,
                    event planning, technology, travel, entertainment etc
                  </li>
                  <li>
                    Utilize industry best practice to design and maintain a
                    taxonomy and next generation of knowledge graph that spans a
                    spectrum of contents including food and drink, fashion, DIY,
                    event planning, technology, travel, entertainment etc
                  </li>
                  <li>
                    Utilize industry best practice to design and maintain a
                    taxonomy and next generation of knowledge graph that spans a
                    spectrum of contents including food and drink, fashion, DIY,
                    event planning, technology, travel, entertainment etc
                  </li>
                </ul>
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* More about roles at Mirats Insights: */}
          <Accordion
            sx={accordion}
            expanded={expanded_roles}
            onChange={() => {
              setExpanded_roles(!expanded_roles);
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                <h2 className={styles.accordion_title}>
                  More about roles at Mirats Insights:
                </h2>{" "}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className={styles.accordion_description}>
                <ul>
                  <li>
                    Utilize industry best practice to design and maintain a
                    taxonomy and next generation of knowledge graph that spans a
                    spectrum of contents including food and drink, fashion, DIY,
                    event planning, technology, travel, entertainment etc
                  </li>
                  <li>
                    Utilize industry best practice to design and maintain a
                    taxonomy and next generation of knowledge graph that spans a
                    spectrum of contents including food and drink, fashion, DIY,
                    event planning, technology, travel, entertainment etc
                  </li>
                  <li>
                    Utilize industry best practice to design and maintain a
                    taxonomy and next generation of knowledge graph that spans a
                    spectrum of contents including food and drink, fashion, DIY,
                    event planning, technology, travel, entertainment etc
                  </li>
                  <li>
                    Utilize industry best practice to design and maintain a
                    taxonomy and next generation of knowledge graph that spans a
                    spectrum of contents including food and drink, fashion, DIY,
                    event planning, technology, travel, entertainment etc
                  </li>
                </ul>
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* Our Commitment to Diversity: */}
          <Accordion
            sx={accordion}
            expanded={expanded_diversity}
            onChange={() => {
              setExpanded_diversity(!expanded_diversity);
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                <h2 className={styles.accordion_title}>
                  Our Commitment to Diversity:
                </h2>{" "}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                className={cx(
                  styles.accordion_description,
                  styles.weighted_accordion_description
                )}
              >
                At Pinterest, our mission is to bring everyone the inspiration
                to create a life they love—and that includes our employees.
                We’re taking on the most exciting challenges of our working
                lives, and we succeed with a team that represents an inclusive
                and diverse set of identities and backgrounds.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>

        <hr style={{ margin: "20px 0px" }} />

        <div className={styles.kindsOfPeople_container}>
          <h1>
            We’re looking for all kinds{" "}
            <spans style={{ color: "#1967d2" }}>of people.</spans>{" "}
          </h1>
          <p>
            Pinterest is an equal opportunity employer and makes employment
            decisions on the basis of merit. We want to have the best qualified
            people in every job. Pinterest policy prohibits unlawful
            discrimination based on race, color, religious or religious creed,
            sex, sexual orientation, gender, age, or any other consideration
            made unlawful by applicable federal, state, or local laws.
          </p>
        </div>

        <div className={styles.rightfit_container}>
          <h1>Not the right fit? Explore these similar opportunities</h1>
          <div className={styles.similar_job_cards_container}>
            <div className={styles.job_card}>
              <h2 className={styles.similar_job_card_title}>Engineering</h2>
              <h2 className={styles.similar_job_card_title}>
                Software Engineer, Online Systems
              </h2>
              <h2 className={styles.similar_job_card_title}>
                <LocationOnIcon /> Mumbai, India
              </h2>
            </div>
            <div className={styles.job_card}>
              <h2 className={styles.similar_job_card_title}>Engineering</h2>
              <h2 className={styles.similar_job_card_title}>
                Software Engineer, Online Systems
              </h2>
              <h2 className={styles.similar_job_card_title}>
                <LocationOnIcon />
                Mumbai, India
              </h2>
            </div>
            <div className={styles.job_card}>
              <h2 className={styles.similar_job_card_title}>Engineering</h2>
              <h2 className={styles.similar_job_card_title}>
                Software Engineer, Online Systems
              </h2>
              <h2 className={styles.similar_job_card_title}>
                <LocationOnIcon />
                Mumbai, India
              </h2>
            </div>
          </div>
        </div>

        <div className={styles.continue_your_research_container}>
          <p className={styles.title}>Continue your search</p>
          <div>
            <input placeholder="Search Jobs by Keywords" />
            <button>Let's Go</button>
          </div>
        </div>

        <div className={styles.stay_inspired_container}>
          <h1 className={styles.title}>Stay Inspired</h1>
          <h3>Sign up for job alerts and never miss an opportunity.</h3>
          <button>Sign up for job alerts</button>
        </div>
      </div>
    </>
  );
}

export default JobDetailedCard;
