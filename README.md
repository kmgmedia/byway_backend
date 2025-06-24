This is the Node.js backend for the Byway web product review platform, built using Express.js. It serves as the core API layer powering features like product listings, user-submitted reviews, and seamless frontend communication.

⚠️ Note: This project is still a work in progress. More features and refinements are being added as development continues.

Features
RESTful API structure with modular routes

Product review handling (POST, GET, etc.)

MongoDB-based data model for storing user input

Middleware for input validation and error handling

Deployed serverlessly via Vercel with config in vercel.json


config/       # MongoDB connection and environment configs
controllers/  # Logic for handling API requests
middleware/   # Custom middleware like validation, auth (if extended)
models/       # Mongoose schemas for reviews/products
routes/       # All API endpoints and their handlers



🚀 Live Endpoint
🔗 https://byway-backend-swart.vercel.app

📦 Tech Stack
Node.js

Express.js

MongoDB + Mongoose

Vercel (for deployment)
