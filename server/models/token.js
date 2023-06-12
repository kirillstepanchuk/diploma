const mongoose = require('mongoose');

const Token = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  refreshToken: {
    required: true,
    type: String,
  },
})

module.exports = mongoose.model('Token', Token)