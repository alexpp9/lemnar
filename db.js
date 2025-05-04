const mongoose = require('mongoose');
const { port, mongoURL } = require('./config');

// Connection to the DB (clurster)
const connectDB = async () => {
  try {
    await mongoose.connect(
      mongoURL
      // useNewUrlParser: true, Depricated message
      // useUnifiedTopology: true, Depricated message
    );
    console.log(`Connection to DB established!`);
    console.log(`=============================`);
  } catch (error) {
    console.log(`Problem occured while tryin to connect to the DB!`);
    console.log(`=================================================`);
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
