const express = require('express');

const PORT = 3000;
const app = express();

// Get / root
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Server listening
app.listen(PORT, () => {
  console.log(`===========================`);
  console.log(`App listening on PORT: ${PORT}`);
  console.log(`===========================`);
});
