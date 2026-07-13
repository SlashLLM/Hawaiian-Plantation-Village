import { Resend } from 'resend';

let resendClient;

function getResend() {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY is not configured');
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

export async function sendAlert(subject, html) {
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.ALERT_EMAIL;

  if (!from || !to) {
    throw new Error('RESEND_FROM_EMAIL and ALERT_EMAIL must be configured');
  }

  await getResend().emails.send({
    from,
    to,
    subject,
    html,
  });
}
