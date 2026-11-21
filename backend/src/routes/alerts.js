const router = require('express').Router();
const auth = require('../middleware/auth');
const { handle } = require('../utils/respond');
router.use(auth);
router.get('/', handle(async (req, res) => {
  let q = req.supabase.from('alerts').select('*').order('created_at',{ascending:false});
  if (req.profile.role !== 'admin') q = q.eq('asha_user_id', req.profile.id);
  if (req.query.status) q = q.eq('status', req.query.status);
  const { data, error } = await q;
  if (error) throw error;
  res.json(data);
}));
router.post('/', handle(async (req, res) => {
  const { beneficiary_id, alert_type, description, severity } = req.body || {};
  if (!beneficiary_id || !description) return res.status(400).json({ error: 'Beneficiary and description are required' });
  const { data, error } = await req.supabase.from('alerts').insert({ beneficiary_id, alert_type, description, severity: severity || 'review', status: 'open', asha_user_id: req.profile.id }).select().single();
  if (error) throw error;
  res.status(201).json(data);
}));
router.patch('/:id', handle(async (req, res) => {
  const updates = {};
  if (req.body.status) updates.status = req.body.status;
  if (req.body.status === 'resolved') updates.resolved_at = new Date().toISOString();
  let q = req.supabase.from('alerts').update(updates).eq('id', req.params.id);
  if (req.profile.role !== 'admin') q = q.eq('asha_user_id', req.profile.id);
  const { data, error } = await q.select().single();
  if (error) return res.status(404).json({ error: 'Alert not found or update denied' });
  res.json(data);
}));
module.exports = router;
