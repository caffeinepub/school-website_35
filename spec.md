# Brijesh Shikshan Sansthan Inter College Maidhan Sultanpur

## Current State

The school website is a fully functional multi-page application with:

### Frontend Pages
- **Home Page** (`HomePage.tsx`) - Landing page with hero section and overview
- **About Page** (`AboutPage.tsx`) - School information and history
- **Programs Page** (`ProgramsPage.tsx`) - Academic programs and curriculum
- **Faculty Page** (`FacultyPage.tsx`) - Faculty member profiles
- **Admissions Page** (`AdmissionsPage.tsx`) - General admission information
- **Contact Page** (`ContactPage.tsx`) - Contact form for inquiries
- **News Page** (`NewsPage.tsx`) - School announcements and updates

### Navigation & Layout
- Responsive navigation component (`Navigation.tsx`)
- Footer component (`Footer.tsx`)
- TanStack Router for client-side routing
- Tailwind CSS + shadcn/ui components

### Backend (main.mo)
- Contact form submission system with data persistence
- Functions: `submitContactForm`, `getContactSubmission`, `getAllContactSubmissions`
- Basic data storage using Motoko Map

### Missing Features
- No authentication or authorization system
- No admin panel or admin access control
- No student admission application system
- No result management and display system
- No role-based permissions

## Requested Changes (Diff)

### Add

**Admin Authentication & Authorization System:**
- Super admin role (principal) with ability to grant admin access to others
- Admin login mechanism with role-based access control
- Protected admin routes

**Student Admission Application System:**
- Public-facing admission application form for students
- Form fields:
  - Student name, father's name, mother's name
  - Date of birth
  - Contact details (mobile, address, email)
  - Previous school details
  - Class/course selection
  - Document uploads (photo, certificates, marksheet)
- Application ID generation in format: `BSS/2026/001` (school initials + year + sequential number)
- Application submission confirmation with Application ID display
- Application status tracking (pending/approved/rejected)

**Admin Panel:**
- Dashboard to view all admission applications
- Application review interface with approve/reject functionality
- Result upload interface with:
  - Roll number assignment
  - Student name and class
  - Subject-wise marks entry
  - Bulk or individual result upload
- Admin user management (grant/revoke admin access)

**Result Display System:**
- Public result checker page
- Roll number-based result search
- Individual marksheet display with:
  - Student details (name, class, roll number)
  - Subject-wise marks
  - Total marks and percentage
  - Result status (pass/fail)

### Modify

**Navigation Component:**
- Add "Admin Login" link
- Add "Apply for Admission" link
- Add "Check Results" link

**Admissions Page:**
- Update to include prominent link/button to admission application form
- Show application process information

**Backend (main.mo):**
- Extend to include all new data models and functions
- Integrate with authorization component

### Remove

- No features to be removed; all existing pages and functionality remain

## Implementation Plan

### 1. Component Selection
- Select `authorization` component for role-based admin access control

### 2. Backend Development (Motoko)
Generate backend code with these functional requirements:

**Admin Management:**
- Initialize super admin on first deployment
- Grant admin role to other users
- Revoke admin role
- Check if a user is admin

**Admission Application Management:**
- Submit admission application with all student details
- Generate sequential Application ID in format `BSS/YEAR/XXX`
- Store application with status (pending/approved/rejected)
- Retrieve single application by ID
- List all applications (with optional status filter)
- Update application status (approve/reject)

**Result Management:**
- Upload student result with roll number, name, class, and subject-wise marks
- Retrieve result by roll number
- Update/modify existing result
- List all results (with optional class filter)
- Calculate total marks and percentage automatically

**Data Models:**
- AdmissionApplication (id, applicationId, studentName, fatherName, motherName, dob, mobile, address, email, previousSchool, class, documents, status, timestamp)
- StudentResult (rollNumber, studentName, class, subjects, marks, totalMarks, percentage, timestamp)
- Admin users managed by authorization component

### 3. Frontend Development (React + TypeScript)

**New Pages:**
- `AdminLoginPage.tsx` - Admin authentication page
- `AdminDashboardPage.tsx` - Main admin dashboard
- `AdmissionApplicationsPage.tsx` - View and manage all applications
- `UploadResultsPage.tsx` - Result upload interface
- `ApplyAdmissionPage.tsx` - Public admission application form
- `CheckResultPage.tsx` - Public result checker

**Updated Pages:**
- `Navigation.tsx` - Add new navigation links for Admin, Apply Admission, Check Results
- `AdmissionsPage.tsx` - Add prominent CTA button for admission application

**New Components:**
- `AdminLayout.tsx` - Protected admin layout with sidebar navigation
- `ApplicationCard.tsx` - Display single application with approve/reject actions
- `ResultForm.tsx` - Multi-subject marks entry form
- `AdmissionForm.tsx` - Multi-step admission application form
- `Marksheet.tsx` - Display formatted student marksheet

**Integration:**
- Wire all forms to backend API functions
- Implement authorization checks for admin routes
- Add loading states and error handling
- Form validation for all user inputs
- Success/error toast notifications

### 4. Routing Updates
Add new routes:
- `/admin/login` - Admin login
- `/admin/dashboard` - Admin dashboard (protected)
- `/admin/applications` - Admission applications (protected)
- `/admin/results` - Upload results (protected)
- `/apply-admission` - Public admission form
- `/check-results` - Public result checker

### 5. Validation & Testing
- Type-check all TypeScript code
- Lint all files
- Build frontend successfully
- Test all form submissions
- Test admin access control
- Test result checker functionality

## UX Notes

**Application Flow for Students:**
1. Visit website → Click "Apply for Admission" in navigation
2. Fill multi-step form with personal, contact, academic details
3. Upload required documents (photo, certificates)
4. Submit form → Receive Application ID `BSS/2026/001`
5. Save Application ID for status tracking

**Result Checking Flow:**
1. Visit website → Click "Check Results" in navigation
2. Enter roll number
3. View complete marksheet with subject-wise marks and percentage

**Admin Workflow:**
1. Admin login with credentials
2. Dashboard shows summary (pending applications, total students)
3. Navigate to Applications section
4. Review each application with all submitted details
5. Approve or reject with optional remarks
6. Navigate to Results section
7. Upload results (single or multiple students)
8. Enter roll number, student details, class, subject-wise marks
9. System auto-calculates total and percentage

**Visual Design:**
- Maintain existing school website design language
- Admin panel uses professional dashboard UI with sidebar navigation
- Forms use clean, step-by-step progressive disclosure
- Marksheet displays in traditional format with school header
- Use consistent color scheme: academic blue/navy tones
- Mobile-responsive across all new pages
