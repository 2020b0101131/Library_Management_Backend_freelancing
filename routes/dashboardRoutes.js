const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {updateProfile,upload,getProfile} = require('../controllers/dashboardController');

// POST route for dashboard form submission
router.patch('/add-profile',auth, upload.single('img'), updateProfile);
router.get('/profile',auth, getProfile);

module.exports = router;