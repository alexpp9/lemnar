const Item = require('../models/item');
const { deleteImagesByUrl } = require('../middleware');

// Get items;
module.exports.getItems = async (req, res) => {
  try {
    const items = await Item.find({});
    if (!items) {
      return res
        .status(404)
        .json({ status: 'error', message: 'No items were found!' });
    }

    res
      .status(200)
      .json({ status: 'success', message: 'Items found', data: items });
  } catch (error) {
    res
      .status(404)
      .json({ status: 'error', message: 'Failed to revtrieve items.' });
  }
};

// Create Item
module.exports.createItem = async (req, res) => {
  try {
    const {
      name,
      type,
      material,
      colour,
      weight,
      price,
      room,
      image_url,
      description,
    } = req.body;
    // Check permission
    if (!req.session.user || !req.session.user.isAdmin) {
      return res.status(401).json({
        status: 'Error',
        message: 'You are unauthorized to perform this action!',
      });
    }
    // Check required fields
    if (!name || !type || !colour || !price) {
      return res.status(400).json({
        status: 'Bad request',
        message:
          'There is missing information required for creating a new Item.',
      });
    }
    // Creating the Item
    const item = new Item({
      name,
      type,
      material,
      colour,
      weight,
      price,
      room,
      image_url,
      description,
      user_ref: req.session.user._id,
    });

    // Saving new Item to DB;
    await item.save();

    // Feedback
    res
      .status(201)
      .json({ status: 'success', message: 'Item created!', data: item });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: 'Failed to create item.' });
  }
};

// Item details:
module.exports.getDetails = async (req, res) => {
  try {
    // Find the item in DB based on id;
    const item = await Item.findById(req.params.id).populate({
      path: 'reviews_ref',
      select: 'body rating author createdAt',
      populate: {
        path: 'author',
        select: 'username',
      },
    });

    if (!item) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Item not found' });
    }

    res
      .status(200)
      .json({ status: 'success', message: 'Item found.', data: item });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: 'Could not show details.' });
  }
};

// Update Item
module.exports.updateItem = async (req, res) => {
  try {
    // Check permission
    if (!req.session.user || !req.session.user.isAdmin) {
      return res.status(401).json({
        status: 'Error',
        message: 'You are unauthorized to perform this action!',
      });
    }
    // Get id
    const { id } = req.params;

    // Creating the Item
    const item = await Item.findByIdAndUpdate(
      id,
      { ...req.body },
      {
        new: true,
      }
    );

    if (!item) {
      res
        .status(400)
        .json({ status: 'error', message: 'Bad request! No item to update!' });
    }
    // Save new item

    await item.save();
    // Feedback
    res
      .status(200)
      .json({ status: 'success', message: 'Item update!', data: item });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: 'Could not update item information.' });
  }
};

// Delete item
module.exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    // Check permission
    if (!req.session.user || !req.session.user.isAdmin) {
      return res.status(401).json({
        status: 'Error',
        message: 'You are unauthorized to perform this action!',
      });
    }

    // Perform operation
    const deletedItem = await Item.findByIdAndDelete(id);
    // deletedItem === null if no item was found to be deleted.
    if (!deletedItem) {
      return res
        .status(404)
        .json({ status: 'error.', message: "Item doesn't exist." });
    }

    // Attempt to delete items from Cloudinary along with the DB item;
    deleteImagesByUrl(deletedItem.image_url);

    res
      .status(200)
      .json({ status: 'success', message: 'Item deleted', data: deletedItem });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Could not delete item.',
    });
  }
};
