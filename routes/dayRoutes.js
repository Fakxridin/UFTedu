const express = require('express');
const router = express.Router();
const dayController = require('../controllers/dayController');

// Define the routes for days
router.get('/', dayController.getAllDays);          // Get all days
router.get('/:id', dayController.getDayById);       // Get a specific day by ID
router.post('/', dayController.createDay);           // Create a new day
router.put('/:id', dayController.updateDay);         // Update a specific day by ID
router.delete('/:id', dayController.deleteDay);      // Delete a specific day by ID

module.exports = router;