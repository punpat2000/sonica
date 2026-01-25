import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    pathMatch: 'full',
    data: { background: 'hero' } // Use hero background for home page
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about-us/about-us.component').then(m => m.AboutUsComponent),
    data: { title: 'About Us', description: 'Learn more about Sonica and our mission to provide innovative UV screen printing solutions.' }
  },
  {
    path: 'products',
    children: [
      {
        path: 'inks',
        loadComponent: () => import('./pages/placeholder/placeholder.component').then(m => m.PlaceholderComponent),
        data: { title: 'UV Screen Printing Inks', description: 'High-quality UV screen printing inks for various applications.' }
      },
      {
        path: 'squeegees',
        loadComponent: () => import('./pages/placeholder/placeholder.component').then(m => m.PlaceholderComponent),
        data: { title: 'Squeegees', description: 'Premium quality squeegees for screen printing applications.' }
      },
      {
        path: 'led-uv-curing',
        loadComponent: () => import('./pages/products/led-uv-curing/led-uv-curing.component').then(m => m.LedUvCuringComponent),
        data: { title: 'LED/UV Curing Systems', description: 'Advanced LED and UV curing systems for efficient production.' }
      },
      {
        path: 'uv-meters',
        loadComponent: () => import('./pages/placeholder/placeholder.component').then(m => m.PlaceholderComponent),
        data: { title: 'UV Intensity Meters', description: 'Precise UV intensity measurement equipment.' }
      }
    ]
  },
  {
    path: 'services',
    children: [
      {
        path: 'color-matching',
        loadComponent: () => import('./pages/placeholder/placeholder.component').then(m => m.PlaceholderComponent),
        data: { title: 'Color Matching', description: 'Professional color matching services for your printing needs.' }
      },
      {
        path: 'consulting',
        loadComponent: () => import('./pages/placeholder/placeholder.component').then(m => m.PlaceholderComponent),
        data: { title: 'Technical Consulting', description: 'Expert technical consulting to optimize your printing processes.' }
      },
      {
        path: 'support',
        loadComponent: () => import('./pages/placeholder/placeholder.component').then(m => m.PlaceholderComponent),
        data: { title: 'Customer Support', description: 'Comprehensive customer support and after-sales service.' }
      }
    ]
  },
  {
    path: 'industries',
    loadComponent: () => import('./pages/placeholder/placeholder.component').then(m => m.PlaceholderComponent),
    data: { title: 'Industries', description: 'Discover how Sonica serves various industries with our innovative solutions.' }
  },
  {
    path: 'resources',
    loadComponent: () => import('./pages/placeholder/placeholder.component').then(m => m.PlaceholderComponent),
    data: { title: 'Resources', description: 'Access technical documentation, guides, and resources.' }
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/placeholder/placeholder.component').then(m => m.PlaceholderComponent),
    data: { title: 'Contact Us', description: 'Get in touch with our team for inquiries and support.' }
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
