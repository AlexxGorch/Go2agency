/**
 * Contact form API
 * 
 * Backend endpoint: POST /api/contact
 * 
 * Backend responsibilities:
 * - Receives form data with 'source' field
 * - Inserts 'source' into email body text
 * - Sends email to Gmail using backend SMTP configuration
 * 
 * Frontend only sends data, no email logic here
 */

import type { ContactFormData, ContactFormResponse } from '../types/contact';

// For local development, use full URL
// For production, use relative path
const API_ENDPOINT = import.meta.env.DEV 
  ? 'http://localhost:3000/api/contact'
  : '/api/contact';

export async function submitContactForm(
  data: ContactFormData
): Promise<ContactFormResponse> {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Server error: ${response.status}`
      );
    }

    const result: ContactFormResponse = await response.json();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error: Failed to submit form');
  }
}
