import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// 1. Trust the cloud proxy (very important)
app.set('trust proxy', 1);

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

// Serve robots.txt
app.get('/robots.txt', (req, res) => {
  const baseUrl = req.protocol + '://' + req.get('host');

  res.type('text/plain');
  res.send(
    `User-agent: *
Disallow:

Sitemap: ${baseUrl}/sitemap.xml
`
  );
});

// app.get('/sitemap.xml', async (req, res) => {
//   const baseUrl = req.protocol + '://' + req.get('host');

//   const staticRoutes = ['/'];

//   const allRoutes = [...staticRoutes];

//   const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
//   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//     ${allRoutes.map(route => `
//     <url>
//       <loc>${baseUrl}${route}</loc>
//       <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
//       <priority>${route === '/' ? '1.0' : route === '/blog' ? '0.8' : '0.6'}</priority>
//     </url>
//     `).join('')}
//   </urlset>`;
//   res.header('Content-Type', 'application/xml');
//   res.send(sitemap.trim());
// });

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
