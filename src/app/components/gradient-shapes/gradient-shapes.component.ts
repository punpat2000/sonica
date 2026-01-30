import { Component, PLATFORM_ID, inject, signal, AfterViewInit, Renderer2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface GradientShape {
  size: number;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  color1: string;
  color2: string;
  isCenter?: boolean;
  // Pre-computed style string to avoid function calls during hydration
  styleString: string;
}

@Component({
  selector: 'app-gradient-shapes',
  imports: [],
  templateUrl: './gradient-shapes.component.html',
  styleUrl: './gradient-shapes.component.scss',
})
export class GradientShapesComponent implements AfterViewInit {
  visible = signal(false);

  private readonly platformId = inject(PLATFORM_ID);
  private readonly renderer = inject(Renderer2);

  shapes = signal<GradientShape[]>([]);

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
    { c1: '#ff006e', c2: '#ffbe0b' },
    { c1: '#8338ec', c2: '#00d4ff' },
    { c1: '#06ffa5', c2: '#3a86ff' },
    { c1: '#ff6b35', c2: '#8338ec' },
    { c1: '#ff006e', c2: '#06ffa5' },
    { c1: '#3a86ff', c2: '#ff6b35' },
    { c1: '#8338ec', c2: '#ffbe0b' },
    { c1: '#00d4ff', c2: '#ff006e' },
    { c1: '#06ffa5', c2: '#ff6b35' },
    { c1: '#3a86ff', c2: '#8338ec' },
    { c1: '#ffbe0b', c2: '#00d4ff' },
    { c1: '#ff006e', c2: '#00d4ff' },
    { c1: '#8338ec', c2: '#ff6b35' },
    { c1: '#06ffa5', c2: '#ffbe0b' },
  ];

  constructor() {
    // Generate shapes only on client, not on server
    // This avoids any SSR/hydration issues and keeps the server HTML clean
    if (isPlatformBrowser(this.platformId)) {
      this.generateShapes();
    }
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.visible.set(true);
      });
    });
  }

  private generateShapes(): void {
    // Random number of shapes between 10 and 20
    const numShapes = Math.floor(Math.random() * 11) + 10;
    const shapesArray: GradientShape[] = [];

    for (let i = 0; i < numShapes; i++) {
      const size = Math.floor(Math.random() * 120) + 100; // 100-220px
      const colors = this.colorPalette[Math.floor(Math.random() * this.colorPalette.length)];

      // Random position - choose one of: top-left, top-right, bottom-left, bottom-right, center
      const positionType = Math.floor(Math.random() * 5);
      const shape: GradientShape = {
        size,
        color1: colors.c1,
        color2: colors.c2,
        styleString: '', // Will be computed below
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

      // Pre-compute style string to avoid function calls during hydration
      shape.styleString = this.computeStyleString(shape);

      shapesArray.push(shape);
    }

    // Update signal with generated shapes
    this.shapes.set(shapesArray);
  }

  private computeStyleString(shape: GradientShape): string {
    const parts: string[] = [];

    parts.push(`width: ${shape.size}px`);
    parts.push(`height: ${shape.size}px`);
    parts.push(`background: linear-gradient(135deg, ${shape.color1} 0%, ${shape.color2} 100%)`);

    if (shape.isCenter) {
      parts.push('top: 50%');
      parts.push('left: 50%');
      parts.push('transform: translate(-50%, -50%) translateZ(0)');
    } else {
      if (shape.top !== undefined) {
        parts.push(`top: ${shape.top < 0 ? `${shape.top}px` : `${shape.top}%`}`);
      }
      if (shape.left !== undefined) {
        parts.push(`left: ${shape.left < 0 ? `${shape.left}px` : `${shape.left}%`}`);
      }
      if (shape.right !== undefined) {
        parts.push(`right: ${shape.right}px`);
        parts.push('transform: translateZ(0)');
      }
      if (shape.bottom !== undefined) {
        parts.push(`bottom: ${shape.bottom < 0 ? `${shape.bottom}px` : `${shape.bottom}%`}`);
        if (shape.right === undefined) {
          parts.push('transform: translateZ(0)');
        }
      }
      // Ensure GPU acceleration for all shapes
      if (!parts.some(p => p.includes('transform'))) {
        parts.push('transform: translateZ(0)');
      }
    }

    return parts.join('; ');
  }
}
