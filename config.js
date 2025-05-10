require('dotenv').config();

// process.env.MONGO_URL
module.exports = {
  port: process.env.PORT || 3000,
  mongoURL: 'mongodb://localhost:27017/lemnar',
  sessionSecret: process.env.SECRET_SESSION,
  cloudinaryName: process.env.CLOUDINARY_NAME,
  cloudinaryAPI: process.env.CLOUDINARY_API,
  cloudinarySECRET: process.env.CLOUDINARY_SECRET,
};
