document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  document.getElementById("confirmationMessage").innerText =
    "Thank you! We'll get back to you shortly.";
  this.reset();
});
