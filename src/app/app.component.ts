import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { NgOptimizedImage } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    // NgOptimizedImage
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sonica';
  private readonly meta = inject(Meta);

  constructor() {
    this.meta.addTag({ name: 'image', content: 'https://www.sonica.co.th/company_profile2.webp' });
  }
}
