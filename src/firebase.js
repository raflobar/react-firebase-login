// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
//import App from "./App";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyDoVym7ylx_ZEGLzkfmEVGNhJ6N2TEJLiE",
  authDomain: "react-rfb-authen.firebaseapp.com",
  projectId: "react-rfb-authen",
  storageBucket: "react-rfb-authen.appspot.com",
  messagingSenderId: "768582314185",
  appId: "1:768582314185:web:fe436a71131f9be8468518"

};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
