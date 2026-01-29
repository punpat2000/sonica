# i18n Implementation Guide for Ink Series

## Overview

The ink series data is stored in TypeScript (`ink-series.model.ts`), not in templates. To make it translatable, we use Angular's `$localize` function to mark strings for translation.

## How Angular i18n Works

1. **Templates**: Use `i18n="@@key"` attributes (already done in `ink-detail.component.html`)
2. **TypeScript**: Use `$localize` tagged template literals to mark strings
3. **Extraction**: Run `ng extract-i18n` to generate/update `messages.xlf`
4. **Translation**: Add translations to locale-specific files (`messages.th.xlf`, etc.)
5. **Build**: Build locale-specific bundles

## Implementation Steps

### Step 1: Import `$localize` in TypeScript

Angular's `$localize` is available globally after importing `@angular/localize/init` (already done in `main.ts`). You can use it directly:

```typescript
import { $localize } from '@angular/localize';
```

However, since it's already imported globally, you can use it without importing.

### Step 2: Mark Strings with `$localize`

Use `$localize` with tagged template literals. The format is:

```typescript
$localize`:@@translation.key:Source text`
```

**Example for ink series:**

```typescript
export const SCREEN_PRINTING_SERIES: InkSeries[] = [
  {
    slug: '70g-series',
    name: $localize`:@@inks.series.70g.name:70G Series`,
    shortDescription: $localize`:@@inks.series.70g.shortDescription:One-part, dual cure UV/LED screen ink for glass and plastic containers. High adhesion, chemical and water resistance.`,
    inkType: 'screen-printing',
  },
  // ...
];
```

### Step 3: Extract Translation Keys

Run the extraction command:

```bash
ng extract-i18n
```

This will:
- Scan all templates (already has `i18n` attributes)
- Scan TypeScript files for `$localize` calls
- Update `src/locale/messages.xlf` with new translation units

### Step 4: Add Translations

Edit the locale-specific files:
- `src/locale/messages.th.xlf` (Thai)
- `src/locale/messages.zh.xlf` (Chinese)
- `src/locale/messages.ja.xlf` (Japanese)

Add `<target>` elements for each `<trans-unit>`:

```xml
<trans-unit id="inks.series.70g.name" datatype="plaintext">
  <source>70G Series</source>
  <target>ซีรีย์ 70G</target>
</trans-unit>
```

### Step 5: Build Locale-Specific Bundles

```bash
npm run build:th   # Thai
npm run build:zh   # Chinese
npm run build:ja   # Japanese
```

## Best Practices

### 1. Naming Convention for Keys

Use a hierarchical structure:
- `inks.series.{slug}.name` - Series name
- `inks.series.{slug}.shortDescription` - Short description
- `inks.series.{slug}.longDescription` - Long description
- `inks.series.{slug}.applications.{index}` - Application items
- `inks.series.{slug}.features.{index}` - Feature items
- `inks.series.{slug}.colors.{code}` - Color names

### 2. Handling Arrays

For arrays (applications, features, substrates), you have two options:

**Option A: Individual keys per item** (more granular, better for translators)
```typescript
applications: [
  $localize`:@@inks.series.70g.applications.0:Glass bottles (flame pretreatment recommended, e.g. Pyrosil® or Uvitro®)`,
  $localize`:@@inks.series.70g.applications.1:HDPE bottles and containers (dyne level above 42 recommended)`,
]
```

**Option B: Single key with placeholders** (less keys, but harder to translate)
```typescript
// Not recommended for complex lists
```

**Recommendation**: Use Option A for better translation quality.

### 3. Color Names

Color names are often technical and may not need translation, but if they do:

```typescript
standardColors: [
  { 
    code: '70G-012KG4', 
    name: $localize`:@@inks.colors.70g.012:Radiant Yellow`,
    note: '¹'
  },
]
```

### 4. Dynamic Content

For content that changes frequently or comes from an API, consider:
- Keeping technical terms in English
- Only translating user-facing descriptions
- Using a translation service for runtime translations (more complex)

## Example: Converting 70G Series

### Before:
```typescript
{
  slug: '70g-series',
  name: '70G Series',
  shortDescription: 'One-part, dual cure UV/LED screen ink...',
}
```

### After:
```typescript
{
  slug: '70g-series',
  name: $localize`:@@inks.series.70g.name:70G Series`,
  shortDescription: $localize`:@@inks.series.70g.shortDescription:One-part, dual cure UV/LED screen ink for glass and plastic containers. High adhesion, chemical and water resistance.`,
}
```

## Workflow

1. **Mark strings** in `ink-series.model.ts` with `$localize`
2. **Extract**: `ng extract-i18n`
3. **Translate**: Edit `messages.{locale}.xlf` files
4. **Test**: Build and serve locale-specific bundles
5. **Iterate**: Repeat as you add more content

## Notes

- **Product codes** (like `70G-012KG4`) should NOT be translated
- **Technical terms** may stay in English (e.g., "UV", "LED", "HDPE")
- **Long descriptions** can be split into multiple keys if needed
- **Color names** are often kept in English for consistency

## Migration Strategy

Since there's a lot of content, you can:
1. Start with series names and short descriptions
2. Add long descriptions next
3. Then applications, substrates, features
4. Finally, color names (if needed)

This allows incremental translation without blocking the feature.
