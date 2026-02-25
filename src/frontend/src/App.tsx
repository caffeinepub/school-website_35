import { Router, Route, RootRoute, RouterProvider, Outlet } from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
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

const rootRoute = new RootRoute({
  component: RootLayout,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const programsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/programs",
  component: ProgramsPage,
});

const facultyRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/faculty",
  component: FacultyPage,
});

const admissionsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/admissions",
  component: AdmissionsPage,
});

const contactRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});

const newsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/news",
  component: NewsPage,
});

const applyAdmissionRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/apply-admission",
  component: ApplyAdmissionPage,
});

const checkResultRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/check-result",
  component: CheckResultPage,
});

const adminLoginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/admin/login",
  component: AdminLoginPage,
});

const adminDashboardRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/admin/dashboard",
  component: AdminDashboardPage,
});

const adminApplicationsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/admin/applications",
  component: AdminApplicationsPage,
});

const adminUploadResultsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/admin/upload-results",
  component: AdminUploadResultsPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  programsRoute,
  facultyRoute,
  admissionsRoute,
  contactRoute,
  newsRoute,
  applyAdmissionRoute,
  checkResultRoute,
  adminLoginRoute,
  adminDashboardRoute,
  adminApplicationsRoute,
  adminUploadResultsRoute,
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
