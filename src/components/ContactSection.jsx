import { ArrowUp, Check, Copy, Mail } from "lucide-react"
import { SiGithub, SiLinkedin, SiOllama } from "react-icons/si"
import { useEffect, useState } from "react"
import { Reveal } from "./Reveal"
import Threads from "./Threads"

const EMAIL = "prudh.pierre@gmail.com"

const SOCIALS = [
  { href: "https://github.com/pierreprudh", icon: SiGithub, label: "GitHub" },
  { href: "https://www.linkedin.com/in/pierre-prudhomme-14b145222/", icon: SiLinkedin, label: "LinkedIn" },
  { href: "https://ollama.com/pierreprudh", icon: SiOllama, label: "Ollama" },
]

export const ContactSection = () => {
  const [copied, setCopied] = useState(false)
  const [isDark, setIsDark] = useState(
    () => typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  )

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"))
    check()
    const observer = new MutationObserver(check)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

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
    <section id="contact" className="-mt-8 md:-mt-12 pt-8 md:pt-12 relative overflow-hidden">

      {/* Flowing threads drifting behind the whole section */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-50" aria-hidden="true">
        <Threads
          color={isDark ? [0.42, 0.74, 0.78] : [0.18, 0.44, 0.46]}
          amplitude={0.9}
          distance={0}
        />
      </div>

      <div className="container-wide relative z-10">

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

        {/* ── Merged contact + footer: quick email actions left, description right ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mt-12 md:mt-16 pb-16 md:pb-24 items-start">

          {/* Left — one-click ways to start the conversation */}
          <Reveal delay={0.16}>
            <div className="flex flex-col items-start gap-4">
              <a href={`mailto:${EMAIL}`} className="cosmic-button inline-flex items-center gap-2.5">
                <Mail size={16} /> {EMAIL}
              </a>
              <button
                onClick={copyEmail}
                aria-label="Copy email address"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border font-mono text-xs text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
              >
                {copied ? <Check size={14} className="text-primary" /> : <Copy size={14} />}
                {copied ? "copied" : "copy email"}
              </button>
              <p className="font-mono text-xs text-muted-foreground/70 mt-2">
                Paris (CET) · usually replies within a day
              </p>
            </div>
          </Reveal>

          {/* Right — what to reach out about */}
          <Reveal delay={0.22}>
            <div className="max-w-xl">
              <p className="text-muted-foreground leading-relaxed">
                I'm an AI engineer at Ontraak in Paris, designing agentic systems and running
                self-hosted LLM infrastructure in production. If you're building agents, working
                with local models, or shipping AI products that need to survive real traffic,
                I'd genuinely enjoy comparing notes.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Founders, recruiters, and fellow engineers all welcome — a short email is the
                fastest way to reach me.
              </p>
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
                className="text-muted-foreground/60 hover:text-primary transition-colors"
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
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Top <ArrowUp size={12} />
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
