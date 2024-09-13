const pool = require('../config/db');

const getAllStatuses = async () => {
  const result = await pool.query('SELECT * FROM statuses');
  return result.rows;
};

module.exports = { getAllStatuses };
