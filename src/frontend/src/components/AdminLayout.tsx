import { useState } from "react";
import { Outlet, Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileText,
  TrendingUp,
  Upload,
  Shield,
  Menu,
  X,
  LogOut,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Applications",
    href: "/admin/applications",
    icon: FileText,
  },
  {
    label: "Results",
    href: "/admin/results",
    icon: TrendingUp,
  },
  {
    label: "Upload Results",
    href: "/admin/upload-results",
    icon: Upload,
  },
  {
    label: "Manage Admins",
    href: "/admin/manage-admins",
    icon: Shield,
  },
];

function truncatePrincipal(principal: string): string {
  if (principal.length <= 20) return principal;
  return `${principal.substring(0, 8)}...${principal.substring(principal.length - 6)}`;
}

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const navigate = useNavigate();
  const { identity, clear } = useInternetIdentity();

  const principalId = identity?.getPrincipal().toString() ?? "";

  const handleLogout = () => {
    clear();
    navigate({ to: "/admin/login" });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-20 w-full cursor-default bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 flex w-[260px] flex-col bg-slate-900 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo/Brand */}
        <div className="flex h-16 items-center gap-3 border-b border-slate-700/50 px-6">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-600">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-white">BSSIC</p>
            <p className="truncate text-[10px] font-medium tracking-wide text-slate-400 uppercase">
              Admin Portal
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="ml-auto flex h-7 w-7 items-center justify-center rounded text-slate-400 hover:text-white lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 shrink-0",
                    isActive ? "text-white" : "text-slate-400"
                  )}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-slate-700/50 p-4">
          <div className="mb-3 rounded-lg bg-slate-800 p-3">
            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500 mb-1">
              Logged in as
            </p>
            <p className="font-mono text-xs text-slate-300 break-all leading-relaxed">
              {principalId ? truncatePrincipal(principalId) : "—"}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-start gap-2 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top header */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm lg:px-6">
          <div className="flex items-center gap-4">
            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-sm font-semibold text-slate-900 lg:text-base">
                Brijesh Shikshan Sansthan Inter College
              </h1>
              <p className="hidden text-xs text-slate-500 lg:block">
                Admin Management System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {principalId && (
              <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 sm:flex">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="font-mono text-xs text-slate-600">
                  {truncatePrincipal(principalId)}
                </span>
              </div>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="hidden gap-2 border-slate-200 text-slate-600 hover:bg-slate-50 sm:flex"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
