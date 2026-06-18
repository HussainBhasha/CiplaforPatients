import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, // Important: adds default database
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Initialize database and tables
export async function initDB() {
  try {
    // Create database if not exists
    const connection = await pool.getConnection();
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    await connection.release();
    
    // Use the database
    await pool.query(`USE ${process.env.DB_NAME}`);
    
    // Drop old tables if they exist (to recreate with correct columns)
    await pool.query(`DROP TABLE IF EXISTS assessments`);
    await pool.query(`DROP TABLE IF EXISTS contacts`);
    
    // Create assessments table
    await pool.query(`
      CREATE TABLE assessments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        age VARCHAR(50),
        pain_frequency VARCHAR(255),
        pain_severity VARCHAR(255),
        stiffness VARCHAR(255),
        swelling VARCHAR(255),
        cracking VARCHAR(255),
        previous_treatments TEXT,
        other_symptoms TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create contacts table
    await pool.query(`
      CREATE TABLE contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        subject VARCHAR(255),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('Database initialized successfully!');
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

export default pool;