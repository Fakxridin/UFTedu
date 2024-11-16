const express = require('express');
const router = express.Router();
const paymentRegisterController = require('../controllers/paymentRegController');

// Define the routes for payment registers
router.get('/', paymentRegisterController.getAllPaymentRegisters);          // Get all payment registers
router.get('/:id', paymentRegisterController.getPaymentRegisterById);      // Get a specific payment register by ID
router.post('/', paymentRegisterController.createPaymentRegister);          // Create a new payment register
router.put('/:id', paymentRegisterController.updatePaymentRegister);        // Update a specific payment register by ID
router.delete('/:id', paymentRegisterController.deletePaymentRegister);     // Delete a specific payment register by ID

module.exports = router;