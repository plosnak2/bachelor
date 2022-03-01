// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";

import firebase from "firebase";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBWpgwkxBNQ_Onq4K0IuNsPPfhzMlanve0",
    authDomain: "bachelor-59d72.firebaseapp.com",
    projectId: "bachelor-59d72",
    storageBucket: "bachelor-59d72.appspot.com",
    messagingSenderId: "307642755215",
    appId: "1:307642755215:web:f34272888786c77f8a28fa",
    measurementId: "G-H60FCBFSG3"
  };
// Initialize Firebase
let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const db = firebase.firestore(app);
const storage = firebase.storage(app)

export const UsersRef = db.collection("users");
export const ChatRef = db.collection("messages");
export const PredefinedRef = db.collection("predefined_messages");
export const PhotosRef = db.collection("photos");
export const ExercisesRef = db.collection("exercises");
export const CalendarRef = db.collection("calendar");

export {firebase, storage};