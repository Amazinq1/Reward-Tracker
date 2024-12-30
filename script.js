function calculateScore() {
    const uptime = document.getElementById("uptime").value;
    const rewards = document.getElementById("rewards").value;

    // Inline error message element
    const uptimeError = document.getElementById("uptimeError");
    const rewardsError = document.getElementById("rewardsError");
    const result = document.getElementById("result");

    // Clear previous errors
    uptimeError.classList.add("d-none");
    rewardsError.classList.add("d-none");
    result.textContent = "";

    // Validate uptime and rewards
    if (uptime < 0 || uptime > 100) {
        uptimeError.textContent = "Uptime must be between 0 and 100.";
        uptimeError.classList.remove("d-none");
        return; // Stop execution if validation fails
    }

    if (rewards < 0) {
        rewardsError.textContent = "Rewards cannot be negative.";
        rewardsError.classList.remove("d-none");
        return;
    }

    if (uptime === "" || rewards === "") {
        result.textContent = "Please enter valid values!";
        result.classList.add("text-danger");
        return;
    }

    if (isNaN(uptime) || isNaN(rewards)) {
        result.textContent = "Inputs must be numbers!";
        result.classList.add("text-danger");
        return;
    }

    // Basic calculation for testing (adjust as needed for your reward formula)
    const score = (uptime / 100) * rewards;

    // Displaying the result
    result.textContent = `Calculated Score: ${score}`;
    result.classList.remove("text-danger");
    result.classList.add("text-success");
}

// Reset function to clear inputs and errors
function resetForm() {
    document.getElementById("uptime").value = "";
    document.getElementById("rewards").value = "";
    document.getElementById("uptimeError").classList.add("d-none");
    document.getElementById("rewardsError").classList.add("d-none");
    document.getElementById("result").textContent = "";
}

// Updated: Function to validate feedback inputs
function validateForm(feedbackData) {
    const { email, feedback } = feedbackData;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please provide a valid email address.");
        return false;
    }

    // Feedback length check
    if (feedback.length < 10) {
        alert("Feedback must be at least 10 characters long.");
        return false;
    }

    return true;
}

// New Code: Function to display feedback
function loadFeedbacks() {
    const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    const feedbackList = document.getElementById("feedbackList");
    feedbackList.innerHTML = ""; // Clear existing content

    feedbacks.forEach((feedbackData, index) => {
        const feedbackItem = document.createElement("li");
        feedbackItem.innerText = `#${index + 1} - ${feedbackData.email}: ${feedbackData.feedback}`;
        feedbackList.appendChild(feedbackItem);
    });
}

// Updated: Save feedback to LocalStorage with validation
function saveFeedbackToLocalStorage(feedbackData) {
    if (!validateForm(feedbackData)) return;

    const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    feedbacks.push(feedbackData);
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
}

// Updated: Feedback form submission handler
function handleFeedbackSubmission(feedbackData) {
    saveFeedbackToLocalStorage(feedbackData);

    // Show personalized Thank You message
    const thankYouMessage = document.getElementById("thankYouMessage");
    thankYouMessage.innerText = `Thank you, ${feedbackData.email}, for your valuable feedback!`;
    thankYouMessage.style.display = "block";

    // Hide form after 3 seconds
    setTimeout(() => {
        document.getElementById("feedbackForm").reset();
        thankYouMessage.style.display = "none";
    }, 3000);
}

// Updated: Toggle information section visibility
function toggleInfo() {
    try {
        const infoSection = document.getElementById("infoSection");
        if (infoSection) {
            infoSection.classList.toggle("d-none");
        } else {
            throw new Error("Info section element not found.");
        }
    } catch (error) {
        console.error("An error occurred:", error.message);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Match form and thank-you message IDs from HTML
    const feedbackForm = document.getElementById("feedbackform");
    const thankYouMessage = document.getElementById("thankYouMessage");
  
    // Ensure required elements exist
    if (!feedbackForm || !thankYouMessage) {
      console.error("Required elements are missing. Check your HTML structure.");
      return;
    }
  
    // Handle form submission
    feedbackForm.addEventListener("Submit", (event) => {
      event.preventDefault();
  
      // Match input IDs from HTML
      const name = document.getElementById("Name").value.trim();
      const issue = document.getElementById("Issue").value.trim();
      const suggestion = document.getElementById("Suggestion").value.trim();
  
      if (issue && suggestion) {
        // Save feedback to LocalStorage
        saveFeedbackToLocalStorage({ Name, Issue, Suggestion });
  
        // Show the thank-you message
        thankYouMessage.classList.remove("d-none");
  
        // Reset the form
        feedbackForm.reset();
  
        // Hide the thank-you message after 3 seconds
        setTimeout(() => {
          thankYouMessage.classList.add("d-none");
        }, 3000);
      } else {
        alert("Please fill out the required fields: Describe Your Issue and Suggestions.");
      }
    });
  });
  
  // Function to save feedback to Local Storage
  function saveFeedbackToLocalStorage(feedback) {
    try {
      const savedFeedbacks = JSON.parse(localStorage.getItem("communityFeedback")) || [];
      savedFeedbacks.push({
        ...feedback,
        date: new Date().toISOString(), // Add timestamp
      });
      localStorage.setItem("communityFeedback", JSON.stringify(savedFeedbacks));
      console.log("Feedback saved successfully:", feedback);
    } catch (error) {
      console.error("Error saving feedback to Local Storage:", error);
    }
  }
  