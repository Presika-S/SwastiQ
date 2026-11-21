exports.handle = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
exports.parsePage = (req) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20));
  return { page, limit, from: (page - 1) * limit, to: page * limit - 1 };
};
exports.ownerFilter = (query, profile) => profile.role === 'admin' ? query : query.eq('asha_user_id', profile.id);
