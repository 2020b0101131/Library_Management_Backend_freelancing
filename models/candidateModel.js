const pool = require('../config/db');

const createCandidate = async (name, email, phone_no, status_id, interviewer_id) => {
  const result = await pool.query(
    'INSERT INTO candidates (name, email, phone_no, status_id, interviewer_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [name, email, phone_no, status_id, interviewer_id]
  );
  return result.rows[0];
};

const getCandidatesByInterviewer = async (interviewer_id) => {
  const result = await pool.query('SELECT * FROM candidates WHERE interviewer_id = $1', [interviewer_id]);
  return result.rows;
};
// Update a candidate by ID
const updateCandidateById = async (id, { name, email, phone_no, status_id }) => {
  const result = await pool.query(
    'UPDATE candidates SET name = $1, email = $2, phone_no = $3, status_id = $4 WHERE id = $5 RETURNING *',
    [name, email, phone_no, status_id, id]
  );
  return result.rows[0];
};

// Delete a candidate by ID
const deleteCandidateById = async (id) => {
  const result = await pool.query('DELETE FROM candidates WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};


module.exports = { createCandidate, getCandidatesByInterviewer, updateCandidateById, deleteCandidateById};
