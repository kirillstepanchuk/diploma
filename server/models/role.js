const mongoose = require('mongoose');

const Role = new mongoose.Schema({
  value: {
    default: 'USER',
    unique: true,
    type: String,
  },
})

module.exports = mongoose.model('Role', Role)