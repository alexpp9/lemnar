const express = require('express');
const session = require('express-session');
const { sessionSecret, dbUrl } = require('./config');
const cors = require('cors');
// items
const itemRoutes = require('./routes/items');
// reviews
const reviewRoutes = require('./routes/reviews');
// users
const userRoutes = require('./routes/users');
// email route
const emailRoute = require('./routes/contact');

// Mongo session storage
const MongoStore = require('connect-mongo');

module.exports.createApp = () => {
  const app = express();
  // Controllers for Item model;

  const allowOrigins = ['http://localhost:3001', 'https://lemnar.onrender.com'];

  // CORS permission
  app.use(
    cors({
      origin: allowOrigins,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    })
  );

  // Allows Express to understand JSON
  app.use(express.json());

  // Configure Session Config Mongo
  const store = MongoStore.create({
    mongoURL: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
      secret: sessionSecret,
    },
  });

  // Look for erros in saving session with mongo
  store.on('error', function (error) {
    console.log(`Session store error`);
    console.log(error);
  });

  // Configure session
  const sessionConfig = {
    store,
    secret: sessionSecret,
    // If true, it'll make a new session ID every time you make a request to the server
    saveUninitialized: false,
    // True, forces the session to be resave in the store, even if unmodified
    resave: false,
    cookie: {
      // 24h
      expires: Date.now() + 60 * 60 * 24,
      maxAge: 60 * 60 * 24,
      secure: false,
      sameSite: 'lax',
    },
  };

  // Tells Express to use session
  app.use(session(sessionConfig));

  // Routes
  // ======
  // Using the router
  app.use('/', userRoutes);
  app.use('/', emailRoute);
  app.use('/api/items', itemRoutes);
  app.use('/api/items/:id/reviews', reviewRoutes);

  return app;
};
