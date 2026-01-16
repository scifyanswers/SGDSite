# Solid Gear Designs — Corporate Website

Premium B2B consulting website for Solid Gear Designs, a senior manufacturing engineering consultancy led by Sergio Jorge.

## Project Overview

**Company:** Solid Gear Designs
**Founder:** Sergio Jorge — Senior Manufacturing Engineer
**Target Audience:** High-mix, low-volume manufacturers
**Site Philosophy:** Premium, calm, confident — no sales tactics

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React

## Design Principles

### Premium B2B Aesthetic
- Restrained, confident design language
- Single strategic CTA placement
- No aggressive conversion tactics
- McKinsey-level professional presentation

### Color Palette
- **Deep Navy:** `#0F1B27` (Primary brand color)
- **Copper Gold:** `#BF9F5A` (Accent and CTAs)
- **Warm Light Grey:** `#F2F2F2` (Secondary backgrounds)
- **Charcoal Dark:** `#1A1A1A` (Body text)
- **White:** `#FFFFFF` (Panels and contrast)

## Site Structure

### Navigation
- Sticky header with circular logo
- Links: Services | Results | About | Contact
- Clean, minimal design

### Hero Section
- Blueprint technical background
- Single CTA: "Book a Call"
- Strong value proposition

### Pain Points
- Manufacturing challenges addressed
- Icon-driven presentation

### Solutions/Services
- Three core service offerings
- Visual proof via CAD imagery

### Results
- Quantified client outcomes
- Credibility through metrics

### Testimonials
- Real client feedback
- Third-party validation

### About
- Sergio Jorge professional bio
- Experience and expertise highlights

### Contact
- Simple, professional form
- Name, Company, Email, Message
- Clear response time commitment

## Required Assets

Place these images in `/public/images/`:

1. `logo-circular.png` — Navigation header logo
2. `blueprint.jpg` — Hero section background
3. `cad-computer.jpg` — Services section image
4. `sergio-jorge.jpg` — About section photo
5. `logo-banner.png` — Optional footer logo

See `IMAGE-PLACEMENT-GUIDE.md` for detailed specifications.

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Asset Path Resolution

All images use Vite's `import.meta.env.BASE_URL` for proper path resolution. This ensures images work correctly in:
- Development mode
- Production builds
- Preview iframes
- Standalone browser tabs
- Deployments with custom base paths

## Build Status

✅ Production build verified
✅ TypeScript compilation clean
✅ All components tested
✅ Responsive across breakpoints

## Design Refinements

See `DESIGN-REFINEMENT-SUMMARY.md` for detailed explanation of strategic simplifications and premium design decisions.

---

**Status:** Production-ready
**Last Updated:** January 2026
