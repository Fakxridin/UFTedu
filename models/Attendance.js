const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  schedule_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schedule',  
    required: true,
  },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  absent: {
    type: Boolean,
    required: true,
    default: false,  
  },
  reason: {
    type: String,
    trim: true,
    default: '',  
  }
}, {
  timestamps: true,  
  versionKey: false  
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
