// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdCnJ-HyzEAd_O_MUn8SDMnRmrE7xMxoY",
  authDomain: "flavor-nest-d0123.firebaseapp.com",
  projectId: "flavor-nest-d0123",
  storageBucket: "flavor-nest-d0123.appspot.com",
  messagingSenderId: "604663391583",
  appId: "1:604663391583:web:5e5e6c44208db0a2d142ea",
  measurementId: "G-MBJQ87SMP3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get button and set up event listener
const submit = document.getElementById("submit");
submit.addEventListener("click", function (event) {
  event.preventDefault();

  // Get input values
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Validate inputs
  if (!email || !password) {
    alert("Please fill in both email and password fields.");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up successfully
      const user = userCredential.user;
      console.log("User created:", user);
      alert("Account created successfully!");
      window.location.href = "grand.html"; // Redirect
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Firebase Auth Error:", errorCode, errorMessage);
      
      // Provide user-friendly error messages
      let friendlyMessage = "";
      switch (errorCode) {
        case "auth/email-already-in-use":
          friendlyMessage = "This email is already registered. Please use a different email or try logging in.";
          break;
        case "auth/invalid-email":
          friendlyMessage = "Please enter a valid email address.";
          break;
        case "auth/weak-password":
          friendlyMessage = "Password is too weak. Please choose a stronger password.";
          break;
        default:
          friendlyMessage = "Error creating account: " + errorMessage;
      }
      
      alert(friendlyMessage);
    });
});
























