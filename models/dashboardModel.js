const pool = require('../config/db');

const createProfile = async (username, bio, email, img, interviewer_id) => {
  const result = await pool.query(
    'INSERT INTO user_profile (name, email, bio, profile_image_url, interviewer_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [username, email,bio, img, interviewer_id]
  );
  return result.rows[0];
};

const getProfileByInterviewer = async (interviewer_id) => {
  const result = await pool.query('SELECT * FROM user_profile WHERE interviewer_id = $1', [interviewer_id]);
  const result2=await pool.query('SELECT * FROM statistics WHERE user_id = $1', [interviewer_id])
  const result3=await pool.query('SELECT * FROM interview_stats WHERE user_id = $1', [interviewer_id])
  return {
    userProfile: result.rows,
    statistics: result2.rows,
    interviewStats: result3.rows
  };
};

// const getSingleCandidatesByInterviewer = async (interviewer_id,candidate_id) => {
//   const result = await pool.query('SELECT * FROM candidates WHERE interviewer_id = $1 AND id=$2', [interviewer_id,candidate_id]);
//   return result.rows;
// };

// // Update a candidate by ID
// const updateCandidateById = async (id, { name, email, phone_no, status_id,date }) => {
//   const result = await pool.query(
//     'UPDATE candidates SET name = $1, email = $2, phone_no = $3, status_id = $4,date=$5 WHERE id = $6 RETURNING *',
//     [name, email, phone_no, status_id, date, id]
//   );
//   return result.rows[0];
// };

// // Delete a candidate by ID
// const deleteCandidateById = async (id) => {
//   const result = await pool.query('DELETE FROM candidates WHERE id = $1 RETURNING *', [id]);
//   return result.rows[0];
// };


module.exports = { createProfile, getProfileByInterviewer};
