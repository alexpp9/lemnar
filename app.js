const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const { port, sessionSecret } = require('./config');
const passport = require('passport');
// User
const User = require('./models/user');
// DB
const connectDB = require('./db');

// Execute express;
const app = express();

// Allows Express to understand JSON
app.use(express.json());
// Tells Express to use session
app.use(
  session({
    secret: sessionSecret,
    // If true, it'll make a new session ID every time you make a request to the server
    saveUninitialized: false,
    // True, forces the session to be resave in the store, even if unmodified
    resave: false,
    cookie: {
      maxAge: 60000 * 60, // 1h
    },
  })
);
// Get / root
app.get('/', (req, res) => {
  if (!req.session.user) {
    return res.status(401).send('Bad credentials');
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
  console.log(req.session);
  res.status(201).json({
    status: 'success',
    message: 'User logged in!',
  });
});

app.post('/logoutUser', (req, res) => {
  // Removes the user from the sesson, thus logging user out
  req.session.user = null;
  res.status(201).send('Logged you out!');
});

// Server listening
app.listen(port, () => {
  console.log(`===========================`);
  console.log(`App listening on PORT: ${port}`);
  console.log(`===========================`);
  // DB connection
  connectDB();
});
