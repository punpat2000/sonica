import { Component, inject, PLATFORM_ID, makeStateKey, TransferState } from '@angular/core';
import { CommonModule, isPlatformServer, isPlatformBrowser } from '@angular/common';

interface GradientShape {
  size: number;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  color1: string;
  color2: string;
  isCenter?: boolean;
}

// State key for transferring shapes from server to client
const GRADIENT_SHAPES_KEY = makeStateKey<GradientShape[]>('gradientShapes');

@Component({
  selector: 'app-gradient-shapes',
  imports: [CommonModule],
  templateUrl: './gradient-shapes.component.html',
  styleUrl: './gradient-shapes.component.scss',
})
export class GradientShapesComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly transferState = inject(TransferState);
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
    // Use TransferState to prevent re-rendering on client
    if (isPlatformServer(this.platformId)) {
      // Generate shapes on server and store in TransferState
      this.generateShapes();
      this.transferState.set(GRADIENT_SHAPES_KEY, this.shapes);
    } else if (isPlatformBrowser(this.platformId)) {
      // Retrieve shapes from TransferState on client
      const transferredShapes = this.transferState.get<GradientShape[]>(GRADIENT_SHAPES_KEY, []);
      if (transferredShapes.length > 0) {
        this.shapes = transferredShapes;
      } else {
        // Fallback: generate if not found in TransferState (shouldn't happen in SSR)
        this.generateShapes();
      }
    }
  }

  private generateShapes(): void {
    // Random number of shapes between 10 and 20
    const numShapes = Math.floor(Math.random() * 11) + 10;
    this.shapes = [];

    for (let i = 0; i < numShapes; i++) {
      const size = Math.floor(Math.random() * 120) + 100; // 100-220px
      const colors = this.colorPalette[Math.floor(Math.random() * this.colorPalette.length)];

      // Random position - choose one of: top-left, top-right, bottom-left, bottom-right, center
      const positionType = Math.floor(Math.random() * 5);
      const shape: GradientShape = {
        size,
        color1: colors.c1,
        color2: colors.c2,
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
