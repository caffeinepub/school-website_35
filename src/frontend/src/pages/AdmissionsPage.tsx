import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  UserCheck,
  Calendar,
  CheckCircle2,
  ArrowRight,
  DollarSign,
  Phone,
} from "lucide-react";

const admissionSteps = [
  {
    step: 1,
    title: "Submit Inquiry",
    description: "Complete our online inquiry form or contact our admissions office to express your interest.",
    icon: FileText,
  },
  {
    step: 2,
    title: "Schedule Tour",
    description: "Visit our campus to experience our facilities and meet our community firsthand.",
    icon: Calendar,
  },
  {
    step: 3,
    title: "Complete Application",
    description: "Submit application form with student records, recommendations, and required documents.",
    icon: FileText,
  },
  {
    step: 4,
    title: "Assessment & Interview",
    description: "Students participate in age-appropriate assessment and family interview.",
    icon: UserCheck,
  },
  {
    step: 5,
    title: "Admission Decision",
    description: "Receive notification of admission decision and enrollment materials.",
    icon: CheckCircle2,
  },
];

const requirements = [
  "Completed application form",
  "Birth certificate or proof of age",
  "Previous school records and transcripts",
  "Immunization records",
  "Two teacher recommendations",
  "Student essay (grades 6-12)",
  "Assessment results (placement testing)",
  "Application fee: $100",
];

const importantDates = [
  { event: "Application Opens", date: "September 1, 2026" },
  { event: "Campus Tours Begin", date: "October 15, 2026" },
  { event: "Application Deadline (Priority)", date: "January 15, 2027" },
  { event: "Assessment Period", date: "January - February 2027" },
  { event: "Admission Decisions Released", date: "March 1, 2027" },
  { event: "Enrollment Deadline", date: "April 15, 2027" },
];

const financialAid = [
  {
    title: "Merit Scholarships",
    description: "Academic excellence awards for outstanding students, ranging from 25% to full tuition.",
  },
  {
    title: "Need-Based Aid",
    description: "Financial assistance based on demonstrated need, available for qualifying families.",
  },
  {
    title: "Payment Plans",
    description: "Flexible monthly payment options to make tuition more manageable.",
  },
  {
    title: "Sibling Discount",
    description: "10% tuition reduction for each additional sibling enrolled.",
  },
];

export default function AdmissionsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 md:py-28">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4" variant="outline">
              Admissions
            </Badge>
            <h1 className="mb-6 font-serif text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Begin Your{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Journey Here
              </span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              We welcome families who value academic excellence and share our commitment to
              developing well-rounded, confident, and compassionate students.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="group">
                <Link to="/contact">
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Schedule a Tour</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="container py-16 md:py-24">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">Admission Process</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A straightforward, supportive process designed to help us get to know your family
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          {/* Connection line */}
          <div className="absolute left-8 top-12 hidden h-[calc(100%-6rem)] w-0.5 bg-gradient-to-b from-primary via-secondary to-accent md:block lg:left-1/2" />

          <div className="space-y-8">
            {admissionSteps.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={index}
                  className={`relative flex items-start gap-6 ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Step number badge */}
                  <div className="absolute left-8 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border-4 border-background bg-primary text-primary-foreground shadow-soft lg:left-1/2">
                    <span className="text-xl font-bold">{item.step}</span>
                  </div>

                  {/* Content */}
                  <div className={`w-full pl-20 lg:w-1/2 lg:pl-0 ${isEven ? "lg:pr-12 lg:text-right" : "lg:pl-12"}`}>
                    <Card className="shadow-soft transition-all hover:shadow-lifted">
                      <CardHeader>
                        <div className={`mb-2 flex items-center gap-2 ${isEven ? "lg:flex-row-reverse lg:justify-end" : ""}`}>
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                        </div>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden w-1/2 lg:block" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Application Requirements */}
            <div>
              <h2 className="mb-6 font-serif text-3xl font-bold">Application Requirements</h2>
              <Card className="shadow-soft">
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    {requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Important Dates */}
            <div>
              <h2 className="mb-6 font-serif text-3xl font-bold">Important Dates</h2>
              <Card className="shadow-soft">
                <CardContent className="pt-6">
                  <ul className="space-y-4">
                    {importantDates.map((item, index) => (
                      <li key={index} className="flex items-start justify-between gap-4 border-b pb-4 last:border-0 last:pb-0">
                        <span className="font-medium">{item.event}</span>
                        <span className="shrink-0 text-sm text-muted-foreground">{item.date}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Tuition & Financial Aid */}
      <section className="container py-16 md:py-24">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">
            Tuition & Financial Aid
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            We believe a Prestige Academy education should be accessible to qualified students from
            all backgrounds
          </p>
        </div>

        {/* Tuition Overview */}
        <Card className="mb-8 overflow-hidden shadow-soft">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <DollarSign className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-semibold">Annual Tuition</h3>
                <p className="text-muted-foreground">For the 2026-2027 academic year</p>
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-background p-4">
                <div className="mb-1 text-sm text-muted-foreground">Elementary (K-5)</div>
                <div className="font-serif text-2xl font-bold text-primary">$18,500</div>
              </div>
              <div className="rounded-lg bg-background p-4">
                <div className="mb-1 text-sm text-muted-foreground">Middle School (6-8)</div>
                <div className="font-serif text-2xl font-bold text-primary">$22,000</div>
              </div>
              <div className="rounded-lg bg-background p-4">
                <div className="mb-1 text-sm text-muted-foreground">High School (9-12)</div>
                <div className="font-serif text-2xl font-bold text-primary">$25,500</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Financial Aid Options */}
        <div className="grid gap-6 md:grid-cols-2">
          {financialAid.map((option, index) => (
            <Card key={index} className="transition-all hover:shadow-lifted">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                  {option.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 rounded-lg border bg-accent/5 p-6 text-center">
          <p className="text-muted-foreground">
            Over <span className="font-semibold text-foreground">40% of our families</span> receive
            some form of financial assistance. We encourage all qualified families to apply.
          </p>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-gradient-to-br from-primary to-primary/80 py-16 text-primary-foreground md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">
              Questions About Admissions?
            </h2>
            <p className="mb-8 text-lg opacity-90">
              Our admissions team is here to help guide you through every step of the process
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="tel:+15551234567"
                className="inline-flex items-center gap-2 rounded-lg bg-primary-foreground px-6 py-3 font-medium text-primary transition-colors hover:bg-primary-foreground/90"
              >
                <Phone className="h-4 w-4" />
                (555) 123-4567
              </a>
              <Button asChild variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link to="/contact">Contact Admissions Office</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
