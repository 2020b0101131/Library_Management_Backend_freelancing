const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {addProfile,upload,getProfile} = require('../controllers/dashboardController');

// POST route for dashboard form submission
router.post('/add-profile',auth, upload.single('img'), addProfile);
router.get('/profile',auth, getProfile);

module.exports = router;