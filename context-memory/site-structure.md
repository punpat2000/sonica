# Sonica — Site Structure & Content

Routes, navigation, and content hierarchy. Use this when adding pages, changing nav, or describing the site.

---

## 1. Canonical & domain

- **Production URL:** https://www.sonica.co.th/
- **Default locale:** English (path prefix can vary by i18n setup).

---

## 2. Route map

| Path | Component | Notes |
|------|-----------|--------|
| `/` | Home | Hero background type: `hero` (hero image) |
| `/about` | About Us | Company profile image, simple layout |
| `/products/inks` | Inks (catalogue) | UV Screen Printing Inks — grid of ink series cards |
| `/products/inks/:slug` | Ink detail | Single ink series detail (e.g. `/products/inks/uv-flexo-series`) |
| `/products/squeegees` | Placeholder | Squeegees |
| `/products/led-uv-curing` | LED/UV Curing | Product page (real content) |
| `/products/uv-meters` | Placeholder | UV Intensity Meters |
| `/services/color-matching` | Placeholder | Color Matching |
| `/services/consulting` | Placeholder | Technical Consulting |
| `/services/support` | Placeholder | Customer Support |
| `/industries` | Placeholder | Industries |
| `/resources` | Placeholder | Resources |
| `/contact` | Placeholder | Contact |
| `/privacy`, `/terms` | (Footer links) | Referenced in footer; may be placeholders |
| `**` | — | Redirects to `/` |

Route metadata (e.g. `title`, `description`) is set in `app.routes.ts` per route for SEO/i18n.

---

## 3. Navigation (header)

- **Main items:** Home, About Us, Products, Services, Industries, Resources, Contact.
- **Dropdowns:**
  - **Products:** Inks, Squeegees, LED/UV Curing Systems, UV Intensity Meters.
  - **Services:** Color Matching, Technical Consulting, Customer Support.
  - **Language:** Current locale + list of languages (e.g. EN, TH, ZH, JA) with flags/codes.
- **Mobile:** Hamburger opens full-screen menu; same links; ink stain image at bottom of menu.

---

## 4. Footer structure

- **Column 1:** Sonica (name), short description, email, phone, “Follow Us” + social links.
- **Column 2:** Quick Links — Home, About Us, Industries, Resources, Contact.
- **Column 3:** Products — same as header Products dropdown.
- **Column 4:** Services — same as header Services dropdown.
- **Bottom row:** Copyright, Privacy Policy, Terms of Service.

---

## 5. Home page sections (content)

1. **Hero** — Welcome title, “Sole Distributor of Norcote International, Inc. in Thailand”, short tagline, “Get Started” CTA. Ink stain decoration on card.
2. **About Sonica** — Established 2000, sole distributor of Norcote in Thailand, trust and leadership.
3. **About Norcote International** — 40+ years, UV curable inks, technical service, color experts, customer service.
4. **Our Services** — Grid of 4: UV Screen Printing Inks, Color Matching, Technical Consulting, Equipment Solutions (each with image + short text).
5. **Why Choose Sonica?** — 4 features: 25+ Years Experience, Quality Products, Expert Support, Innovation.

---

## 6. About Us page

- Single main content area: company profile image (`company_profile2.webp`), centered, max-width ~1000px, rounded corners.
- Minimal copy in current layout; expand in this doc when content is added.

---

## 7. Products & services (logical grouping)

- **Products:** Inks, Squeegees, LED/UV Curing Systems, UV Intensity Meters.
- **Services:** Color Matching, Technical Consulting, Customer Support.

### Inks (implemented)

- **Catalogue** (`/products/inks`): “UV Screen Printing Inks” — intro copy + grid of **ink series** cards. Each card links to `/products/inks/:slug`. For now only **screen printing** ink series are listed; more ink types (e.g. flexo, offset) can be added later.
- **Detail** (`/products/inks/:slug`): Single ink series — overview, applications, substrates, features, optional **standard colors** table (e.g. 70G), CTA to contact. Invalid slug redirects to catalogue.
- **Data:** `src/app/pages/products/inks/ink-series.model.ts` — `SCREEN_PRINTING_SERIES`, `INK_SERIES_CATALOGUE`, `getInkSeriesDetail(slug)`. Model has `inkType` (e.g. `'screen-printing'`) for future filtering when more types exist. Replace with API/CMS when ready.
- **Current series (screen printing):** `70g-series` (70G Series, Norcote technical bulletin), `ppc-series`, `specialty-screen`. Add more series to `SCREEN_PRINTING_SERIES` as needed.

Other product pages are placeholders until replaced with real content.

---

## 8. Background behavior by route

- **Home (`/`):** `useHeroBackground()` true → full-viewport hero image (`app-hero-background`).
- **Other routes:** Gradient shapes background (`app-gradient-shapes`).
- Implemented in `app.component.html` and any service/state that provides `useHeroBackground()`.

---

## 9. i18n and locales

- **Locales:** EN (default), TH, ZH, JA.
- **Files:** `src/locale/messages.xlf` (and `messages.th.xlf`, etc.).
- **Header:** Language switcher with flag + code; dropdown to switch locale.
- **Route data:** Titles/descriptions in routes can be localized via i18n.

---

## 10. File reference

| What | File(s) |
|------|--------|
| Routes + metadata | `src/app/app.routes.ts` |
| Server routes (SSR) | `src/app/app.routes.server.ts` |
| Header nav + dropdowns | `src/app/layout/header/header.component.html` |
| Footer links + structure | `src/app/layout/footer/footer.component.html` |
| Home sections | `src/app/pages/home/home.component.html` |
| About content | `src/app/pages/about-us/about-us.component.html` |
| Inks catalogue | `src/app/pages/products/inks/inks.component.*` |
| Ink detail | `src/app/pages/products/inks/ink-detail/ink-detail.component.*` |
| Ink series data | `src/app/pages/products/inks/ink-series.model.ts` |
| App shell (background switch) | `src/app/app.component.html` |

When adding a new page: add route (and optional metadata), add nav/footer link if needed, then implement the page component using the design system in `design-system.md`.
