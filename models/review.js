const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Review Schema
const ReviewSchema = new Schema(
  {
    body: {
      type: String,
    },
    // rating: {
    //   type: Number,
    //   required: true,
    // },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    item_ref: {
      type: Schema.Types.ObjectId,
      ref: 'Item',
    },
  },
  { timestamps: true }
);

// Review Model
// Export
module.exports = mongoose.model('Review', ReviewSchema);
