const Day = require('../models/Day');
const { body, validationResult } = require('express-validator');

// Get all days
exports.getAllDays = async (req, res) => {
    try {
        const days = await Day.find();
        res.status(200).json(days);
    } catch (error) {
        console.error('Error fetching days:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get a day by ID
exports.getDayById = async (req, res) => {
    try {
        const day = await Day.findById(req.params.id);
        if (!day) {
            return res.status(404).json({ message: 'Day not found.' });
        }
        res.status(200).json(day);
    } catch (error) {
        console.error('Error fetching day:', error);
        res.status(500).json({ message: error.message });
    }
};

// Create a new day
exports.createDay = [
    body('name').isString().notEmpty(),
    body('index').isNumeric(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, index } = req.body;
        const newDay = new Day({ name, index });

        try {
            const savedDay = await newDay.save();
            res.status(201).json(savedDay);
        } catch (error) {
            console.error('Error creating day:', error);
            res.status(500).json({ message: error.message });
        }
    }
];

// Update a day by ID
exports.updateDay = async (req, res) => {
    try {
        const updatedDay = await Day.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDay) {
            return res.status(404).json({ message: 'Day not found.' });
        }
        res.status(200).json(updatedDay);
    } catch (error) {
        console.error('Error updating day:', error);
        res.status(500).json({ message: error.message });
    }
};

// Delete a day by ID
exports.deleteDay = async (req, res) => {
    try {
        const deletedDay = await Day.findByIdAndDelete(req.params.id);
        if (!deletedDay) {
            return res.status(404).json({ message: 'Day not found.' });
        }
        res.status(204).send(); // No content to send after deletion
    } catch (error) {
        console.error('Error deleting day:', error);
        res.status(500).json({ message: error.message });
    }
};