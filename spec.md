# Brijesh Shikshan Sansthan Inter College - School Portal

## Current State

A full school management portal with:
- Public pages: Home, About, Programs, Faculty, Admissions, Contact, News, Apply Admission, Check Result
- Admin panel with separate dark-sidebar dashboard, sections: Dashboard, Applications, Results, Upload Results, Manage Admins
- Backend supports: contact form, admission applications (BSS/2026/001 format), student results (roll-number based), admin management via Internet Identity
- Admin login currently uses Internet Identity (ICP's web3 login) — buffering issues were previously reported
- Delete functionality for applications, results, and admins with confirmation dialogs

## Requested Changes (Diff)

### Add
- Username/password based admin login system (username: `bssic611300`, password: `45866b32`)
- Password change option accessible from admin panel (settings or profile section)
- Backend function to verify username/password credentials and issue a session token/flag
- Backend function to change admin password (only when current password matches)

### Modify
- AdminLoginPage: replace Internet Identity login with a username + password form (two input fields + Login button)
- Admin session management: store login state in localStorage/sessionStorage after successful username/password login
- AdminLayout: check for valid session (username/password based) instead of Internet Identity
- All admin pages: use the new session-based auth check

### Remove
- Internet Identity dependency from admin login flow (keep useActor for backend calls but remove II login requirement)

## Implementation Plan

1. Update backend to add `adminLogin(username, password)` function returning a session token/bool, and `changeAdminPassword(username, currentPassword, newPassword)` function. Initial credentials hardcoded as `bssic611300` / `45866b32`.
2. Update frontend AdminLoginPage: show username + password fields, call backend `adminLogin`, store result in localStorage on success, redirect to `/admin/dashboard`.
3. Update AdminLayout / admin auth guard to check localStorage session flag instead of Internet Identity.
4. Add "Change Password" option in admin settings (accessible from admin dashboard or sidebar).
5. All other admin features (applications, results, manage admins, delete) remain unchanged.

## UX Notes
- Login page: clean centered card with school name, username field, password field, Login button
- Show error on wrong credentials ("Invalid username or password")
- Password change form: current password, new password, confirm new password fields
- Session persists across page refreshes (localStorage)
- Logout clears localStorage session
