import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbHost = process.env.DB_HOST;
const dbPort = Number(process.env.DB_PORT) || 3306;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

const serverPool = mysql.createPool({
  host: dbHost,
  port: dbPort,
  user: dbUser,
  password: dbPassword,
  timezone: "Z",
  connectTimeout: 10000,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

export let pool = null;

// Initialize database and tables
export async function initDB() {

  try {
    if (!dbHost || !dbUser || !dbName) {
      throw new Error("Missing DB env vars. Required: DB_HOST, DB_USER, DB_NAME (and DB_PASSWORD if applicable).");
    }

    await serverPool.query("SELECT 1");
    console.log("Database server connected");

    await serverPool.query("CREATE DATABASE IF NOT EXISTS ??", [dbName]);

    pool = mysql.createPool({
      host: dbHost,
      port: dbPort,
      user: dbUser,
      password: dbPassword,
      database: dbName,
      timezone: "Z",
      connectTimeout: 10000,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    await pool.query("SET time_zone = '+05:30'");

    // Create assessment table
    await pool.query(`

      CREATE TABLE IF NOT EXISTS assessments (

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

    // Create contact table
    await pool.query(`

      CREATE TABLE IF NOT EXISTS contacts (

        id INT AUTO_INCREMENT PRIMARY KEY,

        full_name VARCHAR(255) NOT NULL,

        email VARCHAR(255) NOT NULL,

        phone VARCHAR(50),

        subject VARCHAR(255),

        message TEXT,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

      )

    `);



    console.log("Database initialized successfully!");

  } catch (error) {
    console.error(
      "Database initialization error:",
      error
    );
    throw error;
  }
}

export { pool as default };
