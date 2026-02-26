import { useEffect, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { isAdminLoggedIn } from "@/utils/adminAuth";

export default function AdminProtect({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate({ to: "/admin/login" });
    }
  }, [navigate]);

  // Synchronous check: if not logged in, render nothing while redirect happens
  if (!isAdminLoggedIn()) {
    return null;
  }

  return <>{children}</>;
}
