const pool = require('../config/db');

const saveContactForm = async (name, email, phone, message) => {
  const query = 'INSERT INTO contact_forms (name, email, phone, message) VALUES ($1, $2, $3, $4)';
  const values = [name, email, phone, message];
  
  try {
    await pool.query(query, values); // Using pool.query instead of db.query
    console.log('Data saved successfully:', values);
  } catch (error) {
    console.error('Error executing query:', error.message); // Log the actual error
    throw new Error('Error saving contact form data');
  }
};

module.exports = {
  saveContactForm,
};
