const PaymentRegister = require('../models/PaymentRegister');
exports.getAllPaymentRegisters = async (req, res) => {
    try {
        const paymentRegisters = await PaymentRegister.find()
            .populate('user_id', 'fullname') // Populate user details
            .populate('student_id', 'fullname'); // Populate student details
        res.status(200).json(paymentRegisters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getPaymentRegisterById = async (req, res) => {
    try {
        const paymentRegister = await PaymentRegister.findById(req.params.id)
            .populate('user_id', 'fullname')
            .populate('student_id', 'fullname');
        if (!paymentRegister) {
            return res.status(404).json({ message: 'Payment register not found.' });
        }
        res.status(200).json(paymentRegister);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createPaymentRegister = async (req, res) => {
    const { user_id, type, amount, student_id, comment, place } = req.body;

    const newPaymentRegister = new PaymentRegister({
        user_id,
        type,
        amount,
        student_id,
        comment,
        place,
    });

    try {
        const savedPaymentRegister = await newPaymentRegister.save();
        res.status(201).json(savedPaymentRegister);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updatePaymentRegister = async (req, res) => {
    try {
        const updatedPaymentRegister = await PaymentRegister.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate('user_id', 'fullname')
            .populate('student_id', 'fullname');
        if (!updatedPaymentRegister) {
            return res.status(404).json({ message: 'Payment register not found.' });
        }
        res.status(200).json(updatedPaymentRegister);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.deletePaymentRegister = async (req, res) => {
    try {
        const deletedPaymentRegister = await PaymentRegister.findByIdAndDelete(req.params.id);
        if (!deletedPaymentRegister) {
            return res.status(404).json({ message: 'Payment register not found.' });
        }
        res.status(204).send(); // No content to send
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};