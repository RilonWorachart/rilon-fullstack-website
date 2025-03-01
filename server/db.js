import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env file


const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'zhtlpszw_rilondb',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


// Export the promise-based pool for async/await usage
export const promisePool = pool.promise();