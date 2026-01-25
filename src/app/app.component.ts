import { Component, inject, LOCALE_ID, OnInit, OnDestroy, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { GradientShapesComponent } from './components/gradient-shapes/gradient-shapes.component';
import { HeroBackgroundComponent } from './components/hero-background/hero-background.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, HeaderComponent, FooterComponent, GradientShapesComponent, HeroBackgroundComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'sonica';
  private readonly meta = inject(Meta);
  private readonly titleService = inject(Title);
  private readonly locale = inject(LOCALE_ID);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private routerSubscription?: Subscription;
  
  // Signal to track which background to use (default: gradient)
  useHeroBackground = signal(false);

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

  constructor() {
    this.setSEO();
  }

  ngOnInit(): void {
    // Check initial route
    this.updateBackground();
    
    // Subscribe to route changes
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateBackground();
      });
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  private updateBackground(): void {
    // Get the current activated route
    let route = this.activatedRoute;
    
    // Traverse to the deepest child route
    while (route.firstChild) {
      route = route.firstChild;
    }
    
    // Get background from route data, default to 'gradient'
    const background = route.snapshot.data['background'] || 'gradient';
    this.useHeroBackground.set(background === 'hero');
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

}
