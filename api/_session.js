// Signed, HttpOnly session cookie helpers (no database needed). Files starting with "_" are not exposed as endpoints.
const crypto = require('crypto');
// The signing key MUST be the same on every serverless instance, otherwise a login created on one instance
// is rejected by another and the user is bounced back to the sign-in page. Set SESSION_SECRET in Vercel; if it is
// missing we derive a stable key from other private settings so sign-in still works.
const SECRET = process.env.SESSION_SECRET || crypto.createHash('sha256').update('swastiq-session|' + [process.env.KV_REST_API_TOKEN, process.env.UPSTASH_REDIS_REST_TOKEN, process.env.ASHA_USERS, process.env.GNANI_API_KEY].filter(Boolean).join('|') || 'swastiq-dev').digest('hex');
const sign = (o) => { const p = Buffer.from(JSON.stringify(o)).toString('base64url'); return p + '.' + crypto.createHmac('sha256', SECRET).update(p).digest('base64url'); };
const verify = (t) => {
  if (!t) return null; const [p, m] = String(t).split('.'); if (!p || !m) return null;
  const want = crypto.createHmac('sha256', SECRET).update(p).digest(); let got;
  try { got = Buffer.from(m, 'base64url'); } catch (e) { return null; }
  if (got.length !== want.length || !crypto.timingSafeEqual(got, want)) return null;
  try { const o = JSON.parse(Buffer.from(p, 'base64url').toString()); return o.e > Date.now() ? o : null; } catch (e) { return null; }
};
const cookies = (req) => Object.fromEntries((req.headers.cookie || '').split(/;\s*/).filter(Boolean).map((c) => { const i = c.indexOf('='); return [c.slice(0, i), decodeURIComponent(c.slice(i + 1))]; }));
const isHttps = (req) => (req.headers['x-forwarded-proto'] || 'http') === 'https';
const setCookie = (req, res, name, val, maxAge) => {
  const c = `${name}=${encodeURIComponent(val)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${isHttps(req) ? '; Secure' : ''}`;
  const prev = res.getHeader('Set-Cookie'); res.setHeader('Set-Cookie', prev ? [].concat(prev, c) : c);
};
const session = (req) => verify(cookies(req).sq_session);
const start = (req, res, user) => setCookie(req, res, 'sq_session', sign({ ...user, e: Date.now() + 7 * 864e5 }), 7 * 86400);
const send = (res, code, obj) => { res.statusCode = code; res.setHeader('Content-Type', 'application/json; charset=utf-8'); res.end(JSON.stringify(obj)); };
const requireSession = (req, res) => { const s = session(req); if (!s) { send(res, 401, { error: 'Please sign in first.' }); return null; } return s; };
module.exports = { sign, verify, cookies, setCookie, session, start, send, requireSession, isHttps };
