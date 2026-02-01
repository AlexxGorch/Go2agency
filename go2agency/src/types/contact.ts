/**
 * Contact form data types
 * Backend expects these fields + 'source' field
 * Backend will insert 'source' into email body and send to Gmail
 */

export type ContactFormSource = 
  | 'header_discuss_project'
  | 'hero_free_audit'
  | 'sales_system_form';

export interface ContactFormData {
  name?: string;
  firstName?: string;
  email: string;
  phone: string;
  site: string;
  agree?: boolean;
  source: ContactFormSource;
}

export interface ContactFormResponse {
  success: boolean;
  message?: string;
}

export interface ContactFormState {
  loading: boolean;
  success: boolean;
  error: string | null;
}
