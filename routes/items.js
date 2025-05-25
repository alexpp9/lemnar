const express = require('express');
const router = express.Router();
const items = require('../controllers/items');

// Routes to items operations
router.route('/'.get(items.getItems).post(items.createItem));
router.route(
  '/:id'.get(items.getDetails).put(items.updateItem).delete(items.deleteItem)
);
// Exports router
module.exports = router;
