import { RenderMode, ServerRoute } from '@angular/ssr';
import { SCREEN_PRINTING_SERIES_SLUGS } from './pages/products/inks/ink-series-slugs';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'products/inks/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () =>
      SCREEN_PRINTING_SERIES_SLUGS.map(slug => ({ slug })),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
