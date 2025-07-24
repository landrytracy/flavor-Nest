// Create floating food emojis
function createFloatingFood() {

  setInterval(() => {
    const emoji = document.createElement("div");
    emoji.className = "floating-food";
    emoji.textContent =
      foodEmojis[Math.floor(Math.random() * foodEmojis.length)];
    emoji.style.left = Math.random() * window.innerWidth + "px";
    emoji.style.top = window.innerHeight + "px";
    emoji.style.animationDelay = Math.random() * 2 + "s";

    document.body.appendChild(emoji);

    setTimeout(() => {
      emoji.remove();
    }, 6000);
  }, 3000);
}

// Form validation
function validateForm() {
  const form = document.getElementById("contactForm");
  const inputs = form.querySelectorAll("input, textarea, select");
  let isValid = true;

  inputs.forEach((input) => {
    const errorElement = document.getElementById(input.name + "Error");
    let errorMessage = "";

    if (!input.value.trim()) {
      errorMessage = "This field is required.";
      isValid = false;
    } else if (input.type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value)) {
        errorMessage = "Please enter a valid email address.";
        isValid = false;
      }
    } else if (input.name === "name" && input.value.trim().length < 2) {
      errorMessage = "Name must be at least 2 characters long.";
      isValid = false;
    } else if (input.name === "message" && input.value.trim().length < 10) {
      errorMessage =
        "Please tell us more! Message should be at least 10 characters.";
      isValid = false;
    }

    if (errorMessage) {
      errorElement.textContent = errorMessage;
      errorElement.classList.add("show");
      input.style.borderColor = "#dc2626";
    } else {
      errorElement.textContent = "";
      errorElement.classList.remove("show");
      input.style.borderColor = "#f7931e";
    }
  });

  return isValid;
}

// Handle form submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  if (validateForm()) {
    const submitBtn = this.querySelector(".submit-btn");
    const originalText = submitBtn.textContent;

    submitBtn.innerHTML = " Sending...";
    submitBtn.disabled = true;

    // Create success confetti effect
    createFoodConfetti();

    setTimeout(() => {
      document.getElementById("successMessage").classList.add("show");
      this.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;

      setTimeout(() => {
        document.getElementById("successMessage").classList.remove("show");
      }, 5000);
    }, 2000);
  }
});

// Success confetti effect
function createFoodConfetti() {
  const confettiEmojis = ["🎉", "✨", "🍾", "🥳", "🎊"];

  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      const confetti = document.createElement("div");
      confetti.style.position = "fixed";
      confetti.style.left = Math.random() * window.innerWidth + "px";
      confetti.style.top = "-50px";
      confetti.style.fontSize = "2rem";
      confetti.style.pointerEvents = "none";
      confetti.style.zIndex = "1000";
      confetti.textContent =
        confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
      confetti.style.animation = "floatFood 3s ease-out forwards";

      document.body.appendChild(confetti);

      setTimeout(() => {
        confetti.remove();
      }, 3000);
    }, i * 100);
  }
}

// Real-time validation
document
  .querySelectorAll(".form-input, .form-textarea, .form-select")
  .forEach((input) => {
    input.addEventListener("blur", function () {
      const errorElement = document.getElementById(this.name + "Error");
      let errorMessage = "";

      if (!this.value.trim()) {
        errorMessage = "This field is required.";
      } else if (this.type === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.value)) {
          errorMessage = "Please enter a valid email address.";
        }
      } else if (this.name === "name" && this.value.trim().length < 2) {
        errorMessage = "Name must be at least 2 characters long.";
      } else if (this.name === "message" && this.value.trim().length < 10) {
        errorMessage =
          "Please tell us more! Message should be at least 10 characters.";
      }

      if (errorMessage) {
        errorElement.textContent = errorMessage;
        errorElement.classList.add("show");
        this.style.borderColor = "#dc2626";
      } else {
        errorElement.textContent = "";
        errorElement.classList.remove("show");
        this.style.borderColor = "#f7931e";
      }
    });

    input.addEventListener("focus", function () {
      this.style.borderColor = "#ff6b35";
    });
  });

// Initialize floating food when page loads
document.addEventListener("DOMContentLoaded", function () {
  createFloatingFood();
});

// Add interactive hover effects to contact items
document.querySelectorAll(".contact-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    const icon = this.querySelector(".contact-icon");
    icon.style.animation = "bounce 0.6s ease-in-out";
  });

  item.addEventListener("mouseleave", function () {
    const icon = this.querySelector(".contact-icon");
    icon.style.animation = "";
  });
});

// Additional utility functions for enhanced functionality

// Function to handle form field animations
function animateFormField(field, type = "success") {
  const colors = {
    success: "#10b981",
    error: "#dc2626",
    focus: "#ff6b35",
  };

  field.style.borderColor = colors[type];
  field.style.transform = "translateY(-2px)";

  setTimeout(() => {
    if (type !== "focus") {
      field.style.transform = "translateY(0)";
    }
  }, 200);
}

// Function to create custom food-themed notifications
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <span class="notification-icon">${
          type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️"
        }</span>
        <span class="notification-message">${message}</span>
    `;

  // Add notification styles if not already present
  if (!document.querySelector("#notification-styles")) {
    const style = document.createElement("style");
    style.id = "notification-styles";
    style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                border-radius: 12px;
                padding: 1rem 1.5rem;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                z-index: 1000;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-family: Georgia, serif;
                font-weight: bold;
                animation: slideInRight 0.3s ease-out;
            }
            
            .notification-success { border-left: 4px solid #10b981; }
            .notification-error { border-left: 4px solid #dc2626; }
            .notification-info { border-left: 4px solid #3b82f6; }
            
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
    document.head.appendChild(style);
  }

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideInRight 0.3s ease-out reverse";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Function to handle special dietary requirements or preferences
function handleSpecialRequests() {
  const messageField = document.getElementById("message");
  const inquiryField = document.getElementById("inquiry");

  if (!messageField || !inquiryField) return;

  // Add helpful placeholders based on inquiry type
  inquiryField.addEventListener("change", function () {
    const placeholders = {
      reservation:
        "Please let us know your preferred date, time, party size, and any special dietary requirements...",
      catering:
        "Tell us about your event – date, number of guests, dietary restrictions, budget range, and any special requests...",
      feedback:
        "We'd love to hear about your experience! Please share your thoughts, suggestions, or compliments...",
      menu: "What would you like to know about our menu? Ingredients, allergens, preparation methods, or recommendations?",
      events:
        "Planning something special? Tell us about your event, preferred dates, guest count, and how we can make it memorable...",
      order: "What would you like to order...",
      other: "How can we help you today? Feel free to share anything...",
    };

    const selected = inquiryField.value;
    messageField.placeholder = placeholders[selected] || placeholders["other"];
  });
}

// Initialize function when DOM is ready
document.addEventListener("DOMContentLoaded", handleSpecialRequests);
