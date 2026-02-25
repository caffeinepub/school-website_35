import { useEffect, useState } from "react";
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
import { toast } from "sonner";
import { Loader2, Eye, CheckCircle, XCircle, FileText } from "lucide-react";
import type { AdmissionApplication } from "@/backend";
import { ApplicationStatus } from "@/backend";

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<AdmissionApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<AdmissionApplication | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const { actor, isFetching } = useActor();

  const fetchApplications = async () => {
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
  };

  useEffect(() => {
    fetchApplications();
  }, [actor, isFetching]);

  const formatApplicationId = (id: string) => {
    const paddedId = id.padStart(3, "0");
    return `BSS/2026/${paddedId}`;
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1_000_000);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="border-warning text-warning">Pending</Badge>;
      case "approved":
        return <Badge variant="outline" className="border-success text-success">Approved</Badge>;
      case "rejected":
        return <Badge variant="outline" className="border-destructive text-destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

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

  if (isLoading) {
    return (
      <AdminProtect>
        <div className="container flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">Loading applications...</p>
          </div>
        </div>
      </AdminProtect>
    );
  }

  return (
    <AdminProtect>
      <div className="container py-12 md:py-20">
        <div className="mb-8">
          <h1 className="mb-2 font-serif text-4xl font-bold text-primary">
            Admission Applications
          </h1>
          <p className="text-muted-foreground">
            Review and manage student admission applications
          </p>
        </div>

        {applications.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center py-12 text-center">
              <FileText className="mb-4 h-16 w-16 text-muted-foreground/40" />
              <h3 className="mb-2 font-serif text-xl font-semibold">No Applications Yet</h3>
              <p className="text-muted-foreground">
                Applications will appear here once students submit them.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>All Applications ({applications.length})</CardTitle>
              <CardDescription>
                Click on view details to see full application information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Application ID</TableHead>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Mobile</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell className="font-mono text-sm">
                          {formatApplicationId(app.id)}
                        </TableCell>
                        <TableCell className="font-medium">{app.studentName}</TableCell>
                        <TableCell>{app.className}</TableCell>
                        <TableCell>{app.mobile}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(app.timestamp)}
                        </TableCell>
                        <TableCell>{getStatusBadge(app.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => viewDetails(app)}
                          >
                            <Eye className="mr-1 h-4 w-4" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {selectedApp && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl">
                  Application Details
                </DialogTitle>
                <DialogDescription>
                  Application ID: {formatApplicationId(selectedApp.id)}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 font-semibold text-primary">Personal Information</h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Student Name</p>
                      <p className="font-medium">{selectedApp.studentName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Father Name</p>
                      <p className="font-medium">{selectedApp.fatherName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Mother Name</p>
                      <p className="font-medium">{selectedApp.motherName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date of Birth</p>
                      <p className="font-medium">{selectedApp.dateOfBirth}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 font-semibold text-primary">Contact Information</h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Mobile</p>
                      <p className="font-medium">{selectedApp.mobile}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{selectedApp.email}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium">{selectedApp.address}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 font-semibold text-primary">Academic Information</h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Previous School</p>
                      <p className="font-medium">{selectedApp.previousSchool}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Class Applying For</p>
                      <p className="font-medium">{selectedApp.className}</p>
                    </div>
                  </div>
                </div>

                {selectedApp.documentUrls.length > 0 && (
                  <div>
                    <h3 className="mb-3 font-semibold text-primary">Documents</h3>
                    <div className="space-y-2">
                      {selectedApp.documentUrls.map((url, index) => (
                        <a
                          key={index}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-sm text-accent hover:underline"
                        >
                          Document {index + 1}: {url}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="mb-3 font-semibold text-primary">Status</h3>
                  {getStatusBadge(selectedApp.status)}
                </div>

                {selectedApp.status === "pending" && (
                  <div className="flex gap-3 border-t pt-6">
                    <Button
                      className="flex-1"
                      variant="outline"
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
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </AdminProtect>
  );
}
