const express = require('express');
const { createQuestionHandler, getQuestionsBySubjectHandler, deleteQuestionHandler } = require('../controllers/questionController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// Add a new question (requires authentication)
router.post('/add', auth, createQuestionHandler);

// Get questions by subject
router.get('/:subject_id',auth, getQuestionsBySubjectHandler);

// Delete a question (only interviewer can delete their own questions)
router.delete('/:id', auth, deleteQuestionHandler);

module.exports = router;
