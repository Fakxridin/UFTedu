const Fine = require('../models/Fine');

// Get all fines
exports.getAllFines = async (req, res) => {
    try {
        const fines = await Fine.find();
        res.status(200).json(fines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a fine by ID
exports.getFineById = async (req, res) => {
    try {
        const fine = await Fine.findById(req.params.id);
        if (!fine) {
            return res.status(404).json({ message: 'Fine not found.' });
        }
        res.status(200).json(fine);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new fine
exports.createFine = async (req, res) => {
    const { name, price } = req.body;

    const newFine = new Fine({
        name,
        price,
    });

    try {
        const savedFine = await newFine.save();
        res.status(201).json(savedFine);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a fine by ID
exports.updateFine = async (req, res) => {
    try {
        const updatedFine = await Fine.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedFine) {
            return res.status(404).json({ message: 'Fine not found.' });
        }
        res.status(200).json(updatedFine);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a fine by ID
exports.deleteFine = async (req, res) => {
    try {
        const deletedFine = await Fine.findByIdAndDelete(req.params.id);
        if (!deletedFine) {
            return res.status(404).json({ message: 'Fine not found.' });
        }
        res.status(204).send(); // No content to send
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};