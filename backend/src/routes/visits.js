const router = require('express').Router();
const auth = require('../middleware/auth');
const { handle, parsePage } = require('../utils/respond');
router.use(auth);
router.get('/', handle(async (req, res) => {
  const { page, limit, from, to } = parsePage(req);
  let q = req.supabase.from('visits').select('*', { count: 'exact' }).order('visit_date', { ascending: false }).range(from, to);
  if (req.profile.role !== 'admin') q = q.eq('asha_user_id', req.profile.id);
  if (req.query.beneficiary_id) q = q.eq('beneficiary_id', req.query.beneficiary_id);
  const { data, error, count } = await q;
  if (error) throw error;
  res.json({ data, page, limit, total: count });
}));
router.post('/', handle(async (req, res) => {
  const { beneficiary_id, visit_date, visit_type, observations, symptoms, measurements, transcript, notes } = req.body || {};
  if (!beneficiary_id) return res.status(400).json({ error: 'Beneficiary is required' });
  const { data: beneficiary, error: check } = await req.supabase.from('beneficiaries').select('id').eq('id', beneficiary_id).maybeSingle();
  if (check || !beneficiary) return res.status(400).json({ error: 'Beneficiary not found or access denied' });
  const { data, error } = await req.supabase.from('visits').insert({ beneficiary_id, visit_date, visit_type, observations, symptoms, measurements, transcript, notes, asha_user_id: req.profile.id }).select().single();
  if (error) throw error;
  res.status(201).json(data);
}));
router.get('/:id', handle(async (req, res) => {
  let q = req.supabase.from('visits').select('*').eq('id', req.params.id);
  if (req.profile.role !== 'admin') q = q.eq('asha_user_id', req.profile.id);
  const { data, error } = await q.single();
  if (error) return res.status(404).json({ error: 'Visit not found' });
  res.json(data);
}));
module.exports = router;
