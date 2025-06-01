const { port } = require('./config');
const { createApp } = require('./createApp');
// DB
const connectDB = require('./db');
// Execute express;
const app = createApp();

// Server listening
app.listen(port, () => {
  console.log(`===========================`);
  console.log(`App listening on PORT: ${port}`);
  console.log(`===========================`);
  // DB connection
  connectDB();
});
