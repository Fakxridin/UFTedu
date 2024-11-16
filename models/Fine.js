const mongoose = require('mongoose');

const fineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  }
}, {
  timestamps: false, 
  versionKey: false,  
});

const Fine = mongoose.model('Fine', fineSchema);

module.exports = Fine;
