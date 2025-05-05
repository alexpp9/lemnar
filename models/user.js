const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: [3, 'Username must be at least 3 characters long.'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [8, 'Password must be at least 8 characters long.'],
    },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Model
const User = mongoose.model('User', UserSchema);

module.exports = User;
