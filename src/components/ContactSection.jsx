import { ArrowUp, Mail } from "lucide-react"
import { SiGithub, SiLinkedin, SiOllama } from "react-icons/si"
import { Reveal } from "./Reveal"
import BackgroundPaths from "./BackgroundPaths"

const EMAIL = "prudh.pierre@gmail.com"

const SOCIALS = [
  { href: "https://github.com/pierreprudh", icon: SiGithub, label: "GitHub" },
  { href: "https://www.linkedin.com/in/pierre-prudhomme-14b145222/", icon: SiLinkedin, label: "LinkedIn" },
  { href: "https://ollama.com/pierreprudh", icon: SiOllama, label: "Ollama" },
]

export const ContactSection = () => {
  return (
    <section id="contact" className="-mt-8 md:-mt-12 pt-8 md:pt-12 relative overflow-hidden">

      {/* Floating background paths drawing themselves behind the whole section */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <BackgroundPaths />
      </div>

      <div className="container-wide relative z-10">

        <Reveal>
          <div className="flex items-baseline gap-4 mb-10 md:mb-14">
            <span className="font-mono text-sm text-primary">05</span>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">contact</span>
            <div className="h-px flex-1 self-center bg-border/60" />
          </div>
        </Reveal>

        {/* ── Merged contact + footer: headline and one-click email actions ── */}
        <div className="pb-16 md:pb-24">
          <Reveal delay={0.08}>
            <h2 className="text-left font-bold tracking-tight leading-[1.05]" style={{ fontSize: "clamp(1.9rem, 3.4vw, 3rem)" }}>
              Let's build something<br />
              <span className="text-primary">together.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-8">
              <a href={`mailto:${EMAIL}`} className="cosmic-button inline-flex items-center gap-2.5">
                <Mail size={16} /> {EMAIL}
              </a>
            </div>
          </Reveal>
        </div>

        {/* Bottom bar — socials left, copyright right */}
        <div className="border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
          <div className="flex items-center gap-5">
            {SOCIALS.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-3 -m-3 text-muted-foreground/60 hover:text-primary transition-colors"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <p className="text-xs text-muted-foreground/70">
              © Pierre Prudhomme {new Date().getFullYear()} · All rights reserved.
            </p>
            <a
              href="#hero"
              aria-label="Back to top"
              className="inline-flex items-center gap-1.5 p-3 -m-3 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Top <ArrowUp size={12} />
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
