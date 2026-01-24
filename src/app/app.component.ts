import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

interface GradientShape {
  size: number;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  color1: string;
  color2: string;
  animationDelay: number;
  isCenter?: boolean;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sonica';
  private readonly meta = inject(Meta);
  
  shapes: GradientShape[] = [];

  // Color palette for gradients
  private readonly colorPalette = [
    { c1: '#ff006e', c2: '#ff6b35' },
    { c1: '#8338ec', c2: '#3a86ff' },
    { c1: '#06ffa5', c2: '#00d4ff' },
    { c1: '#ff006e', c2: '#8338ec' },
    { c1: '#ff6b35', c2: '#ffbe0b' },
    { c1: '#ff006e', c2: '#3a86ff' },
    { c1: '#8338ec', c2: '#06ffa5' },
    { c1: '#ff6b35', c2: '#00d4ff' },
  ];

  constructor() {
    this.meta.addTag({ name: 'image', content: 'https://www.sonica.co.th/company_profile2.webp' });
    this.generateShapes();
  }

  private generateShapes(): void {
    // Random number of shapes between 10 and 20
    const numShapes = Math.floor(Math.random() * 11) + 10;
    this.shapes = [];

    for (let i = 0; i < numShapes; i++) {
      const size = Math.floor(Math.random() * 120) + 100; // 100-220px
      const colors = this.colorPalette[Math.floor(Math.random() * this.colorPalette.length)];
      const animationDelay = -(Math.random() * 20); // -20 to 0 seconds
      
      // Random position - choose one of: top-left, top-right, bottom-left, bottom-right, center
      const positionType = Math.floor(Math.random() * 5);
      const shape: GradientShape = {
        size,
        color1: colors.c1,
        color2: colors.c2,
        animationDelay,
      };

      switch (positionType) {
        case 0: // top-left
          shape.top = Math.random() * 40 - 100; // -100 to -60
          shape.left = Math.random() * 40 - 100;
          break;
        case 1: // top-right
          shape.top = Math.random() * 40 - 100;
          shape.right = Math.random() * 40 - 100;
          break;
        case 2: // bottom-left
          shape.bottom = Math.random() * 40 - 100;
          shape.left = Math.random() * 40 - 100;
          break;
        case 3: // bottom-right
          shape.bottom = Math.random() * 40 - 100;
          shape.right = Math.random() * 40 - 100;
          break;
        case 4: // center area
          shape.top = 20 + Math.random() * 60; // 20-80%
          shape.left = 20 + Math.random() * 60;
          break;
      }

      this.shapes.push(shape);
    }
  }

  getShapeStyle(shape: GradientShape): { [key: string]: string } {
    const style: { [key: string]: string } = {};
    
    style['width'] = `${shape.size}px`;
    style['height'] = `${shape.size}px`;
    style['background'] = `linear-gradient(135deg, ${shape.color1} 0%, ${shape.color2} 100%)`;
    style['animation-delay'] = `${shape.animationDelay}s`;

    if (shape.isCenter) {
      style['top'] = '50%';
      style['left'] = '50%';
      style['transform'] = 'translate(-50%, -50%)';
    } else {
      if (shape.top !== undefined) {
        style['top'] = shape.top < 0 ? `${shape.top}px` : `${shape.top}%`;
      }
      if (shape.left !== undefined) {
        style['left'] = shape.left < 0 ? `${shape.left}px` : `${shape.left}%`;
      }
      if (shape.right !== undefined) {
        style['right'] = `${shape.right}px`;
      }
      if (shape.bottom !== undefined) {
        style['bottom'] = shape.bottom < 0 ? `${shape.bottom}px` : `${shape.bottom}%`;
      }
    }

    return style;
  }
}
