const LessonPayment = require('../models/LessonPayment');
exports.getAllPayments = async (req, res) => {
    try {
        const payments = await LessonPayment.find()
            .populate('user_id', 'fullname') // Populate user details
            .populate('student_id', 'fullname') // Populate student details
            .populate('lesson_id', 'name'); // Populate lesson details
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getPaymentById = async (req, res) => {
    try {
        const payment = await LessonPayment.findById(req.params.id)
            .populate('user_id', 'fullname')
            .populate('student_id', 'fullname')
            .populate('lesson_id', 'name');
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found.' });
        }
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createPayment = async (req, res) => {
    const { user_id, student_id, lesson_id, amount, type, description } = req.body;

    const newPayment = new LessonPayment({
        user_id,
        student_id,
        lesson_id,
        amount,
        type,
        description,
    });

    try {
        const savedPayment = await newPayment.save();
        res.status(201).json(savedPayment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updatePayment = async (req, res) => {
    try {
        const updatedPayment = await LessonPayment.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate('user_id', 'fullname')
            .populate('student_id', 'fullname')
            .populate('lesson_id', 'name');
        if (!updatedPayment) {
            return res.status(404).json({ message: 'Payment not found.' });
        }
        res.status(200).json(updatedPayment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.deletePayment = async (req, res) => {
    try {
        const deletedPayment = await LessonPayment.findByIdAndDelete(req.params.id);
        if (!deletedPayment) {
            return res.status(404).json({ message: 'Payment not found.' });
        }
        res.status(204).send(); // No content to send
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};