import React, { useState, useContext, useEffect } from 'react'
import { AuthenticationContext } from '../../authentication/AuthenticationContext'
import styles from './employeedetails.module.css'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Stack } from '@mui/material';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Autocomplete from '@mui/material/Autocomplete';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { EmployeeDetails_Context } from './EmployeeDetailsContext';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import classNames from 'classnames'
import { Link } from 'react-router-dom';


function EmployeeDetails() {

  let { progressbar, UploadFiles, uploadedDocuments, loader, msgLog, isPreviousResume } = useContext(EmployeeDetails_Context)

  let { user } = useContext(AuthenticationContext)

  console.log(progressbar)

  // Higher studies 
  const higher_studies = [
    { title: 'Associate' },
    { title: 'Bachelors' },
    { title: 'Masters', },
    { title: 'Pursuind Degree', },
    { title: 'Engineering', },
    { title: 'Phd', },
  ]
  // Gender 
  let [gender, setGender] = useState();
  let [address, setAddress] = useState({});

  let [resumefile, setResumeFile] = useState()
  // console.log(address)
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const HandleSave = () => {
    console.log("saving")
    UploadFiles(resumefile)
  }


  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1>Fill Details</h1>
      </div>

      {/* Main components over here  */}
      <div className={styles.main_container}>
        {/* First name Last name  */}
        <div className={styles.main_inner_container}>
          <div className={styles.inputbox}>

            <TextField id="outlined-basic" label="First Name" variant="outlined" />
          </div>
          <div className={styles.inputbox}>
            <TextField id="outlined-basic" label="Last Name" variant="outlined" />
          </div>
        </div>


        {/* Gender  */}
        <div className={classNames(styles.inner_container, styles.gender_container)}>
          {/* <FormControl fullWidth> */}
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={gender}
              label="Gender"
              onChange={handleGenderChange}
            >
              <MenuItem value='male'>Male</MenuItem>
              <MenuItem value='female'>Female</MenuItem>
              <MenuItem value='other'>Other</MenuItem>
            </Select>
          </FormControl>
          {/* </FormControl> */}
        </div>

        {/* Higher Qualification  */}
        <div className={classNames(styles.inner_container, styles.higher_qualification)}>
          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={higher_studies.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Your Higher Studies"
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
              />
            )}
          />
        </div>
        {/* Birthdate container  */}
        <div className={classNames(styles.inner_container, styles.birthdatecontainer)}>
          <TextField
            id="date"
            label="Birthday"
            type="date"
            defaultValue="2017-05-24"
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        {/* Experience  */}
        <div className={classNames(styles.inner_container, styles.experience)}>
          <div className={styles.experience_title}><label style={{ fontSize: "19px", width: "14px" }}>Years of Experience</label></div>
          <div className={styles.input_cont}>
            <div>
              <TextField
                required
                id="outlined-required"
                label="Month"
                type="number"
              />
            </div>
            <div>
              <TextField
                required
                id="outlined-required"
                label="Year"
                type="number"
              />
            </div>
          </div>
        </div>
        <hr style={{ marginBottom: "20px" }} />
        {/* Address  */}
        <div className={classNames(styles.inner_container, styles.address_container)}>
          <div>
            <TextField
              id="outlined-multiline-flexible"
              label="City"
              value={address?.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
            />


            <TextField
              id="outlined-multiline-flexible"
              label="State"
              value={address?.state}
              onChange={(e) => setAddress({ ...address, state: e.target.value })}
            />


            <TextField
              id="outlined-multiline-flexible"
              label="Pincode"
              type="number"
              value={address?.pincode}
              onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
            />
          </div>
          <div>
            <FormControl fullWidth>
              <TextField
                id="outlined-multiline-flexible"
                label="Address"
                multiline
                maxRows={4}
                value={address?.address}
                onChange={(e) => setAddress({ ...address, address: e.target.value })}
              />
            </FormControl>
          </div>
        </div >

        <div className={classNames(styles.inner_container, styles.resume_container)}>

          {
            isPreviousResume ?
              <label>Update Resume</label>
              :
              <label>Upload Resume</label>

          }

          <input type="file" multiple className={styles.choose} onChange={(e) => {
            console.log(e.target.files[0])
            setResumeFile(e.target.files[0])
          }} />
          {
            progressbar !== 0 &&
            <LinearProgress variant="determinate" value={progressbar} />

          }
          {/* If Uploaded Documents then show this */}
          {uploadedDocuments.length !== 0 &&
            <div style={{ marginTop: "40px" }}>
              <p style={{ marginBottom: "10px", fontSize: "18px" }}>Your Resume</p>
              {loader && <CircularProgress />}
              {/* <Link to="/abc" target="_blank" download>Abc</Link> */}
              {
                uploadedDocuments.map((documents) => {
                  // console.log(documents?.file_name);
                  return <div key={documents?.file_url}>
                    <a href={`${documents?.file_url}`} target="_blank">{documents?.file_name}</a>
                    <br /><br />
                  </div>
                })
              }
            </div>
          }
        </div>
        {/* Message Logs */}
        {msgLog && <div>
          <p style={{ color: msgLog?.success ? "green" : "red" }}>{msgLog.msg}</p>
        </div>}

        <div className={classNames(styles.inner_container, styles.save_btn_container)}>
          <button className={styles.savebtn} onClick={HandleSave}>Save</button>
        </div>




      </div>
    </div>
  )
}

export default EmployeeDetails