import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useActor } from "@/hooks/useActor";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  Users,
  Upload,
  Shield,
  Loader2,
  ArrowRight,
} from "lucide-react";
import type { AdmissionApplication, StudentResult } from "@/backend";
import type { Principal } from "@icp-sdk/core/principal";
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

function StatusBadge({ status }: { status: ApplicationStatus }) {
  if (status === ApplicationStatus.approved) {
    return (
      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
        Approved
      </Badge>
    );
  }
  if (status === ApplicationStatus.rejected) {
    return (
      <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
        Rejected
      </Badge>
    );
  }
  return (
    <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
      Pending
    </Badge>
  );
}

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ElementType;
  colorClass: string;
  bgClass: string;
  loading?: boolean;
}

function StatCard({ title, value, icon: Icon, colorClass, bgClass, loading }: StatCardProps) {
  return (
    <Card className="relative overflow-hidden border border-slate-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-slate-500">{title}</CardTitle>
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${bgClass}`}>
          <Icon className={`h-5 w-5 ${colorClass}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold tracking-tight text-slate-900">
          {loading ? (
            <span className="inline-block h-8 w-12 animate-pulse rounded bg-slate-200" />
          ) : (
            value
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function DashboardContent() {
  const [applications, setApplications] = useState<AdmissionApplication[]>([]);
  const [results, setResults] = useState<StudentResult[]>([]);
  const [admins, setAdmins] = useState<Principal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  useEffect(() => {
    const fetchData = async () => {
      if (!actor || isFetching || !identity) return;

      setIsLoading(true);
      try {
        const [apps, res, adminList] = await Promise.all([
          actor.getAllAdmissionApplications(),
          actor.getAllStudentResults(),
          actor.getAllAdmins(),
        ]);
        setApplications(apps);
        setResults(res);
        setAdmins(adminList);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [actor, isFetching, identity]);

  const pendingApps = applications.filter(
    (app) => app.status === ApplicationStatus.pending
  ).length;
  const approvedApps = applications.filter(
    (app) => app.status === ApplicationStatus.approved
  ).length;
  const rejectedApps = applications.filter(
    (app) => app.status === ApplicationStatus.rejected
  ).length;

  const recentApps = [...applications]
    .sort((a, b) => Number(b.timestamp - a.timestamp))
    .slice(0, 5);

  const stats: StatCardProps[] = [
    {
      title: "Total Applications",
      value: applications.length,
      icon: FileText,
      colorClass: "text-blue-600",
      bgClass: "bg-blue-100",
      loading: isLoading,
    },
    {
      title: "Pending",
      value: pendingApps,
      icon: Clock,
      colorClass: "text-amber-600",
      bgClass: "bg-amber-100",
      loading: isLoading,
    },
    {
      title: "Approved",
      value: approvedApps,
      icon: CheckCircle,
      colorClass: "text-green-600",
      bgClass: "bg-green-100",
      loading: isLoading,
    },
    {
      title: "Rejected",
      value: rejectedApps,
      icon: XCircle,
      colorClass: "text-red-600",
      bgClass: "bg-red-100",
      loading: isLoading,
    },
    {
      title: "Total Results",
      value: results.length,
      icon: TrendingUp,
      colorClass: "text-purple-600",
      bgClass: "bg-purple-100",
      loading: isLoading,
    },
    {
      title: "Total Admins",
      value: admins.length,
      icon: Users,
      colorClass: "text-indigo-600",
      bgClass: "bg-indigo-100",
      loading: isLoading,
    },
  ];

  const quickActions = [
    {
      label: "Manage Applications",
      description: "Review and process admission requests",
      href: "/admin/applications",
      icon: FileText,
      colorClass: "text-blue-600",
      bgClass: "bg-blue-100",
    },
    {
      label: "Upload Results",
      description: "Add new student examination results",
      href: "/admin/upload-results",
      icon: Upload,
      colorClass: "text-purple-600",
      bgClass: "bg-purple-100",
    },
    {
      label: "Manage Admins",
      description: "Add or remove admin access",
      href: "/admin/manage-admins",
      icon: Shield,
      colorClass: "text-indigo-600",
      bgClass: "bg-indigo-100",
    },
  ];

  return (
    <div className="p-6 lg:p-8">
      {/* Page header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
        <p className="mt-1 text-sm text-slate-500">
          Overview of school management system activity
        </p>
      </div>

      {/* Stats grid */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Applications table */}
        <div className="lg:col-span-2">
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold text-slate-900">
                  Recent Applications
                </CardTitle>
                <CardDescription className="text-sm text-slate-500">
                  Last 5 admission applications
                </CardDescription>
              </div>
              <Link to="/admin/applications">
                <Button variant="ghost" size="sm" className="gap-1 text-indigo-600 hover:text-indigo-700">
                  View all <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
                </div>
              ) : recentApps.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="mb-3 h-10 w-10 text-slate-300" />
                  <p className="text-sm text-slate-500">No applications yet</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="border-t border-slate-100 bg-slate-50/50">
                      <TableHead className="pl-6 text-xs font-medium text-slate-500">App ID</TableHead>
                      <TableHead className="text-xs font-medium text-slate-500">Student</TableHead>
                      <TableHead className="text-xs font-medium text-slate-500">Class</TableHead>
                      <TableHead className="text-xs font-medium text-slate-500">Status</TableHead>
                      <TableHead className="pr-6 text-right text-xs font-medium text-slate-500">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentApps.map((app) => (
                      <TableRow key={app.id} className="border-slate-100">
                        <TableCell className="pl-6 font-mono text-xs text-slate-500">
                          {formatApplicationId(app.id)}
                        </TableCell>
                        <TableCell className="font-medium text-slate-900">
                          {app.studentName}
                        </TableCell>
                        <TableCell className="text-sm text-slate-600">{app.className}</TableCell>
                        <TableCell>
                          <StatusBadge status={app.status} />
                        </TableCell>
                        <TableCell className="pr-6 text-right text-xs text-slate-500">
                          {formatDate(app.timestamp)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick actions */}
        <div>
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-slate-900">
                Quick Actions
              </CardTitle>
              <CardDescription className="text-sm text-slate-500">
                Frequently used shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link key={action.href} to={action.href}>
                    <div className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-100 p-3 transition-colors hover:bg-slate-50">
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${action.bgClass}`}>
                        <Icon className={`h-4.5 w-4.5 ${action.colorClass}`} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900">{action.label}</p>
                        <p className="truncate text-xs text-slate-500">{action.description}</p>
                      </div>
                      <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-slate-400" />
                    </div>
                  </Link>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <AdminProtect>
      <DashboardContent />
    </AdminProtect>
  );
}
