import { useState } from "react";
import { useActor } from "@/hooks/useActor";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Upload } from "lucide-react";
import type { SubjectMark } from "@/backend";

const classes = [
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
];

type SubjectInput = {
  id: string;
  subject: string;
  marks: string;
};

let subjectCounter = 0;
function generateSubjectId() {
  subjectCounter += 1;
  return `subject-${subjectCounter}`;
}

function UploadResultsContent() {
  const [rollNumber, setRollNumber] = useState("");
  const [studentName, setStudentName] = useState("");
  const [className, setClassName] = useState("");
  const [subjects, setSubjects] = useState<SubjectInput[]>([
    { id: generateSubjectId(), subject: "", marks: "" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { actor, isFetching } = useActor();

  const addSubject = () => {
    setSubjects((prev) => [...prev, { id: generateSubjectId(), subject: "", marks: "" }]);
  };

  const removeSubject = (id: string) => {
    if (subjects.length === 1) {
      toast.error("At least one subject is required");
      return;
    }
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  const updateSubject = (id: string, field: "subject" | "marks", value: string) => {
    setSubjects((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const validateForm = (): boolean => {
    if (!rollNumber || !studentName || !className) {
      toast.error("Please fill in all required fields");
      return false;
    }

    if (!/^\d+$/.test(rollNumber)) {
      toast.error("Roll number must be a valid number");
      return false;
    }

    for (const sub of subjects) {
      if (!sub.subject || !sub.marks) {
        toast.error("All subject fields must be filled");
        return false;
      }
      if (!/^\d+$/.test(sub.marks)) {
        toast.error("Marks must be valid numbers");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!actor) {
      toast.error("Backend not available. Please try again.");
      return;
    }

    setIsSubmitting(true);

    try {
      const subjectMarks: SubjectMark[] = subjects.map((sub) => ({
        subject: sub.subject,
        marks: BigInt(sub.marks),
      }));

      await actor.submitStudentResult(
        BigInt(rollNumber),
        studentName,
        className,
        subjectMarks
      );

      toast.success("Result uploaded successfully!");

      setRollNumber("");
      setStudentName("");
      setClassName("");
      setSubjects([{ id: generateSubjectId(), subject: "", marks: "" }]);
    } catch (error) {
      console.error("Error uploading result:", error);
      toast.error("Failed to upload result. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setRollNumber("");
    setStudentName("");
    setClassName("");
    setSubjects([{ id: generateSubjectId(), subject: "", marks: "" }]);
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Page header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Upload Results</h2>
        <p className="mt-1 text-sm text-slate-500">
          Upload individual student examination results
        </p>
      </div>

      <div className="mx-auto max-w-2xl">
        <Card className="border border-slate-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100">
                <Upload className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold text-slate-900">
                  Student Result Form
                </CardTitle>
                <CardDescription className="text-sm text-slate-500">
                  Enter student details and subject-wise marks
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="rollNumber" className="text-sm font-medium text-slate-700">
                    Roll Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="rollNumber"
                    type="number"
                    placeholder="Enter student roll number"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="studentName" className="text-sm font-medium text-slate-700">
                    Student Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="studentName"
                    placeholder="Enter student full name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="className" className="text-sm font-medium text-slate-700">
                    Class <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={className}
                    onValueChange={setClassName}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger id="className">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((cls) => (
                        <SelectItem key={cls} value={cls}>
                          {cls}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="mb-4 flex items-center justify-between">
                  <Label className="text-sm font-medium text-slate-700">
                    Subjects &amp; Marks <span className="text-red-500">*</span>
                  </Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addSubject}
                    disabled={isSubmitting}
                    className="text-slate-600"
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Add Subject
                  </Button>
                </div>

                <div className="space-y-3">
                  {subjects.map((subject) => (
                    <div key={subject.id} className="flex gap-3">
                      <div className="flex-1">
                        <Input
                          placeholder="Subject name"
                          value={subject.subject}
                          onChange={(e) =>
                            updateSubject(subject.id, "subject", e.target.value)
                          }
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="w-28">
                        <Input
                          type="number"
                          placeholder="Marks"
                          value={subject.marks}
                          onChange={(e) =>
                            updateSubject(subject.id, "marks", e.target.value)
                          }
                          disabled={isSubmitting}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSubject(subject.id)}
                        disabled={isSubmitting || subjects.length === 1}
                        className="text-slate-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-40"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  Total marks and percentage will be calculated automatically.
                </p>
              </div>

              <div className="flex justify-end gap-3 border-t pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  disabled={isSubmitting}
                  className="text-slate-600"
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || isFetching}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isSubmitting ? "Uploading..." : "Upload Result"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function AdminUploadResultsPage() {
  return (
    <AdminProtect>
      <UploadResultsContent />
    </AdminProtect>
  );
}
