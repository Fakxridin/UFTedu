const mongoose = require('mongoose');

const paymentRegisterSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to User model for the user initiating the payment
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,  // The amount to be added or deducted
  },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to User model for the student receiving the payment
    required: true,
  },
  comment: {
    type: String,
    trim: true,  // Optional field for additional information about the transaction
    default: '',
  },
  place: {
    type: String,
    trim: true,  // Optional field for the place of payment (e.g., location or method)
    default: '',
  },
  date: {
    type: Date,
    default: Date.now,  // Record the date of payment or deduction
  }
}, {
  timestamps: true,  // Adds `createdAt` and `updatedAt` fields
  versionKey: false  // Removes the `__v` field
});

const PaymentRegister = mongoose.model('PaymentRegister', paymentRegisterSchema);

module.exports = PaymentRegister;
