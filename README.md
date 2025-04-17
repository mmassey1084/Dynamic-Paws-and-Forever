# 🐾 Paws and Forever - Animal Adoption Website

This repository contains a full-stack web application designed for an animal adoption center. It allows users to browse adoptable dogs, submit adoption requests, and add new dog profiles with images. The system also includes a live countdown, animations, and a responsive design.

---

## Repository Contents

- `index.html`: The homepage with animated intro, countdown timer, and adoption portal link.
- `adoptionPage.html`: Displays all adoptable dogs dynamically pulled from the server.
- `addDog.html`: Admin page to add new dogs to the system with image upload support.
- `styles.css` & `adoptionPage.css`: Custom styles for the site’s pages.
- `script.js`: Controls the homepage countdown, animations, and page transitions.
- `adoptionPage.js`, `addDogPage.js`: JavaScript to fetch, display, and add dogs.
- `upload/`: Stores uploaded dog images.
- `node_modules/`: Contains all required Node.js packages.
- `package.json` & `package-lock.json`: Define and lock down Node.js dependencies.
- `animaladoptiondb_dog.sql` & `animaladoptiondb_adopter.sql`: MySQL schemas for backend database tables.

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
