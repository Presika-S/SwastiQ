const { userClient, admin } = require('../lib/supabase');
module.exports = async function auth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : '';
    if (!token) return res.status(401).json({ error: 'Authentication required' });
    const client = userClient(token);
    const { data, error } = await client.auth.getUser(token);
    if (error || !data?.user) return res.status(401).json({ error: 'Invalid or expired session' });
    req.user = data.user;
    req.supabase = client;
    // Profile/role is fetched from the protected profile table.
    const { data: profile } = await admin.from('asha_users').select('id,full_name,role,ward,active').eq('auth_user_id', data.user.id).maybeSingle();
    if (profile && profile.active === false) return res.status(403).json({ error: 'Account disabled' });
    req.profile = profile || { auth_user_id: data.user.id, role: 'asha', full_name: data.user.email || 'ASHA Worker' };
    next();
  } catch (e) { next(e); }
};
