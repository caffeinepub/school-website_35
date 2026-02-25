import { useState } from "react";
import { useActor } from "@/hooks/useActor";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Loader2, Search, Award, FileText } from "lucide-react";
import type { StudentResult } from "@/backend";

export default function CheckResultPage() {
  const [rollNumber, setRollNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<StudentResult | null>(null);
  const [searched, setSearched] = useState(false);
  const { actor, isFetching } = useActor();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rollNumber) {
      toast.error("Please enter a roll number");
      return;
    }

    if (!actor) {
      toast.error("Backend not available. Please try again.");
      return;
    }

    setIsSearching(true);
    setSearched(true);
    setResult(null);

    try {
      const rollNum = BigInt(rollNumber);
      const foundResult = await actor.getStudentResult(rollNum);

      if (foundResult) {
        setResult(foundResult);
        toast.success("Result found!");
      } else {
        toast.error("No result found for this roll number");
      }
    } catch (error) {
      console.error("Error fetching result:", error);
      toast.error("Failed to fetch result. Please check the roll number.");
    } finally {
      setIsSearching(false);
    }
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1_000_000);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="container py-12 md:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="mb-4 font-serif text-4xl font-bold text-primary md:text-5xl">
            Check Your Result
          </h1>
          <p className="text-lg text-muted-foreground">
            Enter your roll number to view your examination results
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              Search by Roll Number
            </CardTitle>
            <CardDescription>
              Enter your roll number to retrieve your result
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="rollNumber">Roll Number</Label>
                <Input
                  id="rollNumber"
                  type="number"
                  placeholder="Enter your roll number"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  disabled={isSearching}
                />
              </div>
              <div className="flex items-end">
                <Button type="submit" disabled={isSearching || isFetching}>
                  {isSearching && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isSearching ? "Searching..." : "Check Result"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {searched && !result && !isSearching && (
          <Card className="border-destructive/30 bg-destructive/5">
            <CardContent className="py-12 text-center">
              <FileText className="mx-auto mb-4 h-16 w-16 text-destructive/40" />
              <h3 className="mb-2 font-serif text-xl font-semibold">No Result Found</h3>
              <p className="text-muted-foreground">
                No result found for roll number {rollNumber}. Please verify your roll number and
                try again.
              </p>
            </CardContent>
          </Card>
        )}

        {result && (
          <Card className="overflow-hidden border-success/30">
            <div className="bg-gradient-to-r from-primary to-accent p-8 text-center text-primary-foreground">
              <Award className="mx-auto mb-4 h-12 w-12" />
              <h2 className="mb-2 font-serif text-3xl font-bold">
                Brijesh Shikshan Sansthan Inter College
              </h2>
              <p className="text-sm opacity-90">Maidhan, Sultanpur</p>
              <p className="mt-4 text-lg font-semibold">Examination Result</p>
            </div>

            <CardContent className="p-8">
              <div className="mb-8 grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground">Student Name</p>
                  <p className="text-lg font-semibold">{result.studentName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Roll Number</p>
                  <p className="text-lg font-semibold">{result.rollNumber.toString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Class</p>
                  <p className="text-lg font-semibold">{result.className}</p>
                </div>
              </div>

              <div className="mb-8 overflow-hidden rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Subject</TableHead>
                      <TableHead className="text-right font-semibold">Marks Obtained</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {result.subjects.map((subject, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{subject.subject}</TableCell>
                        <TableCell className="text-right font-semibold">
                          {subject.marks.toString()}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-muted/30 font-semibold">
                      <TableCell>Total Marks</TableCell>
                      <TableCell className="text-right text-lg">
                        {result.totalMarks.toString()}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-success/10 p-6">
                <div>
                  <p className="text-sm text-muted-foreground">Percentage</p>
                  <p className="font-serif text-3xl font-bold text-success">
                    {result.percentage.toString()}%
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Result Published On</p>
                  <p className="font-semibold">{formatDate(result.timestamp)}</p>
                </div>
              </div>

              <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
                <p>
                  This is a computer-generated result. For any discrepancies, please contact the
                  school office.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
