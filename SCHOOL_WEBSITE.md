# Prestige Academy School Website

A comprehensive, modern school website built with React 19, TypeScript, and TanStack Router on the Internet Computer.

## Features

### Pages
- **Home** - Hero section, mission/vision, quick navigation cards, core values
- **About** - School history timeline, educational philosophy, stats, commitment statement
- **Programs** - Core academic programs (Elementary, Middle, High School), enrichment programs, AP courses
- **Faculty** - Leadership team and staff profiles with contact information
- **Admissions** - Application process, requirements, important dates, tuition & financial aid
- **Contact** - Contact form with backend integration, school info, map, department contacts
- **News** - Latest news grid and upcoming events calendar

### Design System
- **Color Palette**: Academic Navy (primary), Warm Terracotta (secondary), Sage Green (accent)
- **Typography**: Crimson Text (serif headings) + DM Sans (sans-serif body)
- **Signature Element**: Diagonal accent bars creating visual flow and upward movement
- **Theme**: Light and dark mode support

### Technical Stack
- React 19 with TypeScript
- TanStack Router for navigation
- TanStack Query for state management
- Tailwind CSS + shadcn/ui components
- OKLCH color system
- Motoko backend with contact form submission

## Contact Form Integration

The contact form is fully integrated with the backend canister:
- Form validation with react-hook-form
- Real-time error feedback
- Loading states during submission
- Success/error toast notifications
- Backend method: `submitContactForm(name, email, phone, message)`

## Navigation

Responsive navigation with:
- Desktop horizontal menu
- Mobile hamburger menu with slide-out sheet
- Active page indicators
- Theme toggle (light/dark mode)
- Smooth scroll behavior

## Component Structure

```
src/frontend/src/
├── App.tsx                  # Main app with TanStack Router setup
├── components/
│   ├── Navigation.tsx       # Header with responsive nav
│   └── Footer.tsx          # Footer with contact info & social links
├── pages/
│   ├── HomePage.tsx
│   ├── AboutPage.tsx
│   ├── ProgramsPage.tsx
│   ├── FacultyPage.tsx
│   ├── AdmissionsPage.tsx
│   ├── ContactPage.tsx
│   └── NewsPage.tsx
└── hooks/
    ├── useActor.ts         # Backend actor hook (generated)
    └── useInternetIdentity.ts
```

## Design Principles

1. **Academic Excellence** - Professional, trustworthy design suitable for education
2. **Progressive Disclosure** - Information organized hierarchically
3. **Accessibility** - WCAG AA compliant, keyboard navigation, ARIA labels
4. **Responsive** - Mobile-first design, fully responsive across all devices
5. **Performance** - Optimized assets, lazy loading, efficient state management

## Running the Project

```bash
# Install dependencies
pnpm install

# Start development server
pnpm --filter '@caffeine/template-frontend' start

# TypeScript check
pnpm --filter '@caffeine/template-frontend' typescript-check

# Lint
pnpm --filter '@caffeine/template-frontend' lint

# Build
pnpm --filter '@caffeine/template-frontend' build:skip-bindings
```

## Customization

To customize the school branding:
1. Update colors in `src/frontend/index.css` (OKLCH values)
2. Change school name in `Navigation.tsx` and `Footer.tsx`
3. Update contact information in `Footer.tsx` and `ContactPage.tsx`
4. Modify content in each page component

## Future Enhancements

- Student/parent login portal
- Event calendar with RSVP
- Photo galleries
- Blog/news CMS
- Online enrollment system
- Document downloads
- Video integration
- Alumni portal
