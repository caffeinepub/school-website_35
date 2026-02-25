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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, CheckCircle2, User, Phone, BookOpen, Upload } from "lucide-react";

const classes = [
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
];

type FormData = {
  studentName: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  mobile: string;
  address: string;
  email: string;
  previousSchool: string;
  className: string;
  photoUrl: string;
  certificatesUrl: string;
  marksheetUrl: string;
};

const initialFormData: FormData = {
  studentName: "",
  fatherName: "",
  motherName: "",
  dateOfBirth: "",
  mobile: "",
  address: "",
  email: "",
  previousSchool: "",
  className: "",
  photoUrl: "",
  certificatesUrl: "",
  marksheetUrl: "",
};

export default function ApplyAdmissionPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { actor, isFetching } = useActor();

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (stepNum: number): boolean => {
    switch (stepNum) {
      case 1:
        if (!formData.studentName || !formData.fatherName || !formData.motherName || !formData.dateOfBirth) {
          toast.error("Please fill in all personal details");
          return false;
        }
        break;
      case 2:
        if (!formData.mobile || !formData.address || !formData.email) {
          toast.error("Please fill in all contact details");
          return false;
        }
        // Simple email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          toast.error("Please enter a valid email address");
          return false;
        }
        // Simple mobile validation (10 digits)
        if (!/^\d{10}$/.test(formData.mobile)) {
          toast.error("Please enter a valid 10-digit mobile number");
          return false;
        }
        break;
      case 3:
        if (!formData.previousSchool || !formData.className) {
          toast.error("Please fill in all academic details");
          return false;
        }
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (!actor) {
      toast.error("Backend not available. Please try again.");
      return;
    }

    setIsSubmitting(true);

    try {
      const documentUrls = [
        formData.photoUrl,
        formData.certificatesUrl,
        formData.marksheetUrl,
      ].filter(Boolean);

      await actor.submitAdmissionApplication(
        formData.studentName,
        formData.fatherName,
        formData.motherName,
        formData.dateOfBirth,
        formData.mobile,
        formData.address,
        formData.email,
        formData.previousSchool,
        formData.className,
        documentUrls
      );

      setIsSuccess(true);
      toast.success("Application submitted successfully!");
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="container py-12 md:py-20">
        <div className="mx-auto max-w-2xl">
          <Card className="border-success/30 bg-success/5">
            <CardContent className="flex flex-col items-center gap-6 py-12 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/20">
                <CheckCircle2 className="h-10 w-10 text-success" />
              </div>
              <div className="space-y-2">
                <h2 className="font-serif text-3xl font-bold text-success">
                  Application Submitted!
                </h2>
                <p className="text-muted-foreground">
                  Your application has been successfully submitted to Brijesh Shikshan Sansthan Inter College.
                </p>
                <p className="text-lg font-semibold text-foreground">
                  Your application is under review.
                </p>
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={() => {
                    setIsSuccess(false);
                    setStep(1);
                    setFormData(initialFormData);
                  }}
                  variant="outline"
                >
                  Submit Another Application
                </Button>
                <Button onClick={() => window.location.href = "/"}>
                  Go to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12 md:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="mb-4 font-serif text-4xl font-bold text-primary md:text-5xl">
            Admission Application
          </h1>
          <p className="text-lg text-muted-foreground">
            Brijesh Shikshan Sansthan Inter College, Maidhan, Sultanpur
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8 flex items-center justify-center gap-2">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="flex items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold transition-colors ${
                  num === step
                    ? "border-primary bg-primary text-primary-foreground"
                    : num < step
                    ? "border-success bg-success text-success-foreground"
                    : "border-muted bg-muted text-muted-foreground"
                }`}
              >
                {num < step ? <CheckCircle2 className="h-5 w-5" /> : num}
              </div>
              {num < 4 && (
                <div
                  className={`h-1 w-12 transition-colors md:w-24 ${
                    num < step ? "bg-success" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {step === 1 && (
                <>
                  <User className="h-5 w-5 text-primary" />
                  Personal Details
                </>
              )}
              {step === 2 && (
                <>
                  <Phone className="h-5 w-5 text-primary" />
                  Contact Details
                </>
              )}
              {step === 3 && (
                <>
                  <BookOpen className="h-5 w-5 text-primary" />
                  Academic Details
                </>
              )}
              {step === 4 && (
                <>
                  <Upload className="h-5 w-5 text-primary" />
                  Documents
                </>
              )}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Enter student and parent information"}
              {step === 2 && "Provide contact information"}
              {step === 3 && "Previous education details"}
              {step === 4 && "Upload supporting documents (optional)"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Personal Details */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="studentName">
                    Student Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="studentName"
                    placeholder="Enter student's full name"
                    value={formData.studentName}
                    onChange={(e) => updateField("studentName", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fatherName">
                    Father's Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="fatherName"
                    placeholder="Enter father's full name"
                    value={formData.fatherName}
                    onChange={(e) => updateField("fatherName", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motherName">
                    Mother's Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="motherName"
                    placeholder="Enter mother's full name"
                    value={formData.motherName}
                    onChange={(e) => updateField("motherName", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">
                    Date of Birth <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => updateField("dateOfBirth", e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Contact Details */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mobile">
                    Mobile Number <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={formData.mobile}
                    onChange={(e) => updateField("mobile", e.target.value)}
                    maxLength={10}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">
                    Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="address"
                    placeholder="Full residential address"
                    value={formData.address}
                    onChange={(e) => updateField("address", e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Academic Details */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="previousSchool">
                    Previous School <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="previousSchool"
                    placeholder="Name of previous school"
                    value={formData.previousSchool}
                    onChange={(e) => updateField("previousSchool", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="className">
                    Class Applying For <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.className}
                    onValueChange={(value) => updateField("className", value)}
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
            )}

            {/* Step 4: Documents */}
            {step === 4 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Document uploads are optional. Please provide URLs to your documents if available.
                </p>

                <div className="space-y-2">
                  <Label htmlFor="photoUrl">Student Photo URL</Label>
                  <Input
                    id="photoUrl"
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    value={formData.photoUrl}
                    onChange={(e) => updateField("photoUrl", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certificatesUrl">Certificates URL</Label>
                  <Input
                    id="certificatesUrl"
                    type="url"
                    placeholder="https://example.com/certificates.pdf"
                    value={formData.certificatesUrl}
                    onChange={(e) => updateField("certificatesUrl", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="marksheetUrl">Previous Marksheet URL</Label>
                  <Input
                    id="marksheetUrl"
                    type="url"
                    placeholder="https://example.com/marksheet.pdf"
                    value={formData.marksheetUrl}
                    onChange={(e) => updateField("marksheetUrl", e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1 || isSubmitting}
              >
                Back
              </Button>

              {step < 4 ? (
                <Button onClick={handleNext} disabled={isFetching}>
                  Next
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting || isFetching}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
