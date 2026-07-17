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

function passHtml(details: PassDetails): string {
  const rows = details.lines
    .map((l) => `<tr><td style="padding:6px 0;color:#61554d;">${l.label}</td><td style="padding:6px 0;font-weight:bold;text-align:right;">${l.value}</td></tr>`)
    .join('');

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${details.title}</title></head>
<body style="margin:0;padding:0;background:#fbf9f5;font-family:Georgia,serif;color:#211c18;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:24px auto;background:#fff;border:2px solid #4a2c11;">
    <tr><td style="padding:24px;background:#1b3823;color:#fff;">
      <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;">Hawaiian Plantation Village</div>
      <h1 style="margin:8px 0 0;font-size:22px;font-weight:normal;">${details.title}</h1>
      <p style="margin:4px 0 0;opacity:0.9;">${details.subtitle}</p>
    </td></tr>
    <tr><td style="padding:24px;">
      <p style="margin:0 0 16px;">Aloha ${details.recipientName},</p>
      <p style="margin:0 0 16px;">Your registration is confirmed. Present the QR code below at check-in.</p>
      <table width="100%" style="border-top:1px dotted #ccb495;border-bottom:1px dotted #ccb495;margin-bottom:20px;">${rows}</table>
      <p style="margin:0 0 8px;font-size:13px;color:#61554d;"><strong>Reference:</strong> ${details.referenceId}</p>
      <p style="margin:0 0 20px;font-size:13px;color:#b24e2c;">${details.paymentNote}</p>
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

export async function sendPassEmail(details: PassDetails) {
  const apiKey = Deno.env.get('RESEND_API_KEY');
  const from = Deno.env.get('RESEND_FROM_EMAIL') ?? 'HPV Tickets <onboarding@resend.dev>';
  if (!apiKey) {
    return { ok: false, error: 'Resend is not configured' };
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [details.recipientEmail],
      subject: `${details.title} — ${details.referenceId}`,
      html: passHtml(details),
    }),
  });

  const payload = await res.json();
  if (!res.ok) {
    return { ok: false, error: payload?.message ?? 'Email send failed', payload };
  }
  return { ok: true, messageId: payload.id as string };
}

export { formatCents };
