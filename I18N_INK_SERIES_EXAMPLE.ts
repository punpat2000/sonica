/**
 * EXAMPLE: How to convert ink-series.model.ts to use i18n
 *
 * This file shows the pattern. Copy the $localize pattern to ink-series.model.ts
 */

// Example 1: Simple string
export const example1 = {
  slug: '70g-series',
  // BEFORE:
  // name: '70G Series',

  // AFTER:
  name: $localize`:@@inks.series.70g.name:70G Series`,
};

// Example 2: Longer description
export const example2 = {
  slug: '70g-series',
  // BEFORE:
  // shortDescription: 'One-part, dual cure UV/LED screen ink for glass and plastic containers. High adhesion, chemical and water resistance.',

  // AFTER:
  shortDescription: $localize`:@@inks.series.70g.shortDescription:One-part, dual cure UV/LED screen ink for glass and plastic containers. High adhesion, chemical and water resistance.`,
};

// Example 3: Array of translatable strings (applications)
export const example3 = {
  applications: [
    // BEFORE:
    // 'Glass bottles (flame pretreatment recommended, e.g. Pyrosil® or Uvitro®)',
    // 'HDPE bottles and containers (dyne level above 42 recommended)',

    // AFTER:
    $localize`:@@inks.series.70g.applications.0:Glass bottles (flame pretreatment recommended, e.g. Pyrosil® or Uvitro®)`,
    $localize`:@@inks.series.70g.applications.1:HDPE bottles and containers (dyne level above 42 recommended)`,
    $localize`:@@inks.series.70g.applications.2:Polypropylene (dyne above 42, flame pretreatment)`,
    $localize`:@@inks.series.70g.applications.3:PET, LDPE, corrugated polyolefins, coated and uncoated metals`,
  ],
};

// Example 4: Color names (optional - may keep in English)
export const example4 = {
  standardColors: [
    // BEFORE:
    // { code: '70G-012KG4', name: 'Radiant Yellow', note: '¹' },

    // AFTER (if translating color names):
    {
      code: '70G-012KG4',
      name: $localize`:@@inks.colors.70g.012:Radiant Yellow`,
      note: '¹'
    },

    // OR keep color names in English (recommended for technical terms):
    { code: '70G-012KG4', name: 'Radiant Yellow', note: '¹' },
  ],
};

/**
 * $localize Syntax:
 *
 * $localize`:@@translation.key:Source text`
 *
 * - `:@@translation.key` - The translation key (required)
 * - `:Source text` - The default English text (required)
 *
 * After running `ng extract-i18n`, this will create:
 *
 * <trans-unit id="inks.series.70g.name" datatype="plaintext">
 *   <source>70G Series</source>
 * </trans-unit>
 *
 * Then add translations in messages.th.xlf:
 *
 * <trans-unit id="inks.series.70g.name" datatype="plaintext">
 *   <source>70G Series</source>
 *   <target>ซีรีย์ 70G</target>
 * </trans-unit>
 */
