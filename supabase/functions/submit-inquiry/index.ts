import {
  corsHeaders,
  generateReference,
  jsonResponse,
} from '../_shared/supabase.ts';
import { sendInquiryAutoReply, sendInquiryNotification } from '../_shared/email.ts';

type InquiryType =
  | 'contact'
  | 'career'
  | 'field_trip'
  | 'youth_program'
  | 'workshop_rsvp';

const TYPE_LABELS: Record<InquiryType, string> = {
  contact: 'Contact Inquiry',
  career: 'Career Application',
  field_trip: 'Field Trip Request',
  youth_program: 'Student Program Inquiry',
  workshop_rsvp: 'Workshop RSVP',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function trim(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function requireFields(
  body: Record<string, unknown>,
  keys: string[],
): string | null {
  for (const key of keys) {
    if (!trim(body[key])) return `Missing required field: ${key}`;
  }
  return null;
}

function validateEmail(email: string, label = 'email'): string | null {
  if (!EMAIL_RE.test(email)) return `Invalid ${label}`;
  return null;
}

function buildFields(
  pairs: Array<[string, string]>,
): Array<{ label: string; value: string }> {
  return pairs
    .filter(([, value]) => Boolean(value))
    .map(([label, value]) => ({ label, value }));
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders() });
  }
  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  try {
    const body = (await req.json()) as Record<string, unknown>;
    const type = trim(body.type) as InquiryType;

    if (!TYPE_LABELS[type]) {
      return jsonResponse({ error: 'Invalid inquiry type' }, 400);
    }

    let submitterEmail = '';
    let recipientName = '';
    let fields: Array<{ label: string; value: string }> = [];
    let summaryLines: Array<{ label: string; value: string }> = [];

    if (type === 'contact') {
      const missing = requireFields(body, ['name', 'email', 'message']);
      if (missing) return jsonResponse({ error: missing }, 400);
      const email = trim(body.email).toLowerCase();
      const emailErr = validateEmail(email);
      if (emailErr) return jsonResponse({ error: emailErr }, 400);

      submitterEmail = email;
      recipientName = trim(body.name);
      fields = buildFields([
        ['Name', recipientName],
        ['Email', email],
        ['Subject', trim(body.subject) || 'General Inquiry'],
        ['Message', trim(body.message)],
      ]);
      summaryLines = buildFields([
        ['Subject', trim(body.subject) || 'General Inquiry'],
      ]);
    } else if (type === 'career') {
      const missing = requireFields(body, ['name', 'email', 'phone', 'statement', 'jobTitle']);
      if (missing) return jsonResponse({ error: missing }, 400);
      const email = trim(body.email).toLowerCase();
      const emailErr = validateEmail(email);
      if (emailErr) return jsonResponse({ error: emailErr }, 400);

      submitterEmail = email;
      recipientName = trim(body.name);
      fields = buildFields([
        ['Applicant', recipientName],
        ['Email', email],
        ['Phone', trim(body.phone)],
        ['Position', trim(body.jobTitle)],
        ['Statement', trim(body.statement)],
        ['Resume / Portfolio', trim(body.resume)],
      ]);
      summaryLines = buildFields([
        ['Position', trim(body.jobTitle)],
      ]);
    } else if (type === 'field_trip') {
      const missing = requireFields(body, [
        'schoolName',
        'gradeLevel',
        'studentCount',
        'preferredDate',
        'contactName',
        'contactEmail',
        'contactPhone',
      ]);
      if (missing) return jsonResponse({ error: missing }, 400);
      const email = trim(body.contactEmail).toLowerCase();
      const emailErr = validateEmail(email, 'contactEmail');
      if (emailErr) return jsonResponse({ error: emailErr }, 400);

      submitterEmail = email;
      recipientName = trim(body.contactName);
      fields = buildFields([
        ['School', trim(body.schoolName)],
        ['Grade Level', trim(body.gradeLevel)],
        ['Student Count', trim(body.studentCount)],
        ['Preferred Date', trim(body.preferredDate)],
        ['Contact Name', recipientName],
        ['Contact Email', email],
        ['Contact Phone', trim(body.contactPhone)],
      ]);
      summaryLines = buildFields([
        ['School', trim(body.schoolName)],
        ['Grade / Count', `${trim(body.gradeLevel)} (${trim(body.studentCount)} students)`],
        ['Preferred Date', trim(body.preferredDate)],
      ]);
    } else if (type === 'youth_program') {
      const missing = requireFields(body, [
        'name',
        'email',
        'school',
        'grade',
        'interest',
        'message',
      ]);
      if (missing) return jsonResponse({ error: missing }, 400);
      const email = trim(body.email).toLowerCase();
      const emailErr = validateEmail(email);
      if (emailErr) return jsonResponse({ error: emailErr }, 400);

      submitterEmail = email;
      recipientName = trim(body.name);
      fields = buildFields([
        ['Name', recipientName],
        ['Email', email],
        ['School', trim(body.school)],
        ['Grade', trim(body.grade)],
        ['Interest', trim(body.interest)],
        ['Message', trim(body.message)],
      ]);
      summaryLines = buildFields([
        ['School / Grade', `${trim(body.school)} (${trim(body.grade)})`],
        ['Interest Area', trim(body.interest)],
      ]);
    } else if (type === 'workshop_rsvp') {
      const missing = requireFields(body, [
        'contactName',
        'email',
        'workshop',
        'attendeeCount',
      ]);
      if (missing) return jsonResponse({ error: missing }, 400);
      const email = trim(body.email).toLowerCase();
      const emailErr = validateEmail(email);
      if (emailErr) return jsonResponse({ error: emailErr }, 400);

      submitterEmail = email;
      recipientName = trim(body.contactName);
      fields = buildFields([
        ['Contact', recipientName],
        ['Email', email],
        ['Workshop', trim(body.workshop)],
        ['Attendees', trim(body.attendeeCount)],
      ]);
      summaryLines = buildFields([
        ['Workshop', trim(body.workshop)],
        ['Attendees', trim(body.attendeeCount)],
      ]);
    }

    const referenceId = generateReference('HPV-INQ');
    const typeLabel = TYPE_LABELS[type];

    const notifyResult = await sendInquiryNotification({
      type,
      typeLabel,
      referenceId,
      fields,
      submitterEmail: submitterEmail || undefined,
    });

    if (!notifyResult.ok) {
      return jsonResponse(
        { error: notifyResult.error ?? 'Failed to deliver inquiry email' },
        502,
      );
    }

    if (submitterEmail) {
      const autoReply = await sendInquiryAutoReply({
        type,
        typeLabel,
        referenceId,
        recipientEmail: submitterEmail,
        recipientName: recipientName || 'friend',
        summaryLines,
      });
      // Auto-reply failure should not block a successful staff notification
      if (!autoReply.ok) {
        console.error('Inquiry auto-reply failed:', autoReply.error);
      }
    }

    return jsonResponse({ ok: true, referenceId });
  } catch (err) {
    console.error(err);
    return jsonResponse(
      { error: err instanceof Error ? err.message : 'Unexpected error' },
      500,
    );
  }
});
