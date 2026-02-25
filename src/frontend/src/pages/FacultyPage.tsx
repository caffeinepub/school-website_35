import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail } from "lucide-react";

const leadership = [
  {
    name: "Dr. Margaret Sullivan",
    title: "Head of School",
    initials: "MS",
    bio: "With over 25 years in education leadership, Dr. Sullivan brings a vision of innovation and excellence to Prestige Academy.",
    email: "m.sullivan@prestigeacademy.edu",
    color: "bg-primary",
  },
  {
    name: "James Rodriguez",
    title: "Assistant Head of School",
    initials: "JR",
    bio: "Mr. Rodriguez oversees curriculum development and ensures academic rigor across all grade levels.",
    email: "j.rodriguez@prestigeacademy.edu",
    color: "bg-secondary",
  },
  {
    name: "Dr. Linda Chen",
    title: "Director of Curriculum",
    initials: "LC",
    bio: "Dr. Chen leads our instructional design with a focus on student-centered learning and innovation.",
    email: "l.chen@prestigeacademy.edu",
    color: "bg-accent",
  },
];

const faculty = [
  {
    name: "Robert Thompson",
    title: "Mathematics Department Head",
    subject: "Mathematics",
    initials: "RT",
    bio: "Specializing in AP Calculus and competition math, inspiring students to love problem-solving.",
    color: "bg-chart-1",
  },
  {
    name: "Sarah Mitchell",
    title: "English Teacher",
    subject: "English",
    initials: "SM",
    bio: "Award-winning educator passionate about literature, creative writing, and critical analysis.",
    color: "bg-chart-2",
  },
  {
    name: "Dr. Michael Park",
    title: "Science Department Head",
    subject: "Science",
    initials: "MP",
    bio: "Ph.D. in Biology, bringing hands-on lab experiences and research opportunities to students.",
    color: "bg-chart-3",
  },
  {
    name: "Emily Washington",
    title: "History Teacher",
    subject: "Social Studies",
    initials: "EW",
    bio: "Making history come alive through engaging lessons and interactive projects.",
    color: "bg-chart-4",
  },
  {
    name: "Carlos Mendez",
    title: "World Languages Coordinator",
    subject: "Languages",
    initials: "CM",
    bio: "Fluent in four languages, passionate about cultural exchange and global awareness.",
    color: "bg-chart-5",
  },
  {
    name: "Jennifer Lee",
    title: "Art Teacher",
    subject: "Arts",
    initials: "JL",
    bio: "Professional artist and educator, nurturing creativity and artistic expression.",
    color: "bg-secondary",
  },
  {
    name: "David Brown",
    title: "Physical Education Director",
    subject: "Athletics",
    initials: "DB",
    bio: "Former collegiate athlete, coaching students in fitness, teamwork, and sportsmanship.",
    color: "bg-accent",
  },
  {
    name: "Dr. Amanda Foster",
    title: "School Counselor",
    subject: "Guidance",
    initials: "AF",
    bio: "Supporting student well-being, college planning, and social-emotional development.",
    color: "bg-primary",
  },
  {
    name: "Thomas Wright",
    title: "Music Director",
    subject: "Music",
    initials: "TW",
    bio: "Leading our award-winning band and choir programs with excellence and passion.",
    color: "bg-chart-1",
  },
  {
    name: "Rachel Green",
    title: "Technology Coordinator",
    subject: "Technology",
    initials: "RG",
    bio: "Teaching computer science and integrating technology across the curriculum.",
    color: "bg-chart-2",
  },
  {
    name: "Kevin O'Brien",
    title: "Elementary Coordinator",
    subject: "Elementary",
    initials: "KO",
    bio: "Creating joyful, engaging learning experiences for our youngest students.",
    color: "bg-chart-3",
  },
  {
    name: "Lisa Martinez",
    title: "Special Education Director",
    subject: "Special Education",
    initials: "LM",
    bio: "Ensuring every student receives the support and accommodations they need to thrive.",
    color: "bg-chart-4",
  },
];

export default function FacultyPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary/10 via-background to-accent/10 py-20 md:py-28">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4" variant="outline">
              Our Faculty
            </Badge>
            <h1 className="mb-6 font-serif text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Dedicated{" "}
              <span className="bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
                Educators
              </span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Meet the passionate professionals who make Prestige Academy exceptional. Our faculty
              combines deep subject expertise with a genuine commitment to student success.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="container py-16 md:py-24">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">Leadership Team</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Guiding our school with vision, integrity, and a passion for educational excellence
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {leadership.map((member, index) => (
            <Card
              key={index}
              className="group overflow-hidden shadow-soft transition-all hover:shadow-lifted"
            >
              <CardHeader className="border-b bg-muted/30 pb-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className={`mb-4 h-24 w-24 ${member.color} text-2xl text-white`}>
                    <AvatarFallback className={member.color}>{member.initials}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-serif text-xl font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.title}</p>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  {member.email}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Faculty Grid */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">Our Faculty</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Expert educators committed to inspiring and empowering every student
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {faculty.map((member, index) => (
              <Card
                key={index}
                className="group transition-all hover:shadow-lifted hover:-translate-y-1"
              >
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <Avatar className={`mb-4 h-20 w-20 ${member.color} text-xl text-white`}>
                    <AvatarFallback className={member.color}>{member.initials}</AvatarFallback>
                  </Avatar>
                  <h3 className="mb-1 font-serif text-lg font-semibold group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="mb-1 text-sm font-medium text-muted-foreground">{member.title}</p>
                  <Badge variant="secondary" className="mb-3 text-xs">
                    {member.subject}
                  </Badge>
                  <p className="text-xs leading-relaxed text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Stats */}
      <section className="container py-16 md:py-20">
        <Card className="overflow-hidden shadow-soft">
          <div className="bg-gradient-to-br from-primary to-primary/80 p-8 text-primary-foreground md:p-12">
            <h2 className="mb-8 text-center font-serif text-3xl font-bold md:text-4xl">
              Faculty Excellence
            </h2>
            <div className="grid gap-8 md:grid-cols-4">
              <div className="text-center">
                <div className="mb-2 font-serif text-4xl font-bold md:text-5xl">98%</div>
                <div className="text-sm opacity-90">Hold Advanced Degrees</div>
              </div>
              <div className="text-center">
                <div className="mb-2 font-serif text-4xl font-bold md:text-5xl">15+</div>
                <div className="text-sm opacity-90">Years Average Experience</div>
              </div>
              <div className="text-center">
                <div className="mb-2 font-serif text-4xl font-bold md:text-5xl">30+</div>
                <div className="text-sm opacity-90">National Board Certified</div>
              </div>
              <div className="text-center">
                <div className="mb-2 font-serif text-4xl font-bold md:text-5xl">120+</div>
                <div className="text-sm opacity-90">Dedicated Educators</div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Join Our Team */}
      <section className="bg-muted/30 py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">Join Our Team</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              We're always looking for passionate educators who share our commitment to excellence.
              If you're interested in joining Prestige Academy, we'd love to hear from you.
            </p>
            <a
              href="mailto:careers@prestigeacademy.edu"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Mail className="h-4 w-4" />
              Contact HR Department
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
