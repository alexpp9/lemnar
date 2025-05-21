const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const session = require('express-session');
const {
  port,
  sessionSecret,
  cloudinaryName,
  cloudinaryAPI,
  cloudinarySECRET,
} = require('./config');
const cloudinary = require('cloudinary').v2;
// User
const User = require('./models/user');
// Item
const Item = require('./models/item');

// Review
const Review = require('./models/review');
// DB
const connectDB = require('./db');

// Execute express;
const app = express();

// Allows Express to understand JSON
app.use(express.json());

// CORS permission
app.use(
  cors({
    origin: ['http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// Tells Express to use session
app.use(
  session({
    secret: sessionSecret,
    // If true, it'll make a new session ID every time you make a request to the server
    saveUninitialized: false,
    // True, forces the session to be resave in the store, even if unmodified
    resave: false,
    cookie: {
      maxAge: 60 * 60 * 24, // 24h
    },
  })
);

// Configure Cloudinary
// cloudinary.config({
//   cloud_name: cloudinaryName,
//   api_key: cloudinaryAPI,
//   api_secret: cloudinarySECRET,
// });

// (async function () {
//   const results = await cloudinary.uploader.upload('./test.jpg');
//   console.log(results);
//   // Dynamic URL
//   const url = cloudinary.url(results.public_id, {
//     transformation: [
//       {
//         quality: 'auto',
//       },
//       {
//         fetch_format: 'auto',
//       },
//       {
//         width: 1200,
//         height: 1200,
//         crop: 'fill',
//         gravity: 'auto',
//       },
//     ],
//   });
//   console.log(url);
// })();

// Get / root
app.get('/', (req, res) => {
  if (!req.session.user) {
    return res.status(401).send('Bad credentials!');
  }

  res.status(201).send(req.session.user);
});

// Create user
app.post('/registerUser', async (req, res) => {
  // Get elements from req.body;
  const { username, email, password } = req.body;

  // Check important elements
  if (!username || !email || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'Some information is missing!',
    });
  }

  // Check to see if user already exists (via unique attribute)
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ status: 'error', message: 'User already exists' });
  }

  // Encrypt passoword
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = new User({
    username,
    email,
    password: hashedPassword,
  });

  await user.save();

  // If user is successfully registered; add user id to <session>
  req.session.user = user;
  res.status(201).json({
    status: 'success',
    message: 'User created!',
  });
});

// Login user (without session)
app.post('/loginUser', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'Some information is missing!',
    });
  }

  // find user via username
  const user = await User.findOne({ username });
  // Compare passwords
  const comparisonResult = await bcrypt.compare(password, user.password);
  if (!user || !comparisonResult) {
    return res.status(401).json({
      status: 'error',
      message: 'Sorry! Bad credentials.',
    });
  }

  // Attaching user to session;
  req.session.user = user;
  res.status(200).json({
    status: 'success',
    message: 'User logged in!',
  });
});

app.post('/logoutUser', (req, res) => {
  // Removes the user from the sesson, thus logging user out
  req.session.user = null;
  res.status(201).send('Logged you out!');
});

// ========================

// Getting all Items
app.get('/api/items', async (req, res) => {
  const items = await Item.find({});
  if (!items) {
    return res
      .status(404)
      .json({ status: 'error', message: 'No items were found!' });
  }

  res
    .status(200)
    .json({ status: 'success', message: 'Items found', data: items });
});

// Details about an item;
app.get('/api/items/:id', async (req, res) => {
  // Find the item in DB based on id;
  const item = await Item.findById(req.params.id).populate('reviews_ref');
  if (!item) {
    return res.status(404).json({ status: 'error', message: 'Item not found' });
  }

  res
    .status(200)
    .json({ status: 'success', message: 'Item found.', data: item });
});

// Creating Furniture Items
app.post('/api/items', async (req, res) => {
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
      message: 'There is missing information required for creating a new Item.',
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
  res.status(201).json({ status: 'success', message: 'Item created!' });
});

// Updating Item
app.put('/api/items/:id', async (req, res) => {
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
});

// Delete Item
app.post('/api/items/:id', async (req, res) => {
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

  res
    .status(200)
    .json({ status: 'success', message: 'Item deleted', data: deletedItem });
});

// =========
// Review routes

// Create review
app.post('/api/item/:id/review', async (req, res) => {
  const { body, rating } = req.body;
  // find furniture item by id;
  const item = await Item.findById(req.params.id);
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
  if (!rating) {
    return res.status(401).json({
      status: 'error',
      message: 'You need to at least leave a rating for posting a review.',
    });
  }
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
});

// Editting a revie -> maybe later

// Delete review
app.post('/api/item/:id/review/:reviewID', async (req, res) => {
  // find furniture item by id;
  const reviewID = req.params.reviewID;
  const review = await Review.findById(reviewID);

  // Check user loggin.
  if (!req.session.user || req.session.user._id !== review.author.toString()) {
    return res.status(403).json({
      status: 'error',
      message: 'Forbidden! One cannot delete a review without being logged in.',
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
});

// Server listening
app.listen(port, () => {
  console.log(`===========================`);
  console.log(`App listening on PORT: ${port}`);
  console.log(`===========================`);
  // DB connection
  connectDB();
});
