import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";

const navItems = [
  {
    name: "Home", href: "#hero", id: "hero"
  },
  {
    name: "About", href: "#about", id: "about"
  },
  {
    name: "Skills", href: "#skills", id: "skills"
  },
  {
    name: "Projects", href: "#projects", id: "projects"
  },
  {
    name: "Contact", href: "#contact", id: "contact"
  },
];

export const Navbar = () => {
  const navRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isAccordionOpen && navRef.current && !navRef.current.contains(event.target)) {
        setIsAccordionOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsAccordionOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isAccordionOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems
        .map((item) => document.getElementById(item.id))
        .filter(Boolean);
      const offset = 80;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].getBoundingClientRect().top + window.scrollY - offset <= window.scrollY) {
          setActiveSection(sections[i].id);
          return;
        }
      }
      setActiveSection(navItems[0].id);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isAccordionOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isAccordionOpen]);

  return (
    <nav className="fixed inset-x-0 top-4 z-40 flex justify-center pointer-events-none" style={{ animation: "navEnter 1s cubic-bezier(0.16, 1, 0.3, 1) 2.6s both" }}>

      {/* Desktop — centered pill */}
      <div
        ref={navRef}
        className={cn(
          "pointer-events-auto hidden md:flex items-center gap-1 rounded-full border px-3 py-2.5 transition-all duration-300",
          isScrolled
            ? "border-border/60 bg-background/85 shadow-lg backdrop-blur-2xl"
            : "border-border/30 bg-background/50 shadow-sm backdrop-blur-xl"
        )}
      >
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
              activeSection === item.id
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-foreground/55 hover:text-foreground hover:bg-foreground/8"
            )}
          >
            {item.name}
          </a>
        ))}
      </div>

      {/* Mobile — pill with hamburger */}
      <div
        ref={navRef}
        className={cn(
          "pointer-events-auto flex md:hidden flex-col rounded-3xl border transition-all duration-300 w-[calc(100vw-2rem)]",
          isScrolled
            ? "border-border/60 bg-background/85 shadow-lg backdrop-blur-2xl"
            : "border-border/30 bg-background/50 shadow-sm backdrop-blur-xl"
        )}
      >
        <div className="flex items-center justify-between px-4 py-2.5">
          <a href="#hero" className="text-sm font-semibold tracking-tight text-foreground">
            Pierre Prudhomme
          </a>
          <button
            onClick={() => setIsAccordionOpen((prev) => !prev)}
            className="rounded-full p-1.5 text-foreground transition-colors duration-200 hover:bg-foreground/8"
            aria-label={isAccordionOpen ? "Close menu" : "Open menu"}
            aria-expanded={isAccordionOpen}
            aria-controls="mobile-navigation"
          >
            {isAccordionOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div
          id="mobile-navigation"
          className={cn(
            "overflow-hidden transition-all duration-300",
            isAccordionOpen ? "max-h-72 opacity-100 pb-2" : "max-h-0 opacity-0"
          )}
        >
          <div className="flex flex-col gap-1 px-2 pb-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={cn(
                  "rounded-2xl px-4 py-2.5 text-sm font-medium transition-colors duration-200",
                  activeSection === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/65 hover:bg-foreground/8"
                )}
                onClick={() => setIsAccordionOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
