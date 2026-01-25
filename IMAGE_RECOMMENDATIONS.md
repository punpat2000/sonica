# Image Recommendations for Sonica Home Page

## Image Size Guidelines

### 1. **About Sonica Section** (Side-by-side layout)
- **Recommended Dimensions**: `1200px × 800px` (3:2 aspect ratio)
- **File Format**: WebP (already using)
- **File Size Target**: < 200KB (optimized)
- **Image Type Suggestions**:
  - Company office/facility exterior or interior
  - Team photo in professional setting
  - Warehouse/distribution center
  - Modern workspace showing professionalism
  - **Current**: `company_profile2.webp` ✅

### 2. **About Norcote International Section** (Side-by-side layout)
- **Recommended Dimensions**: `1200px × 800px` (3:2 aspect ratio)
- **File Format**: WebP
- **File Size Target**: < 200KB
- **Image Type Suggestions**:
  - UV printing process in action
  - Color matching/laboratory work
  - Technical service team at work
  - Product quality/innovation showcase
  - **Current**: `led1.webp` ✅

### 3. **Our Services Section** (Grid items)
- **Recommended Dimensions**: `600px × 400px` (3:2 aspect ratio)
- **File Format**: WebP
- **File Size Target**: < 100KB per image
- **Image Type Suggestions**:
  - **UV Screen Printing Inks**: Colorful ink containers, ink mixing, vibrant colors
  - **Color Matching Services**: Color swatches, spectrophotometer, precision tools
  - **Technical Consulting**: Expert consultation, process optimization, technical diagrams
  - **Equipment Solutions**: LED/UV curing systems, UV intensity meters, modern equipment
  - **Current**: `led2.webp` for first service ✅

### 4. **Hero Background** (Full page)
- **Recommended Dimensions**: `1920px × 1080px` (16:9 aspect ratio) or `1920px × 1200px`
- **File Format**: WebP
- **File Size Target**: < 300KB (optimized)
- **Image Type Suggestions**:
  - Modern industrial/printing facility
  - Abstract UV printing process
  - Professional, clean, high-tech atmosphere
  - **Current**: `sonica-hero.webp` ✅

## General Image Guidelines

### Aspect Ratios
- **Side-by-side sections**: 3:2 ratio (landscape) works best
- **Service grid items**: 3:2 or 4:3 ratio
- **Hero**: 16:9 or 16:10 ratio

### Image Quality
- **Resolution**: 2x for retina displays (e.g., 1200px width for 600px display)
- **Compression**: Use 80-85% quality for WebP to balance size and quality
- **Responsive**: Images will scale down on mobile automatically

### Content Recommendations

#### For "About Sonica":
- Professional business environment
- Modern office or facility
- Team collaboration
- Distribution/warehouse operations
- Partnership/trust imagery

#### For "About Norcote":
- Innovation and technology focus
- Laboratory/testing environment
- Color precision and quality
- Technical expertise
- 40+ years of experience visual

#### For Services:
- **UV Inks**: Product photography, color variety, quality
- **Color Matching**: Precision tools, color swatches, accuracy
- **Technical Consulting**: Expert guidance, problem-solving
- **Equipment**: Modern technology, LED/UV systems, meters

### Technical Specifications

```scss
// Current CSS constraints:
.section-image {
  min-height: 300px;  // Minimum display height
  object-fit: cover;  // Images will crop to fit
}

.service-image {
  height: 200px;      // Fixed height for services
  object-fit: cover;
}
```

### Optimization Tips
1. Use WebP format (already implemented) ✅
2. Compress images before uploading
3. Use `ngSrc` with proper width/height attributes (already implemented) ✅
4. Consider lazy loading for below-the-fold images
5. Use `priority` attribute only for above-the-fold images

## Recommended Image Sources
- Professional photography of your facilities
- Product photography
- Stock photos (if needed) from:
  - Unsplash (free, high-quality)
  - Pexels (free)
  - Shutterstock (paid, professional)
- Custom graphics/illustrations for services
