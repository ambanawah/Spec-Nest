
const fs = require('fs');
const { Pool } = require('pg');
require('dotenv').config();

const setupDatabase = async () => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  const sql = fs.readFileSync('database.sql', 'utf8');

  const client = await pool.connect();
  try {
    await client.query(sql);
    console.log('Database setup successful.');
  } catch (err) {
    console.error('Error setting up database:', err);
  } finally {
    client.release();
    pool.end();
  }
};

setupDatabase();
