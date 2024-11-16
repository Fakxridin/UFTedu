const express = require('express');
const router = express.Router();
const fineController = require('../controllers/fineController');

// Define the routes for fines
router.get('/', fineController.getAllFines);          // Get all fines
router.get('/:id', fineController.getFineById);       // Get a specific fine by ID
router.post('/', fineController.createFine);           // Create a new fine
router.put('/:id', fineController.updateFine);         // Update a specific fine by ID
router.delete('/:id', fineController.deleteFine);      // Delete a specific fine by ID

module.exports = router;