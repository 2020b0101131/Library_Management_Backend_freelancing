const pool = require('../config/db');

const createUser = async (name, email, mobileNo, aadharNo, libraryAddress, passwordHash) => {
 
  const result = await pool.query(
    'INSERT INTO library_owner (library_name, owner_email, owner_mobile_no,owner_aadhar_no, library_address, owner_password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [name, email, mobileNo, aadharNo, libraryAddress, passwordHash]
  );
  return result.rows[0];
};

const getUserByEmailOrMobile = async (identifier) => {
  const query = `
    SELECT * FROM library_owner 
    WHERE owner_email = $1 OR owner_mobile_no = $1
  `;
  const result = await pool.query(query, [identifier]);
  return result.rows[0];
};

module.exports = { createUser, getUserByEmailOrMobile };
