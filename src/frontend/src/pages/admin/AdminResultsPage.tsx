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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Loader2, Eye, FileText, Trash2 } from "lucide-react";
import type { StudentResult } from "@/backend";

function ResultsContent() {
  const [results, setResults] = useState<StudentResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedResult, setSelectedResult] = useState<StudentResult | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [resultToDelete, setResultToDelete] = useState<StudentResult | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { actor, isFetching } = useActor();

  const fetchResults = useCallback(async () => {
    if (!actor || isFetching) return;

    setIsLoading(true);
    try {
      const allResults = await actor.getAllStudentResults();
      setResults(allResults.sort((a, b) => Number(b.timestamp - a.timestamp)));
    } catch (error) {
      console.error("Error fetching results:", error);
      toast.error("Failed to load results");
    } finally {
      setIsLoading(false);
    }
  }, [actor, isFetching]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  const viewDetails = (result: StudentResult) => {
    setSelectedResult(result);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (result: StudentResult) => {
    setResultToDelete(result);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!actor || !resultToDelete) return;

    setIsDeleting(true);
    try {
      await actor.deleteStudentResult(resultToDelete.rollNumber);
      toast.success("Result deleted successfully");
      await fetchResults();
      setDeleteDialogOpen(false);
      setResultToDelete(null);
      if (selectedResult?.rollNumber === resultToDelete.rollNumber) {
        setIsDialogOpen(false);
        setSelectedResult(null);
      }
    } catch (error) {
      console.error("Error deleting result:", error);
      toast.error("Failed to delete result");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-slate-400" />
          <p className="mt-3 text-sm text-slate-500">Loading results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Page header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Manage Results</h2>
        <p className="mt-1 text-sm text-slate-500">
          View and manage student examination results
        </p>
      </div>

      {results.length === 0 ? (
        <Card className="border border-slate-200">
          <CardContent className="flex flex-col items-center py-16 text-center">
            <FileText className="mb-4 h-12 w-12 text-slate-300" />
            <h3 className="mb-2 font-semibold text-slate-700">No Results Yet</h3>
            <p className="text-sm text-slate-500">
              Results will appear here once they are uploaded.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-slate-900">
              All Results ({results.length})
            </CardTitle>
            <CardDescription className="text-sm text-slate-500">
              Click view to see subject-wise marks
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-100 bg-slate-50/50">
                    <TableHead className="pl-6 text-xs font-medium text-slate-500">Roll Number</TableHead>
                    <TableHead className="text-xs font-medium text-slate-500">Student Name</TableHead>
                    <TableHead className="text-xs font-medium text-slate-500">Class</TableHead>
                    <TableHead className="text-xs font-medium text-slate-500">Total Marks</TableHead>
                    <TableHead className="text-xs font-medium text-slate-500">Percentage</TableHead>
                    <TableHead className="pr-6 text-right text-xs font-medium text-slate-500">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((result) => (
                    <TableRow key={result.rollNumber.toString()} className="border-slate-100">
                      <TableCell className="pl-6 font-mono text-xs text-slate-500">
                        {result.rollNumber.toString()}
                      </TableCell>
                      <TableCell className="font-medium text-slate-900">{result.studentName}</TableCell>
                      <TableCell className="text-sm text-slate-600">{result.className}</TableCell>
                      <TableCell className="text-sm text-slate-600">{result.totalMarks.toString()}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            Number(result.percentage) >= 75
                              ? "bg-green-100 text-green-700 hover:bg-green-100"
                              : Number(result.percentage) >= 60
                              ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                              : "bg-red-100 text-red-700 hover:bg-red-100"
                          }
                        >
                          {result.percentage.toString()}%
                        </Badge>
                      </TableCell>
                      <TableCell className="pr-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => viewDetails(result)}
                            className="text-slate-600"
                          >
                            <Eye className="mr-1 h-3.5 w-3.5" />
                            View
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteClick(result)}
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
      {selectedResult && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Result Details</DialogTitle>
              <DialogDescription>
                Roll Number: {selectedResult.rollNumber.toString()}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Student Information
                </h3>
                <div className="grid gap-3 rounded-lg bg-slate-50 p-4 md:grid-cols-2">
                  <div>
                    <p className="text-xs text-slate-500">Student Name</p>
                    <p className="font-medium text-slate-900">{selectedResult.studentName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Class</p>
                    <p className="font-medium text-slate-900">{selectedResult.className}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Roll Number</p>
                    <p className="font-mono font-medium text-slate-900">
                      {selectedResult.rollNumber.toString()}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Subject-wise Marks
                </h3>
                <div className="rounded-lg border border-slate-200">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50/50">
                        <TableHead className="text-xs font-medium text-slate-500">Subject</TableHead>
                        <TableHead className="text-right text-xs font-medium text-slate-500">Marks</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedResult.subjects.map((subject, idx) => (
                        <TableRow key={`${selectedResult.rollNumber}-${idx}`} className="border-slate-100">
                          <TableCell className="font-medium text-slate-900">{subject.subject}</TableCell>
                          <TableCell className="text-right font-mono text-slate-700">
                            {subject.marks.toString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Overall Performance
                </h3>
                <div className="grid gap-4 rounded-lg bg-slate-50 p-4 md:grid-cols-2">
                  <div>
                    <p className="text-xs text-slate-500">Total Marks</p>
                    <p className="font-mono text-2xl font-bold text-slate-900">
                      {selectedResult.totalMarks.toString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Percentage</p>
                    <p className="font-mono text-2xl font-bold text-slate-900">
                      {selectedResult.percentage.toString()}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end border-t pt-4">
                <Button
                  variant="outline"
                  onClick={() => handleDeleteClick(selectedResult)}
                  className="text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Result
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
            <AlertDialogTitle>Delete Result?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This result will be permanently removed.
              {resultToDelete && (
                <div className="mt-3 rounded-lg bg-slate-100 p-3">
                  <p className="text-xs"><strong>Roll Number:</strong> {resultToDelete.rollNumber.toString()}</p>
                  <p className="text-xs"><strong>Student:</strong> {resultToDelete.studentName}</p>
                  <p className="text-xs"><strong>Class:</strong> {resultToDelete.className}</p>
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

export default function AdminResultsPage() {
  return (
    <AdminProtect>
      <ResultsContent />
    </AdminProtect>
  );
}
