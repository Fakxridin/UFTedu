const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

// Define the routes for lessons
router.get('/', lessonController.getAllLessons);            // Get all lessons
router.get('/:id', lessonController.getLessonById);         // Get a specific lesson by ID
router.post('/', lessonController.createLesson);             // Create a new lesson
router.put('/:id', lessonController.updateLesson);           // Update a specific lesson by ID
router.delete('/:id', lessonController.deleteLesson);        // Delete a specific lesson by ID

module.exports = router;