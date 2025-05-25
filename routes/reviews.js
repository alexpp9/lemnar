const express = require('express');
const router = express.Router();
const reviews = require('../controllers/reviews');

// Routes for review operations
router.route('/').post(reviews.createReview);

router.route('/:reviewID').delete(reviews.deleteReview);

// Export
module.exports = router;
