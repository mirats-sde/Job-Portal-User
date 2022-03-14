// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwtEeXXDwK4YxkR9auGZgAwFwpFp5upJs",
  authDomain: "insights-portal-7d7b7.firebaseapp.com",
  projectId: "insights-portal-7d7b7",
  storageBucket: "insights-portal-7d7b7.appspot.com",
  messagingSenderId: "400123276988",
  appId: "1:400123276988:web:95576d09a4db57c6be6ab9",
  measurementId: "G-FQ72S85H14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore()
const storage = getStorage(app);
const auth=getAuth(app)

export default db;
export {auth,storage}
