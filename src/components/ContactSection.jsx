import { Check, Copy, Mail } from "lucide-react"
import { SiGithub, SiLinkedin } from "react-icons/si"
import { useState } from "react"
import { Reveal } from "./Reveal"

const EMAIL = "prudh.pierre@gmail.com"

export const ContactSection = () => {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable — the mailto link still works
    }
  }

  return (
    <section id="contact" className="py-16 md:py-24 border-t border-border/40 relative">
      <div className="container-wide">

        <Reveal>
          <div className="flex items-baseline gap-4 mb-10 md:mb-14">
            <span className="font-mono text-sm text-primary">05</span>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">contact</span>
            <div className="h-px flex-1 self-center bg-border/60" />
            <span className="hidden sm:inline font-mono text-xs text-muted-foreground/70">open to good conversations</span>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="text-left font-bold tracking-tight leading-[1.02] max-w-4xl" style={{ fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)" }}>
            Let's build something<br />
            that <span className="text-primary">ships.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="text-left text-muted-foreground max-w-xl leading-relaxed mt-8">
            Agents, local LLMs, or AI products that need to hold up in production — I'm always up for talking shop.
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <div className="flex flex-wrap items-center gap-4 mt-10">
            <a href={`mailto:${EMAIL}`} className="cosmic-button inline-flex items-center gap-2.5">
              <Mail size={16} /> {EMAIL}
            </a>
            <button
              onClick={copyEmail}
              aria-label="Copy email address"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border font-mono text-xs text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
            >
              {copied ? <Check size={14} className="text-primary" /> : <Copy size={14} />}
              {copied ? "copied" : "copy"}
            </button>
            <div className="flex items-center gap-5 ml-2">
              <a
                href="https://www.linkedin.com/in/pierre-prudhomme-14b145222/"
                target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="text-muted-foreground/60 hover:text-primary transition-colors"
              >
                <SiLinkedin size={18} />
              </a>
              <a
                href="https://github.com/pierreprudh"
                target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                className="text-muted-foreground/60 hover:text-primary transition-colors"
              >
                <SiGithub size={18} />
              </a>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  )
}
