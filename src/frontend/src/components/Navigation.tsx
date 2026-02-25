import { useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, GraduationCap, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/faculty", label: "Faculty" },
  { href: "/admissions", label: "Admissions" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
  { href: "/apply-admission", label: "Apply Admission" },
  { href: "/check-result", label: "Check Results" },
  { href: "/admin/login", label: "Admin" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [currentPath]);

  const isActive = (href: string) => {
    if (href === "/") {
      return currentPath === "/";
    }
    return currentPath.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/80"
          : "bg-background"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold leading-none text-primary">
              BSSIC
            </span>
            <span className="text-xs text-muted-foreground">Maidhan, Sultanpur</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "text-primary"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-secondary to-accent" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hidden md:flex"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                {isOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-4 py-8">
                <div className="flex items-center gap-2 border-b pb-4">
                  <GraduationCap className="h-8 w-8 text-primary" />
                  <div>
                    <div className="font-serif text-lg font-bold text-primary">
                      BSSIC
                    </div>
                    <div className="text-xs text-muted-foreground">Maidhan, Sultanpur</div>
                  </div>
                </div>

                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`rounded-md px-4 py-3 text-left text-base font-medium transition-colors ${
                        isActive(link.href)
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div className="border-t pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="w-full justify-start gap-2"
                  >
                    {theme === "dark" ? (
                      <>
                        <Sun className="h-4 w-4" />
                        Light Mode
                      </>
                    ) : (
                      <>
                        <Moon className="h-4 w-4" />
                        Dark Mode
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
