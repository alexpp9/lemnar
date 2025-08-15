const express = require('express');
const session = require('express-session');
const { sessionSecret } = require('./config');
const cors = require('cors');
// items
const itemRoutes = require('./routes/items');
// reviews
const reviewRoutes = require('./routes/reviews');
// users
const userRoutes = require('./routes/users');
// email route
const emailRoute = require('./routes/contact');
module.exports.createApp = () => {
  const app = express();
  // Controllers for Item model;

  // CORS permission
  app.use(
    cors({
      origin: 'http://localhost:3001',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    })
  );

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
        // 24h
        maxAge: 60 * 60 * 24,
        secure: false,
        sameSite: 'lax',
      },
    })
  );

  // Routes
  // ======
  // Using the router
  app.use('/', userRoutes);
  app.use('/', emailRoute);
  app.use('/api/items', itemRoutes);
  app.use('/api/items/:id/reviews', reviewRoutes);

  return app;
};
