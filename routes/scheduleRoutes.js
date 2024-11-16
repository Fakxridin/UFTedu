const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController'); // Import the Schedule controller

// Route to get all schedules
router.get('/', scheduleController.getAllSchedules);

// Route to get a schedule by ID
router.get('/:id', scheduleController.getScheduleById);

// Route to create a new schedule
router.post('/', scheduleController.createSchedule);

// Route to update a schedule by ID
router.put('/:id', scheduleController.updateSchedule);

// Route to delete a schedule by ID
router.delete('/:id', scheduleController.deleteSchedule);

module.exports = router;