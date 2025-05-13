const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Review Schema
const ReviewSchema = new Schema(
  {
    body: {
      type: String,
    },
    rating: {
      type: Number,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

// Review Model
// Export
module.exports = mongoose.model('Review', ReviewSchema);
