const router = require('express').Router();
const auth = require('../middleware/auth');
const { handle } = require('../utils/respond');
router.use(auth);
router.get('/', handle(async (req, res) => {
  let q = req.supabase.from('vaccinations').select('*').order('due_date', { ascending: true });
  if (req.profile.role !== 'admin') q = q.eq('asha_user_id', req.profile.id);
  if (req.query.beneficiary_id) q = q.eq('beneficiary_id', req.query.beneficiary_id);
  if (req.query.status) q = q.eq('status', req.query.status);
  const { data, error } = await q;
  if (error) throw error;
  res.json(data);
}));
router.post('/', handle(async (req, res) => {
  const { beneficiary_id, vaccine_name, dose_number, due_date, administered_date, status, notes } = req.body || {};
  if (!beneficiary_id || !vaccine_name) return res.status(400).json({ error: 'Beneficiary and vaccine name are required' });
  const { data, error } = await req.supabase.from('vaccinations').insert({ beneficiary_id, vaccine_name, dose_number, due_date, administered_date, status: status || 'pending', notes, asha_user_id: req.profile.id }).select().single();
  if (error) throw error;
  res.status(201).json(data);
}));
router.patch('/:id', handle(async (req, res) => {
  const allowed = ['vaccine_name','dose_number','due_date','administered_date','status','notes'];
  const updates = Object.fromEntries(Object.entries(req.body || {}).filter(([k]) => allowed.includes(k)));
  let q = req.supabase.from('vaccinations').update(updates).eq('id', req.params.id);
  if (req.profile.role !== 'admin') q = q.eq('asha_user_id', req.profile.id);
  const { data, error } = await q.select().single();
  if (error) return res.status(404).json({ error: 'Vaccination not found or update denied' });
  res.json(data);
}));
module.exports = router;
