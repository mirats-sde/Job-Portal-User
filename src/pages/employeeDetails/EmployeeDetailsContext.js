import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../authentication/AuthenticationContext";
import db, { storage } from "../../FirebaseInit";

let EmployeeDetails_Context = createContext();

function EmployeeDetailsContextProvider({ children }) {
  let navigate = useNavigate();
  let { user } = useContext(AuthenticationContext);
  // Progress Bar
  let [progressbar, setProgressBar] = useState(0);
  let [loader, setLoader] = useState(false);
  let [uploadedDocuments, setUploadedDocuments] = useState([]);
  let [isPreviousResume, setIsPreviousResume] = useState(false);
  let [msgLog, setMsgLog] = useState(); //setMsgLog({ success: false, msg: er.message })

  console.log(user);

  // Delete Previous resume
  const DeletePreviousResume = () => {
    setUploadedDocuments([]);
    const folderRef = ref(storage, `/Users/${user?.uid}/Resume`);
    listAll(folderRef).then((res) => {
      if (!res.items.length) setLoader(false);
      else {
        setLoader(true);
        console.log(res.items);
        res.items.forEach((itemRef) => {
          // All the items under listRef.

          deleteObject(itemRef)
            .then(() => {
              // File deleted successfully
              console.log("file deleted successfully", itemRef);
            })
            .catch((error) => {
              // Uh-oh, an error occurred!
            });
        });
      }
    });
  };
  //Show previous Resume files
  const ShowPreviousResume = () => {
    setUploadedDocuments([]);
    const folderRef = ref(storage, `/Users/${user?.uid}/Resume`);
    listAll(folderRef).then((res) => {
      if (!res.items.length) {
        setLoader(false);
        setIsPreviousResume(false);
      } else {
        console.log("Entered this condition");
        setIsPreviousResume(true);
        setLoader(true);
        res.items.forEach((itemRef) => {
          // All the items under listRef.
          // Display URl
          getDownloadURL(itemRef)
            .then((res) => {
              setUploadedDocuments((prevArr) => [
                ...prevArr,
                { file_name: itemRef.name, file_url: res },
              ]);
              setLoader(false);
            })
            .catch((err) => console.log(err));
        });
      }
    });
  };
  useEffect(() => {
    if (user) {
      ShowPreviousResume();
    }
  }, [user]);
//   console.log(isPreviousResume);

  const UploadFiles = (file) => {
    if (!file) return;
    //Empty file
    else {
      let filename = file.name;
      let extensionname = filename.split(".");
      // If File extension is zip then only proceed
      if (extensionname[extensionname.length - 1] === "pdf") {
        DeletePreviousResume();
        const storageref = ref(
          storage,
          `/Users/${user?.uid}/Resume/${file.name}`
        );
        const uploadTask = uploadBytesResumable(storageref, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgressBar(progress);
            // console.log(progressbar, "PRogress bar is ");
          },
          (er) => {
            setMsgLog({ success: false, msg: er.message });
            // console.log("Error while uploading resume ", er.message);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              console.log(url);
            });
            // CheckAndDelete()
            ShowPreviousResume();
            setMsgLog({
              success: true,
              msg: "Your data is saved....Redirecting to Jobs",
            });
            setTimeout(() => {
              navigate("/jobs");
            }, parseInt(progressbar) + 2000);
          }
        );
      } else {
        console.log("Please upload resume in pdf format");
        setMsgLog({
          success: false,
          msg: "Please upload your Resume in PDF format",
        });
      }
    }
    // else{

    // }
  };

  return (
    <EmployeeDetails_Context.Provider
      value={{
        progressbar,
        UploadFiles,
        uploadedDocuments,
        loader,
        msgLog,
        isPreviousResume,
      }}
    >
      {children}
    </EmployeeDetails_Context.Provider>
  );
}

export default EmployeeDetailsContextProvider;
export { EmployeeDetails_Context };
