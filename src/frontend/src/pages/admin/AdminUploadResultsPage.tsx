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
  subject: string;
  marks: string;
};

export default function AdminUploadResultsPage() {
  const [rollNumber, setRollNumber] = useState("");
  const [studentName, setStudentName] = useState("");
  const [className, setClassName] = useState("");
  const [subjects, setSubjects] = useState<SubjectInput[]>([
    { subject: "", marks: "" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { actor, isFetching } = useActor();

  const addSubject = () => {
    setSubjects([...subjects, { subject: "", marks: "" }]);
  };

  const removeSubject = (index: number) => {
    if (subjects.length === 1) {
      toast.error("At least one subject is required");
      return;
    }
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const updateSubject = (index: number, field: "subject" | "marks", value: string) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
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
      setSubjects([{ subject: "", marks: "" }]);
    } catch (error) {
      console.error("Error uploading result:", error);
      toast.error("Failed to upload result. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminProtect>
      <div className="container py-12 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <h1 className="mb-2 font-serif text-4xl font-bold text-primary">
              Upload Results
            </h1>
            <p className="text-muted-foreground">
              Upload individual student examination results
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                Student Result Form
              </CardTitle>
              <CardDescription>
                Enter student details and subject-wise marks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="rollNumber">
                      Roll Number <span className="text-destructive">*</span>
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
                    <Label htmlFor="studentName">
                      Student Name <span className="text-destructive">*</span>
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
                    <Label htmlFor="className">
                      Class <span className="text-destructive">*</span>
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
                    <Label className="text-base">
                      Subjects & Marks <span className="text-destructive">*</span>
                    </Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addSubject}
                      disabled={isSubmitting}
                    >
                      <Plus className="mr-1 h-4 w-4" />
                      Add Subject
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {subjects.map((subject, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="flex-1">
                          <Input
                            placeholder="Subject name"
                            value={subject.subject}
                            onChange={(e) =>
                              updateSubject(index, "subject", e.target.value)
                            }
                            disabled={isSubmitting}
                          />
                        </div>
                        <div className="w-32">
                          <Input
                            type="number"
                            placeholder="Marks"
                            value={subject.marks}
                            onChange={(e) =>
                              updateSubject(index, "marks", e.target.value)
                            }
                            disabled={isSubmitting}
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSubject(index)}
                          disabled={isSubmitting || subjects.length === 1}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Total marks and percentage will be calculated automatically
                  </p>
                </div>

                <div className="flex justify-end gap-3 border-t pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setRollNumber("");
                      setStudentName("");
                      setClassName("");
                      setSubjects([{ subject: "", marks: "" }]);
                    }}
                    disabled={isSubmitting}
                  >
                    Reset
                  </Button>
                  <Button type="submit" disabled={isSubmitting || isFetching}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isSubmitting ? "Uploading..." : "Upload Result"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminProtect>
  );
}
