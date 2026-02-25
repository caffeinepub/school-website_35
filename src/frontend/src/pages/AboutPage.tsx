import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Target, Heart, TrendingUp, Globe } from "lucide-react";

const stats = [
  { label: "Years of Excellence", value: "50+" },
  { label: "Dedicated Faculty", value: "120+" },
  { label: "Student Enrollment", value: "1,500+" },
  { label: "College Acceptance", value: "95%" },
];

const history = [
  {
    year: "1975",
    title: "Foundation",
    description: "Prestige Academy was founded with a vision to provide exceptional education.",
  },
  {
    year: "1990",
    title: "Expansion",
    description: "Added state-of-the-art science labs and expanded athletics programs.",
  },
  {
    year: "2005",
    title: "Innovation",
    description: "Introduced advanced technology integration and STEM focus.",
  },
  {
    year: "2020",
    title: "Modern Era",
    description: "Launched hybrid learning platforms and sustainability initiatives.",
  },
];

const philosophies = [
  {
    title: "Student-Centered Learning",
    description:
      "We believe every student learns differently. Our approach tailors instruction to individual needs, fostering confidence and academic growth.",
    icon: Users,
  },
  {
    title: "Critical Thinking",
    description:
      "Beyond memorization, we cultivate analytical skills and creative problem-solving abilities that serve students throughout their lives.",
    icon: BookOpen,
  },
  {
    title: "Character Development",
    description:
      "Academic excellence goes hand-in-hand with integrity, empathy, and leadership. We nurture well-rounded individuals.",
    icon: Heart,
  },
  {
    title: "Global Perspective",
    description:
      "In an interconnected world, we prepare students to think globally, embrace diversity, and become engaged citizens.",
    icon: Globe,
  },
  {
    title: "Continuous Growth",
    description:
      "We instill a love of learning that extends beyond the classroom, encouraging curiosity and lifelong intellectual development.",
    icon: TrendingUp,
  },
  {
    title: "Purpose-Driven Education",
    description:
      "Every student discovers their unique talents and passions, guided toward meaningful goals and future success.",
    icon: Target,
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 md:py-28">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4" variant="outline">
              About Us
            </Badge>
            <h1 className="mb-6 font-serif text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Shaping Minds,{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Building Futures
              </span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              For over five decades, Prestige Academy has been a beacon of educational excellence,
              nurturing generations of students to become confident, capable, and compassionate
              leaders.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b bg-muted/30 py-12">
        <div className="container">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-2 font-serif text-4xl font-bold text-primary md:text-5xl">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="container py-16 md:py-24">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">Our Journey</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A legacy of educational excellence spanning half a century
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-primary via-secondary to-accent md:left-1/2" />

          <div className="space-y-12">
            {history.map((item, index) => (
              <div
                key={index}
                className={`relative flex items-start gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Year badge */}
                <div className="absolute left-8 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border-4 border-background bg-primary text-primary-foreground shadow-soft md:left-1/2">
                  <span className="text-sm font-bold">{item.year}</span>
                </div>

                {/* Content */}
                <div className={`w-full pl-24 md:w-1/2 md:pl-0 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <Card className="shadow-soft">
                    <CardContent className="p-6">
                      <h3 className="mb-2 font-serif text-xl font-semibold">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden w-1/2 md:block" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Philosophy */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">
              Our Educational Philosophy
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              The principles that guide our approach to teaching and learning
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {philosophies.map((philosophy, index) => {
              const Icon = philosophy.icon;
              return (
                <div
                  key={index}
                  className="group relative rounded-lg border bg-card p-8 shadow-soft transition-all hover:shadow-lifted"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 transition-all group-hover:from-primary/20 group-hover:to-secondary/20">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-3 font-serif text-2xl font-semibold">{philosophy.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{philosophy.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 py-16 text-primary-foreground md:py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />
        
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 font-serif text-3xl font-bold md:text-4xl">Our Commitment</h2>
            <p className="mb-6 text-lg leading-relaxed opacity-95">
              We are committed to providing a safe, inclusive, and inspiring environment where
              every student can discover their passions, develop their talents, and achieve their
              full potential. Through rigorous academics, innovative programs, and strong community
              partnerships, we prepare our students not just for college, but for life.
            </p>
            <p className="text-lg font-medium">
              "Education is not the filling of a pail, but the lighting of a fire." — W.B. Yeats
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
