# Testing Email Sending

## Quick Start

### 1. Setup Environment

Create `.env` file in `backend/` directory:

```bash
cd backend
cp env.example .env
```

Edit `.env` and add your Gmail credentials:

```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password
RECIPIENT_EMAIL=go2agency.info@gmail.com
```

### 2. Get Gmail App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (if not already enabled)
3. Go to **App passwords**: https://myaccount.google.com/apppasswords
4. Select "Mail" and "Other (Custom name)"
5. Enter name: "Go2Agency Backend"
6. Click "Generate"
7. Copy the 16-character password (format: `xxxx xxxx xxxx xxxx`)
8. Remove spaces and paste in `.env` as `GMAIL_APP_PASSWORD`

**Important:** Use the App Password, NOT your regular Gmail password!

### 3. Test Email Configuration

**Option A: Using test script (Recommended)**

```bash
cd backend
node test-email.js
```

This will:
- Verify Gmail credentials
- Send a test email to `go2agency.info@gmail.com`
- Show success/error messages

**Option B: Using curl**

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+380 12 345 67 89",
    "site": "https://example.com",
    "agree": true,
    "source": "hero_free_audit"
  }'
```

**Option C: Using frontend form**

1. Start backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start frontend:
   ```bash
   cd go2agency
   npm run dev
   ```

3. Open http://localhost:5173
4. Fill out any contact form
5. Submit and check `go2agency.info@gmail.com` inbox

## Troubleshooting

### "EAUTH" Error

**Problem:** Authentication failed

**Solutions:**
- ✅ Verify `GMAIL_APP_PASSWORD` is correct (16 characters, no spaces)
- ✅ Ensure 2-Step Verification is enabled
- ✅ Regenerate App Password if needed
- ✅ Check that `GMAIL_USER` matches the account with App Password

### "ECONNECTION" Error

**Problem:** Cannot connect to Gmail SMTP

**Solutions:**
- ✅ Check internet connection
- ✅ Verify firewall isn't blocking port 587/465
- ✅ Try again in a few minutes (Gmail may have rate limits)

### Email Not Received

**Check:**
- ✅ Spam/Junk folder
- ✅ Correct recipient email in `.env`
- ✅ Server logs for errors
- ✅ Gmail account isn't full

### Test Script Works But Forms Don't

**Check:**
- ✅ Backend server is running
- ✅ Frontend is pointing to correct backend URL
- ✅ CORS is configured correctly
- ✅ Check browser console for errors
- ✅ Check backend server logs

## Expected Results

### Successful Test

```
🧪 Testing email configuration...

📧 From: your-email@gmail.com
📬 To: go2agency.info@gmail.com

🔐 Verifying Gmail credentials...
✅ Gmail credentials verified!

📤 Sending test email...
✅ Test email sent successfully!
📧 Message ID: <...>
📬 Check inbox: go2agency.info@gmail.com

🎉 Email configuration is working correctly!
```

### Email Format

You should receive an email with:

- **Subject:** "New lead from website" (or "Test Email from Go2Agency Backend" for test)
- **From:** Your Gmail address
- **To:** go2agency.info@gmail.com
- **Body:** Formatted with source, name, email, phone, site, agreement

## Production Testing

Before deploying to production:

1. ✅ Test all three form sources:
   - Header "Discuss Project"
   - Hero "Free Audit"
   - CTA "Sales System"

2. ✅ Verify emails arrive at go2agency.info@gmail.com

3. ✅ Check email formatting is correct

4. ✅ Test error handling (invalid data, network errors)

5. ✅ Verify CORS works with production frontend URL
