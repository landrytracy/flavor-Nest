//  Correct Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

//  Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDdCnJ-HyzEAd_O_MUn8SDMnRmrE7xMxoY",
  authDomain: "flavor-nest-d0123.firebaseapp.com",
  projectId: "flavor-nest-d0123",
  storageBucket: "flavor-nest-d0123.appspot.com",
  messagingSenderId: "604663391583",
  appId: "1:604663391583:web:5e5e6c44208db0a2d142ea",
  measurementId: "G-MBJQ87SMP3",
};

//  Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize auth service

//  Login button event listener
const submit = document.getElementById("submit");
submit.addEventListener("click", function (event) {
  event.preventDefault();

  //  Get form input values
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Login successful!");
      window.location.href = "grand.html"; // Redirect on success
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Error: " + errorMessage);
    });
});




