const router = require('express').Router();
const auth = require('../middleware/auth');
const { handle, parsePage } = require('../utils/respond');
router.use(auth);
router.get('/', handle(async (req, res) => {
  const { page, limit, from, to } = parsePage(req);
  let q = req.supabase.from('beneficiaries').select('*', { count: 'exact' }).order('created_at', { ascending: false }).range(from, to);
  if (req.profile.role !== 'admin') q = q.eq('asha_user_id', req.profile.id);
  if (req.query.q) q = q.or(`name.ilike.%${String(req.query.q).replace(/[(),]/g,'')}%,phone.ilike.%${String(req.query.q).replace(/[(),]/g,'')}%,ward.ilike.%${String(req.query.q).replace(/[(),]/g,'')}%`);
  if (req.query.ward) q = q.eq('ward', req.query.ward);
  const { data, error, count } = await q;
  if (error) throw error;
  res.json({ data, page, limit, total: count });
}));
router.get('/:id', handle(async (req, res) => {
  let q = req.supabase.from('beneficiaries').select('*').eq('id', req.params.id);
  if (req.profile.role !== 'admin') q = q.eq('asha_user_id', req.profile.id);
  const { data, error } = await q.single();
  if (error) return res.status(404).json({ error: 'Beneficiary not found' });
  res.json(data);
}));
router.post('/', handle(async (req, res) => {
  const { name, age, dob, gender, phone, address, ward, notes } = req.body || {};
  if (!name?.trim()) return res.status(400).json({ error: 'Beneficiary name is required' });
  const { data, error } = await req.supabase.from('beneficiaries').insert({ name, age, dob, gender, phone, address, ward, notes, asha_user_id: req.profile.id }).select().single();
  if (error) throw error;
  res.status(201).json(data);
}));
router.patch('/:id', handle(async (req, res) => {
  const allowed = ['name','age','dob','gender','phone','address','ward','notes','pregnancy_status','risk_status'];
  const updates = Object.fromEntries(Object.entries(req.body || {}).filter(([k]) => allowed.includes(k)));
  let q = req.supabase.from('beneficiaries').update(updates).eq('id', req.params.id);
  if (req.profile.role !== 'admin') q = q.eq('asha_user_id', req.profile.id);
  const { data, error } = await q.select().single();
  if (error) return res.status(404).json({ error: 'Beneficiary not found or update denied' });
  res.json(data);
}));
router.delete('/:id', handle(async (req, res) => {
  let q = req.supabase.from('beneficiaries').delete().eq('id', req.params.id);
  if (req.profile.role !== 'admin') q = q.eq('asha_user_id', req.profile.id);
  const { error } = await q;
  if (error) throw error;
  res.json({ ok: true });
}));
module.exports = router;
