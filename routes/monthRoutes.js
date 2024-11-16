const express = require('express');
const router = express.Router();
const monthController = require('../controllers/monthController');

// Define the routes for months
router.get('/', monthController.getAllMonths);           // Get all months
router.get('/:id', monthController.getMonthById);       // Get a specific month by ID
router.post('/', monthController.createMonth);           // Create a new month
router.put('/:id', monthController.updateMonth);         // Update a specific month by ID
router.delete('/:id', monthController.deleteMonth);      // Delete a specific month by ID

module.exports = router;