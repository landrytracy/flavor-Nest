import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import {getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdCnJ-HyzEAd_O_MUn8SDMnRmrE7xMxoY",
  authDomain: "flavor-nest-d0123.firebaseapp.com",
  projectId: "flavor-nest-d0123",
  storageBucket: "flavor-nest-d0123.firebasestorage.app",
  messagingSenderId: "604663391583",
  appId: "1:604663391583:web:5e5e6c44208db0a2d142ea",
  measurementId: "G-MBJQ87SMP3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//submit button
const submit = document.getElementById("submit");
submit.addEventListener("click", function (event) {
  event.preventDefault();

  //inputs
 const email = document.getElementById('email').value;
 const password = document.getElementById('password').value;
 createUserWithEmailAndPassword(auth, email, password)

 .then((userCredential) => { 
  //Signed up
  const user = userCredential.user;
  alert("Creating Account...")
  window.location.href = "grand.html";
  //...
 })
  .catch((console.error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage) 
    //..
});

})
























import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

