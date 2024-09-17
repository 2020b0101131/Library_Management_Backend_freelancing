const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// POST route for contact form submission
router.post('/detail', contactController.sendContactForm);

module.exports = router;