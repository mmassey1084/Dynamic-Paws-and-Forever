'use strict';
const images = document.querySelectorAll(".flexItem img");

// Function to add zoom effect
const addZoomEffect = () => {
    images.forEach((img) => {
        img.addEventListener("mouseover", zoomIn);
        img.addEventListener("mouseout", zoomOut);
    });
}

// Function to remove zoom effect
const removeZoomEffect = () => {
    images.forEach((img) => {
        img.removeEventListener("mouseover", zoomIn);
        img.removeEventListener("mouseout", zoomOut);
    });
}

// Zoom in and zoom out handlers
const zoomIn = (event) => {
    event.target.style.transform = "scale(1.5)";
}

const zoomOut = (event) => {
    event.target.style.transform = "scale(1)";
}
// function to make sure the email is in the correct format
const validateEmail = () => {
    let emailFeedback = document.getElementById('emailFeedback');
    let email = document.getElementById('email').value;
    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!email.match(emailPattern)) {
        emailFeedback.setAttribute("class", "failVal");
        emailFeedback.textContent = 'Please enter a valid email address.';
        return false;
    } else {
        emailFeedback.textContent = '';
        emailFeedback.removeAttribute("class");
        return true;
    }
};
//function to make sure the phone number is in the correct format
const validatePhone = () => {
    let numberFeedback = document.getElementById("userNumFeedback");
    let phoneNumber = document.getElementById("phone_number").value;
    let phonePattern = /^\d{3}-\d{3}-\d{4}$/;

    if(!phoneNumber.match(phonePattern)) {
        numberFeedback.setAttribute("class", "failVal");
        numberFeedback.textContent = "Enter correct format for the number 999-999-9999";
        return false;
    } else {
        numberFeedback.textContent = "";
        numberFeedback.removeAttribute("class");
        return true;
    }

}

//function to make sure both are in the correct format and to submit form
const validateForm = (e) => {
    e.preventDefault(); 
    const isEmailValid = validateEmail(); 
    const isPhoneValid = validatePhone();

    if (isEmailValid && isPhoneValid) {
        alert("Form is Submitted");
        
    }else {
        alert("form cant be submitted");
        e.preventDefault();
    }
};
const generateCsrfToken = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Initial setup based on window width
if (window.innerWidth > 800) {
    addZoomEffect();
}
if (!csrfToken) {
    csrfToken = generateCsrfToken();
    localStorage.setItem('csrfToken', csrfToken);
}

// Listen for window resizing and toggle the effect dynamically
window.addEventListener("resize", () => {
    if (window.innerWidth > 800) {
        addZoomEffect();
    } else {
        removeZoomEffect();
    }
});
document.getElementById("email").addEventListener("keyup", validateEmail); 
document.getElementById("phone_number").addEventListener("keyup", validatePhone);
document.getElementById('myForm').onsubmit = function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

  // Create an object to hold the form data, with values retrieved from input fields
  const formData = {
      name: document.getElementById('name').value, // Get the name from the input field
      email: document.getElementById('email').value, // Get the email from the input field
      phone_number: document.getElementById('phone_number').value, // Get the phone_number from the input field
  };

  // Send a POST request to the '/add-dog' endpoint with the form data in JSON format
  fetch('/adopt-dog', {
      method: 'POST', // Set the HTTP method to POST for adding a new customer
      headers: {
          'Content-Type': 'application/json', // Specify that the content type is JSON
      },
      body: JSON.stringify(formData), // Convert the form data to a JSON string to send in the request
  })
  .then(response => response.text()) // Parse the response as plain text
  .then(data => {
      alert('Customer added successfully'); // Show an alert message upon successful customer addition
      clearForm(); // Clear the form after successful addition by calling the clearForm function
  })
  .catch((error) => { // Handle any errors that occur during the request
      console.error('Error:', error); // Log the error message to the console
  });

  // Function to clear the form
  function clearForm() {
      document.getElementById('myForm').reset(); // Reset the form fields to their default values
  }
}
