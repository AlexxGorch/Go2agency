# Go2Agency Backend API

Backend server for handling contact form submissions and sending emails via Gmail SMTP.

## Features

- ✅ Express.js REST API
- ✅ Nodemailer for Gmail SMTP
- ✅ Data validation
- ✅ CORS support
- ✅ Error handling
- ✅ Environment-based configuration

## Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Gmail App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (required for App Passwords)
3. Go to **App passwords**
4. Generate a new app password for "Mail"
5. Copy the 16-character password (format: `xxxx xxxx xxxx xxxx`)

### 3. Create .env File

```bash
cp .env.example .env
```

Edit `.env` and fill in your Gmail credentials:

```env
PORT=3000
FRONTEND_URL=http://localhost:5173
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
RECIPIENT_EMAIL=your-email@gmail.com
```

**Important:** 
- Use your Gmail address for `GMAIL_USER`
- Use the **App Password** (not your regular password) for `GMAIL_APP_PASSWORD`
- Remove spaces from App Password: `xxxx xxxx xxxx xxxx` → `xxxxxxxxxxxxxxxx`

### 4. Run Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will start on `http://localhost:3000`

## API Endpoints

### POST /api/contact

Submit contact form data.

**Request Body:**
```json
{
  "name": "John Doe",           // or "firstName"
  "email": "john@example.com",
  "phone": "+380 12 345 67 89",
  "site": "https://example.com",
  "agree": true,                // optional
  "source": "header_discuss_project"
}
```

**Valid sources:**
- `header_discuss_project` - Header "Discuss Project" button
- `hero_free_audit` - Hero "Free Audit" button
- `sales_system_form` - CTA "Sales System" form

**Success Response (200):**
```json
{
  "success": true,
  "message": "Form submitted successfully"
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "message": "Error message",
  "errors": ["Validation error 1", "Validation error 2"]
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-XX..."
}
```

## Email Format

Emails sent to `RECIPIENT_EMAIL` will have:

- **Subject:** "New lead from website"
- **Body:** Formatted text with:
  - Source (form location)
  - Name
  - Email
  - Phone
  - Site
  - Agreement status
  - Submission timestamp

## Frontend Integration

Update frontend API endpoint in `src/api/contact.ts`:

```typescript
// For local development
const API_ENDPOINT = 'http://localhost:3000/api/contact';

// For production
const API_ENDPOINT = '/api/contact';
```

## Troubleshooting

### "EAUTH" Error
- Check that `GMAIL_APP_PASSWORD` is correct
- Ensure 2-Step Verification is enabled
- Verify App Password was generated correctly

### CORS Errors
- Update `FRONTEND_URL` in `.env` to match your frontend URL
- For production, set to your actual domain

### Email Not Sending
- Check Gmail credentials in `.env`
- Verify App Password is correct (no spaces)
- Check server logs for error messages

## Production Deployment

1. Set environment variables on your hosting platform
2. Update `FRONTEND_URL` to your production domain
3. Ensure port is configured correctly (or use reverse proxy)
4. Consider adding rate limiting for production

## Security Notes

- Never commit `.env` file to git
- Use App Passwords, not regular Gmail passwords
- Keep App Passwords secure
- Consider adding rate limiting in production
- Use HTTPS in production
