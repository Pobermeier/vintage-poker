const dotenv = require('dotenv');

// Load env vars if env is not production
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: './server/config/local.env' });
}

module.exports = {
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_URI: process.env.MONGO_URI,
};
