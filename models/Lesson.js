const mongoose = require('mongoose');

// Define the Lesson schema
const lessonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensures the lesson name is unique
    trim: true,
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // References the User model (students)
    required: true,
  }],
}, {
  timestamps: true,
  versionKey: false, // Disable the __v field
});

// Export the model
module.exports = mongoose.model('Lesson', lessonSchema);
