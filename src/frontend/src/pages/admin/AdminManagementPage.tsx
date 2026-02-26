import { useEffect, useState, useCallback } from "react";
import { useActor } from "@/hooks/useActor";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import AdminProtect from "@/components/AdminProtect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Shield, Trash2, Loader2, UserPlus, UserCog } from "lucide-react";
import type { Principal } from "@icp-sdk/core/principal";
import { Principal as PrincipalClass } from "@icp-sdk/core/principal";

function truncatePrincipal(principal: Principal): string {
  const str = principal.toString();
  if (str.length <= 24) return str;
  return `${str.substring(0, 12)}...${str.substring(str.length - 8)}`;
}

function AdminManagementContent() {
  const [admins, setAdmins] = useState<Principal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newAdminId, setNewAdminId] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [adminToRemove, setAdminToRemove] = useState<Principal | null>(null);
  const [isRemoving, setIsRemoving] = useState(false);
  const [addError, setAddError] = useState("");
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  const fetchAdmins = useCallback(async () => {
    if (!actor || isFetching) return;
    setIsLoading(true);
    try {
      const adminList = await actor.getAllAdmins();
      setAdmins(adminList);
    } catch (error) {
      console.error("Error fetching admins:", error);
      toast.error("Failed to load admin list");
    } finally {
      setIsLoading(false);
    }
  }, [actor, isFetching]);

  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor || !newAdminId.trim()) return;

    setAddError("");
    setIsAdding(true);

    try {
      const principal = PrincipalClass.fromText(newAdminId.trim());
      await actor.addAdmin(principal);
      toast.success("Admin added successfully");
      setNewAdminId("");
      await fetchAdmins();
    } catch (error) {
      console.error("Error adding admin:", error);
      if (error instanceof Error && error.message.includes("Invalid principal")) {
        setAddError("Invalid Principal ID format. Please check and try again.");
      } else if (error instanceof Error) {
        setAddError(error.message);
      } else {
        setAddError("Failed to add admin. Please try again.");
      }
    } finally {
      setIsAdding(false);
    }
  };

  const handleRemoveClick = (principal: Principal) => {
    setAdminToRemove(principal);
    setDeleteDialogOpen(true);
  };

  const handleRemoveConfirm = async () => {
    if (!actor || !adminToRemove) return;

    setIsRemoving(true);
    try {
      await actor.removeAdmin(adminToRemove);
      toast.success("Admin removed successfully");
      await fetchAdmins();
      setDeleteDialogOpen(false);
      setAdminToRemove(null);
    } catch (error) {
      console.error("Error removing admin:", error);
      toast.error("Failed to remove admin");
    } finally {
      setIsRemoving(false);
    }
  };

  const currentPrincipal = identity?.getPrincipal().toString();

  return (
    <div className="p-6 lg:p-8">
      {/* Page header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Manage Admins</h2>
        <p className="mt-1 text-sm text-slate-500">
          Add and remove admin access to the management system
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Add new admin */}
        <Card className="border border-slate-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100">
                <UserPlus className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold text-slate-900">
                  Add New Admin
                </CardTitle>
                <CardDescription className="text-sm text-slate-500">
                  Grant admin access by Principal ID
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddAdmin} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="principalId"
                  className="text-sm font-medium text-slate-700"
                >
                  Principal ID <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="principalId"
                  placeholder="e.g. aaaaa-aa or xxxxx-xxxxx-xxxxx-xxxxx-xxx"
                  value={newAdminId}
                  onChange={(e) => {
                    setNewAdminId(e.target.value);
                    setAddError("");
                  }}
                  disabled={isAdding}
                  className="font-mono text-sm"
                />
                {addError && (
                  <p className="text-sm text-red-600">{addError}</p>
                )}
                <p className="text-xs text-slate-500">
                  The Principal ID of the user you want to grant admin access to.
                </p>
              </div>
              <Button
                type="submit"
                disabled={isAdding || !newAdminId.trim()}
                className="w-full bg-indigo-600 hover:bg-indigo-700"
              >
                {isAdding ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Admin
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Admin list */}
        <Card className="border border-slate-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
                <UserCog className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold text-slate-900">
                  Current Admins
                </CardTitle>
                <CardDescription className="text-sm text-slate-500">
                  {isLoading ? "Loading..." : `${admins.length} admin${admins.length !== 1 ? "s" : ""} with access`}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
              </div>
            ) : admins.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Shield className="mb-3 h-10 w-10 text-slate-300" />
                <p className="text-sm text-slate-500">No admins found</p>
              </div>
            ) : (
              <div className="space-y-2">
                {admins.map((admin) => {
                  const isCurrentUser = currentPrincipal === admin.toString();
                  return (
                    <div
                      key={admin.toString()}
                      className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${isCurrentUser ? "bg-indigo-100" : "bg-slate-200"}`}>
                          <Shield className={`h-4 w-4 ${isCurrentUser ? "text-indigo-600" : "text-slate-500"}`} />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-mono text-xs text-slate-700">
                            {truncatePrincipal(admin)}
                          </p>
                          {isCurrentUser && (
                            <p className="text-[10px] font-medium text-indigo-600">
                              You (Super Admin)
                            </p>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveClick(admin)}
                        disabled={isCurrentUser}
                        className="ml-2 shrink-0 text-slate-400 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                        title={isCurrentUser ? "Cannot remove yourself" : "Remove admin"}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Remove confirmation dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Admin Access?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This admin will lose all access to
              the management system immediately.
              {adminToRemove && (
                <div className="mt-3 rounded-lg bg-slate-100 p-3">
                  <p className="text-xs font-medium text-slate-600 mb-1">Principal ID:</p>
                  <p className="break-all font-mono text-xs text-slate-800">
                    {adminToRemove.toString()}
                  </p>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isRemoving}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemoveConfirm}
              disabled={isRemoving}
              className="bg-red-600 hover:bg-red-700"
            >
              {isRemoving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Remove Admin
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default function AdminManagementPage() {
  return (
    <AdminProtect>
      <AdminManagementContent />
    </AdminProtect>
  );
}
