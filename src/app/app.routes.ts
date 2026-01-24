import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PlaceholderComponent } from './pages/placeholder/placeholder.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'about',
    component: PlaceholderComponent,
    data: { title: 'About Us', description: 'Learn more about Sonica and our mission to provide innovative UV screen printing solutions.' }
  },
  {
    path: 'products',
    children: [
      {
        path: 'inks',
        component: PlaceholderComponent,
        data: { title: 'UV Screen Printing Inks', description: 'High-quality UV screen printing inks for various applications.' }
      },
      {
        path: 'squeegees',
        component: PlaceholderComponent,
        data: { title: 'Squeegees', description: 'Premium quality squeegees for screen printing applications.' }
      },
      {
        path: 'led-uv-curing',
        component: PlaceholderComponent,
        data: { title: 'LED/UV Curing Systems', description: 'Advanced LED and UV curing systems for efficient production.' }
      },
      {
        path: 'uv-meters',
        component: PlaceholderComponent,
        data: { title: 'UV Intensity Meters', description: 'Precise UV intensity measurement equipment.' }
      }
    ]
  },
  {
    path: 'services',
    children: [
      {
        path: 'color-matching',
        component: PlaceholderComponent,
        data: { title: 'Color Matching', description: 'Professional color matching services for your printing needs.' }
      },
      {
        path: 'consulting',
        component: PlaceholderComponent,
        data: { title: 'Technical Consulting', description: 'Expert technical consulting to optimize your printing processes.' }
      },
      {
        path: 'support',
        component: PlaceholderComponent,
        data: { title: 'Customer Support', description: 'Comprehensive customer support and after-sales service.' }
      }
    ]
  },
  {
    path: 'industries',
    component: PlaceholderComponent,
    data: { title: 'Industries', description: 'Discover how Sonica serves various industries with our innovative solutions.' }
  },
  {
    path: 'resources',
    component: PlaceholderComponent,
    data: { title: 'Resources', description: 'Access technical documentation, guides, and resources.' }
  },
  {
    path: 'contact',
    component: PlaceholderComponent,
    data: { title: 'Contact Us', description: 'Get in touch with our team for inquiries and support.' }
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
