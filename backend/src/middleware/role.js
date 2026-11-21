module.exports = (...roles) => (req, res, next) => {
  if (!req.profile || !roles.includes(req.profile.role)) return res.status(403).json({ error: 'Insufficient permissions' });
  next();
};
