# Brijesh Shikshan Sansthan Inter College - Admin Dashboard Redesign

## Current State

The project is a full school management system with:
- Public pages: Home, About, Programs, Faculty, Admissions, Contact, News, Apply Admission, Check Result
- Admin pages at `/admin/login`, `/admin/dashboard`, `/admin/applications`, `/admin/upload-results`, `/admin/results`
- Admin dashboard uses the same shared `RootLayout` (Navigation + Footer) as public pages
- Dashboard layout is a basic container with stat cards and quick action cards
- No dedicated admin sidebar/shell layout

Backend has full CRUD for:
- Admission applications (submit, approve/reject, delete, search)
- Student results (submit, view, delete)
- Admin management (add, remove, initializeFirstAdmin, isSuperAdmin)
- Contact form submissions

## Requested Changes (Diff)

### Add
- A completely new `AdminLayout` shell component with:
  - Fixed dark sidebar (deep navy/slate, school branding at top)
  - Sidebar navigation items: Dashboard, Applications, Results, Upload Results, Admin Management
  - Top header bar with school name, logged-in admin principal (truncated), logout option
  - Mobile-responsive: collapsible sidebar with hamburger menu
- New `AdminManagementPage` at `/admin/manage-admins` for adding/removing admins (extracted from dashboard)
- Stats section on dashboard: Total Applications, Pending Applications, Total Results, Total Admins, Approved, Rejected

### Modify
- `App.tsx`: Admin routes (`/admin/*` except `/admin/login`) should use `AdminLayout` instead of `RootLayout`
- `AdminDashboardPage.tsx`: Redesign as a professional stats overview with cards and recent activity table; remove admin management section (moved to its own page)
- `AdminApplicationsPage.tsx`: Use new layout context (no duplicate nav/footer)
- `AdminUploadResultsPage.tsx`: Use new layout context
- `AdminResultsPage.tsx`: Use new layout context
- `AdminLoginPage.tsx`: Keep existing layout but style more prominently (full screen centered with school branding)

### Remove
- Admin management section from `AdminDashboardPage` (moved to dedicated page)
- Admin pages inheriting `RootLayout` (public nav/footer should not appear inside admin dashboard)

## Implementation Plan

1. Create `AdminLayout` component (`src/frontend/src/components/AdminLayout.tsx`):
   - Fixed left sidebar with dark background (slate-900 or similar)
   - School logo/name at top of sidebar
   - Nav links with active state highlighting
   - Top header with admin identity and logout
   - Main content area to the right
   - Mobile hamburger toggle

2. Update `App.tsx`:
   - Create a separate admin root route that uses `AdminLayout` instead of `RootLayout`
   - All `/admin/*` routes (except `/admin/login`) become children of admin root route
   - `/admin/login` keeps public layout (or no layout)

3. Redesign `AdminDashboardPage.tsx`:
   - 6 stat cards: Total Applications, Pending, Approved, Rejected, Total Results, Total Admins
   - Recent applications table (last 5)
   - Quick action buttons

4. Create `AdminManagementPage.tsx` at `/admin/manage-admins`:
   - List all admins with principal IDs
   - Add admin by principal ID input
   - Remove admin with confirmation dialog

5. Update all existing admin pages to remove any duplicate layout wrappers since they'll be inside `AdminLayout`

## UX Notes

- Sidebar color: dark navy (#0f172a or slate-900)
- Active nav item: highlighted with school accent color (blue/indigo)
- Sidebar width: 260px on desktop, slides in/out on mobile
- Stats cards: white background with colored icon badges
- Professional typography with clear hierarchy
- All delete/remove actions must show confirmation dialog
- Admin identity shown as truncated principal in header
- "First admin" auto-setup flow preserved from existing login page
