const express = require('express');
const router = express.Router();
const fineRegisterController = require('../controllers/fineregController');

// Define the routes for fine registrations
router.get('/', fineRegisterController.getAllFineRegisters);              // Get all fine registrations
router.get('/:id', fineRegisterController.getFineRegisterById);           // Get a specific fine registration by ID
router.post('/', fineRegisterController.createFineRegister);               // Create a new fine registration
router.put('/:id', fineRegisterController.updateFineRegister);             // Update a specific fine registration by ID
router.delete('/:id', fineRegisterController.deleteFineRegister);          // Delete a specific fine registration by ID

module.exports = router;