document.getElementById('addDog').onsubmit = function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Create a JSON object with the first three fields
    const dogData = {
        dogName: document.getElementById('dogName').value,
        dogBreed: document.getElementById('dogBreed').value,
        dogAge: document.getElementById('dogAge').value,
    };

    // Create a FormData object
    const formData = new FormData();
    formData.append('dogData', JSON.stringify(dogData)); // Send JSON as a string
    formData.append('dogImage', document.getElementById('dogImage').files[0]); // Append file

    // Send a POST request to the '/addDog' endpoint
    fetch('/addDog', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text(); // Expect plain text response
    })
    .then(data => {
        alert(data); // Display the server's plain text response
        document.getElementById('addDog').reset(); // Reset the form
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to add dog. Please try again.');
    });
};
const dogTableBody = document.getElementById('dogTable').getElementsByTagName('tbody')[0];

document.addEventListener('DOMContentLoaded', function() {
    const searchBox = document.getElementById('searchBox');
        searchBox.value = '%';
        
        // Check for URL parameters and use them if present
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('search');
        if (searchQuery) {
            searchBox.value = decodeURIComponent(searchQuery);
        }

        // Trigger the search automatically
        performSearch(searchBox.value);
    });
// Add an event listener to the search box for the 'keyup' event
searchBox.addEventListener('keyup', function() {
    performSearch(this.value); // Call performSearch with the current input value whenever a key is released
});

// Function to perform the search and update the table with results
function performSearch(query) {
    // Send a GET request to the server with the search query parameter
    fetch(`/search-dogs?q=${encodeURIComponent(query)}`)
        .then(response => response.json()) // Parse the server response as JSON
        .then(data => {
            // Get the <tbody> element of the books table to populate with search results
            const dogsTableBody = document.getElementById('dogTable').getElementsByTagName('tbody')[0];
            dogsTableBody.innerHTML = ''; // Clear any previous rows from the table body
            
            // Loop through each book in the search results
            data.forEach(dog => {
                const row = dogsTableBody.insertRow(); // Create a new row in the table body

                // Insert cells in the new row for title, author, and year published
                const imageCell = row.insertCell(0);
                imageCell.innerHTML = `<img src="${dog.image_path}" alt="Dog Image" style="width: 100px; height: auto;">`;
                row.insertCell(1).textContent = dog.name; // Set the title cell content
                row.insertCell(2).textContent = dog.breed; // Set the author cell content
                row.insertCell(3).textContent = dog.age; // Set the year published cell content
                const actionsCell = row.insertCell(4);
                    actionsCell.innerHTML = `<button onclick="deleteDog(${dog.dogID})">Delete</button>`
            });
        })
        .catch(error => console.error('Error:', error)); // Log any errors that occur during the fetch request
}
function deleteDog(dogID){
        if (!confirm("Are you sure you want to delete this dog?")) return;
        fetch(`/delete-dog/${dogID}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    alert('dog deleted successfully');
                    searchBox.value = ''; // Optionally clear search box
                    searchBox.dispatchEvent(new Event('keyup')); // Refresh the list
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }