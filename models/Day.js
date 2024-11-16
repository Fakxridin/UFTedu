const mongoose = require('mongoose');

// Define the Day schema
const daySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensure each day is unique
  },
  index: {
    type: Number,
    required: true, // Day order (1 for Dushanba, 2 for Seshanba, etc.)
    unique: true,
  },
}, {
  timestamps: false,
  versionKey: false,
});

// Export the Day model
module.exports = mongoose.model('Day', daySchema);
