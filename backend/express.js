//backend/express.js
require('dotenv').config();
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db');

const app = express();
const port = process.env.PORT || 2000;

// Database connection
(async () => {
  try {
    await connectDB();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
})();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Start the server
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
