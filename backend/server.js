//backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const courseRoutes = require('./routes/courses');
const studentRoutes = require('./routes/students');

const app = express();
const PORT = process.env.PORT || 2000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', courseRoutes);
app.use('/api', studentRoutes);

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
