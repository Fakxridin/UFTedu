const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

// Define the routes for groups
router.get('/', groupController.getAllGroups);            // Get all groups
router.get('/:id', groupController.getGroupById);         // Get a specific group by ID
router.post('/', groupController.createGroup);             // Create a new group
router.put('/:id', groupController.updateGroup);           // Update a specific group by ID
router.delete('/:id', groupController.deleteGroup);        // Delete a specific group by ID

module.exports = router;