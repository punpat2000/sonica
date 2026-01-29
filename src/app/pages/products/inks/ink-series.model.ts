/**
 * Ink series model for catalogue and detail pages.
 * For now we only have Screen Printing ink; more types (flexo, offset, etc.) can be added later.
 * Replace with API or CMS data when ready.
 */

/** Ink product type. For now only screen-printing; extend when adding flexo, offset, etc. */
export type InkType = 'screen-printing';

export interface InkSeries {
  slug: string;
  name: string;
  shortDescription: string;
  /** Which ink category this belongs to (for filtering when we have multiple types) */
  inkType: InkType;
  /** Optional image path (e.g. from public/) */
  imagePath?: string;
}

/** Extended data for the detail page. Add fields as needed. */
export interface InkSeriesDetail extends InkSeries {
  longDescription?: string;
  applications?: string[];
  substrates?: string[];
  features?: string[];
  /** Standard colors: product code + name (e.g. for 70G, PPC, MSK) */
  standardColors?: { code: string; name: string; note?: string }[];
  /** Process colors (e.g. for MSK, 1500); density when present (e.g. 1.10, N/A) */
  processColors?: { code: string; name: string; density?: string; note?: string }[];
  /** Color Matching Guide (e.g. for 1500 Series) */
  colorMatchingGuide?: { code: string; name: string; note?: string }[];
  /** Transparent inks (e.g. for MSK) */
  transparents?: { code: string; name: string; note?: string }[];
  /** Whites, blacks & clears / mixing bases (e.g. for PPC, MSK) */
  basesAndClears?: { code: string; name: string }[];
  /** Textured clears (e.g. for MSK) */
  texturedClears?: { code: string; name: string; leadTime?: string }[];
}

/**
 * All screen printing ink series. For now this is the only ink type.
 * When you add flexo/offset etc., add a separate array or filter by inkType.
 */
export const SCREEN_PRINTING_SERIES: InkSeries[] = [
  {
    slug: '70g-series',
    name: $localize`:@@inks.series.70g.name:70G Series`,
    shortDescription: $localize`:@@inks.series.70g.shortDescription:One-part, dual cure UV/LED screen ink for glass and plastic containers. High adhesion, chemical and water resistance.`,
    inkType: 'screen-printing',
  },
  {
    slug: 'ppc-series',
    name: $localize`:@@inks.series.ppc.name:PPC Series`,
    shortDescription: $localize`:@@inks.series.ppc.shortDescription:One-part UV screen ink for containers. Chemical resistant, quick curing, superb gloss, high definition. No additives required; excellent intercoat. All colors intermixable.`,
    inkType: 'screen-printing',
  },
  {
    slug: 'msk-series',
    name: $localize`:@@inks.series.msk.name:MSK Series`,
    shortDescription: $localize`:@@inks.series.msk.shortDescription:High-end UV curable second surface ink for industrial graphics. Extremely flexible, embossable, excellent adhesion. For user interface overlays, nameplates, automotive.`,
    inkType: 'screen-printing',
  },
  {
    slug: '1500-series',
    name: $localize`:@@inks.series.1500.name:1500 Series`,
    shortDescription: $localize`:@@inks.series.1500.shortDescription:UV curable ink system for pressure sensitive decals with 3–5 years exterior exposure. Excellent flexibility, adhesion, opacity; NVP free. For pressure sensitive vinyls and print treated polyesters.`,
    inkType: 'screen-printing',
  },
  {
    slug: 'specialty-screen',
    name: $localize`:@@inks.series.specialty.name:Specialty Screen Series`,
    shortDescription: $localize`:@@inks.series.specialty.shortDescription:Specialty UV screen inks for decorative, metallic, and effect applications. Contact us for availability.`,
    inkType: 'screen-printing',
  },
];

/**
 * Catalogue of all series (currently screen-printing only).
 * When you add more ink types, either concatenate arrays or add routes like /products/inks/flexo.
 */
export const INK_SERIES_CATALOGUE: InkSeries[] = [...SCREEN_PRINTING_SERIES];

/** Detail content by slug. Expand with real copy when ready. */
const detailBySlug: Record<string, Partial<InkSeriesDetail>> = {
  '70g-series': {
    longDescription: $localize`:@@inks.series.70g.longDescription:The 70G Series is a one-part, dual cure ink system formulated to meet the requirements needed for printing on glass and plastic bottles commonly used in the container market. It can be cured with UV or LED systems (365–405 nm) or with traditional UV mercury or iron-doped curing systems. Cross-linking continues for up to 24 hours after printing; adhesion should be tested after cooling to room temperature.`,
    applications: [
      'Glass bottles (flame pretreatment recommended, e.g. Pyrosil® or Uvitro®)',
      'HDPE bottles and containers (dyne level above 42 recommended)',
      'Polypropylene (dyne above 42, flame pretreatment)',
      'PET, LDPE, corrugated polyolefins, coated and uncoated metals',
    ],
    substrates: ['Glass', 'HDPE', 'PP', 'PET', 'LDPE', 'Corrugated polyolefins', 'Coated and uncoated metals'],
    features: [
      $localize`:@@inks.series.70g.features.0:Dual cure: UV and LED (365–405 nm)`,
      $localize`:@@inks.series.70g.features.1:Plain weave polyester mesh 305+ TPI (120+ threads/cm) recommended`,
      $localize`:@@inks.series.70g.features.2:70G-070 Thinner up to 10% by weight if needed`,
      $localize`:@@inks.series.70g.features.3:Additives available for difficult adhesion (70G-000KG4, CUR-800, ADC-172, ADH-067, DK-072)`,
      $localize`:@@inks.series.70g.features.4:Metallic pastes and pigments supported (70G-000KG4 Mixing Base)`,
      $localize`:@@inks.series.70g.features.5:Fluorescent colors available on request`,
      $localize`:@@inks.series.70g.features.6:Sold by weight; KG in part code = kg per US gallon container`,
    ],
    standardColors: [
      { code: '70G-012KG4', name: 'Radiant Yellow', note: '¹' },
      { code: '70G-016KG4', name: 'Brilliant Yellow', note: '¹²' },
      { code: '70G-019KG4', name: 'Permanent Orange', note: '¹' },
      { code: '70G-021KG4', name: 'Cha Cha Red' },
      { code: '70G-022KG4', name: 'Red' },
      { code: '70G-023KG4', name: 'Rhodamine Red' },
      { code: '70G-024KG4', name: 'Rose' },
      { code: '70G-030KG4', name: 'Emerald Green' },
      { code: '70G-031KG4', name: 'Spruce Green' },
      { code: '70G-034KG4', name: 'Permanent Blue' },
      { code: '70G-035KG4', name: 'Violet' },
      { code: '70G-037KG4', name: 'Reflex Blue', note: '²' },
      { code: '70G-2313KG4', name: 'Lightfast Yellow' },
      { code: '70G-2233KG4', name: 'Opaque Yellow', note: '¹' },
      { code: '70G-2872KG4', name: 'Lightfast Orange' },
    ],
  },
  'ppc-series': {
    longDescription: $localize`:@@inks.series.ppc.longDescription:The PPC Series is a one-part UV curable ink system designed for direct printing on common container applications. Suitable for treated HDPE, LDPE, polypropylene, styrene, PET, and PVC. PET may require flame treatment for adhesion; for thin-walled PVC, embrittlement can occur (04 Series may be better for PVC). Inks are supplied at print-ready viscosity; PPC-070 Thinner or PPC-049 Overprint Clear can be used to thin. Curing: UV light 280–400 nm; fast cure with one 300 W/in or two 200 W/in medium pressure mercury vapor lamps. Non-visual post-curing with cross-linking up to 24 hours. All PPC Series colors are intermixable. Custom and specific colors can be matched at Norcote with print sample, wet ink sample, or Pantone® numbers.`,
    applications: [
      'Containers (HDPE, LDPE, PP, styrene, PET, PVC)',
      'Direct printing on treated polyolefins',
      'Industrial and packaging screen printing',
    ],
    substrates: ['Treated HDPE', 'Treated LDPE', 'Treated polypropylene', 'Styrene', 'PET', 'PVC', 'Rigid frame'],
    features: [
      $localize`:@@inks.series.ppc.features.0:One part; no additives required`,
      $localize`:@@inks.series.ppc.features.1:Chemical resistant; quick curing; superb gloss; high definition`,
      $localize`:@@inks.series.ppc.features.2:Excellent intercoat adhesion`,
      $localize`:@@inks.series.ppc.features.3:Mesh: 355 TPI and higher (140/cm²) low elongation monofilament polyester; tension 18–25 N/cm²`,
      $localize`:@@inks.series.ppc.features.4:Stencil: direct emulsions and thin capillary films (15–25 µm)`,
      $localize`:@@inks.series.ppc.features.5:Squeegee: sharp 80 shore durometer polyurethane preferred (60–90 or dual durometer)`,
      $localize`:@@inks.series.ppc.features.6:Coverage: approximately 2,500 sq ft per gallon`,
      $localize`:@@inks.series.ppc.features.7:PPC-000 Mixing Base for metallics/fluorescent; add into pigmented ink only (reactive to light)`,
      $localize`:@@inks.series.ppc.features.8:Fluorescent colors and T-Powders available on request`,
      $localize`:@@inks.series.ppc.features.9:Screen cleaning: conventional solvent; avoid alcohol. Norcote Press Wash 110, 140, or NSW-824`,
      $localize`:@@inks.series.ppc.features.10:Standard warranty: 1 year from date of sale (no additives); see bulletin for custom colors and limitations`,
    ],
    standardColors: [
      { code: 'PPC-012', name: 'Radiant Yellow', note: '¹' },
      { code: 'PPC-016', name: 'Brilliant Orange', note: '¹' },
      { code: 'PPC-017', name: 'Medium Yellow' },
      { code: 'PPC-019', name: 'Permanent Orange', note: '¹' },
      { code: 'PPC-021', name: 'Cha-Cha Red' },
      { code: 'PPC-022', name: 'Red' },
      { code: 'PPC-023', name: 'Rhodamine Red' },
      { code: 'PPC-024', name: 'Rose' },
      { code: 'PPC-030', name: 'Emerald Green' },
      { code: 'PPC-031', name: 'Spruce Green' },
      { code: 'PPC-034', name: 'Permanent Blue' },
      { code: 'PPC-035', name: 'Violet' },
      { code: 'PPC-037', name: 'Reflex Blue' },
      { code: 'PPC-2313', name: 'Lightfast Yellow' },
      { code: 'PPC-2872', name: 'Lightfast Orange' },
    ],
    basesAndClears: [
      { code: 'PPC-002', name: 'Mixing White' },
      { code: 'PPC-1046', name: 'Opaque White' },
      { code: 'PPC-1056', name: 'Non-Chalking Opaque White' },
      { code: 'PPC-1057', name: 'Nano-Opaque White' },
      { code: 'PPC-005', name: 'Mixing Black' },
      { code: 'PPC-1019', name: 'Opaque Black' },
      { code: 'PPC-4000', name: 'Jet Black' },
      { code: 'PPC-000', name: 'Mixing Base' },
      { code: 'PPC-049', name: 'Overprint Clear' },
      { code: 'PPC-060', name: 'Halftone Base' },
    ],
  },
  'msk-series': {
    longDescription: $localize`:@@inks.series.msk.longDescription:The MSK Series is a high-end, UV curable, second surface ink system specifically formulated for use on substrates common to the industrial graphics market, such as polycarbonate, print treated polyesters, and PC/PET blends. Suitable for demanding applications where adhesive resistance, opacity, embossability, and actuation resistance are required, such as user interface overlays, nameplates, and automotive applications. MSK Series inks cure only when exposed to UV light of the proper wavelength. Curing speeds depend on ink film thickness and lamp energy level; ink should be cured immediately after printing. Works best with two 200 wpi focused medium pressure mercury vapor lamps. MSK is a non-visual post-curing system with further cross-linking occurring up to 24 hours later. Custom and specific colors can be matched at Norcote with customer-supplied print sample, wet ink sample, Pantone® numbers, or other recognized standards.`,
    applications: [
      'User interface overlays',
      'Nameplates',
      'Automotive applications',
      'Industrial graphics',
      'Second surface printing',
    ],
    substrates: ['Polycarbonate', 'Print treated polyester', 'PC/PET blends'],
    features: [
      $localize`:@@inks.series.msk.features.0:Extremely flexible; embossable`,
      $localize`:@@inks.series.msk.features.1:Excellent adhesion and intercoat adhesion`,
      $localize`:@@inks.series.msk.features.2:Very opaque; outstanding print definition`,
      $localize`:@@inks.series.msk.features.3:Mesh: 355 TPI (140/cm²) and above for single lamp; 280 TPI (110/cm²) for two lamp systems`,
      $localize`:@@inks.series.msk.features.4:Stencil: direct or capillary emulsions, UV compatible, 7–10 µm dry thickness`,
      $localize`:@@inks.series.msk.features.5:Squeegee: 80 durometer molded preferred; 70–90 or multi-durometer polyurethane`,
      $localize`:@@inks.series.msk.features.6:Coverage: approximately 2,200–3,200 sq ft per gallon (0.40–0.60 mil film deposit)`,
      $localize`:@@inks.series.msk.features.7:Cure: two 200 wpi focused medium pressure mercury vapor lamps; 200 mJ/cm² @ 600 mW/cm² for most colors; 300 mJ/cm² @ 600+ mW/cm² for opaque colors and metallics`,
      $localize`:@@inks.series.msk.features.8:Thinner: up to 10% MSK-070 Thinner or 5–10% MSK-049 Mixing Clear`,
      $localize`:@@inks.series.msk.features.9:MSK-000 Metallic Mixing Clear for metallics; increases viscosity to stabilize pigment suspension`,
      $localize`:@@inks.series.msk.features.10:Not weatherable for first surface outdoor; can be used for second surface outdoor where protected`,
      $localize`:@@inks.series.msk.features.11:Screen cleaning: conventional solvent; avoid alcohol. Norcote Press Wash 110, 140, or NSW-824`,
      $localize`:@@inks.series.msk.features.12:Fluorescent colors available on request (not light-fast beyond 60–90 days); 230–260 mesh recommended`,
      $localize`:@@inks.series.msk.features.13:ODMSK-2586-A2 Light-block Ink available (mesh 355.34 pw, two 300 wpi medium pressure mercury lamps)`,
      $localize`:@@inks.series.msk.features.14:Standard warranty: 1 year from date of sale (no additives); see bulletin for custom colors and limitations`,
    ],
    standardColors: [
      { code: 'MSK-007', name: 'Brown' },
      { code: 'MSK-012', name: 'Radiant Yellow', note: '*' },
      { code: 'MSK-2233', name: 'Opaque Yellow' },
      { code: 'MSK-021', name: 'Cha Cha Red', note: 'Special Order' },
      { code: 'MSK-034', name: 'Permanent Blue' },
      { code: 'MSK-335', name: 'HF Violet', note: '*' },
    ],
    processColors: [
      { code: 'MSK-060', name: 'Halftone Base' },
      { code: 'MSK-080', name: 'Halftone Process Cyan' },
      { code: 'MSK-880', name: 'Process Cyan Toner' },
      { code: 'MSK-9001', name: 'HD Process Cyan' },
    ],
    transparents: [
      { code: 'MSK-092', name: 'Transparent Red' },
      { code: 'MSK-095', name: 'Transparent Yellow' },
      { code: 'MSK-195', name: 'Transparent Yellow', note: '*' },
      { code: 'MSK-1122', name: 'Deadfront Black' },
      { code: 'MSK-2287', name: 'Dk. LED Red' },
    ],
    basesAndClears: [
      { code: 'MSK-000', name: 'Metallic Mixing Clear' },
      { code: 'MSK-249', name: 'Ultimate Clear' },
      { code: 'MSK-1085', name: 'Lens Clear' },
      { code: 'MSK-1046', name: 'Opaque White' },
      { code: 'MSK-1020', name: 'Midnight Black' },
      { code: 'MSK-4100', name: 'Jet Black' },
    ],
    texturedClears: [
      { code: 'MSK-CL2', name: 'Matting Clear', leadTime: '2 day lead time' },
      { code: 'MSK-CL6', name: 'Low Texture Satin Finish', leadTime: '2 day lead time' },
    ],
  },
  '1500-series': {
    longDescription: $localize`:@@inks.series.1500.longDescription:The 1500 is a UV curable ink system specifically formulated for pressure sensitive decal applications requiring exterior exposure up to five years. 1500 Series inks provide excellent flexibility, eliminating edge curl due to ink film shrinkage, as well as outstanding adhesion properties while being NVP free. Combined with automotive grade pigments, Norcote's 1500 Series exhibits excellent opacity and light-fastness, resulting in superior overall performance on pressure sensitive vinyls and print treated polyesters. It is the responsibility of the user to pretest all substrates with Norcote products prior to use in production.`,
    applications: [
      'Pressure sensitive decal applications',
      'Exterior exposure up to five years',
    ],
    substrates: ['Pressure Sensitive Vinyl', 'PS Print Treated Polyester', 'Some Metals'],
    features: [
      $localize`:@@inks.series.1500.features.0:Recommended for 3–5 years exterior exposure`,
      $localize`:@@inks.series.1500.features.1:Not recommended for vinyl with high plasticizer (e.g. static cling); five-year outdoor durability contingent on substrate compatibility`,
      $localize`:@@inks.series.1500.features.2:Excellent opacity; high gloss`,
      $localize`:@@inks.series.1500.features.3:Excellent solvent & abrasion resistance`,
      $localize`:@@inks.series.1500.features.4:Low shrinkage; NVP free`,
      $localize`:@@inks.series.1500.features.5:Mesh: 355 PW and above for single lamp; 305 PW and above for two lamp UV systems`,
      $localize`:@@inks.series.1500.features.6:Stencil: direct or capillary emulsions, UV compatible, 7–10 µm dry thickness`,
      $localize`:@@inks.series.1500.features.7:Squeegee: cut or molded 70–90 durometer or multi-durometer polyurethane, UV compatible`,
      $localize`:@@inks.series.1500.features.8:Coverage: 3,200–3,600 sq ft per gallon (0.40–0.60 mil film deposit)`,
      $localize`:@@inks.series.1500.features.9:Cure: one 300 W/in or two 200 W/in focused medium pressure mercury vapor lamps; 200 mJ/cm² @ 600 mW/cm² for most colors and clear; 300 mJ/cm² @ 600+ mW/cm² for most opaque colors`,
      $localize`:@@inks.series.1500.features.10:Thinning: up to 10% UVO Universal Thinner or 5–10% 1500-049 Mixing Clear; do not microwave`,
      $localize`:@@inks.series.1500.features.11:Non-visual post-curing; cross-linking up to 24 hours; cross hatch tape test (3M 600) after exiting cure unit and cooling`,
      $localize`:@@inks.series.1500.features.12:1500-C1094 Sunblock Clear recommended to increase outdoor durability and light-fastness`,
      $localize`:@@inks.series.1500.features.13:Metallics: 1500-011 Metallic Mixing Clear; mesh 195–305 pw generally recommended for metallic pigment transfer`,
      $localize`:@@inks.series.1500.features.14:Fluorescent colors and T-Powders available on request (not light-fast beyond 60–90 days); 230–260 plain weave mesh recommended`,
      $localize`:@@inks.series.1500.features.15:Clean-up: conventional solvent; avoid alcohol. Norcote Press Wash 110, 140, or NSW-824`,
      $localize`:@@inks.series.1500.features.16:Standard warranty: 1 year from date of sale (no additives); 1 month for custom colors containing DayGlo® JZB or T-Powder; custom colors with metallic pastes or intermixed competitor products not warranted`,
    ],
    standardColors: [
      { code: '1500-123', name: 'Medium Yellow' },
      { code: '1500-131', name: 'Brilliant Orange' },
      { code: '1500-151', name: 'Scarlet Red' },
      { code: '1500-155', name: 'Rubine Red' },
      { code: '1500-160', name: 'Rhodamine Red' },
      { code: '1500-190', name: 'Process Blue' },
      { code: '1500-200', name: 'Peacock Blue' },
      { code: '1500-205', name: 'Reflex Blue' },
      { code: '1500-210', name: 'Ultra Blue' },
      { code: '1500-220', name: 'Emerald Green' },
      { code: '1500-485', name: 'Warm Red' },
    ],
    processColors: [
      { code: '1500-410', name: 'HT Yellow', density: '1.10' },
      { code: '1500-420', name: 'HT Magenta', density: '1.75' },
      { code: '1500-430', name: 'HT Cyan', density: '1.80' },
      { code: '1500-440', name: 'HT Black', density: '2.00' },
      { code: '1500-450', name: 'HT Base', density: 'N/A' },
      { code: '1500-510', name: 'HD HT Yellow', density: '1.20' },
      { code: '1500-520', name: 'HD HT Magenta', density: '2.20' },
      { code: '1500-530', name: 'HD HT Cyan', density: '2.10' },
      { code: '1500-540', name: 'HD HT Black', density: '2.10' },
    ],
    colorMatchingGuide: [
      { code: '1500-010', name: 'Mixing Clear' },
      { code: '1500-201', name: 'Weatherable Primrose Yellow' },
      { code: '1500-111', name: 'Lemon Yellow' },
      { code: '1500-064', name: 'CMG Yellow (GS)' },
      { code: '1500-214', name: 'Weatherable CMG Orange' },
      { code: '1500-121', name: 'CMG Red (YS)' },
      { code: '1500-127', name: 'CMG Violet' },
      { code: '1500-241', name: 'Weatherable Fire Red' },
      { code: '1500-165', name: 'CMG Magenta' },
      { code: '1500-230', name: 'CMG Blue' },
      { code: '1500-301', name: 'Opaque Black' },
      { code: '1500-311', name: 'Opaque White' },
      { code: '1500-325', name: 'CMG Green' },
    ],
    basesAndClears: [
      { code: '1500-011', name: 'Metallic Mixing Clear' },
      { code: '1500-012', name: 'Overprint Clear' },
      { code: '1500-015', name: 'Satin Overprint Clear' },
      { code: '1500-C1094', name: 'Sunblock Clear' },
      { code: '1500-026', name: 'Barrier White' },
      { code: '1500-030', name: 'Shading Black' },
      { code: '1500-031', name: 'Tinting White' },
      { code: '1500-312', name: 'Dense Black' },
    ],
  },
  'specialty-screen': {
    longDescription: $localize`:@@inks.series.specialty.longDescription:Specialty UV screen inks for decorative, metallic, and special-effect applications. Availability and specifications vary; contact us for technical bulletins and recommendations.`,
    applications: ['Decorative', 'Metallics', 'Special effects', 'Premium packaging'],
    substrates: ['Plastic', 'Metal', 'Glass', 'Paper', 'Board'],
    features: [
      $localize`:@@inks.series.specialty.features.0:Metallics`,
      $localize`:@@inks.series.specialty.features.1:Pearlescent`,
      $localize`:@@inks.series.specialty.features.2:Custom effects`,
      $localize`:@@inks.series.specialty.features.3:Technical support`,
    ],
  },
};

export function getInkSeriesDetail(slug: string): InkSeriesDetail | null {
  const base = INK_SERIES_CATALOGUE.find((s) => s.slug === slug);
  if (!base) return null;
  const extra = detailBySlug[slug] ?? {};
  return { ...base, ...extra } as InkSeriesDetail;
}

/** Get only screen printing series (for when multiple ink types exist). */
export function getScreenPrintingSeries(): InkSeries[] {
  return INK_SERIES_CATALOGUE.filter((s) => s.inkType === 'screen-printing');
}
