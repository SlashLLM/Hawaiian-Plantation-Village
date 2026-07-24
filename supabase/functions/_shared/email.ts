import { formatCents } from './supabase.ts';

type PassDetails = {
  referenceId: string;
  recipientName: string;
  recipientEmail: string;
  title: string;
  subtitle: string;
  lines: Array<{ label: string; value: string }>;
  qrDataUrl: string;
  paymentNote: string;
};

type InquiryField = { label: string; value: string };

type InquiryNotificationInput = {
  type: string;
  typeLabel: string;
  referenceId: string;
  fields: InquiryField[];
  submitterEmail?: string;
};

type InquiryAutoReplyInput = {
  type: string;
  typeLabel: string;
  referenceId: string;
  recipientEmail: string;
  recipientName: string;
  summaryLines: InquiryField[];
};

function escapeHtml(value: string): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function fieldRows(fields: InquiryField[]): string {
  return fields
    .map(
      (f) =>
        `<tr><td style="padding:6px 0;color:#61554d;vertical-align:top;">${escapeHtml(f.label)}</td><td style="padding:6px 0;font-weight:bold;text-align:right;">${escapeHtml(f.value)}</td></tr>`,
    )
    .join('');
}

function shellHtml(title: string, bodyInner: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${escapeHtml(title)}</title></head>
<body style="margin:0;padding:0;background:#fbf9f5;font-family:Georgia,serif;color:#211c18;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:24px auto;background:#fff;border:2px solid #4a2c11;">
    <tr><td style="padding:24px;background:#1b3823;color:#fff;">
      <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;">Hawaiian Plantation Village</div>
      <h1 style="margin:8px 0 0;font-size:22px;font-weight:normal;">${escapeHtml(title)}</h1>
    </td></tr>
    <tr><td style="padding:24px;">
      ${bodyInner}
    </td></tr>
    <tr><td style="padding:16px 24px;background:#f0eae1;font-size:12px;color:#61554d;">
      94-695 Waipahu Street, Waipahu, Oʻahu · Questions? Reply to this email.
    </td></tr>
  </table>
</body>
</html>`;
}

function passHtml(details: PassDetails): string {
  const rows = details.lines
    .map((l) => `<tr><td style="padding:6px 0;color:#61554d;">${escapeHtml(l.label)}</td><td style="padding:6px 0;font-weight:bold;text-align:right;">${escapeHtml(l.value)}</td></tr>`)
    .join('');

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${escapeHtml(details.title)}</title></head>
<body style="margin:0;padding:0;background:#fbf9f5;font-family:Georgia,serif;color:#211c18;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:24px auto;background:#fff;border:2px solid #4a2c11;">
    <tr><td style="padding:24px;background:#1b3823;color:#fff;">
      <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;">Hawaiian Plantation Village</div>
      <h1 style="margin:8px 0 0;font-size:22px;font-weight:normal;">${escapeHtml(details.title)}</h1>
      <p style="margin:4px 0 0;opacity:0.9;">${escapeHtml(details.subtitle)}</p>
    </td></tr>
    <tr><td style="padding:24px;">
      <p style="margin:0 0 16px;">Aloha ${escapeHtml(details.recipientName)},</p>
      <p style="margin:0 0 16px;">Your registration is confirmed. Present the QR code below at check-in.</p>
      <table width="100%" style="border-top:1px dotted #ccb495;border-bottom:1px dotted #ccb495;margin-bottom:20px;">${rows}</table>
      <p style="margin:0 0 8px;font-size:13px;color:#61554d;"><strong>Reference:</strong> ${escapeHtml(details.referenceId)}</p>
      <p style="margin:0 0 20px;font-size:13px;color:#b24e2c;">${escapeHtml(details.paymentNote)}</p>
      <div style="text-align:center;padding:16px;background:#f0eae1;border:1px dashed #ccb495;">
        <img src="${details.qrDataUrl}" alt="QR pass" width="200" height="200" style="display:block;margin:0 auto;" />
        <p style="margin:12px 0 0;font-size:12px;color:#61554d;">Scan at the visitor center for verification</p>
      </div>
    </td></tr>
    <tr><td style="padding:16px 24px;background:#f0eae1;font-size:12px;color:#61554d;">
      94-695 Waipahu Street, Waipahu, Oʻahu · Questions? Reply to this email.
    </td></tr>
  </table>
</body>
</html>`;
}

async function sendResendEmail(payload: {
  to: string[];
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const apiKey = Deno.env.get('RESEND_API_KEY');
  const from = Deno.env.get('RESEND_FROM_EMAIL') ?? 'HPV Tickets <onboarding@resend.dev>';
  if (!apiKey) {
    return { ok: false, error: 'Resend is not configured' };
  }

  const body: Record<string, unknown> = {
    from,
    to: payload.to,
    subject: payload.subject,
    html: payload.html,
  };
  if (payload.replyTo) {
    body.reply_to = payload.replyTo;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const responsePayload = await res.json();
  if (!res.ok) {
    return { ok: false, error: responsePayload?.message ?? 'Email send failed', payload: responsePayload };
  }
  return { ok: true, messageId: responsePayload.id as string };
}

export async function sendPassEmail(details: PassDetails) {
  return sendResendEmail({
    to: [details.recipientEmail],
    subject: `${details.title} — ${details.referenceId}`,
    html: passHtml(details),
  });
}

export async function sendInquiryNotification(input: InquiryNotificationInput) {
  const to = Deno.env.get('INQUIRY_TO_EMAIL');
  if (!to) {
    return { ok: false, error: 'INQUIRY_TO_EMAIL is not configured' };
  }

  const rows = fieldRows(input.fields);
  const html = shellHtml(
    `New ${input.typeLabel}`,
    `
      <p style="margin:0 0 16px;">A new website inquiry was submitted.</p>
      <p style="margin:0 0 8px;font-size:13px;color:#61554d;"><strong>Type:</strong> ${escapeHtml(input.typeLabel)}</p>
      <p style="margin:0 0 16px;font-size:13px;color:#61554d;"><strong>Reference:</strong> ${escapeHtml(input.referenceId)}</p>
      <table width="100%" style="border-top:1px dotted #ccb495;border-bottom:1px dotted #ccb495;margin-bottom:20px;">${rows}</table>
      ${input.submitterEmail ? `<p style="margin:0;font-size:13px;color:#61554d;">Reply directly to this email to contact the submitter.</p>` : ''}
    `,
  );

  return sendResendEmail({
    to: [to],
    subject: `[HPV] ${input.typeLabel} — ${input.referenceId}`,
    html,
    replyTo: input.submitterEmail,
  });
}

export async function sendInquiryAutoReply(input: InquiryAutoReplyInput) {
  const rows = fieldRows(input.summaryLines);
  const html = shellHtml(
    `We received your ${input.typeLabel}`,
    `
      <p style="margin:0 0 16px;">Aloha ${escapeHtml(input.recipientName)},</p>
      <p style="margin:0 0 16px;">Mahalo for reaching out to Hawaiian Plantation Village. We received your ${escapeHtml(input.typeLabel.toLowerCase())} and our team will follow up soon.</p>
      <p style="margin:0 0 16px;font-size:13px;color:#61554d;"><strong>Reference:</strong> ${escapeHtml(input.referenceId)}</p>
      <table width="100%" style="border-top:1px dotted #ccb495;border-bottom:1px dotted #ccb495;margin-bottom:20px;">${rows}</table>
    `,
  );

  return sendResendEmail({
    to: [input.recipientEmail],
    subject: `HPV ${input.typeLabel} received — ${input.referenceId}`,
    html,
  });
}

export { formatCents };
