const { createClient } = require('@supabase/supabase-js');
const url = process.env.SUPABASE_URL;
const anon = process.env.SUPABASE_ANON_KEY;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !anon || !service) {
  console.warn('Supabase environment is incomplete. Set SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY.');
}
const admin = url && service ? createClient(url, service, { auth: { persistSession: false } }) : null;
const userClient = (token) => createClient(url, anon, {
  auth: { persistSession: false },
  global: { headers: { Authorization: `Bearer ${token}` } }
});
module.exports = { admin, userClient };
