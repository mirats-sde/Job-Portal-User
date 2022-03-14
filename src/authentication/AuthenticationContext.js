import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  // sendEmailVerification
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../FirebaseInit";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import db from "../FirebaseInit";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getUserDetails } from "../utils/firebase-queries";
const AuthenticationContext = createContext();
function AuthenticationProvider({ children }) {
  let [savedJobs, setSavedJobs] = useState([]);
  let [emailerror, setEmailerror] = useState("");
  let [passworderror, setPassworderror] = useState("");
  let [mobileerror, setMobileError] = useState("");
  // Keep the session of user
  const [user, loading, error] = useAuthState(auth);
  let [userdata, setUserData] = useState({});
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  let [snackbar, set_snackbar] = useState({}); //show:true,severity:error,msg=this is snackbar
  let navigate = useNavigate();
  // console.log(user);

  let [loadingScreen, setLoadingScreen] = useState(false);
  let [resendemail, setResendEmail] = useState(false);

  useEffect(() => {
    if (user) {
      getUserDetails(user?.uid).then((data) => {
        setUserData(data.data());
      });
      // setUserData(getUserDetails(user?.uid));
    }
  }, [user]);

  function ClearErrors() {
    setEmailerror("");
    setPassworderror("");
    setMobileError("");
  }
  // HandleSnackbar  close
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
    set_snackbar({});
  };
  // Register functionality over here
  // async function Register(email, mobile, password) {
  async function Register({ email, firstname, lastname, country, password }) {
    ClearErrors();
    console.log("Register function is called");
    try {
      // if (mobile.length < 15 && mobile.length >= 10) {
      const newuser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(
        doc(db, "Mirats_Job_Portal", "All_Users", "Users", newuser.user.uid),
        {
          email: newuser.user.email,
          // mobile: mobile,
          firstname: firstname,
          lastname: lastname,
          country: country,
          saved_jobs: [],
          applied_jobs: [],
          academic_details: [{}],
          languages_known: [{ language: "", skills: [] }],
          achievements: [{ achievement_name: "", achievement_file_url: "" }],
        }
      );
      setResendEmail(false);

      navigate("/register/verifyemailaddress");

      console.log("The snackbar is ", snackbar);
    } catch (er) {
      console.log(er.message, er.code);
      setOpenSnackBar(true);
      switch (er.code) {
        case "auth/email-already-in-use":
        case "auth/invalid-email":
          setEmailerror(er.code.split("/")[1]); //It's giving auth/invalid-email so we split by / and it returned just invalid-email
          set_snackbar({
            show: true,
            msg: er.code.split("/")[1],
            severity: "error",
          });
          break;
        case "auth/weak-password":
          setPassworderror(er.code.split("/")[1]);
          set_snackbar({
            show: true,
            msg: er.code.split("/")[1],
            severity: "error",
          });
          break;
        case "auth/internal-error":
          set_snackbar({
            show: true,
            msg: "Fields are missing",
            severity: "error",
          });
          setPassworderror("Fields are missing");
      }
    }
  }
  // Login functionality over here
  async function Login(email, password) {
    ClearErrors();
    console.log("Entered login function");
    try {
      const loggedUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoadingScreen(true); //Loading Screen

      const u = await getDoc(
        doc(
          db,
          "Mirats_Job_Portal",
          "All_Users",
          "Users",
          loggedUser?.user?.uid
        )
      );

      // console.log(u.data()?.saved_jobs);
      setSavedJobs(u.data()?.saved_jobs);
      navigate("/jobs");
      set_snackbar({
        show: true,
        msg: "You're logged in",
        severity: "success",
      });
      setLoadingScreen(false); //Setting loading screen to false after successfull login
    } catch (er) {
      console.log(er.message);
      switch (er.code) {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
          setEmailerror(er.code.split("/")[1]);
          break;
        case "auth/wrong-password":
          setPassworderror(er.code.split("/")[1]);
          break;
        case "auth/internal-error":
          setPassworderror("Fields are missing *");
      }
    }
  }
  // Logout User
  async function LogoutUser() {
    await signOut(auth);
    set_snackbar({ show: true, msg: "You're logged out", severity: "error" });
  }

  return (
    <AuthenticationContext.Provider
      value={{
        Register,
        Login,
        LogoutUser,
        user,
        emailerror,
        passworderror,
        mobileerror,
        ClearErrors,
        snackbar,
        set_snackbar,
        openSnackBar,
        setOpenSnackBar,
        savedJobs,
        loadingScreen,
        setLoadingScreen,
        auth,
        handleSnackbarClose,
        resendemail,
        setResendEmail,
        setUserData,
        userdata,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export default AuthenticationProvider;
export { AuthenticationContext };
