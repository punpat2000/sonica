import { Component, PLATFORM_ID, inject, signal, OnInit, afterNextRender } from '@angular/core';
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
  /** Style object for [style] binding (pre-computed to avoid function calls during hydration). */
  style: Record<string, string | number>;
}

@Component({
  selector: 'app-gradient-shapes',
  templateUrl: './gradient-shapes.component.html',
  styleUrl: './gradient-shapes.component.scss',
})
export class GradientShapesComponent implements OnInit {

  private readonly platformId = inject(PLATFORM_ID);

  readonly visible = signal(false);
  readonly shapes = signal<GradientShape[]>([]);

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
    afterNextRender(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.visible.set(true);
        });
      });
    });
  }

  ngOnInit(): void {
    // Generate shapes only on client, not on server
    // This avoids any SSR/hydration issues and keeps the server HTML clean
    if (isPlatformBrowser(this.platformId)) {
      this.generateShapes();
    }
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
        style: {}, // Will be computed below
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

      // Pre-compute style object for ngStyle
      shape.style = this.computeStyle(shape);

      shapesArray.push(shape);
    }

    // Update signal with generated shapes
    this.shapes.set(shapesArray);
  }

  private computeStyle(shape: GradientShape): Record<string, string | number> {
    const style: Record<string, string | number> = {
      width: `${shape.size}px`,
      height: `${shape.size}px`,
      background: `linear-gradient(135deg, ${shape.color1} 0%, ${shape.color2} 100%)`,
    };

    if (shape.isCenter) {
      style['top'] = '50%';
      style['left'] = '50%';
      style['transform'] = 'translate(-50%, -50%) translateZ(0)';
    } else {
      if (shape.top !== undefined) {
        style['top'] = shape.top < 0 ? `${shape.top}px` : `${shape.top}%`;
      }
      if (shape.left !== undefined) {
        style['left'] = shape.left < 0 ? `${shape.left}px` : `${shape.left}%`;
      }
      if (shape.right !== undefined) {
        style['right'] = `${shape.right}px`;
        style['transform'] = 'translateZ(0)';
      }
      if (shape.bottom !== undefined) {
        style['bottom'] = shape.bottom < 0 ? `${shape.bottom}px` : `${shape.bottom}%`;
        if (shape.right === undefined) {
          style['transform'] = 'translateZ(0)';
        }
      }
      if (style['transform'] === undefined) {
        style['transform'] = 'translateZ(0)';
      }
    }

    return style;
  }
}
