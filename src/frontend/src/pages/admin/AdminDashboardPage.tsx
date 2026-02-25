import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useActor } from "@/hooks/useActor";
import AdminProtect from "@/components/AdminProtect";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Users, Upload, TrendingUp } from "lucide-react";
import type { AdmissionApplication, StudentResult } from "@/backend";

export default function AdminDashboardPage() {
  const [applications, setApplications] = useState<AdmissionApplication[]>([]);
  const [results, setResults] = useState<StudentResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { actor, isFetching } = useActor();

  useEffect(() => {
    const fetchData = async () => {
      if (!actor || isFetching) return;

      setIsLoading(true);
      try {
        const [apps, res] = await Promise.all([
          actor.getAllAdmissionApplications(),
          actor.getAllStudentResults(),
        ]);
        setApplications(apps);
        setResults(res);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [actor, isFetching]);

  const pendingApps = applications.filter((app) => app.status === "pending").length;

  const stats = [
    {
      title: "Total Applications",
      value: applications.length,
      icon: FileText,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Pending Applications",
      value: pendingApps,
      icon: Users,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      title: "Total Results",
      value: results.length,
      icon: TrendingUp,
      color: "text-success",
      bgColor: "bg-success/10",
    },
  ];

  const quickActions = [
    {
      title: "View Applications",
      description: "Review and manage admission applications",
      href: "/admin/applications",
      icon: FileText,
      color: "text-primary",
    },
    {
      title: "Upload Results",
      description: "Upload student examination results",
      href: "/admin/upload-results",
      icon: Upload,
      color: "text-accent",
    },
  ];

  return (
    <AdminProtect>
      <div className="container py-12 md:py-20">
        <div className="mb-8">
          <h1 className="mb-2 font-serif text-4xl font-bold text-primary">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Brijesh Shikshan Sansthan Inter College
          </p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="font-serif text-3xl font-bold">
                    {isLoading ? "..." : stat.value}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div>
          <h2 className="mb-4 font-serif text-2xl font-semibold">Quick Actions</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Card key={action.title} className="transition-shadow hover:shadow-md">
                  <CardHeader>
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className={`h-6 w-6 ${action.color}`} />
                    </div>
                    <CardTitle>{action.title}</CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link to={action.href}>
                      <Button className="w-full">Open</Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </AdminProtect>
  );
}
