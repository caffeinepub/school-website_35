import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Clock, Award, Users, Music } from "lucide-react";

const newsItems = [
  {
    title: "Prestige Academy Students Win State Science Fair",
    date: "February 15, 2026",
    category: "Achievement",
    icon: Award,
    description:
      "Three of our students took top honors at the state science fair with innovative projects in renewable energy, marine biology, and robotics.",
    image: "/assets/placeholder-news-1.jpg",
  },
  {
    title: "New STEM Lab Opening This Spring",
    date: "February 10, 2026",
    category: "Campus News",
    icon: Award,
    description:
      "Our state-of-the-art STEM facility will feature cutting-edge equipment, maker spaces, and collaborative learning areas opening in April 2026.",
    image: "/assets/placeholder-news-2.jpg",
  },
  {
    title: "Drama Department Presents Spring Musical",
    date: "February 5, 2026",
    category: "Arts",
    icon: Music,
    description:
      "Join us for performances of 'Into the Woods' March 15-17. Tickets available now through the school box office.",
    image: "/assets/placeholder-news-3.jpg",
  },
  {
    title: "College Signing Day Celebrates Senior Achievements",
    date: "January 28, 2026",
    category: "Achievement",
    icon: Award,
    description:
      "Our Class of 2026 celebrates acceptance to prestigious universities including Ivy League schools, Stanford, MIT, and more.",
    image: "/assets/placeholder-news-4.jpg",
  },
  {
    title: "Community Service Day Makes Impact",
    date: "January 20, 2026",
    category: "Community",
    icon: Users,
    description:
      "Over 500 students participated in local service projects, contributing more than 2,000 hours to our community.",
    image: "/assets/placeholder-news-5.jpg",
  },
  {
    title: "Basketball Team Advances to Regional Finals",
    date: "January 15, 2026",
    category: "Athletics",
    icon: Award,
    description:
      "Our varsity basketball team secured a thrilling victory to advance to the regional championship game.",
    image: "/assets/placeholder-news-6.jpg",
  },
];

const upcomingEvents = [
  {
    title: "Spring Open House",
    date: "March 5, 2026",
    time: "6:00 PM - 8:00 PM",
    location: "Main Campus",
    description: "Explore our campus, meet faculty, and learn about our programs.",
    category: "Admissions",
  },
  {
    title: "Parent-Teacher Conferences",
    date: "March 12-13, 2026",
    time: "3:00 PM - 7:00 PM",
    location: "Individual Classrooms",
    description: "Schedule available through the parent portal.",
    category: "Academic",
  },
  {
    title: "Spring Musical: Into the Woods",
    date: "March 15-17, 2026",
    time: "7:00 PM",
    location: "Performing Arts Center",
    description: "Evening performances of our spring musical production.",
    category: "Arts",
  },
  {
    title: "STEM Fair",
    date: "March 22, 2026",
    time: "9:00 AM - 3:00 PM",
    location: "Gymnasium",
    description: "Student science and technology project showcase.",
    category: "Academic",
  },
  {
    title: "Spring Break",
    date: "March 25 - April 2, 2026",
    time: "All Day",
    location: "Campus Closed",
    description: "No classes. School resumes April 3rd.",
    category: "Holiday",
  },
  {
    title: "College Night",
    date: "April 10, 2026",
    time: "6:30 PM - 8:30 PM",
    location: "Auditorium",
    description: "Representatives from 50+ colleges and universities.",
    category: "College",
  },
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Achievement":
    case "Athletics":
      return "bg-success/10 text-success hover:bg-success/20";
    case "Arts":
    case "Community":
      return "bg-secondary/10 text-secondary hover:bg-secondary/20";
    case "Admissions":
    case "College":
      return "bg-primary/10 text-primary hover:bg-primary/20";
    case "Academic":
      return "bg-accent/10 text-accent hover:bg-accent/20";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export default function NewsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-accent/10 via-background to-secondary/10 py-20 md:py-28">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4" variant="outline">
              News & Events
            </Badge>
            <h1 className="mb-6 font-serif text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Stay{" "}
              <span className="bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
                Connected
              </span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Keep up with the latest happenings, achievements, and upcoming events at Prestige
              Academy
            </p>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="container py-16 md:py-24">
        <div className="mb-12">
          <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">Latest News</h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Celebrating student achievements and sharing important school updates
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={index}
                className="group overflow-hidden transition-all hover:shadow-lifted hover:-translate-y-1"
              >
                {/* Image Placeholder */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon className="h-16 w-16 text-primary/40" />
                  </div>
                </div>

                <CardHeader>
                  <div className="mb-2 flex items-center justify-between">
                    <Badge className={getCategoryColor(item.category)} variant="secondary">
                      {item.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                  </div>
                  <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="line-clamp-3 text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="mb-12">
            <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">Upcoming Events</h2>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Mark your calendar for these important dates and community gatherings
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {upcomingEvents.map((event, index) => (
              <Card
                key={index}
                className="transition-all hover:shadow-lifted"
              >
                <CardHeader>
                  <div className="mb-2 flex items-start justify-between gap-4">
                    <CardTitle className="flex-1">{event.title}</CardTitle>
                    <Badge className={getCategoryColor(event.category)} variant="secondary">
                      {event.category}
                    </Badge>
                  </div>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4 shrink-0 text-primary" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4 shrink-0 text-primary" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 shrink-0 text-primary" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="container py-16 md:py-20">
        <Card className="overflow-hidden shadow-soft">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 text-center md:p-12">
            <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">
              Stay in the Loop
            </h2>
            <p className="mb-6 text-lg text-muted-foreground">
              Subscribe to our newsletter for weekly updates on school news, events, and achievements
            </p>
            <p className="text-sm text-muted-foreground">
              Contact the school office at{" "}
              <a href="mailto:info@prestigeacademy.edu" className="font-medium text-primary hover:underline">
                info@prestigeacademy.edu
              </a>{" "}
              to be added to our mailing list.
            </p>
          </div>
        </Card>
      </section>
    </div>
  );
}
