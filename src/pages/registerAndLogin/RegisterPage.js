import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./register.module.css";
import logo from "../../assets/images/logo-white.png";
import { Link } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import classNames from "classnames";
import { AuthenticationContext } from "../../authentication/AuthenticationContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ClassNames } from "@emotion/react";
import { Alert, Autocomplete, Snackbar, TextField, Box } from "@mui/material";
import { useSendEmailVerification } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import countries from "../../utils/Countries";

import { Job_context } from "../job/JobContext";

// import { Box } from "@mui/system";
function RegisterPage() {
  const [errors, setErrors] = useState({
    email: "",
    firstname: "",
    lastname: "",
    country: "",
    password: "",
  });

  function nextNavigate(valueName, nextPage) {
    registerValues?.[valueName] && navigate(`/register/${nextPage}`);
  }

  function errorFunc(valueName) {
    !registerValues?.[valueName] &&
      setErrors({ ...errors, [valueName]: `Please Enter Your ${valueName}` });
  }

  let navigate = useNavigate();
  let {
    Register,
    passworderror,
    emailerror,
    ClearErrors,
    mobileerror,
    auth,
    user,
    set_snackbar,
    snackbar,
    setOpenSnackBar,
    openSnackBar,
    handleSnackbarClose,
    resendemail,
    setResendEmail,
  } = useContext(AuthenticationContext);

  let { Alert } = useContext(Job_context);
  console.log(user);
  let [registerValues, setRegisterValues] = useState({
    email: "",
    firstname: "",
    lastname: "",
    country: null,
    password: "",
  });
  console.log(registerValues?.country);
  // Password
  const [showPassword, setShowPassword] = React.useState(false);

  const defaultProps = {
    options: countries,
    getOptionLabel: (option) => option.label,
  };

  const [sendEmailVerification, sending, error] =
    useSendEmailVerification(auth);
  // Handle Values
  const handleChange = (key, event) => {
    // console.log(key,"==>",event.target.value)
    setRegisterValues({ ...registerValues, [key]: event.target.value });
  };
  console.log(registerValues);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  let { registertype } = useParams();

  // Useeffect for email verification (Checking email verified with time interval)
  useEffect(() => {
    let interval;
    if (resendemail) {
      interval = setInterval(() => {
        console.log("Page is refreshing..........");
        console.log("Inside localstorage condition page is refreshing");
        user
          ?.reload()
          .then(() => {
            if (user?.emailVerified) {
              console.log("Email verified successfully");
              setOpenSnackBar(true);
              set_snackbar({
                show: true,
                severity: "success",
                msg: "You're verified successfully",
              });
              clearInterval(interval);

              localStorage.removeItem("EmailSent");
              navigate("/jobs");
            }
          })
          .catch((err) => {
            clearInterval(interval);

            setOpenSnackBar(true);
            set_snackbar({
              show: true,
              severity: "success",
              msg: err.message,
            });
          });
      }, 3000);
    } else {
      clearInterval(interval);
    }
  }, [resendemail]);

  // Pages here
  const Email_addressPage = (
    <div className={styles.container}>
      <div className={styles.label_container}>
        <div className={styles.image_container}>
          <img src={logo} className={styles.logoimage} />
        </div>
        <div className={styles.label}>
          <p className={styles.question}>What's your e-mail address?</p>
          <p className={styles.required}>REQUIRED</p>
        </div>
        <div className={styles.go_back_container}>
          <Link to="/jobs">Back</Link>
        </div>
      </div>

      <div className={styles.input_container}>
        <form className={styles.form_container}>
          <div className={styles.input}>
            <input
              type="email"
              required
              placeholder="eg: john.doe@company.com"
              className={styles.inp}
              onChange={(e) => {
                handleChange("email", e);
                setErrors({ ...errors, email: "" });
              }}
              value={registerValues?.email}
              onBlur={() => errorFunc("email")}
            />
            <span>{errors.email}</span>
          </div>
          <div className={styles.nextBtn_container}>
            <button
              onClick={() => nextNavigate("email", "firstname")}
              className={styles.btn}
            >
              {" "}
              Next{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  const FirstNamePage = (
    <div className={styles.container}>
      <div className={styles.label_container}>
        <div className={styles.image_container}>
          <img src={logo} className={styles.logoimage} />
        </div>
        <div className={styles.label}>
          <p className={styles.question}>What's your first name?</p>
          <p className={styles.required}>REQUIRED</p>
        </div>
        <div className={styles.go_back_container}>
          <Link to="/register/email">Back</Link>
        </div>
      </div>
      <div className={styles.input_container}>
        <form className={styles.form_container}>
          <div className={styles.input}>
            <input
              type="text"
              required
              onBlur={() => errorFunc("firstname")}
              placeholder="eg: John"
              className={styles.inp}
              onChange={(e) => {
                handleChange("firstname", e);
                setErrors({ ...errors, firstname: "" });
              }}
              value={registerValues?.firstname}
            />
            <span>{errors.firstname}</span>
          </div>
          <div className={styles.nextBtn_container}>
            <button
              onClick={() => nextNavigate("firstname", "lastname")}
              className={styles.btn}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  const LastNamePage = (
    <div className={styles.container}>
      <div className={styles.label_container}>
        <div className={styles.image_container}>
          <img src={logo} className={styles.logoimage} />
        </div>
        <div className={styles.label}>
          <p className={styles.question}>What's your last name?</p>
          <p className={styles.required}>REQUIRED</p>
        </div>
        <div className={styles.go_back_container}>
          <Link to="/register/firstname">Back</Link>
        </div>
      </div>
      <div className={styles.input_container}>
        <form className={styles.form_container}>
          <div className={styles.input}>
            <input
              type="text"
              required
              onBlur={() => errorFunc("lastname")}
              placeholder="eg: Doe"
              className={styles.inp}
              onChange={(e) => {
                handleChange("lastname", e);
                setErrors({ ...errors, lastname: "" });
              }}
              value={registerValues?.lastname}
            />
            <span>{errors.lastname}</span>
          </div>
          <div className={styles.nextBtn_container}>
            <button
              onClick={() => nextNavigate("lastname", "country")}
              className={styles.btn}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  const CountryResidencyPage = (
    <div className={styles.container}>
      <div className={styles.label_container}>
        <div className={styles.image_container}>
          <img src={logo} className={styles.logoimage} />
        </div>
        <div className={styles.label}>
          <p className={styles.question}>Country or region of residence.</p>
          <p className={styles.required}>REQUIRED</p>
        </div>
        <div className={styles.go_back_container}>
          <Link to="/register/lastname">Back</Link>
        </div>
      </div>
      <div className={styles.input_container}>
        <form className={styles.form_container}>
          <div className={styles.input}>
            <Autocomplete
              fullWidth
              onBlur={() => errorFunc("country")}
              {...defaultProps}
              size={"big"}
              id="clear-on-escape"
              clearOnEscape
              value={registerValues?.country}
              onChange={(e, value) => {
                setRegisterValues({ ...registerValues, country: value });
                setErrors({ ...errors, country: "" });
              }}
              renderInput={(params) => (
                <TextField
                  required
                  sx={{
                    borderBottom: "3px solid gray",
                    fontSize: "30px",
                  }}
                  {...params}
                  label="Select Country"
                  variant="standard"
                  InputProps={{
                    ...params.InputProps,
                    style: { fontSize: 30, color: "gray" },
                  }}
                  InputLabelProps={{
                    ...params.InputLabelProps,
                    style: { fontSize: 25 },
                  }}
                />
              )}
            />
            <span>{errors.country}</span>
          </div>
          <div className={styles.nextBtn_container}>
            <button
              onClick={() => nextNavigate("country", "setuppassword")}
              className={styles.btn}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  const PasswordPage = (
    <div className={styles.container}>
      <div className={styles.label_container}>
        <div className={styles.image_container}>
          <img src={logo} className={styles.logoimage} />
        </div>
        <div className={styles.label}>
          <p className={styles.question}>Create a password for your account.</p>
          <p className={styles.required}>REQUIRED</p>
        </div>
        <div className={styles.go_back_container}>
          <Link to="/register/country">Back</Link>
        </div>
      </div>
      <div className={styles.input_container}>
        <form className={styles.form_container}>
          <div className={styles.input}>
            {/* Password */}
            <FormControl
              sx={{
                width: "100%",
              }}
              variant="standard"
            >
              <Input
                onBlur={() => errorFunc("password")}
                sx={{
                  fontSize: "30px",
                  borderBottom: "3px solid gray",

                  color: "gray",
                }}
                required
                placeholder="Password"
                id="standard-adornment-password"
                disableUnderline="true"
                type={showPassword ? "text" : "password"}
                onChange={(e) => {
                  handleChange("password", e);
                  setErrors({ ...errors, password: "" });
                }}
                value={registerValues?.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      sx={{}}
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      // onMouseDown={handleMouseDownPassword}
                    >
                      {!showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <span>{errors.password}</span>
          </div>
          <div className={styles.nextBtn_container}>
            {/* <Link to="/register/verifyemailaddress"> */}
            <button
              className={styles.btn}
              onClick={(e) => {
                e.preventDefault();
                Register(registerValues);
              }}
            >
              Register
            </button>
            {/* </Link> */}
          </div>
        </form>
      </div>
    </div>
  );

  const VerifyEmailAddressPage = (
    <>
      <div className={styles.container}>
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

        <div className={styles.label_container}>
          <div className={styles.image_container}>
            <img src={logo} className={styles.logoimage} />
          </div>
          <div className={styles.label}>
            <p className={styles.question}>Verify your email address ;)</p>
            <p className={styles.required}>VERIFY*</p>
          </div>
          <div className={styles.go_back_container}>
            {/* <Link to="/register/setuppassword">Back</Link> */}
          </div>
        </div>
        <div className={styles.input_container}>
          <form className={styles.form_container}>
            {
              // If email is verified then show Verification Done
              user?.emailVerified ? (
                <>
                  <div className={styles.input}>
                    <p style={{ color: "green" }} className={styles.text}>
                      Your Email Verification is Done
                    </p>
                    <Link to="/jobs">
                      <button className={styles.hollow_button}>
                        View Jobs
                      </button>
                    </Link>
                  </div>
                </>
              ) : (
                // If Email verification is not done then show the verify buttons
                <div className={styles.input}>
                  <p className={styles.text}>
                    Please Verify your email{" "}
                    {registerValues.email.split("@")[0]}
                  </p>
                  <div className={styles.verify_btns}>
                    {/* Send email verification button  */}
                    {
                      <button
                        className={classNames(styles.button)}
                        onClick={(e) => {
                          e.preventDefault();
                          sendEmailVerification()
                            .then(() => {
                              setResendEmail(true);
                              set_snackbar({
                                show: true,
                                severity: "success",
                                msg: "Verification Email sent successfully",
                              });
                              setOpenSnackBar(true);
                            })
                            .catch((er) => {
                              set_snackbar({
                                show: true,
                                severity: "error",
                                msg: er.message,
                              });
                              setOpenSnackBar(true);
                            });
                        }}
                      >
                        {resendemail ? "Resend Email" : "Send Email"}
                      </button>
                    }
                    {/* Resend Email button  */}
                    {/* <button className={classNames(styles.hollow_button)} onClick={()=>{
                      navigate('/jobs')
                    }} >Verify Later</button> */}
                    {/* View Jobs  */}
                    {resendemail && (
                      <Link to="/jobs">
                        <button className={styles.hollow_button}>
                          View Jobs
                        </button>
                      </Link>
                    )}
                  </div>
                  <div className={styles.change_emailaddress_container}>
                    <Link
                      to="/register/email"
                      className={classNames(styles.change_email)}
                    >
                      Change Email Address
                    </Link>
                  </div>
                </div>
              )
            }
          </form>
        </div>
      </div>
    </>
  );

  return (
    <>
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
      {(() => {
        switch (registertype) {
          case "email":
            return Email_addressPage;
          case "firstname":
            return FirstNamePage;
          case "lastname":
            return LastNamePage;
          case "country":
            return CountryResidencyPage;
          case "setuppassword":
            return PasswordPage;
          case "verifyemailaddress":
            return VerifyEmailAddressPage;
          default:
        }
      })()}
    </>
  );
}

export default RegisterPage;
