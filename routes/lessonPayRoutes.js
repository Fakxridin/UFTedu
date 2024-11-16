const express = require('express');
const router = express.Router();
const lessonPaymentController = require('../controllers/lessonpayController');

// Define the routes for lesson payments
router.get('/', lessonPaymentController.getAllPayments);            // Get all payments
router.get('/:id', lessonPaymentController.getPaymentById);        // Get a specific payment by ID
router.post('/', lessonPaymentController.createPayment);            // Create a new payment
router.put('/:id', lessonPaymentController.updatePayment);          // Update a specific payment by ID
router.delete('/:id', lessonPaymentController.deletePayment);       // Delete a specific payment by ID

module.exports = router;