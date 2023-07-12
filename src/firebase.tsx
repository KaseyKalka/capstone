// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxGoXYGI2l89Wm7giSt6ykrD9PNbhP_j8",
  authDomain: "capstone-ec7b7.firebaseapp.com",
  projectId: "capstone-ec7b7",
  storageBucket: "capstone-ec7b7.appspot.com",
  messagingSenderId: "320200059453",
  appId: "1:320200059453:web:4ad2283b683cdf2b349854",
  measurementId: "G-XFHSLY23RN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);