const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const checkRole = require('../middleware/permissionMiddleware');

// Define the routes for attendance
router.get('/', checkRole(['admin', 'student']), attendanceController.getAllAttendance);         // Get all attendance records
router.get('/:id',   checkRole(['admin', 'student']), attendanceController.getAttendanceById);     // Get a specific attendance record by ID
router.post('/',  checkRole(['admin']), attendanceController.createAttendance);         // Create a new attendance record
router.put('/:id',  checkRole(['admin']), attendanceController.updateAttendance);       // Update a specific attendance record by ID
router.delete('/:id',  checkRole(['admin']), attendanceController.deleteAttendance);    // Delete a specific attendance record by ID

module.exports = router;