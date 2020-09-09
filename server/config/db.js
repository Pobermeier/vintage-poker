const mongoose = require('mongoose');
const config = require('../config');

const connectDB = async () => {
  try {
    const db = await mongoose.connect(config.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log('Successfully connected to MongoDB!');

    return db;
  } catch (err) {
    console.error(err.message);
    process.exit(-1);
  }
};

module.exports = connectDB;
