# Thai Language Implementation Plan

## Overview
This document outlines the plan to implement Thai language support using Angular i18n for the Sonica website.

## Current State

### ✅ Already Configured
- i18n configuration in `angular.json` with Thai locale (`th`)
- Translation file path: `src/locale/messages.th.xlf`
- Base href for Thai: `/th/`
- `@angular/localize` package installed
- `@angular/localize/init` polyfill configured in build

### ❌ Not Yet Implemented
- i18n attributes in component templates
- Locale directory structure
- Translation files (source and Thai)
- Build configurations for Thai locale
- Package.json scripts for Thai build/serve

## Implementation Steps

### Step 1: Add i18n Attributes to Templates

#### 1.1 Header Component (`src/app/layout/header/header.component.html`)
Add i18n attributes to:
- Navigation links: "Home", "About Us", "Products", "Services", "Industries", "Resources", "Contact"
- Dropdown menu items:
  - Products: "UV Screen Printing Inks", "Squeegees", "LED/UV Curing Systems", "UV Intensity Meters"
  - Services: "Color Matching", "Technical Consulting", "Customer Support"
- Mobile menu toggle aria-label: "Toggle menu"

**Example:**
```html
<a routerLink="/" i18n="@@header.home">Home</a>
<a routerLink="/about" i18n="@@header.about">About Us</a>
```

#### 1.2 Footer Component (`src/app/layout/footer/footer.component.html`)
Add i18n attributes to:
- Company description
- Section headings: "Quick Links", "Products", "Services", "Follow Us"
- Footer links (all navigation and product/service links)
- Copyright text
- Legal links: "Privacy Policy", "Terms of Service"
- Contact information labels: "Email:", "Phone:"

**Example:**
```html
<h3 class="footer-title" i18n="@@footer.companyName">Sonica</h3>
<p class="footer-description" i18n="@@footer.description">
  Leading provider of UV screen printing solutions since 2000.
</p>
```

#### 1.3 Home Component (`src/app/pages/home/home.component.html`)
Add i18n attributes to:
- Hero section:
  - Title: "Welcome to Sonica"
  - Subtitle: "Sole Distributor of Norcote International, Inc. in Thailand"
  - Description: "Experience the future of innovation..."
  - Button: "Get Started"
- About Sonica section:
  - Section title: "About Sonica"
  - All paragraph content
- About Norcote section:
  - Section title: "About Norcote International"
  - All paragraph content
- Services section:
  - Section title: "Our Services"
  - Service names and descriptions
- Why Choose Sonica section:
  - Section title: "Why Choose Sonica?"
  - Feature titles and descriptions
- Image alt attributes (using `i18n-attr`)

**Example:**
```html
<h1 class="hero-title" i18n="@@home.hero.title">Welcome to Sonica</h1>
<p class="hero-subtitle" i18n="@@home.hero.subtitle">
  Sole Distributor of Norcote International, Inc. in Thailand
</p>
<button class="cta-button" i18n="@@home.hero.button">Get Started</button>
```

### Step 2: Create Locale Directory Structure

Create the directory:
```bash
mkdir -p src/locale
```

This directory will contain:
- `messages.xlf` - Source messages (extracted from templates)
- `messages.th.xlf` - Thai translations

### Step 3: Extract i18n Messages

Run the extraction command:
```bash
ng extract-i18n
```

This will:
- Scan all templates for i18n attributes
- Generate `messages.xlf` in `src/locale/` directory
- Create source message entries for all translatable strings

### Step 4: Create Thai Translation File

#### 4.1 Copy Source Messages
Copy `src/locale/messages.xlf` to `src/locale/messages.th.xlf`

#### 4.2 Add Thai Translations
For each `<trans-unit>` in the XLF file:
- Keep the `<source>` tag with English text
- Add `<target>` tag with Thai translation
- Maintain the same `id` attribute

**Example XLF structure:**
```xml
<trans-unit id="header.home" datatype="html">
  <source>Home</source>
  <target>หน้าแรก</target>
</trans-unit>
```

#### 4.3 Key Translations Needed

**Navigation:**
- Home → หน้าแรก
- About Us → เกี่ยวกับเรา
- Products → ผลิตภัณฑ์
- Services → บริการ
- Industries → อุตสาหกรรม
- Resources → ทรัพยากร
- Contact → ติดต่อ

**Hero Section:**
- Welcome to Sonica → ยินดีต้อนรับสู่ Sonica
- Sole Distributor of Norcote International, Inc. in Thailand → ตัวแทนจำหน่ายแต่เพียงผู้เดียวของ Norcote International, Inc. ในประเทศไทย
- Get Started → เริ่มต้นใช้งาน

**Services:**
- UV Screen Printing Inks → น้ำหมึกพิมพ์สกรีน UV
- Color Matching Services → บริการจับคู่สี
- Technical Consulting → ที่ปรึกษาทางเทคนิค
- Equipment Solutions → โซลูชันอุปกรณ์

### Step 5: Update Build Configuration

#### 5.1 Update `angular.json`
Add build configurations for Thai locale:

```json
"configurations": {
  "production": {
    // ... existing config
  },
  "th": {
    "localize": ["th"],
    "outputPath": "dist/sonica/th"
  },
  "th-production": {
    "localize": ["th"],
    "outputPath": "dist/sonica/th",
    "budgets": [
      // ... production budgets
    ],
    "outputHashing": "all"
  }
}
```

#### 5.2 Update `package.json` Scripts
Add scripts for building and serving Thai version:

```json
{
  "scripts": {
    "build:th": "ng build --configuration=th-production",
    "build:all": "ng build && ng build --configuration=th-production",
    "serve:th": "ng serve --configuration=th"
  }
}
```

### Step 6: Testing

#### 6.1 Test English Version (Default)
```bash
ng serve
# Access at http://localhost:4200
```

#### 6.2 Test Thai Version
```bash
ng serve --configuration=th
# Access at http://localhost:4200/th/
```

Or build and serve:
```bash
ng build --configuration=th-production
# Serve the dist/sonica/th directory
```

#### 6.3 Verify
- All text should be in Thai
- Navigation should work correctly
- Images and styling should remain unchanged
- Base href should be `/th/` for Thai version

## File Structure After Implementation

```
src/
├── locale/
│   ├── messages.xlf          # Source messages (English)
│   └── messages.th.xlf       # Thai translations
├── app/
│   ├── layout/
│   │   ├── header/
│   │   │   └── header.component.html  # With i18n attributes
│   │   └── footer/
│   │       └── footer.component.html  # With i18n attributes
│   └── pages/
│       └── home/
│           └── home.component.html    # With i18n attributes
```

## Best Practices

1. **Use Meaningful IDs**: Use descriptive IDs like `@@header.home` instead of auto-generated ones
2. **Context Comments**: Add `i18n="@@id|description"` format for better context
3. **Pluralization**: Use `i18nPlural` for plural forms if needed
4. **Interpolation**: Use `{{variable}}` syntax for dynamic content
5. **Attribute Translation**: Use `i18n-attr` for translating attributes like `alt`, `title`, `placeholder`

## Translation Guidelines

1. **Maintain Meaning**: Ensure Thai translations convey the same meaning as English
2. **Cultural Adaptation**: Adapt content to Thai business culture where appropriate
3. **Technical Terms**: Keep technical terms in English if commonly used in Thai industry (e.g., "UV", "LED")
4. **Length Consideration**: Thai text may be longer/shorter - test UI layout
5. **Formal Tone**: Use formal business Thai for professional content

## Next Steps After Implementation

1. **Review Translations**: Have native Thai speaker review all translations
2. **Test Layout**: Verify UI doesn't break with Thai text length
3. **SEO**: Update meta tags for Thai version
4. **Language Switcher**: Consider adding language switcher component
5. **URL Structure**: Plan URL structure for multi-language routing

## Commands Reference

```bash
# Extract i18n messages
ng extract-i18n

# Build English version (default)
ng build

# Build Thai version
ng build --configuration=th-production

# Build both versions
npm run build:all

# Serve English version
ng serve

# Serve Thai version
ng serve --configuration=th
```

## Notes

- The base href `/th/` means Thai version will be served at `yoursite.com/th/`
- English version remains at root `yoursite.com/`
- Both versions can be built and deployed simultaneously
- Translation files should be version controlled
- Update translations whenever new content is added
