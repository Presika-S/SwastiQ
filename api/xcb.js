// X (Twitter) OAuth 2.0 callback: exchanges the code, reads the profile, starts a session.
const { verify, cookies, setCookie, start } = require('./_session');
const go = (res, to) => { res.statusCode = 302; res.setHeader('Location', to); res.end(); };
module.exports = async (req, res) => {
  const q = req.query || {}, id = process.env.X_CLIENT_ID;
  const c = verify(cookies(req).sq_x); setCookie(req, res, 'sq_x', '', 0);
  if (!id || !c || !q.code || q.state !== c.s) return go(res, '/?err=x');
  try {
    const ru = `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host}/api/xcb`, h = { 'Content-Type': 'application/x-www-form-urlencoded' };
    if (process.env.X_CLIENT_SECRET) h.Authorization = 'Basic ' + Buffer.from(id + ':' + process.env.X_CLIENT_SECRET).toString('base64');
    const t = await (await fetch('https://api.twitter.com/2/oauth2/token', { method: 'POST', headers: h, body: new URLSearchParams({ grant_type: 'authorization_code', code: q.code, redirect_uri: ru, code_verifier: c.v, client_id: id }) })).json();
    if (!t.access_token) return go(res, '/?err=x');
    const u = (await (await fetch('https://api.twitter.com/2/users/me', { headers: { Authorization: 'Bearer ' + t.access_token } })).json()).data;
    if (!u) return go(res, '/?err=x');
    const list = (process.env.ASHA_ALLOWED || '').split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
    if (list.length && !list.includes('@' + u.username.toLowerCase()) && !list.includes(u.username.toLowerCase())) return go(res, '/?err=deny');
    start(req, res, { n: u.name || u.username, p: 'x' }); return go(res, '/landing.html');
  } catch (e) { return go(res, '/?err=x'); }
};
