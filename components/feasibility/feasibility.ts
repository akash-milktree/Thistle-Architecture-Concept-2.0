// Shared, client-safe config + types for the feasibility form.
// Question set mirrors the HMO Designers feasibility flow 1:1 (client request,
// 2026-07-08 voice note): property basics, size and floor plans, contact details.
// Server-only secrets (BLOB_READ_WRITE_TOKEN, LEAD_WEBHOOK_URL) are read ONLY
// inside the route handlers, never here.

export type PropertyType = 'Residential' | 'Existing HMO' | 'Commercial' | 'Other';

export const PROPERTY_TYPES: PropertyType[] = ['Residential', 'Existing HMO', 'Commercial', 'Other'];

export const PROPERTY_TYPE_SUB: Record<PropertyType, string> = {
  Residential: 'House or flat',
  'Existing HMO': 'Already let in rooms',
  Commercial: 'Office, retail or mixed use',
  Other: 'Something else',
};

export type FeasibilityAnswers = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  city: string;
  county: string;
  postcode: string;
  estimatedValue: string; // kept as a string (number input)
  rightmoveLink: string;
  propertyType: PropertyType | '';
  gia: string; // total existing GIA across all floors (approx, m²)
  floorNote: string; // which floor the relevant property is on (optional)
};

export type UploadedFile = { url: string; name: string };

export type FeasibilityFiles = {
  floorPlan?: UploadedFile;
  otherDocs: UploadedFile[];
};

export const EMPTY_ANSWERS: FeasibilityAnswers = {
  firstName: '', lastName: '', email: '', phone: '',
  address1: '', city: '', county: '', postcode: '',
  estimatedValue: '', rightmoveLink: '', propertyType: '', gia: '', floorNote: '',
};

export const EMPTY_FILES: FeasibilityFiles = { otherDocs: [] };

// --- Uploads -----------------------------------------------------------------
// Files upload from the browser straight to Vercel Blob (client uploads), so
// they never pass through a route handler. Routing them through a function
// would cap uploads at ~4.5 MB (FUNCTION_PAYLOAD_TOO_LARGE) well under our
// 15 MB promise.
export const MAX_UPLOAD_BYTES = 15 * 1024 * 1024; // 15 MB
export const ACCEPTED_UPLOAD_MIME: Record<string, string> = {
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.heic': 'image/heic',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};
export const ACCEPTED_UPLOAD_EXT = Object.keys(ACCEPTED_UPLOAD_MIME);
export const ACCEPTED_UPLOAD_ATTR = ACCEPTED_UPLOAD_EXT.join(',');

export function uploadExt(name: string): string {
  return '.' + (name.split('.').pop() ?? '').toLowerCase();
}

/** Browsers leave File.type empty for some types (e.g. HEIC on Windows), so derive it from the extension. */
export function uploadMime(name: string, browserType: string): string {
  return browserType || ACCEPTED_UPLOAD_MIME[uploadExt(name)] || 'application/octet-stream';
}

// Minimal client-side validation per step (server still re-validates).
export function validatePropertyBasics(a: FeasibilityAnswers): Partial<Record<keyof FeasibilityAnswers, string>> {
  const e: Partial<Record<keyof FeasibilityAnswers, string>> = {};
  if (!a.propertyType) e.propertyType = 'Please choose a property type.';
  if (!a.address1.trim()) e.address1 = 'Please enter the property address.';
  if (!a.postcode.trim()) e.postcode = 'Please enter the postcode.';
  if (!a.estimatedValue.trim()) e.estimatedValue = 'Please enter the estimated value.';
  return e;
}

export function validateSizePlans(a: FeasibilityAnswers, hasFloorPlan: boolean): Partial<Record<keyof FeasibilityAnswers | 'floorPlan', string>> {
  const e: Partial<Record<keyof FeasibilityAnswers | 'floorPlan', string>> = {};
  if (!a.gia.trim()) e.gia = 'Please enter the approximate GIA.';
  if (!hasFloorPlan) e.floorPlan = 'Please upload the property floor plan.';
  return e;
}

export function validateDetails(a: FeasibilityAnswers): Partial<Record<keyof FeasibilityAnswers, string>> {
  const e: Partial<Record<keyof FeasibilityAnswers, string>> = {};
  if (!a.firstName.trim()) e.firstName = 'Please enter your first name.';
  if (!a.lastName.trim()) e.lastName = 'Please enter your last name.';
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(a.email.trim())) e.email = 'Please enter a valid email address.';
  if (a.phone.replace(/\D/g, '').length < 7) e.phone = 'Please enter a valid phone number.';
  return e;
}
