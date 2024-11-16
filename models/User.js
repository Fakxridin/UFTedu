const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^\d{10,15}$/, 'Please use a valid phone number.'],
  },
  role: {
    type: String,
    default: 'user',
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    default: null,
  },
}, {
  timestamps: true,
  versionKey: false, // Disable the __v field
});

// Export the model
module.exports = mongoose.model('User', userSchema);
