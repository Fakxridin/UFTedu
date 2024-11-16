const Attendance = require('../models/Attendance');


// Get all attendance records
exports.getAllAttendance = async (req, res) => {
    try {
        const attendanceRecords = await Attendance.find()
            .populate('schedule_id', 'date') // Populate schedule details
            .populate('student_id', 'fullname'); // Populate student details
        res.status(200).json(attendanceRecords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get attendance record by ID
exports.getAttendanceById = async (req, res) => {
    try {
        const attendance = await Attendance.findById(req.params.id)
            .populate('schedule_id', 'date')
            .populate('student_id', 'fullname');
        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found.' });
        }
        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new attendance record
exports.createAttendance = async (req, res) => {
    const { schedule_id, student_id, absent, reason } = req.body;

    const newAttendance = new Attendance({
        schedule_id,
        student_id,
        absent,
        reason,
    });

    try {
        const savedAttendance = await newAttendance.save();
        res.status(201).json(savedAttendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update attendance record by ID
exports.updateAttendance = async (req, res) => {
    try {
        const updatedAttendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate('schedule_id', 'date')
            .populate('student_id', 'fullname');
        if (!updatedAttendance) {
            return res.status(404).json({ message: 'Attendance record not found.' });
        }
        res.status(200).json(updatedAttendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete attendance record by ID
exports.deleteAttendance = async (req, res) => {
    try {
        const deletedAttendance = await Attendance.findByIdAndDelete(req.params.id);
        if (!deletedAttendance) {
            return res.status(404).json({ message: 'Attendance record not found.' });
        }
        res.status(204).send(); // No content to send
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};