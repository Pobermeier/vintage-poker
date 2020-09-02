const express = require('express');
const config = require('./config');
const connectDB = require('./server/config/db');

// Connect and get reference to mongodb instance
let db;

async function connectToDb() {
  db = await connectDB();
}

connectToDb();

// Init express app
const app = express();

// Config Middleware

// Routes
app.get('/', (req, res) => {
  res.status(200).send('Welcome to Vintage Poker!');
});

// Start server and listen for connections
const server = app.listen(config.PORT, () => {
  console.log(
    `Server is running in ${config.NODE_ENV} mode and is listening on port ${config.PORT}...`,
  );
});

// Error handling - close server
process.on('unhandledRejection', (err) => {
  db.disconnect();

  console.log(`Error: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
