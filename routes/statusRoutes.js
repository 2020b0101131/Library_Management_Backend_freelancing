const express = require('express');
const { getAllStatusesHandler } = require('../controllers/statusController');
const router = express.Router();

// Get all statuses
router.get('/', getAllStatusesHandler);

module.exports = router;
