import { SignJWT, jwtVerify } from 'jose';
import { createHash, timingSafeEqual } from 'crypto';

const COOKIE_NAME = 'hpv_session';
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error('SESSION_SECRET is not configured');
  }
  return new TextEncoder().encode(secret);
}

export function safeCompare(a, b) {
  const ha = createHash('sha256').update(String(a)).digest();
  const hb = createHash('sha256').update(String(b)).digest();
  return timingSafeEqual(ha, hb);
}

export function parseCookies(req) {
  const header = req.headers.cookie || '';
  return Object.fromEntries(
    header
      .split(';')
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const separator = part.indexOf('=');
        if (separator === -1) return [part, ''];
        const key = part.slice(0, separator);
        const value = part.slice(separator + 1);
        return [key, decodeURIComponent(value)];
      }),
  );
}

export async function createSessionToken() {
  return new SignJWT({ sub: 'site-access' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSecret());
}

export async function verifySessionToken(token) {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload.sub === 'site-access';
  } catch {
    return false;
  }
}

export async function isAuthenticated(req) {
  const cookies = parseCookies(req);
  return verifySessionToken(cookies[COOKIE_NAME]);
}

export function buildSessionCookie(token) {
  const isProd = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';
  const secure = isProd ? ' Secure;' : '';
  return `${COOKIE_NAME}=${token}; HttpOnly;${secure} SameSite=Strict; Max-Age=${SESSION_MAX_AGE}; Path=/`;
}

export function buildClearSessionCookie() {
  const isProd = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';
  const secure = isProd ? ' Secure;' : '';
  return `${COOKIE_NAME}=; HttpOnly;${secure} SameSite=Strict; Max-Age=0; Path=/`;
}

export function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

export function getUserAgent(req) {
  return req.headers['user-agent'] || 'unknown';
}
