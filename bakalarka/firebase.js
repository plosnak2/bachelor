// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import * as firebase from "firebase";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };
