const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const setupDatabase = async () => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  const sqlPath = path.resolve(__dirname, 'database.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');

  const client = await pool.connect();
  try {
    await client.query(sql);
    console.log('✅ Database setup successful.');
  } catch (err) {
    console.error('❌ Error setting up database:', err.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
};

setupDatabase();
