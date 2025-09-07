require('dotenv').config();

// process.env.MONGO_URL
module.exports = {
  port: process.env.PORT || 3000,
  // mongoURL: 'mongodb://localhost:27017/lemnar',
  sessionSecret: process.env.SECRET_SESSION,
  email_password: process.env.EMAIL_PASSWORD,
  email_host: process.env.EMAIL_HOST,
  dbUrl: process.env.DB_URL,
};
