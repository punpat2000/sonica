# Sonica — Technical Notes

Stack, build, i18n, and conventions. Use this when developing, building, or deploying.

---

## 1. Stack

- **Framework:** Angular 21 (standalone components, signals where used).
- **Language:** TypeScript.
- **Styles:** SCSS (global `src/styles.scss` + component SCSS).
- **Routing:** Angular Router; lazy-loaded page components.
- **SSR:** Angular SSR (e.g. `src/main.server.ts`, `src/server.ts`, `app.routes.server.ts`).
- **Images:** Angular’s `NgOptimizedImage` (`ngSrc`) with `priority` / `lazy`; assets under `public/`.
- **i18n:** Angular i18n (xlffiles in `src/locale/`).

---

## 2. Project structure (high level)

```
src/
  app/
    app.component.*           # Shell: background, header, main, footer
    app.config.ts
    app.routes.ts
    app.routes.server.ts
    components/              # Shared UI (hero-background, gradient-shapes)
    layout/                  # Header, footer
    pages/                   # Route components (home, about-us, products/..., etc.)
  locale/                    # messages.xlf, messages.th.xlf, ...
  index.html
  main.ts
  main.server.ts
  server.ts
  styles.scss                # Global styles + glass mixins
public/                      # Static assets (images, favicon)
```

---

## 3. Build & serve

- **Dev:** `ng serve` (default EN).
- **Locale-specific serve:** `npm run serve:th`, `serve:zh`, `serve:ja` (if configured).
- **Production build:** `ng build` (default EN).
- **Locale builds:** `npm run build:th`, `build:zh`, `build:ja`; `build:all` for all.
- **SSR:** Production build outputs server bundle; run with `npm run serve:ssr:sonica` (or similar).

---

## 4. Internationalization (i18n)

- **Locales:** EN (default), TH, ZH, JA.
- **Translation files:** `src/locale/messages.xlf` (source), `messages.th.xlf`, `messages.zh.xlf`, `messages.ja.xlf`.
- **Marking text:** Use `i18n` and `i18n-alt` etc. in templates; extract/translate via Angular i18n.
- **Switching language:** Implemented in header (e.g. language switcher); locale likely stored in URL or config.

---

## 5. Assets & images

- **Root:** `public/` — copied as-is; reference by path like `/sonica-hero.webp`, `/ink-stain.webp`.
- **Formats:** WebP for photos/graphics; favicon as needed.
- **Usage:** Prefer `<img ngSrc="..." priority>` or `ngSrc="..." lazy`; avoid raw `src` for critical images.

---

## 6. Styling conventions

- **Global:** `src/styles.scss` — reset, html/body, glass mixins, utility classes (e.g. `.glass`, `.glass-light`).
- **Components:** Component SCSS; use `@use '../../../styles.scss' as *` (or correct path) to use glass mixins.
- **Layout:** Max-width 1200–1400px, centered; padding 2rem (1rem on mobile).
- **No inline styles** for layout/theme; keep design tokens (colors, spacing) in SCSS.

---

## 7. Conventions

- **Components:** Standalone; lazy load pages via router.
- **State:** Prefer signals where applicable; avoid unnecessary global state.
- **Naming:** kebab-case for files/folders; PascalCase for components.
- **Accessibility:** Semantic HTML, ARIA where needed, i18n for all visible strings.

---

## 8. Deployment

- **Vercel:** `vercel.json` present; likely used for production.
- **Output:** Default `dist/sonica` (or similar); static + server bundle for SSR.
- **Environment:** Canonical URL and any API/base URLs should be configurable (e.g. environment or config).

---

## 9. Key config files

| File | Purpose |
|------|--------|
| `angular.json` | Build options, assets, i18n configs |
| `package.json` | Scripts (serve, build per locale, SSR) |
| `tsconfig.json` / `tsconfig.app.json` | TypeScript |
| `vercel.json` | Deployment (rewrites, etc.) |
| `src/app/app.routes.ts` | Route definitions and metadata |
| `src/app/app.config.server.ts` | Server-side app config |

---

## 10. Context memory folder

- **Location:** `context-memory/` at project root.
- **Purpose:** Single place for design, site structure, and technical context so the team and tools can stay aligned.
- **Update:** When you change design system, routes, or build/deploy process, update the corresponding doc here.
