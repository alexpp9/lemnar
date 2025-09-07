const User = require('../models/user');
const bcrypt = require('bcrypt');
// Controllers for dealing with users

// Register user
module.exports.registeredUser = async (req, res) => {
  try {
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

    // Forced the session to be saved before a response

    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
        return res
          .status(500)
          .json({ status: 'error', message: 'Session save failed' });
      }

      res.status(201).json({
        status: 'success',
        message: 'User created!',
        data: user,
      });
    });
  } catch (error) {
    res
      .status(400)
      .json({ status: 'error', message: 'Failed to register user' });
  }
};

// Login user
module.exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Some information is missing!',
      });
    }

    // find user via username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'Sorry! No user found.',
      });
    }
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
    // Save as above, forces save before server response
    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
        return res
          .status(500)
          .json({ status: 'error', message: 'Session save failed' });
      }

      res.status(200).json({
        status: 'success',
        message: 'User logged in!',
        data: user,
      });
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: 'Failed to login user' });
  }
};

// Logout user
module.exports.logoutUser = (req, res) => {
  // Destroys the document from MongoAtlas
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res
        .status(500)
        .json({ status: 'error', message: 'Failed to logout' });
    }

    // Instructs browser to clear the cookie
    res.clearCookie('connect.sid', {
      path: '/',
      secure: true, // must match your session cookie settings
      sameSite: 'none',
    });

    res.status(200).json({ status: 'success', message: 'Logged you out!' });
  });
};

// Check authentification status
module.exports.checkAuth = (req, res) => {
  if (!req.session.user) {
    return res
      .status(403)
      .json({ status: 'error', message: 'No user logged in!' });
  }

  res.status(200).json({
    status: 'OK!',
    message: 'User logged in!',
    data: req.session.user,
  });
};
