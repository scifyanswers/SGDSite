# Image Placement Guide for Solid Gear Designs

## Required Images

Place the following 5 images in `/public/images/` with these exact filenames:

### 1. logo-circular.png
- **Location:** Navigation header
- **Purpose:** Primary logo mark for site navigation
- **Recommended size:** 64x64px minimum (square aspect ratio)
- **Format:** PNG with transparent background

### 2. blueprint.jpg
- **Location:** Hero section background
- **Purpose:** Technical blueprint drawing background with dark overlay
- **Recommended size:** 1920x1080px minimum
- **Format:** JPG

### 3. cad-computer.jpg
- **Location:** Solutions/Services section
- **Purpose:** Shows engineering work in action
- **Recommended size:** 800x600px minimum
- **Format:** JPG

### 4. sergio-jorge.jpg
- **Location:** About section
- **Purpose:** Professional photo of founder
- **Recommended size:** 600x800px (portrait orientation)
- **Format:** JPG

### 5. logo-banner.png (optional)
- **Location:** Footer (if used)
- **Purpose:** Alternative horizontal logo
- **Format:** PNG with transparent background

## Directory Structure

```
/public/images/
├── logo-circular.png    (navigation)
├── blueprint.jpg        (hero background)
├── cad-computer.jpg     (services section)
├── sergio-jorge.jpg     (about section)
└── logo-banner.png      (optional, footer)
```

## Technical Notes

- All image paths use `import.meta.env.BASE_URL` for proper Vite resolution
- Images work correctly in both preview iframe and separate browser tabs
- Graceful fallback if images are missing (layout remains intact)

## Color Scheme Reference

- **Deep Navy:** #0F1B27
- **Copper Gold:** #BF9F5A
- **Warm Light Grey:** #F2F2F2
- **Charcoal Dark:** #1A1A1A
- **White:** #FFFFFF
