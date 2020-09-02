const mongoose = require('mongoose');
const config = require('../../config');

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log('Successfully connected to MongoDB!');
  } catch (error) {
    console.error(error);
    process.exit(-1);
  }
};

module.exports = connectDB;
