const { execSync } = require('child_process');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const sqlPath = path.resolve(__dirname, 'database.sql');
const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  console.error('❌ DATABASE_URL is not set in .env');
  process.exit(1);
}

try {
  execSync(`psql "${dbUrl}" -f "${sqlPath}"`, { stdio: 'inherit' });
  console.log('✅ Database setup successful.');
} catch (err) {
  console.error('❌ Error setting up database:', err.message);
  process.exit(1);
}
