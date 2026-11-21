const router = require('express').Router();
const auth = require('../middleware/auth');
const { handle } = require('../utils/respond');
router.use(auth);
router.get('/', handle(async (req, res) => {
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 86400000).toISOString().slice(0,10);
  const today = now.toISOString().slice(0,10);
  const owner = (q) => req.profile.role === 'admin' ? q : q.eq('asha_user_id', req.profile.id);
  const count = async (table, filters=[]) => {
    let q = req.supabase.from(table).select('id', { count: 'exact', head: true });
    q = owner(q);
    for (const [field,op,value] of filters) q = op === 'eq' ? q.eq(field,value) : op === 'gte' ? q.gte(field,value) : q.lte(field,value);
    const { count, error } = await q; if (error) throw error; return count || 0;
  };
  const [beneficiaries, visits7d, pendingFollowups, overdueFollowups, completedFollowups, vaccinationsDue] = await Promise.all([
    count('beneficiaries'),
    count('visits',[['visit_date','gte',sevenDaysAgo]]),
    count('followups',[['status','eq','pending']]),
    count('followups',[['status','eq','pending'],['due_date','lte',today]]),
    count('followups',[['status','eq','completed']]),
    count('vaccinations',[['status','eq','pending'],['due_date','lte',today]])
  ]);
  const { data: recent, error } = await owner(req.supabase.from('beneficiaries').select('id,name,created_at,ward').order('created_at',{ascending:false}).limit(5));
  if (error) throw error;
  const totalFollowups = pendingFollowups + completedFollowups;
  res.json({ beneficiaries, visits7d, pendingFollowups, overdueFollowups, completedFollowups, followThroughPercent: totalFollowups ? Math.round(completedFollowups / totalFollowups * 100) : 0, vaccinationsDue, recentBeneficiaries: recent || [] });
}));
module.exports = router;
