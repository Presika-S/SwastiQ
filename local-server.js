// Run the app locally: node local-server.js
// Reads GNANI_API_KEY from .env.local and serves /public plus /api functions.
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8000;
const ROOT = __dirname;
const PUBLIC_ROOT = path.resolve(ROOT, 'public');
const API_ROOT = path.resolve(ROOT, 'api');

try {
  const envPath = path.join(ROOT, '.env.local');
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (match && !line.trim().startsWith('#') && !process.env[match[1]]) {
      process.env[match[1]] = match[2].replace(/^["']|["']$/g, '');
    }
  }
} catch (error) {
  console.log('No .env.local found. Voice features will remain disabled until GNANI_API_KEY is configured.');
}

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');

  if (url.pathname.startsWith('/api/')) {
    const file = path.resolve(API_ROOT, path.basename(url.pathname) + '.js');
    if (!file.startsWith(API_ROOT + path.sep) || !fs.existsSync(file)) {
      res.statusCode = 404;
      return res.end('Not found');
    }

    req.query = Object.fromEntries(url.searchParams);

    if ((req.headers['content-type'] || '').includes('application/json')) {
      let body = '';
      for await (const chunk of req) body += chunk;
      try { req.body = JSON.parse(body); } catch (error) { req.body = {}; }
    }

    res.status = (code) => {
      res.statusCode = code;
      return res;
    };
    res.json = (value) => {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify(value));
    };
    res.send = (value) => res.end(value);

    try {
      return await require(file)(req, res);
    } catch (error) {
      console.error('API route error:', error);
      if (!res.headersSent) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
      }
      if (!res.writableEnded) res.end(JSON.stringify({ error: 'Server error' }));
    }
  }

  let pathname;
  try {
    pathname = decodeURIComponent(url.pathname);
  } catch (error) {
    res.statusCode = 400;
    return res.end('Bad request');
  }

  const requested = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const file = path.resolve(PUBLIC_ROOT, requested);

  if (!file.startsWith(PUBLIC_ROOT + path.sep) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.statusCode = 404;
    return res.end('Not found');
  }

  res.setHeader('Content-Type', contentTypes[path.extname(file).toLowerCase()] || 'application/octet-stream');
  res.end(fs.readFileSync(file));
});

server.listen(PORT, () => {
  console.log(`SwastiQ running at http://localhost:${PORT}`);
});
