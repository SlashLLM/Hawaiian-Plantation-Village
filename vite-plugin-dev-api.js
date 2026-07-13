import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROUTES = {
  'POST /api/auth/login': 'api/auth/login.js',
  'GET /api/auth/verify': 'api/auth/verify.js',
  'POST /api/auth/logout': 'api/auth/logout.js',
  'POST /api/alerts/capture': 'api/alerts/capture.js',
};

function loadEnvFile(root) {
  const envPath = resolve(root, '.env');
  if (!existsSync(envPath)) return;

  const content = readFileSync(envPath, 'utf8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const separator = trimmed.indexOf('=');
    if (separator === -1) continue;

    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

function readBody(req) {
  return new Promise((resolveBody, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8');
      if (!raw) {
        req.body = {};
        resolveBody();
        return;
      }
      try {
        req.body = JSON.parse(raw);
      } catch {
        req.body = raw;
      }
      resolveBody();
    });
    req.on('error', reject);
  });
}

function createResponse(res) {
  let statusCode = 200;

  return {
    status(code) {
      statusCode = code;
      return this;
    },
    setHeader(name, value) {
      res.setHeader(name, value);
      return this;
    },
    json(payload) {
      if (!res.headersSent) {
        res.statusCode = statusCode;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(payload));
      }
    },
  };
}

async function loadHandler(root, relativePath) {
  const moduleUrl = pathToFileURL(resolve(root, relativePath)).href;
  return import(/* @vite-ignore */ moduleUrl);
}

export function devApiPlugin() {
  let root = process.cwd();

  return {
    name: 'dev-api',
    configResolved(config) {
      root = config.root;
      loadEnvFile(root);
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0] || '';
        const routeKey = `${req.method} ${url}`;
        const handlerPath = ROUTES[routeKey];

        if (!handlerPath) {
          return next();
        }

        try {
          await readBody(req);
          const { default: handler } = await loadHandler(root, handlerPath);
          await handler(req, createResponse(res));
        } catch (error) {
          console.error(`Dev API error [${routeKey}]:`, error);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Internal server error' }));
          }
        }
      });
    },
  };
}
