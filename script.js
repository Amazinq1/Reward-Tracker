function calculateScore() {
    const uptime = document.getElementById("uptime").value;
    const rewards = document.getElementById("rewards").value;

    //inline error message element
    const uptimeError = document.getElementById("uptimeError");
    const rewardsError = document.getElementById("rewardsError");
    const result = document.getElementById("result");

    //clear previous list
    uptimeError.classList.add("d-none");
    rewardsError.classList.add("d-none");
    result.textContent = "";

     // Validate uptime and rewards
     if (uptime < 0 || uptime > 100) {
        uptimeError.textContent = "Uptime must be between 0 and 100.";
        uptimeError.classList.remove("d-none")
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
    document.getElementById("result").classList.add("d-none")
}