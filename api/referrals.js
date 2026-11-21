// PHC referrals: the ASHA worker's app sends a referral here, PHC staff see it on the PHC Referral Dashboard,
// acknowledge it, send instructions back and schedule a follow-up. The ASHA app polls this endpoint to pick up
// the PHC's acknowledgement and instructions.
//
//   GET  /api/referrals                      -> { role, me, list }   (PHC sees all, an ASHA worker sees her own)
//   POST /api/referrals {action:'create',...}   (ASHA worker)
//   POST /api/referrals {action:'ack'|'instruct'|'followup', id, ...}   (PHC staff only)
//
// Storage: Upstash Redis / Vercel KV when KV_REST_API_URL + KV_REST_API_TOKEN are set (needed on Vercel so every
// server instance sees the same referrals). Without it an in-memory copy is used, which is fine for local testing only.
//
// Who is PHC staff?  PHC_USERS = comma list of sign-in names, e.g.  PHC_USERS=Dr Anita,PHC Nurse
// If PHC_USERS is not set, every signed-in user can see the PHC dashboard (demo mode).
const crypto = require('crypto');
const { requireSession, send } = require('./_session');

const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const KEY = 'swastiq:referrals';
const mem = (globalThis.__sqReferrals = globalThis.__sqReferrals || new Map());

const redis = async (cmd) => {
  const r = await fetch(URL_, { method: 'POST', headers: { Authorization: 'Bearer ' + TOKEN }, body: JSON.stringify(cmd) });
  if (!r.ok) throw new Error('store ' + r.status);
  return (await r.json()).result;
};
const all = async () => {
  if (URL_ && TOKEN) {
    const flat = (await redis(['HGETALL', KEY])) || [], out = [];
    for (let i = 1; i < flat.length; i += 2) { try { out.push(JSON.parse(flat[i])); } catch (e) { /* skip bad row */ } }
    return out;
  }
  return [...mem.values()];
};
const get = async (id) => {
  if (URL_ && TOKEN) { const v = await redis(['HGET', KEY, id]); return v ? JSON.parse(v) : null; }
  return mem.get(id) || null;
};
const put = async (r) => {
  if (URL_ && TOKEN) await redis(['HSET', KEY, r.id, JSON.stringify(r)]); else mem.set(r.id, r);
};

const phcList = () => (process.env.PHC_USERS || '').split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
const isPhc = (name) => { const l = phcList(); return !l.length || l.includes(String(name).toLowerCase()); };
const txt = (v, n) => String(v == null ? '' : v).replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, n);

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const s = requireSession(req, res); if (!s) return;
  const me = s.n, phc = isPhc(me);
  try {
    if (req.method === 'GET') {
      let list = await all();
      if (!phc) list = list.filter((r) => String(r.ashaName).toLowerCase() === String(me).toLowerCase());
      list.sort((a, b) => b.createdAt - a.createdAt);
      return send(res, 200, { role: phc ? 'phc' : 'asha', me, list: list.slice(0, 200) });
    }
    if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' });
    const b = req.body || {}, action = b.action;

    if (action === 'create') {
      const alertId = txt(b.alertId, 60), pid = txt(b.beneficiaryId, 40);
      if (!alertId || !pid) return send(res, 400, { error: 'Missing alert or beneficiary.' });
      const id = crypto.createHash('sha256').update(me.toLowerCase() + '|' + alertId).digest('hex').slice(0, 20);
      const prev = await get(id);
      if (prev) return send(res, 200, { ok: true, referral: prev });          // already sent: keep PHC's progress
      const r = {
        id, alertId, ashaName: me, ashaPhone: txt(b.ashaPhone, 30),
        patientName: txt(b.patientName, 80) || 'Beneficiary ' + pid, beneficiaryId: pid,
        finding: txt(b.finding, 200), measurements: txt(b.measurements, 200), location: txt(b.location, 80) || 'Household visit',
        source: 'ASHA Worker', createdAt: Date.now(), status: 'Pending', ackAt: null, ackBy: null, instructions: [], followUp: null,
      };
      await put(r); return send(res, 200, { ok: true, referral: r });
    }

    if (!phc) return send(res, 403, { error: 'Only PHC staff can do this.' });
    const r = await get(txt(b.id, 40));
    if (!r) return send(res, 404, { error: 'Referral not found.' });
    if (action === 'ack') { if (r.status !== 'Acknowledged') { r.status = 'Acknowledged'; r.ackAt = Date.now(); r.ackBy = me; } }
    else if (action === 'instruct') {
      const t = txt(b.text, 500); if (!t) return send(res, 400, { error: 'Write the instruction first.' });
      r.instructions = (r.instructions || []).concat({ text: t, at: Date.now(), by: me }).slice(-10);
      if (r.status !== 'Acknowledged') { r.status = 'Acknowledged'; r.ackAt = Date.now(); r.ackBy = me; }
    } else if (action === 'followup') {
      const d = txt(b.date, 10); if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) return send(res, 400, { error: 'Choose a follow-up date.' });
      r.followUp = { date: d, note: txt(b.note, 200), at: Date.now(), by: me };
      if (r.status !== 'Acknowledged') { r.status = 'Acknowledged'; r.ackAt = Date.now(); r.ackBy = me; }
    } else return send(res, 400, { error: 'Unknown action' });
    await put(r); return send(res, 200, { ok: true, referral: r });
  } catch (e) { return send(res, 502, { error: 'Referral service had a problem. Please try again.' }); }
};
