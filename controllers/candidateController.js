const { createCandidate, getCandidatesByLibrary,getSingleCandidatesByLibrary,updateCandidateById, deleteCandidateById } = require('../models/candidateModel');

const addCandidate = async (req, res) => {
  const { name, fatherName, mobileNo, email, aadharNo, address, feeAmount,joinDate } = req.body;
  
  const library_id = req.user.id; // From auth middleware

  try {
    const candidate = await createCandidate(name, fatherName, mobileNo, email, aadharNo, address, feeAmount, library_id, joinDate);
    res.status(201).json({ candidate });
  } catch (err) {
    res.status(400).json({ message: 'Error adding candidate', error: err });
  }
};

const getCandidates = async (req, res) => {
  const library_id = req.user.id;
  try {
    const candidates = await getCandidatesByLibrary(library_id);
const adjustedCandidates = candidates.map(candidate => {
  const joinDate = new Date(candidate.join_date);
  const formattedJoinDate = `${String(joinDate.getDate()).padStart(2, '0')}/${String(joinDate.getMonth() + 1).padStart(2, '0')}/${joinDate.getFullYear()}`;
  
  return {
    ...candidate,
    joinDate: formattedJoinDate
  };
});

res.json(adjustedCandidates);
  } catch (err) {
    res.status(400).json({ message: "Error fetching candidates", error: err });
  }
};

const getSingleCandidates = async (req, res) => {
  const library_id = req.user.id;
  const candidate_id = req.params.id;

  try {
    const candidates = await getSingleCandidatesByLibrary(library_id,candidate_id);
    res.json(candidates[0]);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching candidates', error: err });
  }
};
// Update a candidate by ID
const updateCandidate = async (req, res) => {
  const { id } = req.params;
  const { name, fatherName, mobileNo, email, aadharNo, address, feeAmount,joinDate  } = req.body;

  try {
    const candidate = await updateCandidateById(id, { name, fatherName, mobileNo, email, aadharNo, address, feeAmount,joinDate  });
    if (!candidate) return res.status(404).json({success:false, message: 'Candidate not found' });
    res.json({...candidate, success:true});
  } catch (err) {
    res.status(400).json({success:false,message: 'Error updating candidate', error: err });
  }
};

// Delete a candidate by ID
const deleteCandidate = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deleteCandidateById(id);
    if (result.deletedCount === 0) return res.status(404).json({success:false, message: 'Candidate not found' });
    res.json({success:true, message: 'Candidate deleted' });
  } catch (err) {
    res.status(400).json({success:false, message: 'Error deleting candidate', error: err });
  }
};

module.exports = { addCandidate, getCandidates,updateCandidate, getSingleCandidates,deleteCandidate };
