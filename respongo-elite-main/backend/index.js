import express from 'express';
import cors from 'cors';
import { Parser } from 'json2csv';
import pool, { initDB } from './db.js';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.example.com',
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || 'your-email@example.com',
    pass: process.env.EMAIL_PASSWORD || 'your-password'
  }
});

// Helper function to send emails
async function sendEmail(to, subject, html) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"CiploStem" <noreply@ciplostem.com>',
      to,
      subject,
      html
    });
    console.log('Email sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
initDB();

// API Routes

// Submit assessment
app.post('/api/assessment', async (req, res) => {
  try {
    const {
      full_name,
      email,
      phone,
      age,
      pain_frequency,
      pain_severity,
      stiffness,
      swelling,
      cracking,
      previous_treatments,
      other_symptoms
    } = req.body;

    const query = `
      INSERT INTO assessments (full_name, email, phone, age, pain_frequency, pain_severity, stiffness, swelling, cracking, previous_treatments, other_symptoms)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    await pool.query(query, [
      full_name,
      email,
      phone,
      age,
      pain_frequency,
      pain_severity,
      stiffness,
      swelling,
      cracking,
      previous_treatments,
      other_symptoms
    ]);

    // Send email
    const emailHtml = `
      <h1>New Assessment Submitted</h1>
      <p><strong>Name:</strong> ${full_name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Age:</strong> ${age || 'N/A'}</p>
      <p><strong>Pain Frequency:</strong> ${pain_frequency || 'N/A'}</p>
      <p><strong>Pain Severity:</strong> ${pain_severity || 'N/A'}</p>
      <p><strong>Stiffness:</strong> ${stiffness || 'N/A'}</p>
      <p><strong>Swelling:</strong> ${swelling || 'N/A'}</p>
      <p><strong>Cracking:</strong> ${cracking || 'N/A'}</p>
      <p><strong>Previous Treatments:</strong> ${previous_treatments || 'N/A'}</p>
      <p><strong>Other Symptoms:</strong> ${other_symptoms || 'N/A'}</p>
    `;
    // Send email to admin (you can change this to any email)
    await sendEmail(process.env.ADMIN_EMAIL || 'admin@ciplostem.com', 'New Assessment Submitted', emailHtml);

    res.status(201).json({ message: 'Assessment submitted successfully!' });
  } catch (error) {
    console.error('Error submitting assessment:', error);
    res.status(500).json({ message: 'Failed to submit assessment' });
  }
});

// Submit contact
app.post('/api/contact', async (req, res) => {
  try {
    const {
      full_name,
      email,
      phone,
      subject,
      message
    } = req.body;

    const query = `
      INSERT INTO contacts (full_name, email, phone, subject, message)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    await pool.query(query, [
      full_name,
      email,
      phone,
      subject,
      message
    ]);

    // Send email
    const emailHtml = `
      <h1>New Contact Form Submission</h1>
      <p><strong>Name:</strong> ${full_name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;
    // Send email to admin
    await sendEmail(process.env.ADMIN_EMAIL || 'admin@ciplostem.com', 'New Contact Form Submission', emailHtml);

    res.status(201).json({ message: 'Contact form submitted successfully!' });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ message: 'Failed to submit contact form' });
  }
});

// Get all assessments
app.get('/api/admin/assessments', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM assessments ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching assessments:', error);
    res.status(500).json({ message: 'Failed to fetch assessments' });
  }
});

// Get all contacts
app.get('/api/admin/contacts', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Failed to fetch contacts' });
  }
});

// Download assessments as CSV
app.get('/api/admin/assessments/download', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM assessments ORDER BY created_at DESC');
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(rows);
    
    res.header('Content-Type', 'text/csv');
    res.attachment('assessments.csv');
    res.send(csv);
  } catch (error) {
    console.error('Error downloading assessments:', error);
    res.status(500).json({ message: 'Failed to download assessments' });
  }
});

// Download contacts as CSV
app.get('/api/admin/contacts/download', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(rows);
    
    res.header('Content-Type', 'text/csv');
    res.attachment('contacts.csv');
    res.send(csv);
  } catch (error) {
    console.error('Error downloading contacts:', error);
    res.status(500).json({ message: 'Failed to download contacts' });
  }
});

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'CiploStem Backend API is running!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});