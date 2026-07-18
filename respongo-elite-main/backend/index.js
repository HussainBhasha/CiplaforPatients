import express from 'express';
import cors from 'cors';
import { initDB, pool } from './db.js';
import nodemailer from 'nodemailer';
import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3001;
const exportTimeZone = process.env.EXPORT_TIMEZONE || 'Asia/Kolkata';
const exportDateFormatter = new Intl.DateTimeFormat('en-IN', {
  timeZone: exportTimeZone,
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
});

const formatExportDateTime = (value) => {
  if (!value) return '';
  const dt = value instanceof Date ? value : new Date(value);
  if (!Number.isFinite(dt.getTime())) return '';
  const parts = exportDateFormatter.formatToParts(dt);
  const day = parts.find((p) => p.type === 'day')?.value ?? '';
  const month = parts.find((p) => p.type === 'month')?.value ?? '';
  const year = parts.find((p) => p.type === 'year')?.value ?? '';
  const hour = parts.find((p) => p.type === 'hour')?.value ?? '';
  const minute = parts.find((p) => p.type === 'minute')?.value ?? '';
  const dayPeriod = (parts.find((p) => p.type === 'dayPeriod')?.value ?? '').toUpperCase();
  return `${day}-${month}-${year} ${hour}:${minute}${dayPeriod}`;
};

const asTrimmedString = (v) => (typeof v === 'string' ? v.trim() : v == null ? '' : String(v).trim());
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const normalizePhone = (phone) => asTrimmedString(phone).replace(/[^\d]/g, '');
const isValidOptionalPhone = (phone) => phone.length === 0 || phone.length === 10;

const emailBrandColor = asTrimmedString(process.env.BRAND_COLOR) || '#0ea5e9';
const emailCompanyName = asTrimmedString(process.env.COMPANY_NAME) || 'Cipla';
const emailLogoUrl = asTrimmedString(process.env.COMPANY_LOGO_URL);
const emailWebsiteUrl = asTrimmedString(process.env.COMPANY_WEBSITE_URL);
const emailSupportEmail = asTrimmedString(process.env.COMPANY_SUPPORT_EMAIL);
const emailFooterText = asTrimmedString(process.env.EMAIL_FOOTER_TEXT);
const localLogoPath = path.resolve(process.cwd(), '../src/assets/Cipla_logo.svg.png');
const emailLogoCid = 'cipla-logo@cipla-mail';
const hasLocalLogo = fs.existsSync(localLogoPath);
const localLogoContent = hasLocalLogo ? fs.readFileSync(localLogoPath) : null;

const smtpHost = asTrimmedString(process.env.EMAIL_HOST);
const smtpPort = Number(process.env.EMAIL_PORT);
const smtpSecure = process.env.EMAIL_SECURE === 'true';
const smtpUser = asTrimmedString(process.env.EMAIL_USER);
const smtpPass = process.env.EMAIL_PASSWORD;
const smtpFrom = asTrimmedString(process.env.EMAIL_FROM);
const adminEmailTo = asTrimmedString(process.env.ADMIN_EMAIL);

const isEmailEnabled = Boolean(smtpHost && smtpPort && smtpUser && smtpPass && smtpFrom);

let transporter = null;
const getTransporter = () => {
  if (!isEmailEnabled) return null;
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
  return transporter;
};

const escapeHtml = (value) => {
  const str = asTrimmedString(value);
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

const renderKeyValueTable = (rows) => {
  const safeRows = (rows ?? []).filter((r) => r && r.label);
  const body = safeRows
    .map(({ label, value }) => {
      const safeLabel = escapeHtml(label);
      const safeValue = escapeHtml(value) || '-';
      return `
        <tr>
          <td style="padding:14px 18px;border-top:1px solid #e2e8f0;width:190px;background:#f8fafc;color:#334155;font-size:13px;font-weight:700;vertical-align:top;">${safeLabel}</td>
          <td style="padding:14px 18px;border-top:1px solid #e2e8f0;color:#0f172a;font-size:14px;line-height:22px;vertical-align:top;">${safeValue}</td>
        </tr>
      `;
    })
    .join('');

  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #dbeafe;border-radius:18px;overflow:hidden;background:#ffffff;">
      <tr>
        <td style="padding:14px 18px;background:#eff6ff;color:${emailBrandColor};font-size:12px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;">
          Submission Details
        </td>
      </tr>
      <tbody>
        ${body}
      </tbody>
    </table>
  `;
};

const getEmailAttachments = () =>
  localLogoContent
    ? [
        {
          filename: 'cipla-logo.png',
          content: localLogoContent,
          contentType: 'image/png',
          contentDisposition: 'inline',
          encoding: 'base64',
          cid: emailLogoCid,
        },
      ]
    : [];

const renderEmailLayout = ({ title, preheader, heading, introHtml, contentHtml, footerNoteHtml }) => {
  const safeTitle = escapeHtml(title);
  const safeHeading = escapeHtml(heading);
  const safePreheader = escapeHtml(preheader);

  const logoBlock = hasLocalLogo
    ? `<img src="cid:${emailLogoCid}" alt="${escapeHtml(emailCompanyName)}" width="220" style="width:220px;max-width:220px;height:auto;display:block;border:0;outline:none;text-decoration:none;" />`
    : emailLogoUrl
    ? `<img src="${escapeHtml(emailLogoUrl)}" alt="${escapeHtml(emailCompanyName)}" style="height:28px;max-width:220px;display:block;" />`
    : emailCompanyName
      ? `<div style="font-size:16px;font-weight:700;color:#0f172a;">${escapeHtml(emailCompanyName)}</div>`
      : '';

  const footerMetaParts = [
    emailWebsiteUrl ? `<a href="${escapeHtml(emailWebsiteUrl)}" style="color:${emailBrandColor};text-decoration:none;">${escapeHtml(emailWebsiteUrl)}</a>` : '',
    emailSupportEmail ? `<a href="mailto:${escapeHtml(emailSupportEmail)}" style="color:${emailBrandColor};text-decoration:none;">${escapeHtml(emailSupportEmail)}</a>` : '',
  ].filter(Boolean);

  const footerMeta = footerMetaParts.length
    ? `<div style="margin-top:10px;">${footerMetaParts.join(' &nbsp;|&nbsp; ')}</div>`
    : '';

  const footerText = escapeHtml(emailFooterText) || (emailCompanyName ? escapeHtml(emailCompanyName) : '');

  return `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${safeTitle}</title>
    <style>
      @media (max-width: 620px) {
        .container { width: 100% !important; }
        .px { padding-left: 16px !important; padding-right: 16px !important; }
        .hero { padding: 24px 16px !important; }
        .content { padding: 22px 16px !important; }
        .footer { padding: 18px 16px !important; }
        .h1 { font-size: 24px !important; line-height: 32px !important; }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background:#eef4ff;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${safePreheader}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#eef4ff;">
      <tr>
        <td align="center" style="padding:28px 16px;">
          <table role="presentation" width="640" cellspacing="0" cellpadding="0" class="container" style="width:640px;max-width:640px;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 18px 50px rgba(2, 6, 23, 0.10);">
            <tr>
              <td class="hero" style="padding:28px 32px;background:linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);border-bottom:1px solid #dbeafe;">
                <div style="text-align:center;">
                  <div style="display:inline-block;">${logoBlock}</div>
                  <div style="margin-top:16px;color:${emailBrandColor};font-size:12px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;">${safeTitle}</div>
                  <div class="h1" style="margin:12px 0 0;color:#0f172a;font-size:32px;line-height:40px;font-weight:800;">${safeHeading}</div>
                </div>
              </td>
            </tr>
            <tr>
              <td class="content" style="padding:30px 32px 26px;">
                <div style="font-size:15px;line-height:26px;color:#475569;margin:0 0 22px;">
                  ${introHtml || ''}
                </div>
                ${contentHtml || ''}
              </td>
            </tr>
            <tr>
              <td class="footer" style="padding:22px 32px;border-top:1px solid #e2e8f0;background:#f8fafc;">
                <div style="font-size:12px;line-height:20px;color:#64748b;">
                  ${footerText ? `<div style="font-weight:700;color:#0f172a;">${footerText}</div>` : ''}
                  ${footerMeta}
                  ${footerNoteHtml ? `<div style="margin-top:10px;">${footerNoteHtml}</div>` : ''}
                  <div style="margin-top:12px;">Regards,<br />Team ${escapeHtml(emailCompanyName || 'Cipla')}</div>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();
};

const computeAssessmentScore = ({ pain_frequency, pain_severity, stiffness, swelling, cracking }) => {
  const freq = asTrimmedString(pain_frequency);
  const stiff = asTrimmedString(stiffness);
  const swell = asTrimmedString(swelling);
  const crack = asTrimmedString(cracking);

  const painNum = Number(asTrimmedString(pain_severity));
  const pain = Number.isFinite(painNum) ? Math.min(Math.max(painNum, 0), 10) : null;

  const freqScore =
    freq === 'Daily' ? 3 : freq === 'Several times a week' ? 2 : freq === 'Occasionally' ? 1 : freq === 'Rarely' ? 0 : null;
  const stiffScore = stiff === 'Severe' ? 3 : stiff === 'Moderate' ? 2 : stiff === 'Mild' ? 1 : stiff === 'None' ? 0 : null;
  const swellScore = swell === 'Constant' ? 3 : swell === 'Frequent' ? 2 : swell === 'Occasional' ? 1 : swell === 'None' ? 0 : null;
  const crackScore = crack === 'Always' ? 3 : crack === 'Often' ? 2 : crack === 'Sometimes' ? 1 : crack === 'No' ? 0 : null;

  if (freqScore == null || pain == null || stiffScore == null || swellScore == null || crackScore == null) return null;

  const total = freqScore + pain + stiffScore + swellScore + crackScore;
  const label = total <= 7 ? 'Low' : total <= 14 ? 'Moderate' : 'High';
  return { total, max: 22, label };
};

const emailMaxAttempts = Number(process.env.EMAIL_MAX_ATTEMPTS) || 3;
const emailRetryBaseMs = Number(process.env.EMAIL_RETRY_BASE_MS) || 1500;
const emailRetryMaxMs = Number(process.env.EMAIL_RETRY_MAX_MS) || 60000;

const runEmailJob = async (job) => {
  const safeTo = asTrimmedString(job.to);
  if (!safeTo || !isValidEmail(safeTo)) {
    console.error(`[email:${job.id}] invalid recipient`, { tag: job.tag, to: safeTo });
    return;
  }

  const t = getTransporter();
  if (!t) {
    console.error(`[email:${job.id}] email not configured`, { tag: job.tag });
    return;
  }

  try {
    const attachments = getEmailAttachments();
    const info = await t.sendMail({
      from: smtpFrom,
      to: safeTo,
      subject: asTrimmedString(job.subject),
      html: job.html,
      attachments,
    });
    console.log(`[email:${job.id}] sent`, { tag: job.tag, to: safeTo, messageId: info?.messageId });
  } catch (error) {
    const attempt = job.attempt ?? 1;
    const willRetry = attempt < emailMaxAttempts;
    console.error(`[email:${job.id}] failed`, {
      tag: job.tag,
      to: safeTo,
      attempt,
      willRetry,
      error: error?.message || String(error),
    });

    if (!willRetry) return;

    const expDelay = Math.min(emailRetryBaseMs * Math.pow(2, attempt - 1), emailRetryMaxMs);
    const jitter = Math.floor(Math.random() * 500);
    const delayMs = expDelay + jitter;

    setTimeout(() => {
      runEmailJob({ ...job, attempt: attempt + 1 });
    }, delayMs);
  }
};

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
await initDB();

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

    const cleanName = asTrimmedString(full_name);
    const cleanEmail = asTrimmedString(email);
    const cleanPhone = normalizePhone(phone);
    const cleanAge = asTrimmedString(age);
    const cleanFrequency = asTrimmedString(pain_frequency);
    const cleanPain = asTrimmedString(pain_severity);
    const cleanStiffness = asTrimmedString(stiffness);
    const cleanSwelling = asTrimmedString(swelling);
    const cleanCracking = asTrimmedString(cracking);
    const cleanPrev = asTrimmedString(previous_treatments);
    const cleanOther = asTrimmedString(other_symptoms);

    if (cleanName.length < 2) return res.status(400).json({ message: 'Full name is required.' });
    if (!isValidEmail(cleanEmail)) return res.status(400).json({ message: 'Valid email is required.' });
    if (!isValidOptionalPhone(cleanPhone)) return res.status(400).json({ message: 'Phone number must be 10 digits.' });
    if (cleanAge) {
      const ageNum = Number(cleanAge);
      if (!Number.isFinite(ageNum) || ageNum < 1 || ageNum > 120) {
        return res.status(400).json({ message: 'Age must be between 1 and 120.' });
      }
    }
    if (!cleanFrequency) return res.status(400).json({ message: 'Pain frequency is required.' });
    if (cleanPain) {
      const painNum = Number(cleanPain);
      if (!Number.isFinite(painNum) || painNum < 0 || painNum > 10) {
        return res.status(400).json({ message: 'Pain severity must be between 0 and 10.' });
      }
    }

    const query = `
      INSERT INTO assessments (full_name, email, phone, age, pain_frequency, pain_severity, stiffness, swelling, cracking, previous_treatments, other_symptoms)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const [insertResult] = await pool.query(query, [
      cleanName,
      cleanEmail,
      cleanPhone || null,
      cleanAge || null,
      cleanFrequency || null,
      cleanPain || null,
      cleanStiffness || null,
      cleanSwelling || null,
      cleanCracking || null,
      cleanPrev || null,
      cleanOther || null
    ]);

    const insertedId = insertResult?.insertId;
    const [tsRows] = insertedId
      ? await pool.query(`SELECT DATE_FORMAT(created_at, '%d-%m-%Y %l:%i%p') AS created_at FROM assessments WHERE id = ?`, [insertedId])
      : [null];
    const submittedAt = tsRows?.[0]?.created_at ? asTrimmedString(tsRows[0].created_at) : formatExportDateTime(new Date());

    const computedScore = computeAssessmentScore({
      pain_frequency: cleanFrequency,
      pain_severity: cleanPain,
      stiffness: cleanStiffness,
      swelling: cleanSwelling,
      cracking: cleanCracking,
    });
    const emailDispatches = [];

    if (cleanEmail && isValidEmail(cleanEmail)) {
      const candidateContent = renderKeyValueTable([
        { label: 'Submission Time', value: submittedAt },
        { label: 'Name', value: cleanName },
        { label: 'Email', value: cleanEmail },
        { label: 'Contact Number', value: cleanPhone || '' },
        { label: 'Pain Frequency', value: cleanFrequency || '' },
        { label: 'Pain Severity', value: cleanPain || '' },
        { label: 'Stiffness', value: cleanStiffness || '' },
        { label: 'Swelling', value: cleanSwelling || '' },
        { label: 'Cracking', value: cleanCracking || '' },
        { label: 'Score', value: computedScore ? `${computedScore.total}/${computedScore.max} (${computedScore.label})` : '' },
      ]);

      const candidateHtml = renderEmailLayout({
        title: 'Assessment Received',
        preheader: 'We have received your assessment',
        heading: 'Assessment received successfully',
        introHtml: `<div style="font-size:14px;line-height:22px;color:#334155;margin:0 0 16px;">Thank you for your submission. Our team will review your assessment and contact you if shortlisted.</div>`,
        contentHtml: candidateContent,
        footerNoteHtml: `<div style="margin-top:10px;">If you did not submit this assessment, please ignore this email.</div>`,
      });

      emailDispatches.push(
        runEmailJob({
          id: `assessment-candidate-${insertedId || Date.now()}`,
          to: cleanEmail,
          subject: `${emailCompanyName ? `${emailCompanyName} - ` : ''}Assessment Received`,
          html: candidateHtml,
          tag: 'assessment_candidate',
          attempt: 1,
        })
      );
    }

    await Promise.allSettled(emailDispatches);

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

    const cleanName = asTrimmedString(full_name);
    const cleanEmail = asTrimmedString(email);
    const cleanPhone = normalizePhone(phone);
    const cleanSubject = asTrimmedString(subject);
    const cleanMessage = asTrimmedString(message);

    if (cleanName.length < 2) return res.status(400).json({ message: 'Full name is required.' });
    if (!isValidEmail(cleanEmail)) return res.status(400).json({ message: 'Valid email is required.' });
    if (!isValidOptionalPhone(cleanPhone)) return res.status(400).json({ message: 'Phone number must be 10 digits.' });
    if (cleanMessage.length < 3) return res.status(400).json({ message: 'Message is required.' });

    const query = `
      INSERT INTO contacts (full_name, email, phone, subject, message)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    const [insertResult] = await pool.query(query, [
      cleanName,
      cleanEmail,
      cleanPhone || null,
      cleanSubject || null,
      cleanMessage
    ]);

    const insertedId = insertResult?.insertId;
    const [tsRows] = insertedId
      ? await pool.query(`SELECT DATE_FORMAT(created_at, '%d-%m-%Y %l:%i%p') AS created_at FROM contacts WHERE id = ?`, [insertedId])
      : [null];
    const submittedAt = tsRows?.[0]?.created_at ? asTrimmedString(tsRows[0].created_at) : formatExportDateTime(new Date());
    const emailDispatches = [];

    if (cleanEmail && isValidEmail(cleanEmail)) {
      const userContent = renderKeyValueTable([
        { label: 'Submission Time', value: submittedAt },
        { label: 'Name', value: cleanName },
        { label: 'Email', value: cleanEmail },
        { label: 'Contact Number', value: cleanPhone || '' },
        { label: 'Subject', value: cleanSubject || '' },
        { label: 'Message', value: cleanMessage || '' },
      ]);

      const userHtml = renderEmailLayout({
        title: 'We Received Your Message',
        preheader: 'Thank you for contacting us',
        heading: 'Thanks for contacting us',
        introHtml: `<div style="font-size:14px;line-height:22px;color:#334155;margin:0 0 16px;">We’ve received your request. Our support team will get back to you soon.</div>`,
        contentHtml: userContent,
        footerNoteHtml: `<div style="margin-top:10px;">If you did not submit this request, please ignore this email.</div>`,
      });

      emailDispatches.push(
        runEmailJob({
          id: `contact-user-${insertedId || Date.now()}`,
          to: cleanEmail,
          subject: `${emailCompanyName ? `${emailCompanyName} - ` : ''}We’ve Received Your Message`,
          html: userHtml,
          tag: 'contact_user',
          attempt: 1,
        })
      );
    }

    await Promise.allSettled(emailDispatches);

    res.status(201).json({ message: 'Contact form submitted successfully!' });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ message: 'Failed to submit contact form' });
  }
});

// Get all assessments
app.get('/api/admin/assessments', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        id,
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
        other_symptoms,
        DATE_FORMAT(created_at, '%d-%m-%Y %l:%i%p') AS created_at
      FROM assessments
      ORDER BY created_at DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching assessments:', error);
    res.status(500).json({ message: 'Failed to fetch assessments' });
  }
});

// Get all contacts
app.get('/api/admin/contacts', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        id,
        full_name,
        email,
        phone,
        subject,
        message,
        DATE_FORMAT(created_at, '%d-%m-%Y %l:%i%p') AS created_at
      FROM contacts
      ORDER BY created_at DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Failed to fetch contacts' });
  }
});

// Download assessments as Excel
app.get('/api/admin/assessments/download', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        id,
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
        other_symptoms,
        DATE_FORMAT(created_at, '%d-%m-%Y %l:%i%p') AS created_at
      FROM assessments
      ORDER BY created_at DESC
    `);
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Assessments');

    sheet.columns = [
      { header: 'id', key: 'id' },
      { header: 'full_name', key: 'full_name' },
      { header: 'email', key: 'email' },
      { header: 'phone', key: 'phone' },
      { header: 'age', key: 'age' },
      { header: 'pain_frequency', key: 'pain_frequency' },
      { header: 'pain_severity', key: 'pain_severity' },
      { header: 'stiffness', key: 'stiffness' },
      { header: 'swelling', key: 'swelling' },
      { header: 'cracking', key: 'cracking' },
      { header: 'previous_treatments', key: 'previous_treatments' },
      { header: 'other_symptoms', key: 'other_symptoms' },
      { header: 'created_at', key: 'created_at' },
    ];

    for (const row of rows) {
      sheet.addRow({
        ...row,
        phone: row.phone == null ? '' : String(row.phone),
        age: row.age == null ? '' : String(row.age),
      });
    }

    sheet.getRow(1).font = { bold: true };
    sheet.getColumn('phone').numFmt = '@';
    sheet.getColumn('age').numFmt = '@';

    for (const column of sheet.columns) {
      if (!column) continue;
      const key = column.key;
      const wrap = key === 'previous_treatments' || key === 'other_symptoms';
      let maxLen = typeof column.header === 'string' ? column.header.length : 10;

      column.eachCell({ includeEmpty: true }, (cell) => {
        if (wrap) cell.alignment = { wrapText: true, vertical: 'top' };
        const raw = cell.value;
        const text =
          raw instanceof Date
            ? raw.toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })
            : raw == null
              ? ''
              : typeof raw === 'object' && 'text' in raw
                ? String(raw.text ?? '')
                : String(raw);
        maxLen = Math.max(maxLen, text.length);
      });

      column.width = Math.min(Math.max(maxLen + 2, 12), wrap ? 60 : 40);
    }

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="assessments.xlsx"');
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Error downloading assessments:', error);
    res.status(500).json({ message: 'Failed to download assessments' });
  }
});

// Download contacts as Excel
app.get('/api/admin/contacts/download', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        id,
        full_name,
        email,
        phone,
        subject,
        message,
        DATE_FORMAT(created_at, '%d-%m-%Y %l:%i%p') AS created_at
      FROM contacts
      ORDER BY created_at DESC
    `);
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Contacts');

    sheet.columns = [
      { header: 'id', key: 'id' },
      { header: 'full_name', key: 'full_name' },
      { header: 'email', key: 'email' },
      { header: 'phone', key: 'phone' },
      { header: 'subject', key: 'subject' },
      { header: 'message', key: 'message' },
      { header: 'created_at', key: 'created_at' },
    ];

    for (const row of rows) {
      sheet.addRow({
        ...row,
        phone: row.phone == null ? '' : String(row.phone),
      });
    }

    sheet.getRow(1).font = { bold: true };
    sheet.getColumn('phone').numFmt = '@';

    for (const column of sheet.columns) {
      if (!column) continue;
      const key = column.key;
      const wrap = key === 'message';
      let maxLen = typeof column.header === 'string' ? column.header.length : 10;

      column.eachCell({ includeEmpty: true }, (cell) => {
        if (wrap) cell.alignment = { wrapText: true, vertical: 'top' };
        const raw = cell.value;
        const text =
          raw instanceof Date
            ? raw.toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })
            : raw == null
              ? ''
              : typeof raw === 'object' && 'text' in raw
                ? String(raw.text ?? '')
                : String(raw);
        maxLen = Math.max(maxLen, text.length);
      });

      column.width = Math.min(Math.max(maxLen + 2, 12), wrap ? 70 : 40);
    }

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="contacts.xlsx"');
    await workbook.xlsx.write(res);
    res.end();
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
