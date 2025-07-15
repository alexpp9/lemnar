const Review = require('../models/review');
const Item = require('../models/item');
const User = require('../models/user');

// Reviews model controllers

// Create review

module.exports.createReview = async (req, res) => {
  try {
    const { body, rating = 0, item_ref } = req.body;
    // find furniture item by id;
    const item = await Item.findById(item_ref);
    if (!item) {
      return res.status(404).json({
        status: 'error',
        message: 'There is no Item onto which one can post a review.',
      });
    }
    // Check user loggin.
    if (!req.session.user) {
      return res.status(403).json({
        status: 'error',
        message: 'Forbidden! One cannot post a review without being logged in.',
      });
    }
    // check required fields
    // if (!rating) {
    //   return res.status(401).json({
    //     status: 'error',
    //     message: 'You need to at least leave a rating for posting a review.',
    //   });
    // }
    // Create new review
    const review = new Review({ body, rating });
    review.author = req.session.user._id;
    item.reviews_ref.push(review);

    // Save item to DB
    await review.save();
    // Resave Item with added review
    await item.save();

    res.status(201).json({
      status: 'success',
      message: 'Review added to Furniture item.',
      data: review,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to add review!' });
  }
};

// Delete review
module.exports.deleteReview = async (req, res) => {
  try {
    // find furniture item by id;
    const reviewID = req.params.reviewID;
    const review = await Review.findById(reviewID);

    // Check user loggin.
    if (
      !req.session.user ||
      req.session.user._id !== review.author.toString()
    ) {
      return res.status(403).json({
        status: 'error',
        message:
          'Forbidden! One cannot delete a review without being logged in.',
      });
    }
    // Delete
    // $pull finds the item fitting the criteria and pulls it from the array (deletes it)
    // findByIdAndUpdate updates the Item.reviews_ref without the said review
    // findByIdAndDelete, deletes the review from the DB.
    const item = await Item.findByIdAndUpdate(req.params.id, {
      $pull: { reviews_ref: reviewID },
    });
    const deletedReview = await Review.findByIdAndDelete(reviewID);

    res.status(200).json({
      status: 'success',
      message: 'Review deleted.',
      data: deletedReview,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: 'Failed to delete review!' });
  }
};
