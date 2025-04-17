const express = require('express'); // Import the Express framework to create the server
const bodyParser = require('body-parser'); // Import body-parser to parse incoming request bodies
const mysql = require('mysql'); // Import MySQL module to interact with the MySQL database
const cors = require('cors');
const path = require('path');
const multer = require('multer');

// Configure multer to save images in the 'uploads/' directory
const upload = multer({
    dest: 'uploads/', // Directory to store uploaded files
    fileFilter: (req, file, cb) => {
        // Allow only image files
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    },
    limits: { fileSize: 2 * 1024 * 1024 } // Limit file size to 2MB
});

const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Whisper10!',
    database:'animalAdoptionDB'
});

const app = express(); // Initialize an Express application
const port = 3000; // Set the port number for the server

// Use body-parser middleware to handle URL-encoded and JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'pets')));
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pets/html/index.html'));
});
app.get('/addDog', (req,res) => {
    res.sendFile(path.join(__dirname, 'pets/html/addDog.html'))
});
app.get('/adoptionPage', (req,res) =>{
res.sendFile(path.join(__dirname,'pets/html/adoptionPage.html'))
});

app.post('/adopt-dog', (req, res) => {
    const {name, email, phone_number} = req.body; // Extract title, author, and year_published from the request body

    // SQL query to insert a new book record into the 'books' table
    const sql = 'INSERT INTO adopter (name, email, phone_number) VALUES (?, ?, ?)';

    // Execute the SQL query with the extracted data
    con.query(sql, [name, email, phone_number], (error, results) => {
        if (error) throw error; // Throw an error if the query fails
        res.send('Adopter added successfully!'); // Send a success message if the query is successful
    });
});
app.post('/addDog', upload.single('dogImage'), (req, res) => {
    let parsedBody;

    // Parse the JSON field explicitly
    try {
        parsedBody = JSON.parse(req.body.dogData); // Parse the JSON string from the 'dogData' field
    } catch (error) {
        console.error('Error parsing dogData:', error);
        return res.status(400).send('Invalid dogData format.');
    }

    const { dogName, dogBreed, dogAge } = parsedBody; // Destructure parsed JSON fields
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    // Validate required fields
    if (!dogName || !dogBreed || !dogAge) {
        return res.status(400).send('All fields are required.');
    }

    const sql = 'INSERT INTO dog (name, breed, age, image_path) VALUES (?, ?, ?, ?)';
    con.query(sql, [dogName, dogBreed, dogAge, imagePath], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).send('An error occurred while adding the dog.');
        }
        res.send('Dog added successfully!');
    });
});
app.get('/search-dogs', (req, res) => {
    const searchQuery = req.query.q; // Get the search query from the request query parameters

    // SQL query to search for books by title or author
    const sql = 'SELECT * FROM dog WHERE name LIKE ? OR breed LIKE ?';

    // Execute the SQL query with wildcards around the search query for partial matching
    con.query(sql, [`%${searchQuery}%`, `%${searchQuery}%`], (err, results) => {
        if (err) {
            console.error('Error fetching books', err); // Log an error message if the query fails
            return res.status(500).send('An error occurred while fetching dogs'); // Send a 500 error response
        }
        res.json(results); // Send the search results as JSON if the query is successful
    });
});
// Adjusted DELETE operation to use `customer_id`
app.delete('/delete-dog/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM dog WHERE dogID = ?";
    con.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting the customer', err);
            return res.status(500).send('An error occurred while deleting the customer');
        }
        res.send('Customer deleted successfully');
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`); // Log a message when the server starts
});