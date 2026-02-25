import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Heart } from "lucide-react";
import { SiFacebook, SiX, SiInstagram } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold">Prestige Academy</h3>
            <p className="text-sm text-muted-foreground">
              Nurturing minds, building futures. A place where every student can discover their
              potential and achieve excellence.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-md border bg-background transition-colors hover:border-primary hover:text-primary"
                aria-label="Facebook"
              >
                <SiFacebook className="h-4 w-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-md border bg-background transition-colors hover:border-primary hover:text-primary"
                aria-label="X (Twitter)"
              >
                <SiX className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-md border bg-background transition-colors hover:border-primary hover:text-primary"
                aria-label="Instagram"
              >
                <SiInstagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-muted-foreground hover:text-primary">
                  Academic Programs
                </Link>
              </li>
              <li>
                <Link to="/faculty" className="text-muted-foreground hover:text-primary">
                  Our Faculty
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="text-muted-foreground hover:text-primary">
                  Admissions
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-muted-foreground hover:text-primary">
                  News & Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold">Programs</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Elementary School</li>
              <li>Middle School</li>
              <li>High School</li>
              <li>Advanced Placement</li>
              <li>Arts & Athletics</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-muted-foreground">
                  123 Education Lane
                  <br />
                  Springfield, ST 12345
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="h-5 w-5 shrink-0 text-primary" />
                <a
                  href="tel:+15551234567"
                  className="text-muted-foreground hover:text-primary"
                >
                  (555) 123-4567
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="h-5 w-5 shrink-0 text-primary" />
                <a
                  href="mailto:info@prestigeacademy.edu"
                  className="text-muted-foreground hover:text-primary"
                >
                  info@prestigeacademy.edu
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            © 2026. Built with <Heart className="h-4 w-4 fill-destructive text-destructive" /> using{" "}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-foreground"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
