const { updateProfileById, getProfileByInterviewer } = require('../models/dashboardModel');
const multer = require('multer');
const path = require('path');

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Set the destination folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Create a unique file name
    }
  });
  
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limit image size to 5MB
    fileFilter: (req, file, cb) => {
      const filetypes = /jpeg|jpg|png/; // Accept only jpg, jpeg, and png formats
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = filetypes.test(file.mimetype);
  
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb(new Error('Images only!'));
      }
    }
  });

 

const getProfile = async (req, res) => {
  const interviewer_id = req.user.id;
  try {
    const profile = await getProfileByInterviewer(interviewer_id);
    res.json(profile);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching profile', error: err });
  }
};


// Update a profile by ID
const updateProfile = async (req, res) => {
  const id  = req.user.id;
    //Handle image upload
    const img = req.file ? `/uploads/${req.file.filename}` : null;
  const { username, bio } = req.body;
  console.log(req.body,img,id);

  try {
    const profile = await updateProfileById(id, { username,bio, img});
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(400).json({ message: 'Error updating profile', error: err });
  }
};



module.exports = { updateProfile,  upload, getProfile};
