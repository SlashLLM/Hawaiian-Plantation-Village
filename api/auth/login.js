import {
  buildSessionCookie,
  createSessionToken,
  getClientIp,
  getUserAgent,
  safeCompare,
} from '../_lib/session.js';
import { sendAlert } from '../_lib/resend.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sitePassword = process.env.SITE_PASSWORD;
  if (!sitePassword) {
    return res.status(500).json({ error: 'Server is not configured' });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  const { password } = body || {};
  if (!password || typeof password !== 'string') {
    return res.status(400).json({ error: 'Password is required' });
  }

  if (!safeCompare(password, sitePassword)) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  try {
    const token = await createSessionToken();
    res.setHeader('Set-Cookie', buildSessionCookie(token));

    const timestamp = new Date().toISOString();
    const ip = getClientIp(req);
    const userAgent = getUserAgent(req);

    sendAlert(
      'HPV Site — Login Alert',
      `<h2>Site access granted</h2>
       <p><strong>Time:</strong> ${timestamp}</p>
       <p><strong>IP:</strong> ${ip}</p>
       <p><strong>User-Agent:</strong> ${userAgent}</p>`,
    ).catch((emailError) => {
      console.error('Login alert email failed:', emailError);
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Unable to complete login' });
  }
}
