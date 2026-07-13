import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { name: "Home", href: "#hero", id: "hero" },
  { name: "About", href: "#about", id: "about" },
  { name: "Experience", href: "#experience", id: "experience" },
  { name: "Capabilities", href: "#skills", id: "skills" },
  { name: "Projects", href: "#projects", id: "projects" },
  { name: "Contact", href: "#contact", id: "contact" },
];

export const Navbar = () => {
  const navRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems
        .map((item) => document.getElementById(item.id))
        .filter(Boolean);
      const offset = 96;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].getBoundingClientRect().top - offset <= 0) {
          setActiveSection(sections[i].id);
          return;
        }
      }
      setActiveSection("hero");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && navRef.current && !navRef.current.contains(e.target)) setIsOpen(false);
    };
    const handleEscape = (e) => { if (e.key === "Escape") setIsOpen(false); };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <nav
      className="fixed inset-x-0 top-4 z-40 flex justify-center pointer-events-none"
      style={{ animation: "navEnter 1s cubic-bezier(0.16, 1, 0.3, 1) 1.6s both" }}
    >
      {/* Desktop — centered glass pill */}
      <div
        className={cn(
          "pointer-events-auto hidden md:flex items-center gap-1 rounded-full glass px-3 py-2 transition-all duration-300",
          isScrolled && "shadow-xl"
        )}
      >
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
              activeSection === item.id
                ? "bg-primary text-primary-foreground shadow-[0_2px_12px_-2px_hsl(var(--primary)/0.6),inset_0_1px_0_hsl(0_0%_100%/0.25)]"
                : "text-foreground/55 hover:text-foreground hover:bg-foreground/8"
            )}
          >
            {item.name}
          </a>
        ))}
        <div className="w-px h-4 bg-border/70 mx-1.5" />
        <ThemeToggle />
      </div>

      {/* Mobile — glass pill with hamburger */}
      <div
        ref={navRef}
        className={cn(
          "pointer-events-auto flex md:hidden flex-col rounded-3xl glass transition-all duration-300 w-[calc(100vw-2rem)]",
          (isScrolled || isOpen) && "shadow-xl"
        )}
      >
        <div className="flex items-center justify-between px-4 py-2.5">
          <a href="#hero" className="text-sm font-semibold tracking-tight text-foreground">
            Pierre Prudhomme
          </a>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="rounded-full p-1.5 text-foreground transition-colors duration-200 hover:bg-foreground/8"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <div
          id="mobile-navigation"
          className={cn(
            "overflow-hidden transition-all duration-300",
            isOpen ? "max-h-96 opacity-100 pb-2" : "max-h-0 opacity-0"
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
                onClick={() => setIsOpen(false)}
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
