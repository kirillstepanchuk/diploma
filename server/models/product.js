const mongoose = require('mongoose');

const Product = new mongoose.Schema({
  title: {
    required: true,
    unique: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  category: {
    type: String,
  },
  additionalFields: {
    type: Object,
  },
  imageFileName: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  sellerName: {
    required: true,
    type: String,
  },
  sellerPhoneNumber: {
    required: true,
    type: String,
  },
  publicationDate: {
    type: Date,
  },
  requestDate: {
    required: true,
    type: Date,
  },
  author: {
    required: true,
    ref: 'User',
    type: String,
  },
  isApproved: {
    required: true,
    default: false,
    type: Boolean,
  },
  isDeleted: {
    required: true,
    default: false,
    type: Boolean,
  },
})

module.exports = mongoose.model('Product', Product)