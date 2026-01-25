/**
 * Sitemap generator for multi-language Angular application
 */

export interface Route {
  path: string;
  priority?: number;
  changefreq?: string;
}

export const routes: Route[] = [
  { path: '', priority: 1.0, changefreq: 'daily' },
  { path: '/about', priority: 0.9, changefreq: 'monthly' },
  { path: '/products/inks', priority: 0.8, changefreq: 'monthly' },
  { path: '/products/squeegees', priority: 0.8, changefreq: 'monthly' },
  { path: '/products/led-uv-curing', priority: 0.8, changefreq: 'monthly' },
  { path: '/products/uv-meters', priority: 0.8, changefreq: 'monthly' },
  { path: '/services/color-matching', priority: 0.8, changefreq: 'monthly' },
  { path: '/services/consulting', priority: 0.8, changefreq: 'monthly' },
  { path: '/services/support', priority: 0.8, changefreq: 'monthly' },
  { path: '/industries', priority: 0.7, changefreq: 'monthly' },
  { path: '/resources', priority: 0.7, changefreq: 'monthly' },
  { path: '/contact', priority: 0.9, changefreq: 'monthly' },
];

export const locales = [
  { code: 'en', path: '' },
  { code: 'th', path: '/th' },
  { code: 'zh', path: '/zh' },
  { code: 'ja', path: '/ja' },
];

export function generateSitemapIndex(baseUrl: string): string {
  const sitemaps = locales.map(locale => {
    // English sitemap is at /sitemap-en.xml, others are at /{locale}/sitemap.xml
    const sitemapUrl = locale.path 
      ? `${baseUrl}${locale.path}/sitemap.xml`
      : `${baseUrl}/sitemap-en.xml`;
    return `    <sitemap>
      <loc>${sitemapUrl}</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    </sitemap>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps}
</sitemapindex>`;
}

export function generateSitemap(baseUrl: string, locale: { code: string; path: string }): string {
  const localePrefix = locale.path;
  const lastmod = new Date().toISOString().split('T')[0];

  const urlEntries = routes.map(route => {
    // Ensure proper path construction - if both are empty, use '/'
    let fullPath = localePrefix + route.path;
    if (fullPath === '') {
      fullPath = '/';
    }
    
    const priority = route.priority || 0.6;
    const changefreq = route.changefreq || 'monthly';

    // Generate hreflang alternatives
    const hreflangTags = locales.map(altLocale => {
      let altPath = altLocale.path + route.path;
      if (altPath === '') {
        altPath = '/';
      }
      return `      <xhtml:link rel="alternate" hreflang="${altLocale.code}" href="${baseUrl}${altPath}"/>`;
    }).join('\n');

    return `    <url>
      <loc>${baseUrl}${fullPath}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>${changefreq}</changefreq>
      <priority>${priority}</priority>
${hreflangTags}
    </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries}
</urlset>`;
}
