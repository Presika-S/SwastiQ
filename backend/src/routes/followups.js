const router = require('express').Router();
const auth = require('../middleware/auth');
const { handle, parsePage } = require('../utils/respond');
router.use(auth);
router.get('/', handle(async (req, res) => {
  const { page, limit, from, to } = parsePage(req);
  let q = req.supabase.from('followups').select('*', { count: 'exact' }).order('due_date', { ascending: true }).range(from, to);
  if (req.profile.role !== 'admin') q = q.eq('asha_user_id', req.profile.id);
  if (req.query.status) q = q.eq('status', req.query.status);
  if (req.query.beneficiary_id) q = q.eq('beneficiary_id', req.query.beneficiary_id);
  const { data, error, count } = await q;
  if (error) throw error;
  res.json({ data, page, limit, total: count });
}));
router.post('/', handle(async (req, res) => {
  const { beneficiary_id, due_date, reason, priority, notes } = req.body || {};
  if (!beneficiary_id || !due_date) return res.status(400).json({ error: 'Beneficiary and due date are required' });
  const { data, error } = await req.supabase.from('followups').insert({ beneficiary_id, due_date, reason, priority: priority || 'normal', notes, status: 'pending', asha_user_id: req.profile.id }).select().single();
  if (error) throw error;
  res.status(201).json(data);
}));
router.patch('/:id', handle(async (req, res) => {
  const allowed = ['due_date','reason','priority','notes','status','completed_at'];
  const updates = Object.fromEntries(Object.entries(req.body || {}).filter(([k]) => allowed.includes(k)));
  if (updates.status === 'completed' && !updates.completed_at) updates.completed_at = new Date().toISOString();
  let q = req.supabase.from('followups').update(updates).eq('id', req.params.id);
  if (req.profile.role !== 'admin') q = q.eq('asha_user_id', req.profile.id);
  const { data, error } = await q.select().single();
  if (error) return res.status(404).json({ error: 'Follow-up not found or update denied' });
  res.json(data);
}));
module.exports = router;
