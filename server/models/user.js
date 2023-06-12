const mongoose = require('mongoose');

const User = new mongoose.Schema({
  name: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  email: {
    required: true,
    unique: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  isActivated: {
    default: false,
    type: Boolean,
  },
  activationLink: {
    type: String,
  },
  roles: [
    {
      ref: 'Role',
      type: String,
    }
  ],
  isBlocked:{
    default: false,
    type: Boolean,
  },
  favoriteProducts: [
    {
      ref: 'Product',
      type: String,
      // type: mongoose.Schema.Types.ObjectId,
    }
  ]
})

module.exports = mongoose.model('User', User)