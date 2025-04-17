# 🐾 Paws and Forever - Animal Adoption Website

This repository contains a full-stack web application designed for an animal adoption center. It allows users to browse adoptable dogs, submit adoption requests, and add new dog profiles with images. The system also includes a live countdown, animations, and a responsive design.

---

## Repository Contents

Name                | Description  
-------------------|-------------  
`README.md`         | Project overview and usage instructions  
`app1.js`           | Node.js backend server for handling routes and database logic  
`package.json`      | Lists project dependencies and scripts  
`package-lock.json` | Dependency lockfile for consistent installs  
`pets/`             | Contains all static frontend files (HTML, CSS, JS, images)  
`uploads/`          | Stores uploaded dog images  
`sqlfile/`          | Folder containing SQL database schema files  
`body-parser/`      | Node.js module for parsing incoming request bodies  
`cookie/`           | Node.js module to handle cookies  
`cors/`             | Node.js middleware for Cross-Origin Resource Sharing  
`express/`          | Web framework used to build server APIs  
`http-errors/`      | Module for creating HTTP error responses  
`multer/`           | Middleware for handling multipart/form-data (used for image uploads)  
`mysql/`            | Node.js driver for MySQL databases

---

## Usage Instructions

To run this project locally, you will need [Node.js](https://nodejs.org/) and [MySQL](https://www.mysql.com/) installed. Follow these steps:

1. **Clone the repository**  
```bash
git clone https://github.com/mmassey1084/Dynamic-Paws-and-Forever.git
cd paws-and-forever

```
## Usage Instructions

Install dependencies:
```
npm install
```

Set up the database:
Import the following SQL files into your MySQL server:
- animaladoptiondb_dog.sql
- animaladoptiondb_adopter.sql

You can use MySQL Workbench or run:
```
mysql -u your_username -p < animaladoptiondb_dog.sql
mysql -u your_username -p < animaladoptiondb_adopter.sql
```

Run the server:
Make sure your MySQL credentials and file paths are correct in app1.js, then start the backend server:
```
node app1.js
```

View the site:
Open index.html in your browser, or if served dynamically, go to http://localhost:3000
```
```
