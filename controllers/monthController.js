const Month = require('../models/Month');

exports.getAllMonths = async (req, res) => {
    try {
        const months = await Month.find();
        res.status(200).json(months);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getMonthById = async (req, res) => {
    try {
        const month = await Month.findById(req.params.id);
        if (!month) {
            return res.status(404).json({ message: 'Month not found.' });
        }
        res.status(200).json(month);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createMonth = async (req, res) => {
    const { name, index } = req.body;

    const newMonth = new Month({
        name,
        index,
    });

    try {
        const savedMonth = await newMonth.save();
        res.status(201).json(savedMonth);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateMonth = async (req, res) => {
    try {
        const updatedMonth = await Month.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMonth) {
            return res.status(404).json({ message: 'Month not found.' });
        }
        res.status(200).json(updatedMonth);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.deleteMonth = async (req, res) => {
    try {
        const deletedMonth = await Month.findByIdAndDelete(req.params.id);
        if (!deletedMonth) {
            return res.status(404).json({ message: 'Month not found.' });
        }
        res.status(204).send(); // No content to send
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};