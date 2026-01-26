import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-hero-background',
  imports: [NgOptimizedImage],
  templateUrl: './hero-background.component.html',
  styleUrl: './hero-background.component.scss',
})
export class HeroBackgroundComponent {
  // Static component - displays hero background image
}
