// Sign-in for ASHA workers: name or email + password, Google, and X (Twitter).
// ASHA_USERS = {"Lakshmi R.":"her-password","meena@example.org":"her-password"}   (leave unset for demo mode)
// ASHA_ALLOWED = optional comma list of Google emails / X handles allowed to sign in
// GOOGLE_CLIENT_ID, X_CLIENT_ID (+ X_CLIENT_SECRET) enable the social buttons.
const crypto = require('crypto');
const { sign, setCookie, session, start, send } = require('./_session');
const sha = (s) => crypto.createHash('sha256').update(String(s)).digest();
const users = () => { try { return JSON.parse(process.env.ASHA_USERS || 'null'); } catch (e) { return null; } };
const allow = (id) => { const l = (process.env.ASHA_ALLOWED || '').split(',').map((s) => s.trim().toLowerCase()).filter(Boolean); return !l.length || l.includes(String(id).toLowerCase()); };
const strong = (p) => /[A-Z]/.test(p) && /[a-z]/.test(p) && /\d/.test(p);
const tries = new Map();
const limited = (req) => { const ip = String(req.headers['x-forwarded-for'] || 'local').split(',')[0], n = Date.now(), a = (tries.get(ip) || []).filter((t) => n - t < 6e4); a.push(n); tries.set(ip, a); return a.length > 8; };

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const a = (req.query && req.query.a) || '';
  if (a === 'config') return send(res, 200, { demo: !users(), google: process.env.GOOGLE_CLIENT_ID || null, x: !!process.env.X_CLIENT_ID });
  if (a === 'me') { const s = session(req); return s ? send(res, 200, { name: s.n, provider: s.p }) : send(res, 401, { error: 'Signed out' }); }
  if (a === 'logout') { setCookie(req, res, 'sq_session', '', 0); return send(res, 200, { ok: true }); }
  if (a === 'xstart') {
    if (!process.env.X_CLIENT_ID) return send(res, 501, { error: 'X sign-in is not set up yet. Add X_CLIENT_ID in the server settings.' });
    const v = crypto.randomBytes(32).toString('base64url'), st = crypto.randomBytes(16).toString('hex');
    const ch = crypto.createHash('sha256').update(v).digest('base64url');
    setCookie(req, res, 'sq_x', sign({ v, s: st, e: Date.now() + 6e5 }), 600);
    const ru = `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host}/api/xcb`;
    res.statusCode = 302;
    res.setHeader('Location', 'https://twitter.com/i/oauth2/authorize?' + new URLSearchParams({ response_type: 'code', client_id: process.env.X_CLIENT_ID, redirect_uri: ru, scope: 'users.read tweet.read', state: st, code_challenge: ch, code_challenge_method: 'S256' }));
    return res.end();
  }
  if (req.method !== 'POST') return send(res, 405, { error: 'POST only' });
  if (limited(req)) return send(res, 429, { error: 'Too many attempts. Please wait a minute and try again.' });
  const b = req.body || {};
  if (a === 'demo') {   // demo mode only: lets you try the social buttons before real keys are added
    if (users()) return send(res, 403, { error: 'Demo sign-in is turned off on this server.' });
    const p = ['google', 'x', 'email'].includes(b.provider) ? b.provider : 'google';
    start(req, res, { n: 'Demo worker', p: p + '-demo' }); return send(res, 200, { ok: true, name: 'Demo worker', demo: true });
  }
  if (a === 'login') {
    const id = String(b.id || '').trim().slice(0, 80), pw = String(b.password || '').slice(0, 200), U = users();
    if (!id || !pw) return send(res, 400, { error: 'Enter your name and password.' });
    if (!strong(pw)) return send(res, 400, { error: 'Password must contain one capital letter, small letters and at least one number.' });
    let name = null;
    if (U) { const k = Object.keys(U).find((x) => x.toLowerCase() === id.toLowerCase()); if (k && crypto.timingSafeEqual(sha(U[k]), sha(pw))) name = k; }
    else name = id.includes('@') ? id.split('@')[0] : id;   // demo mode
    if (!name) return send(res, 401, { error: 'Name or password is not correct.' });
    start(req, res, { n: name, p: 'password' }); return send(res, 200, { ok: true, name, demo: !U });
  }
  if (a === 'google') {
    const cid = process.env.GOOGLE_CLIENT_ID; if (!cid) return send(res, 501, { error: 'Google sign-in is not set up yet.' });
    try {
      const r = await fetch('https://oauth2.googleapis.com/tokeninfo?id_token=' + encodeURIComponent(String(b.credential || '')));
      const j = await r.json();
      if (!r.ok || j.aud !== cid || String(j.email_verified) !== 'true') return send(res, 401, { error: 'Google could not verify this account.' });
      if (!allow(j.email)) return send(res, 403, { error: 'This Google account is not on the approved list.' });
      const name = j.name || j.email.split('@')[0]; start(req, res, { n: name, p: 'google' }); return send(res, 200, { ok: true, name });
    } catch (e) { return send(res, 502, { error: 'Google sign-in failed. Please try again.' }); }
  }
  return send(res, 404, { error: 'Unknown action' });
};
