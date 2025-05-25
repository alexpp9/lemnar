const express = require('express');
const cors = require('cors');
const session = require('express-session');
const { port, sessionSecret } = require('./config');
// DB
const connectDB = require('./db');
// Execute express;
const app = express();
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

// Create user
app.post('/registerUser', async (req, res) => {});

// Login user (without session)
app.post('/loginUser', async (req, res) => {});

app.post('/logoutUser', (req, res) => {});

// Checks authentification (used for persistance of user)
app.get('/check-auth');

// ========================

// Getting all Items
app.get('/api/items', async (req, res) => {});

// Creating Furniture Items
app.post('/api/items', async (req, res) => {});

// Details about an item;
app.get('/api/items/:id', async (req, res) => {});

// Updating Item
app.put('/api/items/:id', async (req, res) => {});

// Delete Item
app.delete('/api/items/:id', async (req, res) => {});

// =========
// Review routes

// Create review
app.post('/api/item/:id/review', async (req, res) => {});

// Editting a revie -> maybe later

// Delete review
app.delete('/api/item/:id/review/:reviewID', async (req, res) => {});

// Server listening
app.listen(port, () => {
  console.log(`===========================`);
  console.log(`App listening on PORT: ${port}`);
  console.log(`===========================`);
  // DB connection
  connectDB();
});
