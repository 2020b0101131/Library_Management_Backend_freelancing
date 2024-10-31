const pool = require('../config/db');

const createCandidate = async (name, fatherName, mobileNo, email, aadharNo, address, feeAmount, library_id, joinDate) => {
  const result = await pool.query(
    `INSERT INTO student (name, father_name, mobile_no, email, aadhar_no, address, library_id, join_date, fee_amount)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING student_id, name, father_name, mobile_no, email, aadhar_no, address, library_id, join_date, fee_amount`,
     [name, fatherName, mobileNo, email, aadharNo, address, library_id, joinDate, feeAmount]
  );
  return result.rows[0];
};

const getCandidatesByLibrary = async (library_id) => {
  const result = await pool.query('SELECT * FROM student WHERE library_id = $1', [library_id]);
  return result.rows;
};

const getSingleCandidatesByLibrary = async (library_id, candidate_id) => {
  const result = await pool.query('SELECT * FROM student WHERE library_id = $1 AND student_id=$2', [library_id, candidate_id]);
  return result.rows;
};
// Update a candidate by ID
const updateCandidateById = async (id, { name, fatherName, mobileNo, email, aadharNo, address, feeAmount, joinDate }) => {
  const result = await pool.query(
    'UPDATE student SET name = $1, father_name = $2, mobile_no = $3, email = $4, aadhar_no = $5, address = $6, join_date = $7, fee_amount = $8 WHERE student_id = $9 RETURNING *',
    [name, fatherName, mobileNo, email, aadharNo, address, joinDate, feeAmount, id]
  );
  return result.rows[0];
};

// Delete a candidate by ID
const deleteCandidateById = async (id) => {
  const result = await pool.query('DELETE FROM student WHERE student_id = $1 RETURNING *', [id]);
  return result.rows[0];
};


module.exports = { createCandidate, getCandidatesByLibrary, getSingleCandidatesByLibrary,updateCandidateById, deleteCandidateById};
