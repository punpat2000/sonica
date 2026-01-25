import { Component, inject, LOCALE_ID, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

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

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sonica';
  private readonly meta = inject(Meta);
  private readonly titleService = inject(Title);
  private readonly locale = inject(LOCALE_ID);
  private readonly platformId = inject(PLATFORM_ID);

  // SEO titles for different languages
  private readonly seoTitles: Record<string, string> = {
    'en': 'Sonica - UV Screen Printing Inks & Equipment | Norcote Distributor Thailand',
    'th': 'Sonica - หมึกพิมพ์สกรีน UV และอุปกรณ์ | ตัวแทนจำหน่าย Norcote ประเทศไทย',
    'zh': 'Sonica - UV丝网印刷油墨和设备 | Norcote经销商泰国',
    'ja': 'Sonica - UVスクリーン印刷インクと機器 | Norcoteディストリビューター タイ',
  };

  // SEO descriptions for different languages
  private readonly seoDescriptions: Record<string, string> = {
    'en': 'Sonica, established in 2000, provides UV screen printing inks, color matching services, high-quality squeegees, LED/UV curing systems, and UV intensity meters. Trusted by leading manufacturers in Thailand.',
    'th': 'Sonica ก่อตั้งในปี 2000 ให้บริการหมึกพิมพ์สกรีน UV บริการ color matching ยางปาดคุณภาพสูง เครื่องอบ LED/UV เครื่องความเข้มแสง UV ไว้วางใจโดยผู้ผลิตชั้นนำในประเทศไทย.',
    'zh': 'Sonica成立于2000年，提供UV丝网印刷油墨、配色服务、高品质刮刀、LED/UV固化系统和UV强度计。受到泰国领先制造商的信赖。',
    'ja': 'Sonicaは2000年に設立され、UVスクリーン印刷インク、カラーマッチングサービス、高品質スクイージー、LED/UV硬化システム、UV強度計を提供しています。タイの主要メーカーから信頼されています。',
  };

  // SEO keywords for different languages
  private readonly seoKeywords: Record<string, string> = {
    'en': 'Sonica, UV screen printing inks, squeegees, LED/UV curing systems, UV intensity meters, color matching services, leading manufacturer Thailand, Norcote distributor',
    'th': 'Sonica, หมึกพิมพ์สกรีน UV, ยางปาด, เครื่องอบ LED/UV, เครื่องความเข้มแสง UV, บริการ color matching, ผู้ผลิตชั้นนำในประเทศไทย',
    'zh': 'Sonica, UV丝网印刷油墨, 刮刀, LED/UV固化系统, UV强度计, 配色服务, 泰国领先制造商, Norcote经销商',
    'ja': 'Sonica, UVスクリーン印刷インク, スクイージー, LED/UV硬化システム, UV強度計, カラーマッチングサービス, タイの主要メーカー, Norcoteディストリビューター',
  };

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
    this.setSEO();
    // Only generate shapes on the client to avoid SSR/client mismatch
    // Shapes will be empty array on server, populated on client
    if (isPlatformBrowser(this.platformId)) {
      this.generateShapes();
    }
  }

  private setSEO(): void {
    // Get base locale (e.g., 'th' from 'th-TH', 'en' from 'en-US')
    const baseLocale = this.locale.split('-')[0].toLowerCase();
    
    // Get SEO content for current locale, fallback to English if not found
    const title = this.seoTitles[baseLocale] || this.seoTitles['en'] || 'Sonica';
    const description = this.seoDescriptions[baseLocale] || this.seoDescriptions['en'] || '';
    const keywords = this.seoKeywords[baseLocale] || this.seoKeywords['en'] || '';
    
    // Set title
    this.titleService.setTitle(title);
    
    // Update or create meta description
    if (this.meta.getTag('name="description"')) {
      this.meta.updateTag({ name: 'description', content: description });
    } else {
      this.meta.addTag({ name: 'description', content: description });
    }
    
    // Update or create meta keywords
    if (this.meta.getTag('name="keywords"')) {
      this.meta.updateTag({ name: 'keywords', content: keywords });
    } else {
      this.meta.addTag({ name: 'keywords', content: keywords });
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
