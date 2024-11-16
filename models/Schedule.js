const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  datetime: {
    type: Date,
    required: true,
  },
  day_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Day',  // Reference to Day model
    required: true,
  },
  month_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Month',  // Reference to Month model
    required: true,
  },
  group_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',  // Reference to Group model
    required: true,
  },
  lesson_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',  // Reference to Lesson model
    required: true,
  },
  start_time: {
    type: String,  // Store as a string in "HH:MM" format
    required: true,
  },
  end_time: {
    type: String,  // Store as a string in "HH:MM" format
    required: true,
  }
}, {
  timestamps: true,  // Adds `createdAt` and `updatedAt` fields
  versionKey: false  // Removes the `__v` field
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
