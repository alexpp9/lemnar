const mongoose = require('mongoose');
const { mongoURL, dbUrl } = require('./config');

// Connection to the DB (clurster)
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL, {
      family: 4,
    });
    console.log(`Connection to DB established!`);
    console.log(`=============================`);
  } catch (error) {
    console.log(`Problem occured while tryin to connect to the DB!`);
    console.log(`=================================================`);
    console.error(error.message);
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
