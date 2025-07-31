// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCFihBao6WHvYHYbiEDEeHhAINnRSWJb14",
    authDomain: "flavor-nest-f1062.firebaseapp.com",
    projectId: "flavor-nest-f1062",
    storageBucket: "flavor-nest-f1062.firebasestorage.app",
    messagingSenderId: "922981259493",
    appId: "1:922981259493:web:aca4f025ca0a9af09e1c0c"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  //inputs
  const email = document.getElementById('email') .value;
  const password = document.getElementById('password') .value;
  //submit button
  
  const submit = document.getElementById('submit');
  submit.addEventListener("click",function(event) {
    event.preventDefault()
    alert(3)

  })