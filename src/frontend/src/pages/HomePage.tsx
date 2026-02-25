import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Users,
  Award,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const quickLinks = [
  {
    title: "Academic Programs",
    description: "Explore our comprehensive curriculum from elementary to high school",
    icon: BookOpen,
    href: "/programs",
    color: "text-primary",
  },
  {
    title: "Meet Our Faculty",
    description: "Dedicated educators committed to student success",
    icon: Users,
    href: "/faculty",
    color: "text-secondary",
  },
  {
    title: "Admissions",
    description: "Start your journey with us. Learn about enrollment process",
    icon: Award,
    href: "/admissions",
    color: "text-accent",
  },
  {
    title: "News & Events",
    description: "Stay updated with the latest happenings at our school",
    icon: Calendar,
    href: "/news",
    color: "text-chart-4",
  },
];

const achievements = [
  "95% College Acceptance Rate",
  "National Merit Scholars",
  "State Championship Winners",
  "STEM Excellence Award",
];

const values = [
  {
    title: "Excellence",
    description: "Pursuing the highest standards in education",
  },
  {
    title: "Innovation",
    description: "Embracing modern teaching methodologies",
  },
  {
    title: "Community",
    description: "Building a supportive learning environment",
  },
  {
    title: "Integrity",
    description: "Fostering honesty and ethical behavior",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utb3BhY2l0eT0iMC4wNSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
        
        <div className="container relative py-24 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-4 bg-secondary/20 text-secondary hover:bg-secondary/30" variant="secondary">
              <Sparkles className="mr-1 h-3 w-3" />
              Where Excellence Meets Opportunity
            </Badge>
            
            <h1 className="mb-6 font-serif text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Prestige Academy
              </span>
            </h1>
            
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              A distinguished institution dedicated to nurturing young minds, fostering creativity,
              and building the leaders of tomorrow through excellence in education.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="group">
                <Link to="/admissions">
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>

            {/* Achievements */}
            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center gap-2 rounded-lg bg-card p-3 shadow-soft"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                  <span className="text-sm font-medium">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Diagonal Accent */}
        <div className="absolute bottom-0 left-0 h-24 w-full">
          <svg
            className="h-full w-full"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,0 L1440,60 L1440,120 L0,120 Z"
              className="fill-background"
            />
          </svg>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <div className="inline-block">
              <h2 className="mb-2 font-serif text-3xl font-bold md:text-4xl">Our Mission</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary" />
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground">
              To provide a nurturing and challenging educational environment where students develop
              intellectual curiosity, critical thinking skills, and a lifelong love of learning.
              We are committed to preparing students for success in college and beyond.
            </p>
          </div>

          <div className="space-y-6">
            <div className="inline-block">
              <h2 className="mb-2 font-serif text-3xl font-bold md:text-4xl">Our Vision</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-secondary to-accent" />
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground">
              To be recognized as a leading educational institution that empowers students to reach
              their full potential, embrace diversity, and become responsible global citizens who
              make meaningful contributions to society.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">
              Explore Prestige Academy
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Discover everything our school has to offer, from rigorous academics to vibrant
              extracurricular programs
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <Link key={index} to={link.href} className="group">
                  <Card className="h-full transition-all duration-300 hover:shadow-lifted hover:-translate-y-1">
                    <CardHeader>
                      <div
                        className={`mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${
                          index === 0
                            ? "from-primary/10 to-primary/5"
                            : index === 1
                            ? "from-secondary/10 to-secondary/5"
                            : index === 2
                            ? "from-accent/10 to-accent/5"
                            : "from-chart-4/10 to-chart-4/5"
                        }`}
                      >
                        <Icon className={`h-6 w-6 ${link.color}`} />
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {link.title}
                      </CardTitle>
                      <CardDescription>{link.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <span className="inline-flex items-center text-sm font-medium text-primary">
                        Learn More
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="container py-16 md:py-24">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">Our Core Values</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            The principles that guide everything we do at Prestige Academy
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <div
              key={index}
              className="relative rounded-lg border bg-card p-6 shadow-soft transition-shadow hover:shadow-lifted"
            >
              <div className="absolute left-6 top-0 h-1 w-16 bg-gradient-to-r from-secondary to-accent" />
              <h3 className="mb-2 mt-2 font-serif text-xl font-semibold">{value.title}</h3>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-primary py-16 text-primary-foreground md:py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImRvdHMiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9ImN1cnJlbnRDb2xvciIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZG90cykiLz48L3N2Zz4=')] opacity-50" />
        
        <div className="container relative text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">
            Ready to Join Our Community?
          </h2>
          <p className="mb-8 text-lg opacity-90">
            Schedule a campus tour or learn about our admissions process today
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="group">
              <Link to="/contact">
                Schedule a Tour
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Link to="/admissions">View Admissions Info</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
