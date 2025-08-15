const express = require('express');
const router = express.Router();
const { sendEmail } = require('../controllers/contact');

// Routes to items operations
router.route('/contact').post(sendEmail);
// Exports router
module.exports = router;
