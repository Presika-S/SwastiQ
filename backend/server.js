require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_ORIGIN?.split(',') || true, credentials: true }));
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_req, res) => res.json({ ok: true, service: 'SwastiQ backend', timestamp: new Date().toISOString() }));

app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/beneficiaries', require('./src/routes/beneficiaries'));
app.use('/api/visits', require('./src/routes/visits'));
app.use('/api/followups', require('./src/routes/followups'));
app.use('/api/vaccinations', require('./src/routes/vaccinations'));
app.use('/api/dashboard', require('./src/routes/dashboard'));
app.use('/api/alerts', require('./src/routes/alerts'));

app.use((req, res) => res.status(404).json({ error: 'Endpoint not found' }));
app.use((err, _req, res, _next) => {
  console.error('API error:', err.message);
  res.status(err.status || 500).json({ error: err.status ? err.message : 'Internal server error' });
});

const port = Number(process.env.PORT || 4000);
app.listen(port, () => console.log(`SwastiQ backend listening on ${port}`));
