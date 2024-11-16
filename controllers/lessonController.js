const Lesson = require('../models/Lesson');
exports.getAllLessons = async (req, res) => {
    try {
        const lessons = await Lesson.find().populate('students', 'name'); // Populate student names
        res.status(200).json(lessons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getLessonById = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id).populate('students', 'name');
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found.' });
        }
        res.status(200).json(lesson);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createLesson = async (req, res) => {
    const { name, students } = req.body;

    const newLesson = new Lesson({
        name,
        students,
    });

    try {
        const savedLesson = await newLesson.save();
        res.status(201).json(savedLesson);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateLesson = async (req, res) => {
    try {
        const updatedLesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('students', 'name');
        if (!updatedLesson) {
            return res.status(404).json({ message: 'Lesson not found.' });
        }
        res.status(200).json(updatedLesson);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteLesson = async (req, res) => {
    try {
        const deletedLesson = await Lesson.findByIdAndDelete(req.params.id);
        if (!deletedLesson) {
            return res.status(404).json({ message: 'Lesson not found.' });
        }
        res.status(204).send(); // No content to send
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};