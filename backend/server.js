/**
 * Go2Agency Backend Server
 * 
 * Handles contact form submissions and sends emails via Gmail SMTP
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Validate contact form data
function validateContactData(data) {
  const errors = [];

  // Email validation
  if (!data.email || typeof data.email !== 'string') {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push('Invalid email format');
    }
  }

  // Phone validation
  if (!data.phone || typeof data.phone !== 'string') {
    errors.push('Phone is required');
  }

  // Site validation
  if (!data.site || typeof data.site !== 'string') {
    errors.push('Site is required');
  }

  // Source validation
  if (!data.source || typeof data.source !== 'string') {
    errors.push('Source is required');
  } else {
    const validSources = ['header_discuss_project', 'hero_free_audit', 'sales_system_form'];
    if (!validSources.includes(data.source)) {
      errors.push('Invalid source');
    }
  }

  // Name validation (either name or firstName should be present)
  if (!data.name && !data.firstName) {
    errors.push('Name or First name is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Create Nodemailer transporter
function createTransporter() {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error('Gmail credentials not configured. Please set GMAIL_USER and GMAIL_APP_PASSWORD in .env');
  }

  // Remove spaces from App Password if present (Gmail App Passwords can have spaces)
  const appPassword = process.env.GMAIL_APP_PASSWORD.replace(/\s+/g, '');

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER.trim(),
      pass: appPassword
    }
  });
}

// Format email body with source information
function formatEmailBody(data) {
  const name = data.name || data.firstName || 'Not provided';
  const sourceLabels = {
    'header_discuss_project': 'Header - Discuss Project',
    'hero_free_audit': 'Hero Section - Free Audit',
    'sales_system_form': 'CTA Section - Sales System Form'
  };
  const sourceLabel = sourceLabels[data.source] || data.source;

  return `
New Lead from Website

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SOURCE: ${sourceLabel}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: ${name}
Email: ${data.email}
Phone: ${data.phone}
Site: ${data.site}
Agreement: ${data.agree ? 'Yes' : 'No'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted at: ${new Date().toLocaleString('en-US', { 
  timeZone: 'UTC',
  dateStyle: 'full',
  timeStyle: 'long'
})}
  `.trim();
}

// POST /api/contact - Handle contact form submission
app.post('/api/contact', async (req, res) => {
  try {
    // Validate input data
    const validation = validateContactData(req.body);
    
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors
      });
    }

    // Create email transporter
    let transporter;
    try {
      transporter = createTransporter();
    } catch (error) {
      console.error('Failed to create email transporter:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Server configuration error: Email service not configured. Please contact administrator.'
      });
    }

    // Format email content
    const emailBody = formatEmailBody(req.body);
    const recipientEmail = process.env.RECIPIENT_EMAIL || 'go2agency.info@gmail.com';

    // Send email
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: recipientEmail,
      subject: 'New lead from website',
      text: emailBody,
      html: emailBody.replace(/\n/g, '<br>').replace(/━/g, '─')
    };

    await transporter.sendMail(mailOptions);

    // Success response
    res.status(200).json({
      success: true,
      message: 'Form submitted successfully'
    });

  } catch (error) {
    console.error('Error processing contact form:', error);

    // Handle specific error types
    if (error.message.includes('Gmail credentials')) {
      console.error('Gmail credentials not configured in .env file');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error: Gmail credentials not configured. Please check server logs.'
      });
    }

    if (error.code === 'EAUTH') {
      console.error('Gmail authentication failed. Check GMAIL_USER and GMAIL_APP_PASSWORD in .env');
      return res.status(500).json({
        success: false,
        message: 'Email authentication failed. Please check Gmail credentials in server configuration.'
      });
    }

    if (error.code === 'ECONNECTION') {
      console.error('Connection to Gmail SMTP failed');
      return res.status(500).json({
        success: false,
        message: 'Connection error. Please try again later.'
      });
    }

    // Generic error response
    console.error('Unexpected error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit form. Please try again later.'
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📧 Email will be sent to: ${process.env.RECIPIENT_EMAIL || 'go2agency.info@gmail.com'}`);
  
  // Check if Gmail credentials are configured
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.warn('⚠️  WARNING: Gmail credentials not configured!');
    console.warn('   Please set GMAIL_USER and GMAIL_APP_PASSWORD in .env file');
  }
});
