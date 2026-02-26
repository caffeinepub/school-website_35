import { useCallback, useEffect, useState } from "react";
import { useActor } from "@/hooks/useActor";
import AdminProtect from "@/components/AdminProtect";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Loader2, Eye, CheckCircle, XCircle, FileText, Trash2 } from "lucide-react";
import type { AdmissionApplication } from "@/backend";
import { ApplicationStatus } from "@/backend";

function formatApplicationId(id: string) {
  return `BSS/2026/${id.padStart(3, "0")}`;
}

function formatDate(timestamp: bigint) {
  const date = new Date(Number(timestamp) / 1_000_000);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getStatusBadge(status: ApplicationStatus) {
  switch (status) {
    case ApplicationStatus.pending:
      return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Pending</Badge>;
    case ApplicationStatus.approved:
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Approved</Badge>;
    case ApplicationStatus.rejected:
      return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Rejected</Badge>;
    default:
      return <Badge variant="outline">{String(status)}</Badge>;
  }
}

function ApplicationsContent() {
  const [applications, setApplications] = useState<AdmissionApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<AdmissionApplication | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [appToDelete, setAppToDelete] = useState<AdmissionApplication | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { actor, isFetching } = useActor();

  const fetchApplications = useCallback(async () => {
    if (!actor || isFetching) return;

    setIsLoading(true);
    try {
      const apps = await actor.getAllAdmissionApplications();
      setApplications(apps.sort((a, b) => Number(b.timestamp - a.timestamp)));
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error("Failed to load applications");
    } finally {
      setIsLoading(false);
    }
  }, [actor, isFetching]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleUpdateStatus = async (applicationId: string, status: ApplicationStatus) => {
    if (!actor) return;

    setProcessingId(applicationId);
    try {
      await actor.updateApplicationStatus(applicationId, status);
      toast.success(`Application ${status}`);
      await fetchApplications();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error updating application:", error);
      toast.error("Failed to update application");
    } finally {
      setProcessingId(null);
    }
  };

  const viewDetails = (app: AdmissionApplication) => {
    setSelectedApp(app);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (app: AdmissionApplication) => {
    setAppToDelete(app);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!actor || !appToDelete) return;

    setIsDeleting(true);
    try {
      await actor.deleteAdmissionApplication(appToDelete.id);
      toast.success("Application deleted successfully");
      await fetchApplications();
      setDeleteDialogOpen(false);
      setAppToDelete(null);
      if (selectedApp?.id === appToDelete.id) {
        setIsDialogOpen(false);
        setSelectedApp(null);
      }
    } catch (error) {
      console.error("Error deleting application:", error);
      toast.error("Failed to delete application");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-slate-400" />
          <p className="mt-3 text-sm text-slate-500">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Page header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Admission Applications</h2>
        <p className="mt-1 text-sm text-slate-500">
          Review and manage student admission applications
        </p>
      </div>

      {applications.length === 0 ? (
        <Card className="border border-slate-200">
          <CardContent className="flex flex-col items-center py-16 text-center">
            <FileText className="mb-4 h-12 w-12 text-slate-300" />
            <h3 className="mb-2 font-semibold text-slate-700">No Applications Yet</h3>
            <p className="text-sm text-slate-500">
              Applications will appear here once students submit them.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-slate-900">
              All Applications ({applications.length})
            </CardTitle>
            <CardDescription className="text-sm text-slate-500">
              Click view to see full application details and approve or reject
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-100 bg-slate-50/50">
                    <TableHead className="pl-6 text-xs font-medium text-slate-500">Application ID</TableHead>
                    <TableHead className="text-xs font-medium text-slate-500">Student Name</TableHead>
                    <TableHead className="text-xs font-medium text-slate-500">Class</TableHead>
                    <TableHead className="text-xs font-medium text-slate-500">Mobile</TableHead>
                    <TableHead className="text-xs font-medium text-slate-500">Date</TableHead>
                    <TableHead className="text-xs font-medium text-slate-500">Status</TableHead>
                    <TableHead className="pr-6 text-right text-xs font-medium text-slate-500">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((app) => (
                    <TableRow key={app.id} className="border-slate-100">
                      <TableCell className="pl-6 font-mono text-xs text-slate-500">
                        {formatApplicationId(app.id)}
                      </TableCell>
                      <TableCell className="font-medium text-slate-900">{app.studentName}</TableCell>
                      <TableCell className="text-sm text-slate-600">{app.className}</TableCell>
                      <TableCell className="text-sm text-slate-600">{app.mobile}</TableCell>
                      <TableCell className="text-xs text-slate-500">
                        {formatDate(app.timestamp)}
                      </TableCell>
                      <TableCell>{getStatusBadge(app.status)}</TableCell>
                      <TableCell className="pr-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => viewDetails(app)}
                            className="text-slate-600"
                          >
                            <Eye className="mr-1 h-3.5 w-3.5" />
                            View
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteClick(app)}
                            className="text-slate-400 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detail dialog */}
      {selectedApp && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                Application Details
              </DialogTitle>
              <DialogDescription>
                Application ID: {formatApplicationId(selectedApp.id)}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Personal Information
                </h3>
                <div className="grid gap-3 rounded-lg bg-slate-50 p-4 md:grid-cols-2">
                  <div>
                    <p className="text-xs text-slate-500">Student Name</p>
                    <p className="font-medium text-slate-900">{selectedApp.studentName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Father Name</p>
                    <p className="font-medium text-slate-900">{selectedApp.fatherName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Mother Name</p>
                    <p className="font-medium text-slate-900">{selectedApp.motherName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Date of Birth</p>
                    <p className="font-medium text-slate-900">{selectedApp.dateOfBirth}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Contact Information
                </h3>
                <div className="grid gap-3 rounded-lg bg-slate-50 p-4 md:grid-cols-2">
                  <div>
                    <p className="text-xs text-slate-500">Mobile</p>
                    <p className="font-medium text-slate-900">{selectedApp.mobile}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Email</p>
                    <p className="font-medium text-slate-900">{selectedApp.email}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-xs text-slate-500">Address</p>
                    <p className="font-medium text-slate-900">{selectedApp.address}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Academic Information
                </h3>
                <div className="grid gap-3 rounded-lg bg-slate-50 p-4 md:grid-cols-2">
                  <div>
                    <p className="text-xs text-slate-500">Previous School</p>
                    <p className="font-medium text-slate-900">{selectedApp.previousSchool}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Class Applying For</p>
                    <p className="font-medium text-slate-900">{selectedApp.className}</p>
                  </div>
                </div>
              </div>

              {selectedApp.documentUrls.length > 0 && (
                <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Documents
                  </h3>
                  <div className="space-y-2">
                    {selectedApp.documentUrls.map((url, idx) => (
                      <a
                        key={`doc-${selectedApp.id}-${idx}`}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-indigo-600 hover:underline"
                      >
                        Document {idx + 1}: {url}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Status:</h3>
                {getStatusBadge(selectedApp.status)}
              </div>

              {selectedApp.status === ApplicationStatus.pending && (
                <div className="flex gap-3 border-t pt-4">
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => handleUpdateStatus(selectedApp.id, ApplicationStatus.approved)}
                    disabled={processingId === selectedApp.id}
                  >
                    {processingId === selectedApp.id ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <CheckCircle className="mr-2 h-4 w-4" />
                    )}
                    Approve
                  </Button>
                  <Button
                    className="flex-1"
                    variant="destructive"
                    onClick={() => handleUpdateStatus(selectedApp.id, ApplicationStatus.rejected)}
                    disabled={processingId === selectedApp.id}
                  >
                    {processingId === selectedApp.id ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <XCircle className="mr-2 h-4 w-4" />
                    )}
                    Reject
                  </Button>
                </div>
              )}

              <div className="flex justify-end border-t pt-4">
                <Button
                  variant="outline"
                  onClick={() => handleDeleteClick(selectedApp)}
                  className="text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Application
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Application?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The application will be permanently
              removed from the system.
              {appToDelete && (
                <div className="mt-3 rounded-lg bg-slate-100 p-3">
                  <p className="text-xs"><strong>Application ID:</strong> {formatApplicationId(appToDelete.id)}</p>
                  <p className="text-xs"><strong>Student:</strong> {appToDelete.studentName}</p>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default function AdminApplicationsPage() {
  return (
    <AdminProtect>
      <ApplicationsContent />
    </AdminProtect>
  );
}
