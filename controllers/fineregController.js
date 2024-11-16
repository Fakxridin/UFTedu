const FineRegister = require('../models/FineRegister');

// Get all fine registrations
exports.getAllFineRegisters = async (req, res) => {
    try {
        const fineRegisters = await FineRegister.find()
            .populate('student_id', 'name')   // Populate student details (modify as needed)
            .populate('lesson_id', 'title')    // Populate lesson details (modify as needed)
            .populate('group_id', 'name')      // Populate group details (modify as needed)
            .populate('fine_id', 'name price'); // Populate fine details (modify as needed)
        
        res.status(200).json(fineRegisters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a fine registration by ID
exports.getFineRegisterById = async (req, res) => {
    try {
        const fineRegister = await FineRegister.findById(req.params.id)
            .populate('student_id', 'name')
            .populate('lesson_id', 'title')
            .populate('group_id', 'name')
            .populate('fine_id', 'name price');

        if (!fineRegister) {
            return res.status(404).json({ message: 'Fine registration not found.' });
        }
        
        res.status(200).json(fineRegister);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new fine registration
exports.createFineRegister = async (req, res) => {
    const { student_id, lesson_id, group_id, fine_id, price } = req.body;

    // Validate Object IDs
    if (!mongoose.Types.ObjectId.isValid(student_id) || 
        !mongoose.Types.ObjectId.isValid(lesson_id) ||
        !mongoose.Types.ObjectId.isValid(group_id) ||
        !mongoose.Types.ObjectId.isValid(fine_id)) {
        return res.status(400).json({ success: false, message: 'Invalid ID format provided.' });
    }

    // Check if referenced documents exist
    try {
        const [studentExists, lessonExists, groupExists, fineExists] = await Promise.all([
            User.findById(student_id),
            Lesson.findById(lesson_id),
            Group.findById(group_id),
            Fine.findById(fine_id),
        ]);

        if (!studentExists || !lessonExists || !groupExists || !fineExists) {
            return res.status(404).json({ success: false, message: 'One or more referenced documents do not exist.' });
        }

        const newFineRegister = new FineRegister({
            student_id,
            lesson_id,
            group_id,
            fine_id,
            price,
        });

        const savedFineRegister = await newFineRegister.save();
        res.status(201).json({ success: true, data: savedFineRegister });
    } catch (error) {
        console.error("Error creating fine registration:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
// Update a fine registration by ID
exports.updateFineRegister = async (req, res) => {
    try {
        const updatedFineRegister = await FineRegister.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        if (!updatedFineRegister) {
            return res.status(404).json({ message: 'Fine registration not found.' });
        }
        
        res.status(200).json(updatedFineRegister);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a fine registration by ID
exports.deleteFineRegister = async (req, res) => {
    try {
        const deletedFineRegister = await FineRegister.findByIdAndDelete(req.params.id);
        
        if (!deletedFineRegister) {
            return res.status(404).json({ message: 'Fine registration not found.' });
        }
        
        res.status(204).send(); // No content to send
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};