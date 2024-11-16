const mongoose = require('mongoose');

const lessonPaymentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to User model for the user initiating the payment
    required: true,
  },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to User model for students
    required: true,
  },
  lesson_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',  // Reference to Lesson model
    required: true,
  },
  amount: {
    type: Number,
    required: true,  // The amount to be added or deducted
  },
  type: {
    type: Number,
    enum: [0, 1],  // 0 for minus, 1 for plus
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,  // Record the date of payment or deduction
  },
  description: {
    type: String,
    trim: true,  // Optional field for additional information about the transaction
    default: '',
  }
}, {
  timestamps: true,  // Adds `createdAt` and `updatedAt` fields
  versionKey: false  // Removes the `__v` field
});

const LessonPayment = mongoose.model('LessonPayment', lessonPaymentSchema);

module.exports = LessonPayment;
