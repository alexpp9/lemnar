require('dotenv').config();

// process.env.MONGO_URL
module.exports = {
  port: process.env.PORT || 3000,
  mongoURL: 'mongodb://localhost:27017/lemnar',
  // mongoURL: process.env.MONGO_URL,
  sessionSecret: process.env.SECRET_SESSION,
};
