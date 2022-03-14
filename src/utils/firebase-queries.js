import { doc, getDoc } from "firebase/firestore";
import db from "../FirebaseInit";

 const getUserDetails = async (uid) => {
  return await getDoc(doc(db, "Mirats_Job_Portal", "All_Users", "Users", uid));
};

export {getUserDetails}