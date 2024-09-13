const pool = require('../config/db');

const getAllSubjects = async () => {
  const result = await pool.query('SELECT * FROM subjects');
  return result.rows;
};

const createSubject = async (subject_name) => {
  const result = await pool.query(
    'INSERT INTO subjects (subject_name) VALUES ($1) RETURNING *',
    [subject_name]
  );
  return result.rows[0];
};

module.exports = { getAllSubjects, createSubject };
