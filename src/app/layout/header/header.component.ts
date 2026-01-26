import { Component, HostListener, signal, computed, inject, LOCALE_ID } from '@angular/core';
import { RouterLink, RouterLinkActive, NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isMobileMenuOpen = signal(false);
  openDropdown: HTMLElement | null = null;
  private location = inject(Location);
  private router = inject(Router);
  private locale = inject(LOCALE_ID);

  // Available languages
  languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'th', name: 'ไทย', flag: '🇹🇭' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' }
  ];

  // Detect current locale from LOCALE_ID
  currentLocale = computed(() => {
    const baseLocale = this.locale.split('-')[0].toLowerCase();
    // Support: en, th, zh, ja
    if (['th', 'zh', 'ja'].includes(baseLocale)) {
      return baseLocale;
    }
    return 'en'; // Default to English
  });

  // Get current language display info
  currentLanguage = computed(() => {
    return this.languages.find(lang => lang.code === this.currentLocale()) || this.languages[0];
  });

  constructor() {
    // Close mobile menu on navigation
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isMobileMenuOpen.set(false);
      });
  }

  switchLanguage(locale: string): void {
    // Close dropdown first
    if (this.openDropdown) {
      this.openDropdown.classList.remove('show');
      this.openDropdown = null;
    }

    const currentPath = this.router.url;
    let newPath = '';

    // Map of locale codes to their path prefixes
    const localePrefixes: Record<string, string> = {
      'en': '/en',
      'th': '/th',
      'zh': '/zh',
      'ja': '/ja'
    };

    const currentLocale = this.currentLocale();
    const targetPrefix = localePrefixes[locale] || '';
    const currentPrefix = localePrefixes[currentLocale] || '';

    // If already on target locale, do nothing
    if (locale === currentLocale) {
      return;
    }

    // Remove current locale prefix if exists
    let pathWithoutLocale = currentPath;
    if (currentPrefix && currentPath.startsWith(currentPrefix)) {
      pathWithoutLocale = currentPath.replace(currentPrefix, '') || '/';
    }

    // Add target locale prefix
    newPath = targetPrefix ? `${targetPrefix}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}` : pathWithoutLocale;

    // Full page navigation to switch locale (required for separate builds)
    window.location.href = newPath;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(value => !value);
  }

  toggleDropdown(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    const target = event.currentTarget as HTMLElement;
    const dropdown = target.nextElementSibling as HTMLElement;

    if (this.openDropdown && this.openDropdown !== dropdown) {
      this.openDropdown.classList.remove('show');
    }

    dropdown.classList.toggle('show');
    this.openDropdown = dropdown.classList.contains('show') ? dropdown : null;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;

    // Don't close if clicking on dropdown trigger (it handles its own toggle)
    if (target.closest('.nav-link') && target.closest('.nav-item.dropdown')) {
      return;
    }

    // Close dropdown if clicking on a dropdown link
    if (target.classList.contains('dropdown-link')) {
      if (this.openDropdown) {
        this.openDropdown.classList.remove('show');
        this.openDropdown = null;
      }
      return;
    }

    // Close dropdown if clicking outside
    if (this.openDropdown && !target.closest('.nav-item.dropdown')) {
      this.openDropdown.classList.remove('show');
      this.openDropdown = null;
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > 1024) {
      this.isMobileMenuOpen.set(false);
    }
  }

}
