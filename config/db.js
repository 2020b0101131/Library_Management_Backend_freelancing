const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false, // This allows SSL without verifying the certificate
  },
});

pool.connect((err) => {
  if (err) {
    console.error('Database connection error', err);
  } else {
    console.log('Connected to the PostgreSQL database');
  }
});

module.exports = pool;
