const express = require('express');
const { addCandidate, getCandidates,getSingleCandidates,updateCandidate, deleteCandidate  } = require('../controllers/candidateController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', auth, addCandidate);
router.get('/all', auth, getCandidates);
router.get('/:id', auth, getSingleCandidates);
router.put('/edit/:id', auth, updateCandidate);
router.delete('/delete/:id', auth, deleteCandidate);


module.exports = router;
