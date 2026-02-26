import { Router, Route, RootRoute, RouterProvider, Outlet } from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import AdminLayout from "./components/AdminLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProgramsPage from "./pages/ProgramsPage";
import FacultyPage from "./pages/FacultyPage";
import AdmissionsPage from "./pages/AdmissionsPage";
import ContactPage from "./pages/ContactPage";
import NewsPage from "./pages/NewsPage";
import ApplyAdmissionPage from "./pages/ApplyAdmissionPage";
import CheckResultPage from "./pages/CheckResultPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminApplicationsPage from "./pages/admin/AdminApplicationsPage";
import AdminUploadResultsPage from "./pages/admin/AdminUploadResultsPage";
import AdminResultsPage from "./pages/admin/AdminResultsPage";
import AdminManagementPage from "./pages/admin/AdminManagementPage";

// Public layout: navigation + footer
function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// Admin login layout: standalone, no public nav/footer
function AdminLoginLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Outlet />
    </div>
  );
}

// Single root route that renders nothing but an Outlet
function BlankRoot() {
  return <Outlet />;
}

const rootRoute = new RootRoute({
  component: BlankRoot,
});

// Public layout sub-root
const publicRootRoute = new Route({
  getParentRoute: () => rootRoute,
  id: "publicRoot",
  component: RootLayout,
});

// Admin login sub-root (standalone)
const adminLoginRootRoute = new Route({
  getParentRoute: () => rootRoute,
  id: "adminLoginRoot",
  component: AdminLoginLayout,
});

// Admin sub-root (uses AdminLayout shell)
const adminRootRoute = new Route({
  getParentRoute: () => rootRoute,
  id: "adminRoot",
  component: AdminLayout,
});

// --- Public routes ---
const indexRoute = new Route({
  getParentRoute: () => publicRootRoute,
  path: "/",
  component: HomePage,
});

const aboutRoute = new Route({
  getParentRoute: () => publicRootRoute,
  path: "/about",
  component: AboutPage,
});

const programsRoute = new Route({
  getParentRoute: () => publicRootRoute,
  path: "/programs",
  component: ProgramsPage,
});

const facultyRoute = new Route({
  getParentRoute: () => publicRootRoute,
  path: "/faculty",
  component: FacultyPage,
});

const admissionsRoute = new Route({
  getParentRoute: () => publicRootRoute,
  path: "/admissions",
  component: AdmissionsPage,
});

const contactRoute = new Route({
  getParentRoute: () => publicRootRoute,
  path: "/contact",
  component: ContactPage,
});

const newsRoute = new Route({
  getParentRoute: () => publicRootRoute,
  path: "/news",
  component: NewsPage,
});

const applyAdmissionRoute = new Route({
  getParentRoute: () => publicRootRoute,
  path: "/apply-admission",
  component: ApplyAdmissionPage,
});

const checkResultRoute = new Route({
  getParentRoute: () => publicRootRoute,
  path: "/check-result",
  component: CheckResultPage,
});

// --- Admin login route (standalone layout) ---
const adminLoginRoute = new Route({
  getParentRoute: () => adminLoginRootRoute,
  path: "/admin/login",
  component: AdminLoginPage,
});

// --- Admin routes (AdminLayout shell) ---
const adminDashboardRoute = new Route({
  getParentRoute: () => adminRootRoute,
  path: "/admin/dashboard",
  component: AdminDashboardPage,
});

const adminApplicationsRoute = new Route({
  getParentRoute: () => adminRootRoute,
  path: "/admin/applications",
  component: AdminApplicationsPage,
});

const adminUploadResultsRoute = new Route({
  getParentRoute: () => adminRootRoute,
  path: "/admin/upload-results",
  component: AdminUploadResultsPage,
});

const adminResultsRoute = new Route({
  getParentRoute: () => adminRootRoute,
  path: "/admin/results",
  component: AdminResultsPage,
});

const adminManageAdminsRoute = new Route({
  getParentRoute: () => adminRootRoute,
  path: "/admin/manage-admins",
  component: AdminManagementPage,
});

const publicTree = publicRootRoute.addChildren([
  indexRoute,
  aboutRoute,
  programsRoute,
  facultyRoute,
  admissionsRoute,
  contactRoute,
  newsRoute,
  applyAdmissionRoute,
  checkResultRoute,
]);

const adminLoginTree = adminLoginRootRoute.addChildren([adminLoginRoute]);

const adminTree = adminRootRoute.addChildren([
  adminDashboardRoute,
  adminApplicationsRoute,
  adminUploadResultsRoute,
  adminResultsRoute,
  adminManageAdminsRoute,
]);

const routeTree = rootRoute.addChildren([
  publicTree,
  adminLoginTree,
  adminTree,
]);

const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
