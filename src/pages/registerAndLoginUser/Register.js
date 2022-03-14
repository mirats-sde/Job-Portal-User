import React, { useContext, useState, useEffect } from "react";
import styles from "./registerAndLogin.module.css";
import { AuthenticationContext } from "../../authentication/AuthenticationContext";
import classNames from "classnames";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormControl, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";


function Register() {
  let navigate = useNavigate();

  let { Register, passworderror, emailerror, ClearErrors, mobileerror } =
    useContext(AuthenticationContext);
  let [email, setEmail] = useState("");
  let [mobile, setMobile] = useState("");
  let [password, setPassword] = useState("");
  let [showpassword, setShowPassword] = useState(false);

  useEffect(() => {
    ClearErrors();
  }, [,email,mobile,password]);

  const handleClickShowPassword = () => {
    setShowPassword(!showpassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  console.log(email);

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <h1 className={styles.title}>REGISTER PAGE</h1>

        {/* Mobile Number  */}
        <TextField
          sx={{ m: 1, width: "100%" }}
          id="outlined-basic"
          label="Mobile Number"
          variant="outlined"
          onChange={(e) => setMobile(e.target.value)}
        />
        <small className={styles.errormsg}>{mobileerror}</small>

        {/* Email  */}
        <TextField
          sx={{ m: 1, width: "100%" }}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />
        <small className={styles.errormsg}>{emailerror}</small>

        {/* Password  */}
        <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showpassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showpassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <small className={styles.errormsg}>{passworderror}</small>
        <button
          className={classNames(styles.btn, styles.registerbtn)}
          onClick={() => Register(email, mobile, password)}
        >
          Register
        </button>
        {/* <button className={classNames(styles.btn,styles.loginbtn)}>Login</button> */}

        <div className={styles.already_user_container}>
          <p>
            Already a user ?{" "}
            <Link to={{ pathname: "/Login" }} className={styles.link}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
