import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Palette,
  Trophy,
  Microscope,
  Calculator,
  Globe,
  Music,
  Computer,
  Award,
  CheckCircle2,
} from "lucide-react";

const programs = [
  {
    level: "Elementary",
    grades: "Grades K-5",
    description:
      "Building strong foundations in literacy, numeracy, and social-emotional learning through engaging, hands-on experiences.",
    highlights: [
      "Phonics-based reading instruction",
      "STEAM integration",
      "Character education",
      "Daily physical education",
      "Arts enrichment",
    ],
    icon: BookOpen,
    color: "from-primary/10 to-primary/5",
  },
  {
    level: "Middle School",
    grades: "Grades 6-8",
    description:
      "Preparing students for high school success with rigorous academics and exploratory electives that build independence.",
    highlights: [
      "Pre-Algebra & Algebra I",
      "World languages introduction",
      "Project-based learning",
      "Leadership opportunities",
      "Sports & clubs",
    ],
    icon: Calculator,
    color: "from-secondary/10 to-secondary/5",
  },
  {
    level: "High School",
    grades: "Grades 9-12",
    description:
      "College-preparatory curriculum with Advanced Placement courses, dual enrollment, and comprehensive college counseling.",
    highlights: [
      "20+ AP courses",
      "Honors track options",
      "College credit opportunities",
      "Career pathways",
      "SAT/ACT prep",
    ],
    icon: Award,
    color: "from-accent/10 to-accent/5",
  },
];

const specialPrograms = [
  {
    title: "STEM Excellence",
    description:
      "Cutting-edge science, technology, engineering, and mathematics curriculum with dedicated labs and robotics competitions.",
    icon: Microscope,
  },
  {
    title: "Arts Academy",
    description:
      "Comprehensive visual and performing arts programs including theater, choir, band, and studio art.",
    icon: Palette,
  },
  {
    title: "Athletics",
    description:
      "Competitive sports teams and physical education programs that promote teamwork, discipline, and wellness.",
    icon: Trophy,
  },
  {
    title: "World Languages",
    description:
      "Spanish, French, and Mandarin instruction with cultural immersion opportunities and exchange programs.",
    icon: Globe,
  },
  {
    title: "Music Program",
    description:
      "Award-winning band, orchestra, and choir with opportunities for private lessons and ensemble performance.",
    icon: Music,
  },
  {
    title: "Technology",
    description:
      "Computer science, coding, digital media, and emerging tech courses preparing students for the future.",
    icon: Computer,
  },
];

const apCourses = [
  "AP Calculus AB/BC",
  "AP Biology",
  "AP Chemistry",
  "AP Physics",
  "AP English Language",
  "AP English Literature",
  "AP US History",
  "AP World History",
  "AP Government",
  "AP Economics",
  "AP Psychology",
  "AP Computer Science A",
  "AP Statistics",
  "AP Environmental Science",
  "AP Spanish/French",
  "AP Art History",
];

export default function ProgramsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-accent/10 via-background to-primary/10 py-20 md:py-28">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4" variant="outline">
              Academic Programs
            </Badge>
            <h1 className="mb-6 font-serif text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Excellence in{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Every Subject
              </span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              From foundational skills to advanced coursework, our comprehensive curriculum
              challenges and inspires students at every level.
            </p>
          </div>
        </div>
      </section>

      {/* Core Programs */}
      <section className="container py-16 md:py-24">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">Core Programs</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Structured academic pathways from kindergarten through graduation
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <Card
                key={index}
                className="relative overflow-hidden shadow-soft transition-all hover:shadow-lifted"
              >
                <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 opacity-20">
                  <Icon className="h-full w-full text-primary" />
                </div>
                <CardHeader>
                  <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br ${program.color}`}>
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="font-serif text-2xl">{program.level}</CardTitle>
                  <CardDescription className="text-base">{program.grades}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">{program.description}</p>
                  <div className="space-y-2">
                    <div className="text-sm font-semibold">Program Highlights:</div>
                    <ul className="space-y-2">
                      {program.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                          <span className="text-muted-foreground">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Special Programs */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">
              Enrichment & Electives
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Specialized programs that allow students to explore interests and develop unique talents
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {specialPrograms.map((program, index) => {
              const Icon = program.icon;
              return (
                <Card
                  key={index}
                  className="group transition-all hover:shadow-lifted hover:-translate-y-1"
                >
                  <CardHeader>
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                      <Icon className="h-6 w-6 text-secondary" />
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {program.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{program.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Advanced Placement */}
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">
              Advanced Placement Program
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Earn college credit and challenge yourself with our extensive AP course offerings
            </p>
          </div>

          <Card className="shadow-soft">
            <CardHeader className="border-b bg-muted/30">
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Available AP Courses
              </CardTitle>
              <CardDescription>
                Over 20 Advanced Placement courses across all major subject areas
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {apCourses.map((course, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-md border bg-card p-3 text-sm"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                    <span>{course}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Curriculum Approach */}
      <section className="bg-gradient-to-br from-primary to-primary/80 py-16 text-primary-foreground md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 font-serif text-3xl font-bold md:text-4xl">
              Our Curriculum Approach
            </h2>
            <p className="mb-8 text-lg leading-relaxed opacity-95">
              We blend time-tested educational methods with innovative teaching strategies to
              create engaging, relevant learning experiences. Our curriculum is aligned with
              national standards while offering flexibility for personalized learning paths.
            </p>
            <div className="grid gap-6 text-left md:grid-cols-3">
              <div className="rounded-lg bg-primary-foreground/10 p-6 backdrop-blur">
                <h3 className="mb-2 font-serif text-xl font-semibold">Rigorous Standards</h3>
                <p className="text-sm opacity-90">
                  Aligned with state and national benchmarks for college readiness
                </p>
              </div>
              <div className="rounded-lg bg-primary-foreground/10 p-6 backdrop-blur">
                <h3 className="mb-2 font-serif text-xl font-semibold">Real-World Relevance</h3>
                <p className="text-sm opacity-90">
                  Connecting classroom learning to practical applications
                </p>
              </div>
              <div className="rounded-lg bg-primary-foreground/10 p-6 backdrop-blur">
                <h3 className="mb-2 font-serif text-xl font-semibold">Differentiated Instruction</h3>
                <p className="text-sm opacity-90">
                  Meeting students where they are and supporting growth
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
