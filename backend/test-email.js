/**
 * Test script for email sending
 * 
 * Usage: node test-email.js
 * 
 * This script sends a test email to verify Gmail SMTP configuration
 */

import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

async function testEmail() {
  console.log('🧪 Testing email configuration...\n');

  // Check environment variables
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error('❌ Error: Gmail credentials not configured!');
    console.error('   Please set GMAIL_USER and GMAIL_APP_PASSWORD in .env file');
    process.exit(1);
  }

  console.log(`📧 From: ${process.env.GMAIL_USER}`);
  console.log(`📬 To: ${process.env.RECIPIENT_EMAIL || 'go2agency.info@gmail.com'}`);
  console.log('');

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    // Verify connection
    console.log('🔐 Verifying Gmail credentials...');
    await transporter.verify();
    console.log('✅ Gmail credentials verified!\n');

    // Send test email
    const recipientEmail = process.env.RECIPIENT_EMAIL || 'go2agency.info@gmail.com';
    
    console.log('📤 Sending test email...');
    
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: recipientEmail,
      subject: 'Test Email from Go2Agency Backend',
      text: `
This is a test email from Go2Agency backend server.

If you received this email, your Gmail SMTP configuration is working correctly!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Test Details:
- Server: Go2Agency Backend
- Time: ${new Date().toLocaleString()}
- Configuration: ✅ Working

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `.trim(),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #F15A29;">Test Email from Go2Agency Backend</h2>
          <p>This is a test email from Go2Agency backend server.</p>
          <p><strong>If you received this email, your Gmail SMTP configuration is working correctly!</strong></p>
          <hr style="border: 1px solid #ddd; margin: 20px 0;">
          <h3>Test Details:</h3>
          <ul>
            <li><strong>Server:</strong> Go2Agency Backend</li>
            <li><strong>Time:</strong> ${new Date().toLocaleString()}</li>
            <li><strong>Configuration:</strong> ✅ Working</li>
          </ul>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Test email sent successfully!');
    console.log(`📧 Message ID: ${info.messageId}`);
    console.log(`📬 Check inbox: ${recipientEmail}\n`);
    console.log('🎉 Email configuration is working correctly!');

  } catch (error) {
    console.error('\n❌ Error sending test email:');
    
    if (error.code === 'EAUTH') {
      console.error('   Authentication failed. Please check:');
      console.error('   - GMAIL_USER is correct');
      console.error('   - GMAIL_APP_PASSWORD is correct (not your regular password)');
      console.error('   - 2-Step Verification is enabled in Google Account');
      console.error('   - App Password was generated correctly');
    } else if (error.code === 'ECONNECTION') {
      console.error('   Connection failed. Please check your internet connection.');
    } else {
      console.error(`   ${error.message}`);
    }
    
    process.exit(1);
  }
}

testEmail();
