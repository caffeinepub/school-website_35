import { useState } from "react";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock, Loader2 } from "lucide-react";
import { useActor } from "@/hooks/useActor";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    content: ["123 Education Lane", "Springfield, ST 12345"],
  },
  {
    icon: Phone,
    title: "Call Us",
    content: ["Main Office: (555) 123-4567", "Admissions: (555) 123-4568"],
  },
  {
    icon: Mail,
    title: "Email Us",
    content: ["info@prestigeacademy.edu", "admissions@prestigeacademy.edu"],
  },
  {
    icon: Clock,
    title: "Office Hours",
    content: ["Monday - Friday: 8:00 AM - 4:00 PM", "Closed on weekends and holidays"],
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { actor, isFetching } = useActor();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    if (!actor) {
      toast.error("Unable to connect to backend. Please try again.");
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionId = await actor.submitContactForm(
        data.name,
        data.email,
        data.phone,
        data.message
      );

      toast.success("Message sent successfully!", {
        description: "We'll get back to you as soon as possible.",
      });

      reset();
    } catch (error) {
      console.error("Contact form submission error:", error);
      toast.error("Failed to send message", {
        description: "Please try again or contact us directly by phone.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 md:py-28">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4" variant="outline">
              Contact Us
            </Badge>
            <h1 className="mb-6 font-serif text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Get in{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              We'd love to hear from you. Whether you have questions about admissions, programs, or
              anything else, we're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="container py-16 md:py-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <Card key={index} className="text-center shadow-soft">
                <CardHeader>
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {info.content.map((line, idx) => (
                    <p key={idx} className="text-sm text-muted-foreground">
                      {line}
                    </p>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">Send a Message</h2>
                <p className="text-lg text-muted-foreground">
                  Fill out the form below and we'll respond within 24-48 hours
                </p>
              </div>

              <Card className="shadow-soft">
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        {...register("name", {
                          required: "Name is required",
                          minLength: {
                            value: 2,
                            message: "Name must be at least 2 characters",
                          },
                        })}
                        aria-invalid={errors.name ? "true" : "false"}
                        className={errors.name ? "border-destructive focus-visible:ring-destructive" : ""}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive" role="alert">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email Address <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        autoComplete="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        aria-invalid={errors.email ? "true" : "false"}
                        className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive" role="alert">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Phone Field */}
                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        Phone Number <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        autoComplete="tel"
                        {...register("phone", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^[\d\s()+-]+$/,
                            message: "Invalid phone number format",
                          },
                          minLength: {
                            value: 10,
                            message: "Phone number must be at least 10 digits",
                          },
                        })}
                        aria-invalid={errors.phone ? "true" : "false"}
                        className={errors.phone ? "border-destructive focus-visible:ring-destructive" : ""}
                      />
                      {errors.phone && (
                        <p className="text-sm text-destructive" role="alert">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    {/* Message Field */}
                    <div className="space-y-2">
                      <Label htmlFor="message">
                        Message <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us how we can help you..."
                        rows={6}
                        {...register("message", {
                          required: "Message is required",
                          minLength: {
                            value: 10,
                            message: "Message must be at least 10 characters",
                          },
                        })}
                        aria-invalid={errors.message ? "true" : "false"}
                        className={errors.message ? "border-destructive focus-visible:ring-destructive" : ""}
                      />
                      {errors.message && (
                        <p className="text-sm text-destructive" role="alert">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting || isFetching}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              <div>
                <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">Visit Our Campus</h2>
                <p className="mb-6 text-lg text-muted-foreground">
                  We encourage prospective families to schedule a campus tour to experience our
                  facilities and community firsthand.
                </p>
              </div>

              {/* Map Placeholder */}
              <Card className="overflow-hidden shadow-soft">
                <div className="relative h-80 bg-gradient-to-br from-primary/20 to-secondary/20">
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <MapPin className="mb-4 h-16 w-16 text-primary" />
                    <p className="text-center font-medium">
                      123 Education Lane
                      <br />
                      Springfield, ST 12345
                    </p>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 text-sm text-primary hover:underline"
                    >
                      Open in Google Maps →
                    </a>
                  </div>
                </div>
              </Card>

              {/* Quick Contact */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Schedule a Tour</CardTitle>
                  <CardDescription>
                    Experience our campus and meet our community in person
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Tours are available Monday through Friday at 9:00 AM and 1:00 PM. Please call
                    or email to schedule your visit.
                  </p>
                  <div className="space-y-2 border-t pt-3">
                    <a
                      href="tel:+15551234568"
                      className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      <Phone className="h-4 w-4" />
                      (555) 123-4568
                    </a>
                    <a
                      href="mailto:admissions@prestigeacademy.edu"
                      className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      <Mail className="h-4 w-4" />
                      admissions@prestigeacademy.edu
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Department Contacts */}
      <section className="container py-16 md:py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">
            Department Contacts
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Reach out directly to specific departments for specialized assistance
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { dept: "Admissions", email: "admissions@prestigeacademy.edu" },
            { dept: "Academics", email: "academics@prestigeacademy.edu" },
            { dept: "Athletics", email: "athletics@prestigeacademy.edu" },
            { dept: "Financial Aid", email: "financialaid@prestigeacademy.edu" },
            { dept: "Student Services", email: "services@prestigeacademy.edu" },
            { dept: "Alumni Relations", email: "alumni@prestigeacademy.edu" },
          ].map((contact, index) => (
            <Card key={index} className="transition-all hover:shadow-lifted">
              <CardHeader>
                <CardTitle className="text-lg">{contact.dept}</CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  {contact.email}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
