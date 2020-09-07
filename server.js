const path = require('path');
const express = require('express');
const config = require('./config');
const connectDB = require('./server/config/db');
const configureMiddleware = require('./server/middleware');
const configureRoutes = require('./server/routes');

// Connect and get reference to mongodb instance
let db;

(async function () {
  db = await connectDB();
})();

// Init express app
const app = express();

// Config Express-Middleware
configureMiddleware(app);

// Set-up static asset path
app.use(express.static(path.join('server', 'public')));

// Set-up Routes
configureRoutes(app);

// Start server and listen for connections
const server = app.listen(config.PORT, () => {
  console.log(
    `Server is running in ${config.NODE_ENV} mode and is listening on port ${config.PORT}...`,
  );
});

// Error handling - close server
process.on('unhandledRejection', (err) => {
  db.disconnect();

  console.error(`Error: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
