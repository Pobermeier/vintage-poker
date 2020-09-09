const config = require('../config');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  chipsAmount: {
    type: Number,
    default: config.INITIAL_CHIPS_AMOUNT,
  },
  type: {
    type: Number,
    default: 0,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model('user', UserSchema);
