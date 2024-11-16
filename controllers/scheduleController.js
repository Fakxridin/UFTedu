const Schedule = require('../models/Schedule');  
exports.getAllSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find()
            .populate('day_id', 'name')  // Populate day details
            .populate('month_id', 'name')  // Populate month details
            .populate('group_id', 'name')  // Populate group details
            .populate('lesson_id', 'name');  // Populate lesson details
        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getScheduleById = async (req, res) => {
    try {
        const schedule = await Schedule.findById(req.params.id)
            .populate('day_id', 'name')
            .populate('month_id', 'name')
            .populate('group_id', 'name')
            .populate('lesson_id', 'name');
        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found.' });
        }
        res.status(200).json(schedule);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createSchedule = async (req, res) => {
    const { name, datetime, day_id, month_id, group_id, lesson_id, start_time, end_time } = req.body;

    const newSchedule = new Schedule({
        name,
        datetime,
        day_id,
        month_id,
        group_id,
        lesson_id,
        start_time,
        end_time,
    });

    try {
        const savedSchedule = await newSchedule.save();
        res.status(201).json(savedSchedule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateSchedule = async (req, res) => {
    try {
        const updatedSchedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate('day_id', 'name')
            .populate('month_id', 'name')
            .populate('group_id', 'name')
            .populate('lesson_id', 'name');
        if (!updatedSchedule) {
            return res.status(404).json({ message: 'Schedule not found.' });
        }
        res.status(200).json(updatedSchedule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.deleteSchedule = async (req, res) => {
    try {
        const deletedSchedule = await Schedule.findByIdAndDelete(req.params.id);
        if (!deletedSchedule) {
            return res.status(404).json({ message: 'Schedule not found.' });
        }
        res.status(204).send(); // No content to send
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};