import { ArrowUp, ArrowUpRight, Check, Copy, Mail } from "lucide-react"
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

/* Static phyllotaxis mark — a miniature of the hero sphere */
const MiniSphere = () => {
  const N = 44
  const dots = Array.from({ length: N }, (_, i) => {
    const r = 14.5 * Math.sqrt((i + 0.5) / N)
    const a = i * 2.399963
    return {
      x: 18 + r * Math.cos(a),
      y: 18 + r * Math.sin(a),
      s: 0.7 + (r / 14.5) * 1.15,
      o: 0.3 + (r / 14.5) * 0.6,
    }
  })
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true" className="text-foreground">
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.s} fill="currentColor" opacity={d.o} />
      ))}
    </svg>
  )
}

const FooterCol = ({ title, links }) => (
  <div className="flex flex-col gap-4">
    <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground/70">{title}</h3>
    <ul className="flex flex-col gap-2.5">
      {links.map(({ label, href, external }) => (
        <li key={label}>
          <a
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {label}
            {external && (
              <ArrowUpRight
                size={12}
                className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
              />
            )}
          </a>
        </li>
      ))}
    </ul>
  </div>
)

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
    <section id="contact" className="pt-16 md:pt-24 relative">
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
          </div>
        </Reveal>

      </div>

      {/* ── Footer — animated threads drift quietly behind ── */}
      <div className="relative mt-20 md:mt-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-35 dark:opacity-45" aria-hidden="true">
          <Threads
            color={isDark ? [0.42, 0.74, 0.78] : [0.18, 0.44, 0.46]}
            amplitude={0.9}
            distance={0}
          />
        </div>

        <footer className="container-wide relative z-10">

          <Reveal>
            <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-[1.6fr_1fr_1fr] pb-14">

              {/* Brand */}
              <div className="col-span-2 md:col-span-1 flex flex-col items-start gap-5">
                <MiniSphere />
                <p className="text-xl md:text-2xl font-semibold tracking-tight leading-snug">
                  AI systems that hold up<br />in production.
                </p>
                <p className="font-mono text-[11px] text-muted-foreground/70">
                  Designed &amp; built by Pierre — React · Tailwind · Vite
                </p>
              </div>

              <FooterCol
                title="Explore"
                links={[
                  { label: "About", href: "#about" },
                  { label: "Experience", href: "#experience" },
                  { label: "Capabilities", href: "#skills" },
                  { label: "Projects", href: "#projects" },
                ]}
              />

              <FooterCol
                title="Connect"
                links={[
                  { label: "GitHub", href: "https://github.com/pierreprudh", external: true },
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/pierre-prudhomme-14b145222/", external: true },
                  { label: "Ollama", href: "https://ollama.com/pierreprudh", external: true },
                  { label: EMAIL, href: `mailto:${EMAIL}` },
                ]}
              />

            </div>
          </Reveal>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
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
                © {new Date().getFullYear()} Pierre Prudhomme · All rights reserved.
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

        </footer>
      </div>

    </section>
  )
}
