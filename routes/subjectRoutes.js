const express = require('express');
const { getAllSubjectsHandler, createSubjectHandler } = require('../controllers/subjectController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// Get all subjects
router.get('/', getAllSubjectsHandler);

// Add a new subject (requires authentication)
router.post('/add', auth, createSubjectHandler);

module.exports = router;
