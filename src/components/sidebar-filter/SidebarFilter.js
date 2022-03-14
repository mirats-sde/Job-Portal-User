import React, { useContext, useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
// Location Icon
import LocationOnIcon from "@mui/icons-material/LocationOn";

import Select from "react-select";
import makeAnimated from "react-select/animated";

import styles from "./sidebarFilter.module.css";
import { Job_context } from "../../pages/job/JobContext";
import { Sidebar_Context } from "./SidebarContext";

function SidebarFilter() {
  let { jobs, allFilters, setAllFilters } = useContext(Job_context);
  let [locationOptions, setLocationOptions] = useState([]);
  let [departmentOptions, setDepartmentOptions] = useState([]);
  // console.log(jobs)
  // let location_options = []
  //    console.log(locationOptions)

  // To show the Location Dropdown options
  //   console.log(allFilters, "Allfilters is ");
  useEffect(() => {
    jobs.map((job) => {
      setLocationOptions((prear) => {
        if (prear.length === 0) {
          // console.log("Entered empty array")
          return [{ value: job?.job_location, label: job?.job_location }];
        } else {
          if (prear.some((e) => e.value === job?.job_location)) {
            /* vendors contains the element we're looking for */
            return [...prear];
          } else {
            return [
              ...prear,
              { value: job?.job_location, label: job?.job_location },
            ];
          }
        }
      });
      setDepartmentOptions((prear) => {
        if (prear.includes(job?.department)) {
          /* vendors contains the element we're looking for */
          return [...prear];
        } else {
          return [...prear, job?.department];
        }
      });
    });
  }, [jobs]);
  // console.log(departmentOptions);
  // All Filters Object e.g. {locations:['mumbai','lucknow'],degree:['bachelors','masters']}
  // let [allFilters, setAllFilters] = useState({})

  function HandleLocation(e) {
    setAllFilters((preob) => {
      return { ...preob, job_location: e };
    });
  }
  function HandleJobTitleSearch(e) {
    setAllFilters((preob) => {
      return { ...preob, job_title: e.target.value };
    });
  }
  function HandleSkillQualification(e) {
    setAllFilters((preob) => {
      return { ...preob, skills_required: e.target.value };
    });
  }
  function HandleDepartment(e) {
    setAllFilters((preob) => {
      let deg = preob?.department;
      if (deg !== undefined) {
        if (e.target.checked) {
          return { ...preob, department: [...deg, e.target.value] };
        } else {
          return {
            ...preob,
            department: deg.filter((deg) => !deg.includes(e.target.value)),
          };
        }
      } else {
        return { ...preob, department: [e.target.value] };
      }
    });
  }
  function HandleJobTypes(e) {
    setAllFilters((preob) => {
      let jt = preob?.employeement_type;
      if (jt !== undefined) {
        if (e.target.checked) {
          return { ...preob, employeement_type: [...jt, e.target.value] };
        } else {
          return {
            ...preob,
            employeement_type: jt.filter((jt) => !jt.includes(e.target.value)),
          };
        }
      } else {
        return { ...preob, employeement_type: [e.target.value] };
      }
    });
  }

  // Organization is nothing but a company name
  function HandleOrganizations(e) {
    setAllFilters((preob) => {
      let org = preob?.company_name;
      if (org !== undefined) {
        if (e.target.checked) {
          return { ...preob, company_name: [...org, e.target.value] };
        } else {
          return {
            ...preob,
            company_name: org.filter((org) => !org.includes(e.target.value)),
          };
        }
      } else {
        return { ...preob, company_name: [e.target.value] };
      }
    });
  }

  const animatedComponents = makeAnimated();
  return (
    <>
      <div className={styles.sidebar_container}>
        <div className={styles.sidebar_title_container}>
          <h2>What do you want to do</h2>
          <button
            className={styles.clear_filter_btn}
            onClick={() => window.location.reload(false)}
          >
            Clear Filters
          </button>
        </div>
        <div className={styles.sidebar_search}>
          <input
            type="text"
            placeholder="Software engineering, Design, Sales"
            className={styles.searchinput}
            onChange={HandleJobTitleSearch}
          />
        </div>
        <div className={styles.accordion_container}>
          {/* Location Accordion  */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Locations</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  // defaultValue={[colourOptions[4], colourOptions[5]]}
                  isMulti
                  options={locationOptions}
                  placeholder="Mumbai, Chennai, Kolkata"
                  onChange={HandleLocation}
                />
                {/* <input type="text" placeholder={`Mumbai, Chennai, Kolkata`} className={styles.searchinput} /> */}
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* Skill and Qualifications Accordion  */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Skills & Qualifications</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <input
                  type="text"
                  className={styles.searchinput}
                  placeholder="Computer Programming, Finance"
                  onChange={HandleSkillQualification}
                />
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* Degree Accordion  */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Department</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div className={styles.checkbox_container}>
                  <div className={styles.formgroup_checkbox}>
                    {departmentOptions.map((department) => {
                      return (
                        <div>
                          <input
                            type="checkbox"
                            value={department}
                            id={`department${department}`}
                            onChange={(e) => {
                              // console.log(e.target.checked)
                              HandleDepartment(e);
                            }}
                            checked={
                              Object.keys(allFilters).length !== 0 &&
                              allFilters?.department != undefined
                                ? allFilters?.department.includes(department)
                                : false
                            }
                          />
                          <label htmlFor={`department${department}`}>
                            {department}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* Job Types */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Job Types</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div className={styles.checkbox_container}>
                  <div className={styles.formgroup_checkbox}>
                    <div>
                      <input
                        type="checkbox"
                        value="full_time"
                        id="fulltime"
                        checked={
                          Object.keys(allFilters).length !== 0 &&
                          allFilters?.employeement_type != undefined
                            ? allFilters?.employeement_type.includes(
                                "full_time"
                              )
                            : false
                        }
                        onChange={(e) => {
                          HandleJobTypes(e);
                        }}
                      />
                      <label htmlFor="fulltime">Full time</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        value="part_time"
                        id="parttime"
                        checked={
                          Object.keys(allFilters).length !== 0 &&
                          allFilters?.employeement_type != undefined
                            ? allFilters?.employeement_type.includes(
                                "part_time"
                              )
                            : false
                        }
                        onChange={(e) => {
                          HandleJobTypes(e);
                        }}
                      />
                      <label htmlFor="parttime">Part Time</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        value="temporary"
                        id="temporary"
                        checked={
                          Object.keys(allFilters).length !== 0 &&
                          allFilters?.employeement_type != undefined
                            ? allFilters?.employeement_type.includes(
                                "temporary"
                              )
                            : false
                        }
                        onChange={(e) => {
                          HandleJobTypes(e);
                        }}
                      />
                      <label htmlFor="temporary">Temporary</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        value="internship"
                        id="internship"
                        checked={
                          Object.keys(allFilters).length !== 0 &&
                          allFilters?.employeement_type != undefined
                            ? allFilters?.employeement_type.includes(
                                "internship"
                              )
                            : false
                        }
                        onChange={(e) => {
                          HandleJobTypes(e);
                        }}
                      />
                      <label htmlFor="internship">Internship</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        value="contract"
                        id="contract"
                        checked={
                          Object.keys(allFilters).length !== 0 &&
                          allFilters?.employeement_type != undefined
                            ? allFilters?.employeement_type.includes("contract")
                            : false
                        }
                        onChange={(e) => {
                          HandleJobTypes(e);
                        }}
                      />
                      <label htmlFor="contract">Contract</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        value="volunteer"
                        id="volunteer"
                        checked={
                          Object.keys(allFilters).length !== 0 &&
                          allFilters?.employeement_type != undefined
                            ? allFilters?.employeement_type.includes(
                                "volunteer"
                              )
                            : false
                        }
                        onChange={(e) => {
                          HandleJobTypes(e);
                        }}
                      />
                      <label htmlFor="volunteer">Volunteer</label>
                    </div>
                  </div>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* Organizations */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Organizations</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div className={styles.checkbox_container}>
                  <div className={styles.formgroup_checkbox}>
                    <div>
                      <input
                        type="checkbox"
                        value="mirats insights"
                        id="mirats_insights"
                        onChange={(e) => HandleOrganizations(e)}
                      />
                      <label htmlFor="mirats_insights">Mirats Insights</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        value="mirats quanto"
                        id="mirats_quanto"
                        onChange={(e) => HandleOrganizations(e)}
                      />
                      <label htmlFor="mirats_quanto">Mirats Quanto</label>
                    </div>
                  </div>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </>
  );
}

export default SidebarFilter;
