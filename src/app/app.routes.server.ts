import { RenderMode, ServerRoute } from '@angular/ssr';
import { SCREEN_PRINTING_SERIES } from './pages/products/inks/ink-series.model';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'products/inks/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () =>
      SCREEN_PRINTING_SERIES.map(series => ({ slug: series.slug })),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
