const pool = require('../config/db');

// const createProfile = async (username, bio, email, img, interviewer_id) => {
//   const result = await pool.query(
//     'INSERT INTO user_profile (name, bio, profile_image_url, interviewer_id) VALUES ($1, $2, $3, $4) RETURNING *',
//     [username, bio, img, interviewer_id]
//   );
//   return result.rows[0];
// };

const getProfileByInterviewer = async (interviewer_id) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [interviewer_id]);
  const result2=await pool.query('SELECT * FROM statistics WHERE user_id = $1', [interviewer_id])
  const result3=await pool.query('SELECT * FROM interview_stats WHERE user_id = $1', [interviewer_id])
  return {
    userProfile: result.rows,
    statistics: result2.rows,
    interviewStats: result3.rows
  };
};



// Update a candidate by ID
const updateProfileById = async (id, { username, bio, img}) => {
  const result = await pool.query(
    'UPDATE users SET name = $1, bio = $2, profile_image_url = $3 WHERE id = $4 RETURNING *',
    [username, bio, img,id]
  );
  return result.rows[0];
};




module.exports = { updateProfileById, getProfileByInterviewer};
