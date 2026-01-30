# Sonica — Design System & Website Design

Design and UI context for the Sonica website. Use this when implementing or changing layout, components, or visuals.

---

## 1. Overall look & feel

- **Theme:** Dark. Black background, white/light text, no light-mode variant.
- **Style:** Modern, clean, professional. Glassmorphism cards and subtle blur.
- **Industry:** B2B UV screen printing (inks, equipment, services). Trust and expertise.
- **Differentiators:** Ink-themed visuals (hero image, ink stain graphics), Norcote partnership, 25+ years.

---

## 2. Color palette

| Role | Value | Usage |
|------|--------|--------|
| Background | `#000000` | Page and app shell |
| Primary text | `#ffffff` | Headings, nav, primary copy |
| Secondary text | `rgba(255, 255, 255, 0.7)` – `0.9` | Descriptions, links, footer |
| Glass background | `rgba(255, 255, 255, 0.03–0.08)` | Cards, dropdowns, header/footer |
| Glass border | `rgba(255, 255, 255, 0.1–0.2)` | Card/dropdown borders |
| Shadows | `rgba(0, 0, 0, 0.3–0.5)` | Card/dropdown shadows |

No accent color system yet; emphasis is via white/opacity and glass.

---

## 3. Typography

- **System stack:** `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`
- **Logo:** Arial, bold. “S” normal, “onica” italic.
- **Headings:** White, `font-weight` 500–700, `text-shadow` for readability on dark/blur.
- **Body:** White 80–95% opacity, line-height ~1.6–1.8.
- **Sizes (reference):**
  - Hero title: ~4rem (2.5rem on mobile)
  - Hero subtitle: ~1.5rem (1.2rem mobile)
  - Section titles: ~2rem
  - Card/feature titles: ~1.2–1.5rem
  - Body: ~0.95–1.1rem
  - Nav/footer: ~0.9–1rem

---

## 4. Layout & spacing

- **Max content width:** 1200px (content) / 1400px (header, footer).
- **Page padding:** 2rem (1rem on small screens).
- **Section gaps:** 2–4rem between major sections.
- **Card padding:** ~2.5rem.
- **Main content offset:** `padding-top: 80px` to clear fixed header.

---

## 5. Glassmorphism (global)

Defined in `src/styles.scss` and reused across components.

- **Base mixin:** `@include glass($opacity, $blur, $border-opacity, $shadow-opacity)`
- **Default:** `glass()` — light frosted panel.
- **Variants:** `glass-light`, `glass-strong` (stronger blur/opacity).
- **Mobile:** Blur reduced (e.g. 10px) for performance.
- **Properties:** `backdrop-filter`, `border`, `box-shadow`, white-tinted background.

Use for: hero card, section cards, header dropdowns, footer, any “floating” panel.

---

## 6. Components

### 6.1 Header

- **Position:** Fixed, full width, `z-index: 1000`.
- **Layout:** Logo left, nav center/right, language switcher right.
- **Logo:** Text “S onica” (S bold normal, “onica” bold italic), link to `/`.
- **Nav:** Home, About Us, Products (dropdown), Services (dropdown), Industries, Resources, Contact.
- **Dropdowns:** Glass style, rounded (e.g. 12px), show on click/hover.
- **Mobile:** Hamburger; full-screen menu with glass; ink stain image at bottom of menu.
- **Text:** White with text-shadow for contrast on any background.

### 6.2 Footer

- **Style:** Glass, top border, rounded top corners (e.g. 24px).
- **Sections:** Company (name, short description, email, phone, social), Quick Links, Products, Services.
- **Bottom bar:** Copyright, Privacy, Terms.
- **Social:** Icons (e.g. Facebook, LinkedIn, Twitter, YouTube, Instagram) in small glass-style circles.

### 6.3 Hero (home)

- **Background:** Route-dependent. Home: hero image (`sonica-hero.webp`); other routes: gradient shapes.
- **Hero block:** Single glass card, centered, max-width ~800px.
- **Content:** Title, subtitle (e.g. “Sole Distributor of Norcote…”), short description, “Get Started” CTA.
- **Decoration:** Ink stain image overlaying the hero card (visual theme).
- **Image:** Fixed full-viewport hero image, `object-fit: cover`, darkened (e.g. `brightness(0.75)`).

### 6.4 Cards (content)

- **Class:** `.glass-card` — glass mixin + 24px radius, padding, hover lift (`translateY(-5px)`).
- **Usage:** Hero card, “About Sonica”, “About Norcote”, “Our Services”, “Why Choose Sonica”.
- **Sections:** Section title + body copy and/or grids (services, features).

### 6.5 Buttons

- **Primary CTA:** Glass-style (white tint, border, blur), uppercase, letter-spacing. Hover: slightly brighter, scale up.
- **Secondary / links:** Text with hover opacity/underline or slight transform.

### 6.6 Images

- **Format:** Prefer WebP; use `ngSrc` (Angular optimized image) with `priority` or `lazy` as appropriate.
- **Decorative:** Ink stains, hero image — no heavy radial/brightness gradients that feel like “spotlights”.
- **Content images:** Rounded corners (e.g. 12px), optional light shadow; service/feature images in grids.

---

## 7. Responsive breakpoints

- **Mobile-first.** Key breakpoint: `768px` (sometimes `1024px` for nav).
- **Header:** Desktop horizontal nav; below 1024px, hamburger + full-screen menu.
- **Grids:** `repeat(auto-fit, minmax(250–300px, 1fr))` for services/features; single column on small screens.
- **Typography:** Hero and section font sizes reduced on small screens.
- **Viewport:** Use `100dvh` for full-height sections where appropriate (mobile browser UI).

---

## 8. Motion & interaction

- **Transitions:** ~0.3s ease on hover (opacity, color, transform, border).
- **Hover:** Cards lift; buttons scale; links underline or shift slightly.
- **No auto-playing heavy animation** in main content; hero background is static image or subtle gradient.

---

## 9. Accessibility & SEO

- **Contrast:** White on black meets contrast requirements; text-shadow used for legibility on images.
- **i18n:** All user-facing strings go through Angular i18n (see `technical-notes.md`).
- **Meta:** Canonical `https://www.sonica.co.th/`; title/description per route where set.
- **Images:** Alt text and i18n-alt where needed; decorative images can use empty alt.

---

## 10. File reference (where design lives)

| What | File(s) |
|------|--------|
| Global styles, glass mixins | `src/styles.scss` |
| App shell, main layout | `src/app/app.component.scss`, `app.component.html` |
| Header | `src/app/layout/header/*` |
| Footer | `src/app/layout/footer/*` |
| Hero background | `src/app/components/hero-background/*` |
| Gradient background | `src/app/components/gradient-shapes/*` |
| Home page | `src/app/pages/home/*` |
| About page | `src/app/pages/about-us/*` |

When adding new pages or components, reuse the same glass, spacing, and typography so the site stays consistent.
