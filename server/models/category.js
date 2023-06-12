const mongoose = require('mongoose');

const Category = new mongoose.Schema({
  name: {
    required: true,
    unique: true,
    type: String,
  },
  sysname: {
    required: true,
    unique: true,
    type: String,
  },
  fields: [{
    type: Object, // Schema.Types.Mixed
  }],
})

module.exports = mongoose.model('Category', Category);
