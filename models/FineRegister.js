const mongoose = require('mongoose');

const fineRegisterSchema = new mongoose.Schema({
  datetime: {
    type: Date,
    default: Date.now,
    required: true,
  },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  
    required: true,
  },
  lesson_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',  
    required: true,
  },
  group_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',  
    required: true,
  },
  fine_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fine',  
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  }
}, {
  timestamps: true,  
  versionKey: false,  
});
const FineRegister = mongoose.model('FineRegister', fineRegisterSchema);



module.exports = FineRegister;
