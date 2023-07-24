// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, EmailAuthProvider} from 'firebase/auth'
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3Mb7rp6kvobKdv3o5PA4X5CVKyLCaelA",
  authDomain: "serviso-hotel-app.firebaseapp.com",
  databaseURL: "https://serviso-hotel-app-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "serviso-hotel-app",
  storageBucket: "serviso-hotel-app.appspot.com",
  messagingSenderId: "271023989792",
  appId: "1:271023989792:web:34660d934f26e0f5bf4845",
  measurementId: "G-CN9H02N2PH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new EmailAuthProvider();
export const db = getFirestore(app);
