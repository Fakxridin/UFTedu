const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensures each group name is unique
    trim: true,
  },
  student_count: {
    type: Number,
    required: true,
    min: 0, // Ensures student count cannot be negative
    default: 0,
  },
}, {
  timestamps: true,
  versionKey: false, // Disable the __v field
});

// Export the model
module.exports = mongoose.model('Group', groupSchema);

