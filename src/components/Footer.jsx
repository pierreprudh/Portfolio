import { ArrowUp } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border/40 relative">
      <div className="container-wide flex flex-col sm:flex-row items-center justify-between gap-3 py-8">
        <p className="text-xs text-muted-foreground/70">
          © {new Date().getFullYear()} Pierre Prudhomme
        </p>
        <p className="text-xs text-muted-foreground/70">
          Designed &amp; built by Pierre — React · Tailwind · Vite
        </p>
        <a
          href="#hero"
          aria-label="Back to top"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          Back to top <ArrowUp size={12} />
        </a>
      </div>
    </footer>
  );
};
