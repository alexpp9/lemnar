const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Furniture item name is required.'],
      trim: true,
      maxLength: [100, 'Name cannot exceed 100 characters.'],
    },
    type: {
      type: String,
      required: true,
      enum: ['chair', 'table', 'sofa', 'bed', 'cabinet', 'other'],
    },
    material: {
      type: String,
      //   required: true,
      trim: true,
    },
    colour: {
      type: String,
      required: true,
      trim: true,
    },
    weight: {
      type: Number,
      //   required: true,
      min: [0, 'Weight must be a positive number.'],
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price must be a positive number.'],
    },
    room: {
      type: String,
      enum: [
        'living room',
        'bedroom',
        'dining room',
        'office',
        'outdoor',
        'other',
      ],
      //   required: true,
    },
    image_url: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      maxLength: [1000, 'Description cannot exceed 1000 characters.'],
    },
    user_ref: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      // required: true,
    },
    reviews_ref: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
  },
  { timestamps: true }
);

// Model
const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
