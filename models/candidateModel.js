const pool = require('../config/db');

const createCandidate = async (name, email, phone_no, status_id, interviewer_id,date) => {
  const result = await pool.query(
    'INSERT INTO candidates (name, email, phone_no, status_id, interviewer_id,date) VALUES ($1, $2, $3, $4, $5,$6) RETURNING *',
    [name, email, phone_no, status_id, interviewer_id,date]
  );
  return result.rows[0];
};

const getCandidatesByInterviewer = async (interviewer_id) => {
  const result = await pool.query('SELECT * FROM candidates WHERE interviewer_id = $1', [interviewer_id]);
  return result.rows;
};
const getSingleCandidatesByInterviewer = async (interviewer_id,candidate_id) => {
  const result = await pool.query('SELECT * FROM candidates WHERE interviewer_id = $1 AND id=$2', [interviewer_id,candidate_id]);
  return result.rows;
};
// Update a candidate by ID
const updateCandidateById = async (id, { name, email, phone_no, status_id,date }) => {
  const result = await pool.query(
    'UPDATE candidates SET name = $1, email = $2, phone_no = $3, status_id = $4,date=$5 WHERE id = $6 RETURNING *',
    [name, email, phone_no, status_id, date, id]
  );
  return result.rows[0];
};

// Delete a candidate by ID
const deleteCandidateById = async (id) => {
  const result = await pool.query('DELETE FROM candidates WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};


module.exports = { createCandidate, getCandidatesByInterviewer, getSingleCandidatesByInterviewer,updateCandidateById, deleteCandidateById};
