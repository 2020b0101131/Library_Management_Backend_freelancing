const { createProfile, getProfileByInterviewer } = require('../models/dashboardModel');
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

  
const addProfile = async (req, res) => {
  const { username, bio, email} = req.body;
  const interviewer_id = req.user.id; // From auth middleware
    // Handle image upload
    const img = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const candidate = await createProfile(username, bio, email, img, interviewer_id);
    res.status(201).json({ candidate });
  } catch (err) {
    res.status(400).json({ message: 'Error adding candidate', error: err });
  }
};

const getProfile = async (req, res) => {
  const interviewer_id = req.user.id;
  try {
    const profile = await getProfileByInterviewer(interviewer_id);
    res.json(profile);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching profile', error: err });
  }
};

// const getSingleCandidates = async (req, res) => {
//   const interviewer_id = req.user.id;
//   const candidate_id = req.params.id;

//   try {
//     const candidates = await getSingleCandidatesByInterviewer(interviewer_id,candidate_id);
//     res.json(candidates);
//   } catch (err) {
//     res.status(400).json({ message: 'Error fetching candidates', error: err });
//   }
// };
// // Update a candidate by ID
// const updateCandidate = async (req, res) => {
//   const { id } = req.params;
//   const { name, email, phone_no, status_id,date } = req.body;

//   try {
//     const candidate = await updateCandidateById(id, { name, email, phone_no, status_id,date });
//     if (!candidate) return res.status(404).json({ message: 'Candidate not found' });
//     res.json(candidate);
//   } catch (err) {
//     res.status(400).json({ message: 'Error updating candidate', error: err });
//   }
// };

// // Delete a candidate by ID
// const deleteCandidate = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const result = await deleteCandidateById(id);
//     if (result.deletedCount === 0) return res.status(404).json({ message: 'Candidate not found' });
//     res.json({ message: 'Candidate deleted' });
//   } catch (err) {
//     res.status(400).json({ message: 'Error deleting candidate', error: err });
//   }
// };

module.exports = { addProfile,  upload, getProfile};
