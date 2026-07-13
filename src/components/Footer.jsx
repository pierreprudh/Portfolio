import { ArrowUp } from "lucide-react";
import { SiGithub, SiLinkedin, SiLeetcode } from "react-icons/si";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const socials = [
  { href: "https://github.com/pierreprudh", icon: SiGithub, label: "GitHub" },
  { href: "https://www.linkedin.com/in/pierre-prudhomme-14b145222/", icon: SiLinkedin, label: "LinkedIn" },
  { href: "https://leetcode.com/pierreprudh", icon: SiLeetcode, label: "LeetCode" },
];

export const Footer = () => {
  return (
    <footer className="relative bg-card border-t border-border mt-12 px-4">
      <div className="container mx-auto max-w-5xl py-10">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 text-left">
          <div className="max-w-xs">
            <div className="font-semibold tracking-tight text-card-foreground mb-1">Pierre Prudhomme</div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI Engineer — agentic systems, self-hosted LLM infrastructure, and full-stack AI products.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
            {navLinks.map(({ name, href }) => (
              <a key={href} href={href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-muted-foreground/70 hover:text-primary transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
            <a
              href="#hero"
              aria-label="Back to top"
              className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors duration-300 ml-2"
            >
              <ArrowUp size={16} />
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-border/60 mt-8 pt-6">
          <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Pierre Prudhomme. All rights reserved.</p>
          <p className="font-mono text-[11px] text-muted-foreground/70">designed &amp; built by pierre — react · tailwind · vite</p>
        </div>
      </div>
    </footer>
  );
};
