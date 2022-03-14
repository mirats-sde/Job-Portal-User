import styles from "./UserProfile.module.css";
import { MdOutlineModeEditOutline } from "react-icons/md";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useContext, useEffect, useState } from "react";
import emp from "../../assets/images/emp.png";
import { EmployeeDetails_Context } from "../employeeDetails/EmployeeDetailsContext";
import { AuthenticationContext } from "../../authentication/AuthenticationContext";
import { getUserDetails } from "../../utils/firebase-queries";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../loading/LoadingScreen";
const UserProfile = () => {
  let navigate = useNavigate();

  const [expanded, setExpanded] = useState("panel1");
  let [resumefile, setResumeFile] = useState();
  let {
    progressbar,
    UploadFiles,
    uploadedDocuments,
    loader,
    msgLog,
    isPreviousResume,
  } = useContext(EmployeeDetails_Context);
  let {
    user,
    userData,
    userdata,
    setOpenSnackBar,
    set_snackbar,
    setLoadingScreen,
    loadingScreen,
  } = useContext(AuthenticationContext);
  console.log(userdata);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : true);
  };

  useEffect(() => {
    setLoadingScreen(true);
    if (!user) {
      navigate("/jobs");
      set_snackbar({
        show: true,
        severity: "error",
        msg: "You have to login to view User Profile",
      });
      setOpenSnackBar(true);
    }
    setLoadingScreen(false);
  }, []);

  return (
    <>
      {loadingScreen && <LoadingScreen />}
      <div className={styles.userProfileContainer}>
        <div className={styles.userProfileIntro}>
          <h1>Users Profile</h1>
          <h3>Key step to understand your expectations</h3>
        </div>

        <div className={styles.userProfile}>
          {/* left side user profile info */}
          <div className={styles.userProfileInfo}>
            <div className={styles.edit}>
              <span>
                <MdOutlineModeEditOutline size={20} color="#7B61FF" /> Edit
              </span>
            </div>
            <div className={styles.profilePicWithText}>
              <figure>
                <img src={emp} alt="profile" />
              </figure>
              <h2>{userdata?.firstname}</h2>
              {/* <h4>Entrepreneur</h4> */}
              <h4>{userdata?.lastname}</h4>
              <p>
                Lörem ipsum gunnar Danielsson anare. Lars Mattsson såtin, pren.
                Nist reakåska. Polysk ejåkärad dånyvis fer, Ulla Bengtsson pohet
                ber tist. Julia Berg tyd. Sare tise gigavössade eledes, Rune
                Sundström inklusive onade Mona Holmgren, i yhet i din Victoria
                Gustafsson
              </p>
            </div>
            <div className={styles.personalInfo}>
              <div className={styles.info}>
                <span className={styles.light}>DOB</span>
                <span className={styles.bold}>12 June 2000</span>
              </div>

              <div className={styles.info}>
                <span className={styles.light}>Phone Number</span>
                <span className={styles.bold}>+{userdata?.phone_number}</span>
              </div>

              <div className={styles.info}>
                <span className={styles.light}>Email-Id</span>
                <span className={styles.bold}>{userdata?.email}</span>
              </div>

              <div className={styles.info}>
                <span className={styles.light}>Gender</span>
                <span className={styles.bold}>{userdata?.gender}</span>
              </div>

              <div className={styles.info}>
                <span className={styles.light}>Linked In -Id</span>
                <span className={styles.bold}>
                  <a href="link">johndoe/linked.in</a>
                </span>
              </div>
            </div>
          </div>

          {/* right side user data */}
          <div className={styles.userData}>
            <div className={styles.userDataAccordion}>
              <div>
                <div className={styles.accordionDetails}>
                  <Accordion
                    expanded={expanded === "panel1"}
                    onChange={handleChange("panel1")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>
                        <span className={styles.iconedit}>
                          Residential Details
                          <span className={styles.editDetails}>
                            <MdOutlineModeEditOutline
                              size={20}
                              color="#7B61FF"
                            />
                            Edit
                          </span>
                        </span>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <div className={styles.address}>
                          <section className={styles.permanent}>
                            <h3>Permanent Address</h3>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua.
                            </p>
                            <div className={styles.city}>
                              <div className={styles.addressData}>
                                <span>City</span>
                                <span className={styles.light}>
                                  {userdata?.address?.permanentAddress?.city}
                                </span>
                              </div>
                              <div className={styles.addressData}>
                                <span>State</span>
                                <span className={styles.light}>
                                  {userdata?.address?.permanentAddress?.state}
                                </span>
                              </div>
                              <div className={styles.addressData}>
                                <span>Pincode</span>
                                <span className={styles.light}>
                                  {userdata?.address?.permanentAddress?.pincode}
                                </span>
                              </div>
                              <div className={styles.addressData}>
                                <span>Country</span>
                                <span className={styles.light}>
                                  {userdata?.address?.permanentAddress?.country}
                                </span>
                              </div>
                            </div>
                          </section>

                          {/* Current address  */}
                          <section className={styles.current}>
                            <h3>Current Address</h3>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua.
                            </p>
                            <div className={styles.city}>
                              <div className={styles.addressData}>
                                <span>City</span>
                                <span className={styles.light}>Mumbai</span>
                              </div>
                              <div className={styles.addressData}>
                                <span>State</span>
                                <span className={styles.light}>
                                  Maharashtra
                                </span>
                              </div>
                              <div className={styles.addressData}>
                                <span>Pincode</span>
                                <span className={styles.light}>0001101</span>
                              </div>
                              <div className={styles.addressData}>
                                <span>Country</span>
                                <span className={styles.light}>India</span>
                              </div>
                            </div>
                          </section>
                        </div>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>

                <div className={styles.accordionDetails}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography>
                        <span className={styles.iconedit}>
                          Academic Details
                          <span className={styles.editDetails}>
                            <MdOutlineModeEditOutline
                              size={20}
                              color="#7B61FF"
                            />{" "}
                            Edit
                          </span>
                        </span>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <section className={styles.academic}>
                          <div className={styles.academicDetails}>
                            <span className={styles.bold}>Institution</span>
                            <span className={styles.light}>
                              Miligt derade. Viren vanehån. Falogi. Tynera degt.
                              Nyjoligt duk.
                            </span>
                          </div>
                          <div className={styles.academicDetails}>
                            <span className={styles.bold}>Degree</span>
                            <span className={styles.light}>
                              Miligt derade. Viren vanehån. Falogi. Tynera degt.
                              Nyjoligt duk.
                            </span>
                          </div>
                          <div className={styles.academicDetails}>
                            <span className={styles.bold}>Field Of Study</span>
                            <span className={styles.light}>
                              Miligt derade. Viren vanehån. Falogi. Tynera degt.
                              Nyjoligt duk.
                            </span>
                          </div>
                          <div className={styles.academicDetails}>
                            <span className={styles.bold}>Year Of Study</span>
                            <span className={styles.light}>
                              Miligt derade. Viren vanehån. Falogi. Tynera degt.
                              Nyjoligt duk.
                            </span>
                          </div>
                          <div className={styles.academicDetails}>
                            <span className={styles.bold}>Grade</span>
                            <span className={styles.light}>
                              Miligt derade. Viren vanehån. Falogi. Tynera degt.
                              Nyjoligt duk.
                            </span>
                          </div>
                        </section>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>

                <div className={styles.accordionDetails}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel3a-content"
                      id="panel3a-header"
                    >
                      <Typography>
                        <span className={styles.iconedit}>
                          Work Experience
                          <span className={styles.editDetails}>
                            <MdOutlineModeEditOutline
                              size={20}
                              color="#7B61FF"
                            />
                            Edit
                          </span>
                        </span>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <section className={styles.workexp}>
                          <div className={styles.upload}>
                            <form action="">
                              <h3>
                                <label htmlFor="resume">
                                  Upload Resume/CV
                                  <span className={styles.required}>
                                    required
                                  </span>
                                </label>
                              </h3>
                              {/* <input type="file" /> */}
                              <div class={styles.upload_btn_wrapper}>
                                <button
                                  class={
                                    resumefile ? styles.btnfilled : styles.btn
                                  }
                                >
                                  {resumefile
                                    ? resumefile.name
                                    : "Upload Resume"}{" "}
                                </button>
                                <input
                                  type="file"
                                  name="myfile"
                                  onChange={(e) => {
                                    console.log(e.target.files[0]);
                                    setResumeFile(e.target.files[0]);
                                  }}
                                />
                              </div>
                              {/* <h3>Upload Resume/CV</h3> */}
                              {/* <div className={styles.file_upload}>
                              <label className={styles.icon} htmlFor="fileIcon">
                                <AiOutlineFileAdd
                                  color="#7B61FF"
                                  size={60}
                                  cursor="pointer"
                                />
                              </label>
                              <input type="file" id="fileIcon" hidden></input>
                            </div> */}
                            </form>
                          </div>
                          <div className={styles.skills}>
                            <h3>Skills</h3>
                            <div className={styles.skillsList}>
                              <span>lorem ipsum</span>
                              <span>lorem ipsum</span>
                              <span>lorem ipsum</span>
                              <span>lorem ipsum</span>
                              <span>lorem ipsum</span>
                              <span>lorem ipsum</span>
                            </div>
                          </div>
                          <div className={styles.company}>
                            <h3>Company</h3>
                            <h3 className={styles.light}>
                              Miligt derade. Viren vanehån. Falogi. Tynera degt.
                              Nyjoligt duk.{" "}
                            </h3>
                          </div>
                        </section>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>

                <div className={styles.accordionDetails}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel3a-content"
                      id="panel3a-header"
                    >
                      <Typography>
                        <span className={styles.iconedit}>
                          Other Details
                          <span className={styles.editDetails}>
                            <MdOutlineModeEditOutline
                              size={20}
                              color="#7B61FF"
                            />{" "}
                            Edit
                          </span>
                        </span>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <section className={styles.otherDetails}>
                          <div className={styles.languages}>
                            <h3>Languages Known</h3>
                            <p>English</p>
                            {/* <div class="container">
                            <div class="round">
                              <input type="checkbox" checked id="checkbox" />
                              <label for="checkbox"></label>
                            </div>
                          </div> */}
                            <input type="checkbox" value="speak" />
                            <label htmlFor="speak">Speak</label>

                            <input type="checkbox" />
                            <label htmlFor="read">Read</label>

                            <input type="checkbox" />
                            <label htmlFor="write">Write</label>
                          </div>
                          <div className={styles.achievements}>
                            <h3>Achievements</h3>
                            <span className={styles.light}>N/A</span>
                          </div>
                          <div className={styles.securityDetails}>
                            <h3>Security Details</h3>
                            <p>
                              Are you involved in any pending and / or closed
                              Civil / Criminal / case /proceedings/ charges
                            </p>
                            <input type="radio" />
                            <label htmlFor="yes">Yes</label>
                            <input type="radio" />
                            <label htmlFor="no">No</label>
                          </div>
                        </section>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
