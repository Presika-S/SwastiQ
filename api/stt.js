// Browser -> this function -> Gnani Prisma v3.0.
// The API key is read only on the server and is never sent to the browser.
// Increased to 50MB to support continuous recording with no artificial time limit.
const MAX_AUDIO_BYTES = 50 * 1024 * 1024;

async function readAudio(req) {
  // Vercel may expose an already-parsed octet-stream body as a Buffer.
  if (Buffer.isBuffer(req.body)) return req.body;
  if (req.body instanceof Uint8Array) return Buffer.from(req.body);

  const chunks = [];
  let total = 0;

  for await (const chunk of req) {
    const part = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    total += part.length;
    if (total > MAX_AUDIO_BYTES) {
      const error = new Error('Recording is too large. Please record a shorter clip.');
      error.statusCode = 413;
      throw error;
    }
    chunks.push(part);
  }

  return Buffer.concat(chunks);
}

const { requireSession } = require('./_session');
module.exports = async (req, res) => {
  if (!requireSession(req, res)) return;
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'POST only' });
  }

  const apiKey = process.env.GNANI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: 'Voice service is not configured. Add GNANI_API_KEY in Vercel Environment Variables.',
    });
  }

  try {
    const audio = await readAudio(req);

    if (audio.length < 2000) {
      return res.status(200).json({ transcript: '', language: null });
    }

    if (audio.length > MAX_AUDIO_BYTES) {
      return res.status(413).json({ error: 'Recording is too large. Please record a shorter clip.' });
    }

    const requestedLanguage = String((req.query && req.query.lang) || 'indic-auto');
    const language = requestedLanguage
      .replace(/[^A-Za-z0-9,_-]/g, '')
      .slice(0, 40) || 'indic-auto';

    const form = new FormData();
    form.append('audio_file', new Blob([audio], { type: 'audio/wav' }), 'speech.wav');
    form.append('model', process.env.GNANI_STT_MODEL || 'prisma-v3.0');
    form.append('language_code', language);
    form.append('format', 'transcribe');

    const response = await fetch('https://api.vachana.ai/stt/v3', {
      method: 'POST',
      headers: { 'X-API-Key-ID': apiKey },
      body: form,
      signal: AbortSignal.timeout(120000),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message =
        (result.error && result.error.message) ||
        (result.detail && (result.detail.message || JSON.stringify(result.detail))) ||
        result.message ||
        `Gnani returned HTTP ${response.status}`;

      const status = response.status === 429 ? 429 :
        response.status === 401 || response.status === 403 ? 502 : 502;

      return res.status(status).json({
        error: response.status === 401 || response.status === 403
          ? 'Gnani authentication failed. Check that GNANI_API_KEY is the correct API key.'
          : message.slice(0, 300),
      });
    }

    return res.status(200).json({
      transcript: result.transcript || '',
      language: result.detected_language_code || result.language_code || result.language || null,
      detected_language_code: result.detected_language_code || null,
      language_code: result.language_code || null,
    });
  } catch (error) {
    const status = error.statusCode || (error.name === 'TimeoutError' ? 504 : 500);
    return res.status(status).json({
      error: status === 504
        ? 'Gnani speech recognition timed out. Please try again.'
        : (error.message || 'Speech recognition failed.'),
    });
  }
};

// Audio is streamed as application/octet-stream; do not parse it as JSON.
module.exports.config = {
  api: {
    bodyParser: false,
  },
};
