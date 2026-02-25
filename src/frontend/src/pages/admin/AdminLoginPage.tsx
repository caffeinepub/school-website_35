import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useActor } from "@/hooks/useActor";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Shield, LogIn } from "lucide-react";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { actor, isFetching } = useActor();
  const { login, loginStatus, identity, isInitializing } = useInternetIdentity();

  useEffect(() => {
    const checkAdmin = async () => {
      if (!identity || !actor || isFetching) return;

      setIsChecking(true);
      setError("");

      try {
        const principal = identity.getPrincipal();
        const isAdmin = await actor.isAdmin(principal);

        if (isAdmin) {
          toast.success("Welcome, Admin!");
          navigate({ to: "/admin/dashboard" });
        } else {
          setError("You are not authorized as an admin. Please contact the super admin.");
        }
      } catch (err) {
        console.error("Error checking admin status:", err);
        setError("Failed to verify admin status. Please try again.");
      } finally {
        setIsChecking(false);
      }
    };

    if (identity && !isChecking) {
      checkAdmin();
    }
  }, [identity, actor, isFetching, navigate, isChecking]);

  const handleLogin = async () => {
    setError("");
    try {
      await login();
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to login. Please try again.");
    }
  };

  const isLoading = isInitializing || isChecking || loginStatus === "logging-in";

  return (
    <div className="container flex min-h-[80vh] items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="font-serif text-3xl">Admin Login</CardTitle>
          <CardDescription>
            Brijesh Shikshan Sansthan Inter College
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {isChecking ? "Verifying..." : "Logging in..."}
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-5 w-5" />
                Login as Admin
              </>
            )}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Only authorized administrators can access the admin panel.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
