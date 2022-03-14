import React, { useState, useContext } from "react";
import styles from "./login.module.css";
import { useParams } from "react-router-dom";
import logo from "../../assets/images/logo-white.png";
import { Link } from "react-router-dom";
import { Input } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import { Lan } from "@mui/icons-material";
import InputLabel from "@mui/material/InputLabel";
import { AuthenticationContext } from "../../authentication/AuthenticationContext";
import LoadingScreen from "../loading/LoadingScreen";
// import Skip32 from 'skip32'
// import Hashids from 'hashids'
// import cipher from '../../encryption/Encryption'
function LoginPage() {
  let {
    Login,
    emailerror,
    passworderror,
    ClearErrors,
    user,
    loadingScreen,
    setLoadingScreen,
  } = useContext(AuthenticationContext);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [showpassword, setShowPassword] = useState(false);

  console.log(loadingScreen);

  const handleClickShowPassword = () => {
    setShowPassword(!showpassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  console.log(email);

  return (
    <>
    {loadingScreen &&<LoadingScreen/>}
      <div className={styles.container}>
        <div className={styles.label_container}>
          <div className={styles.image_container}>
            <img src={logo} className={styles.logoimage} />
          </div>
          <div className={styles.label}>
            <p className={styles.question}>Login to Mirats Insights ID.</p>
          </div>
          <div className={styles.go_back_container}>
            <Link to="/jobs">Go to Home Page</Link>
          </div>
        </div>

        {/* RIght Input container  */}
        <div className={styles.input_container}>
          <form className={styles.form_container}>
            <div className={styles.formdiv}>
              <div className={styles.input}>
                <input
                  type="email"
                  required
                  placeholder="Email"
                  className={styles.inp}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                />
                <small className={styles.errormsg}>{emailerror}</small>
              </div>

              <FormControl
                sx={{
                  width: "100%",
                }}
                variant="standard"
                fullWidth
              >
                <Input
                  sx={{
                    fontSize: "30px",
                    borderBottom: "3px solid gray",
                    // width:"100%",
                    color: "gray",
                    // width:'auto',
                  }}
                  placeholder="Password"
                  id="standard-adornment-password"
                  disableUnderline="true"
                  type={showpassword ? "text" : "password"}
                  value={password}
                  // placeholder='Password'
                  onChange={(e) => {
                    setPassword(e.target.value);
                    ClearErrors();
                  }}
                  endAdornment={
                    <InputAdornment
                      position="end"
                      sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        // onMouseDown={handleMouseDownPassword}
                      >
                        {!showpassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              <small className={styles.errormsg}>{passworderror}</small>

              {/* <div className={styles.input_checkbox}>
                <input type="checkbox" name="remeber" id="remember" />
                <label htmlFor="remember"> Remember Me.</label>
              </div> */}
              <div className={styles.dont_container}>
                <p>Don't have an account?</p>
                <Link to="/register/email">Create one.</Link>
              </div>
            </div>
            <div className={styles.nextBtn_container}>
              <button
                type="button"
                className={styles.btn}
                onClick={(e) => {
                  Login(email, password);
                  e.preventDefault();
                }}
              >
                {" "}
                Login{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
