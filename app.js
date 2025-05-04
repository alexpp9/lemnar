const express = require('express');
const mongoose = require('mongoose');
const { port } = require('./config');
// User
const User = require('./models/user');
// DB
const connectDB = require('./db');

// Execute express;
const app = express();

// Get / root
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Server listening
app.listen(port, () => {
  console.log(`===========================`);
  console.log(`App listening on PORT: ${port}`);
  console.log(`===========================`);
  // DB connection
  connectDB();
});
