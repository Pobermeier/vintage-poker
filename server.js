const express = require('express');
const config = require('./config');
const connectDB = require('./server/config/db');

// Connect to mongodb instance
connectDB();

// Init express app
const app = express();

// Routes
app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

// Start server and listen for connections
const server = app.listen(config.PORT, () => {
  console.log(
    `Server is running in ${config.NODE_ENV} mode and is listening on port ${config.PORT}...`,
  );
});

// Error handling - close server
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
