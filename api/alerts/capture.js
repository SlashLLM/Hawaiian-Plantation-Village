import { getClientIp, getUserAgent, isAuthenticated } from '../_lib/session.js';
import { sendAlert } from '../_lib/resend.js';

const ALLOWED_TYPES = new Set([
  'printscreen',
  'copy',
  'contextmenu',
  'visibility_hidden',
]);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authenticated = await isAuthenticated(req);
  if (!authenticated) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  const { type, detail } = body || {};
  if (!type || !ALLOWED_TYPES.has(type)) {
    return res.status(400).json({ error: 'Invalid alert type' });
  }

  try {
    const timestamp = new Date().toISOString();
    const ip = getClientIp(req);
    const userAgent = getUserAgent(req);

    await sendAlert(
      `HPV Site — Capture Alert (${type})`,
      `<h2>Suspicious activity detected</h2>
       <p><strong>Event:</strong> ${type}</p>
       <p><strong>Detail:</strong> ${detail || 'none'}</p>
       <p><strong>Time:</strong> ${timestamp}</p>
       <p><strong>IP:</strong> ${ip}</p>
       <p><strong>User-Agent:</strong> ${userAgent}</p>`,
    );

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Capture alert error:', error);
    return res.status(500).json({ error: 'Unable to send alert' });
  }
}
