const pool = require('../config/db');

const createQuestion = async (question_text, subject_id, interviewer_id = null) => {
  const result = await pool.query(
    'INSERT INTO questions (question_text, subject_id, interviewer_id) VALUES ($1, $2, $3) RETURNING *',
    [question_text, subject_id, interviewer_id]
  );
  return result.rows[0];
};

const getQuestionsBySubject = async (subject_id,interviewer_id) => {
  const result = await pool.query('SELECT * FROM questions WHERE subject_id = $1 AND interviewer_id=$2', [subject_id,interviewer_id]);
  return result.rows;
};

const deleteQuestion = async (question_id, interviewer_id) => {
  const result = await pool.query(
    'DELETE FROM questions WHERE id = $1 AND (interviewer_id = $2 OR interviewer_id IS NULL) RETURNING *',
    [question_id, interviewer_id]
  );
  return result.rowCount > 0; // Return true if question was deleted
};

module.exports = { createQuestion, getQuestionsBySubject, deleteQuestion };
