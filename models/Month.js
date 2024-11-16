const mongoose = require('mongoose');

const monthSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  index: {
    type: Number,
    required: true,
    unique: true,
  }
}, {
  timestamps: false,  // Not necessary for static data
  versionKey: false,  // Removes the `__v` field from documents
});

const Month = mongoose.model('Month', monthSchema);

module.exports = Month;
