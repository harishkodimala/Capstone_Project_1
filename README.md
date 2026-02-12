# Capstone Project 1

A backend REST API built with **Node.js**, **Express**, and **MongoDB** using **Mongoose**.  
This project implements structured APIs with modular routes, models, middleware, and services — designed for easy scalability and maintainability.

---

## Features

- RESTful API architecture  
- Organized folder structure
  - `/APIs` – Route handlers
  - `/middleware` – Custom middleware (body parsers, error handlers)
  - `/models` – Mongoose schemas
  - `/services` – Business logic layer
- Environment variable support
- MongoDB database integration
- Easy to extend with additional endpoints

---

## Project Structure

Capstone_Project_1
├── APIs/
├── middleware/
├── models/
├── services/
├── server.js
├── package.json
├── .gitignore
├── README.md
└── req.http


---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript runtime |
| Express | Web server framework |
| MongoDB | NoSQL database |
| Mongoose | ODM for MongoDB |
| dotenv | Environment variable management |

---

## Installation

1. **Clone repository**
```bash
git clone https://github.com/harishkodimala/Capstone_Project_1.git
Navigate to project directory

cd Capstone_Project_1
Install dependencies

npm install
Create .env file

PORT=5000
MONGO_URI=your_mongo_connection_string
Start the server

npm start
Environment Variables
Make sure to add any required environment variables in the .env file:

Key	Description
PORT	Port where server runs
MONGO_URI	MongoDB connection string
Usage
Once the server is running:

http://localhost:5000
Use tools like Postman to interact with the APIs defined under the /APIs folder.

You can also run the .req.http file in VS Code with the REST Client extension to test the endpoints.

Backend development steps:

Create git repository (git init)

Add .gitignore

Setup .env for configuration

Generate package.json (npm init -y)

Install packages (express, mongoose, dotenv, etc.)

Connect to database

Add middleware (e.g., body parser, error handler)

Design schemas & models

Build REST APIs for each entity
