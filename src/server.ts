import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateSitemap, generateSitemapIndex, locales } from './sitemap-generator';

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
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`
  );
});

// Serve sitemap index (main sitemap.xml)
app.get('/sitemap.xml', (req, res) => {
  const baseUrl = req.protocol + '://' + req.get('host');
  const sitemapIndex = generateSitemapIndex(baseUrl);
  res.header('Content-Type', 'application/xml');
  res.send(sitemapIndex);
});

// Serve language-specific sitemaps for each locale (e.g. /en/sitemap.xml, /th/sitemap.xml)
locales.forEach(locale => {
  const pathWithoutTrailingSlash = locale.path.replace(/\/$/, '');
  const sitemapPath = pathWithoutTrailingSlash ? `${pathWithoutTrailingSlash}/sitemap.xml` : '/sitemap.xml';
  app.get(sitemapPath, (req, res) => {
    const baseUrl = req.protocol + '://' + req.get('host');
    const sitemap = generateSitemap(baseUrl, locale);
    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  });
});

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
