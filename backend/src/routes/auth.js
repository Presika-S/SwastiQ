const router = require('express').Router();
const { admin } = require('../lib/supabase');
const { handle } = require('../utils/respond');
router.post('/signup', handle(async (req, res) => {
  const { email, password, full_name, ward } = req.body || {};
  if (!email || !password || !full_name) return res.status(400).json({ error: 'Email, password and full name are required' });
  if (String(password).length < 10) return res.status(400).json({ error: 'Password must be at least 10 characters' });
  const { data, error } = await admin.auth.admin.createUser({ email, password, email_confirm: false, user_metadata: { full_name } });
  if (error) return res.status(400).json({ error: error.message });
  const { error: profileError } = await admin.from('asha_users').insert({ auth_user_id: data.user.id, full_name, email, ward, role: 'asha' });
  if (profileError) return res.status(500).json({ error: 'Account created but profile setup failed. Contact administrator.' });
  res.status(201).json({ user: { id: data.user.id, email, full_name }, message: 'Account created. Confirm your email if enabled.' });
}));
router.post('/login', handle(async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });
  const { data, error } = await admin.auth.signInWithPassword({ email, password });
  if (error) return res.status(401).json({ error: 'Invalid email or password' });
  res.json({ session: data.session, user: data.user });
}));
router.post('/logout', (_req, res) => res.json({ ok: true }));
router.post('/password-reset', handle(async (req, res) => {
  const { email } = req.body || {};
  if (!email) return res.status(400).json({ error: 'Email is required' });
  const { error } = await admin.auth.resetPasswordForEmail(email);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ ok: true });
}));
module.exports = router;
