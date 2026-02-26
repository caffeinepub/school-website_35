// Admin authentication utility - purely frontend credential check
// No backend call needed for login; backend data calls still use useActor

const SESSION_KEY = "bssic_admin_session";

// Mutable credentials (in-memory for password change support)
let adminCredentials = {
  username: "bssic611300",
  password: "45866b32",
};

/**
 * Check if provided credentials match the stored admin credentials.
 */
export function adminLogin(username: string, password: string): boolean {
  return (
    username === adminCredentials.username &&
    password === adminCredentials.password
  );
}

/**
 * Check if the admin session is active (stored in localStorage).
 */
export function isAdminLoggedIn(): boolean {
  return localStorage.getItem(SESSION_KEY) === "true";
}

/**
 * Set the admin session in localStorage.
 */
export function setAdminSession(): void {
  localStorage.setItem(SESSION_KEY, "true");
}

/**
 * Clear the admin session from localStorage.
 */
export function adminLogout(): void {
  localStorage.removeItem(SESSION_KEY);
}

/**
 * Change admin password. Returns true on success, false if currentPassword is wrong.
 */
export function changeAdminPassword(
  currentPassword: string,
  newPassword: string
): boolean {
  if (currentPassword !== adminCredentials.password) {
    return false;
  }
  adminCredentials = { ...adminCredentials, password: newPassword };
  return true;
}

/**
 * Get the current admin username (for display purposes).
 */
export function getAdminUsername(): string {
  return adminCredentials.username;
}
