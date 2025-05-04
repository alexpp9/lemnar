const express = require('express');

const { port } = require('./config');
// User
const User = require('./models/user');

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
});
