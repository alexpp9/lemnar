const express = require('express');
const cors = require('cors');
const session = require('express-session');
const { port, sessionSecret } = require('./config');
// DB
const connectDB = require('./db');
// Execute express;
const app = express();
// items
const itemRoutes = require('./routes/items');
// reviews
const reviewRoutes = require('./routes/reviews');
// users
const userRoutes = require('./routes/users');
// Allows Express to understand JSON
app.use(express.json());
// CORS permission
app.use(
  cors({
    origin: 'http://localhost:3001',
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
app.use('/api/items', itemRoutes);
app.use('/api/items/:id/reviews', reviewRoutes);

// Server listening
app.listen(port, () => {
  console.log(`===========================`);
  console.log(`App listening on PORT: ${port}`);
  console.log(`===========================`);
  // DB connection
  connectDB();
});
