// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAT7R2k2fF5kYN40qUXEE1rTYpyn4AlFm4",
  authDomain: "teamblog-31837.firebaseapp.com",
  projectId: "teamblog-31837",
  storageBucket: "teamblog-31837.appspot.com",
  messagingSenderId: "853138021624",
  appId: "1:853138021624:web:6ddb2edb66bb5c60db2f0d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)