import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useActor } from "@/hooks/useActor";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { Loader2 } from "lucide-react";

export default function AdminProtect({ children }: { children: ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const navigate = useNavigate();
  const { actor, isFetching } = useActor();
  const { identity, isInitializing } = useInternetIdentity();

  useEffect(() => {
    const checkAdmin = async () => {
      if (isInitializing || isFetching) return;

      if (!identity) {
        navigate({ to: "/admin/login" });
        return;
      }

      if (!actor) {
        setIsChecking(false);
        return;
      }

      try {
        // Create timeout promise (10 seconds)
        const timeoutPromise = new Promise<boolean>((_, reject) =>
          setTimeout(() => reject(new Error("Request timeout")), 10000)
        );

        // Race between actual call and timeout
        const isAuthorized = await Promise.race([
          actor.initializeFirstAdmin(),
          timeoutPromise,
        ]);

        if (isAuthorized) {
          setIsAuthorized(true);
        } else {
          navigate({ to: "/admin/login" });
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        navigate({ to: "/admin/login" });
      } finally {
        setIsChecking(false);
      }
    };

    checkAdmin();
  }, [identity, actor, isFetching, isInitializing, navigate]);

  if (isChecking || isInitializing) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">Verifying authorization...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
