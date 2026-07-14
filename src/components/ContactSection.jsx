import { ArrowUp, ArrowUpRight, Check, Copy, Mail } from "lucide-react"
import { SiGithub, SiLinkedin, SiLeetcode } from "react-icons/si"
import { useState } from "react"
import { Reveal } from "./Reveal"

const EMAIL = "prudh.pierre@gmail.com"

const SOCIALS = [
  { href: "https://github.com/pierreprudh", icon: SiGithub, label: "GitHub" },
  { href: "https://www.linkedin.com/in/pierre-prudhomme-14b145222/", icon: SiLinkedin, label: "LinkedIn" },
  { href: "https://leetcode.com/pierreprudh", icon: SiLeetcode, label: "LeetCode" },
]

/* Light trails converging into the CTA, echoing the hero sphere's energy.
   Drawn in a fixed 1440x820 space stretched to the block; non-scaling
   strokes keep the lines hairline-thin at any viewport. */
const TrailField = () => {
  const bright = [
    "M -60 60 C 340 120, 520 380, 690 596",
    "M -60 300 C 300 330, 500 480, 690 602",
    "M -60 830 C 360 750, 540 680, 690 610",
    "M -60 660 C 320 655, 520 625, 690 606",
  ]
  const faint = [
    "M -60 10 C 380 80, 560 360, 690 594",
    "M -60 180 C 320 220, 520 420, 690 598",
    "M -60 760 C 340 700, 540 650, 690 608",
    "M -60 900 C 400 800, 560 700, 690 614",
  ]
  const bundle = [592, 598, 604, 610, 616]

  return (
    <svg
      className="absolute inset-0 h-full w-full pointer-events-none"
      viewBox="0 0 1440 820"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="trail-in" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="hsl(var(--primary))" stopOpacity="0" />
          <stop offset="0.5" stopColor="hsl(var(--primary))" stopOpacity="0.45" />
          <stop offset="1" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="trail-out" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
          <stop offset="0.85" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="trail-in-faint" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="hsl(var(--foreground))" stopOpacity="0" />
          <stop offset="1" stopColor="hsl(var(--foreground))" stopOpacity="0.18" />
        </linearGradient>
        <filter id="trail-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {/* Full-width hairline through the convergence point */}
      <path d="M -60 604 H 1500" stroke="hsl(var(--foreground))" strokeOpacity="0.09" vectorEffect="non-scaling-stroke" fill="none" />

      {/* Soft glow under the brightest lines */}
      <g filter="url(#trail-glow)" stroke="hsl(var(--primary))" strokeOpacity="0.35" strokeWidth="4" fill="none">
        <path d={bright[0]} />
        <path d={bright[2]} />
        <path d="M 690 604 H 1500" />
      </g>

      {/* Faint companion curves */}
      <g stroke="url(#trail-in-faint)" strokeWidth="1" vectorEffect="non-scaling-stroke" fill="none">
        {faint.map((d) => (
          <path key={d} d={d} vectorEffect="non-scaling-stroke" />
        ))}
      </g>

      {/* Bright converging curves */}
      <g stroke="url(#trail-in)" strokeWidth="1.4" fill="none">
        {bright.map((d) => (
          <path key={d} d={d} vectorEffect="non-scaling-stroke" />
        ))}
      </g>

      {/* Horizontal bundle exiting right */}
      <g fill="none">
        {bundle.map((y, i) => (
          <path
            key={y}
            d={`M 690 ${y} H 1500`}
            stroke={i % 2 === 0 ? "url(#trail-out)" : "hsl(var(--foreground))"}
            strokeOpacity={i % 2 === 0 ? 1 : 0.12}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>

      {/* Energy pulses travelling along two full trails */}
      <g stroke="hsl(var(--primary))" strokeWidth="1.6" fill="none">
        <path className="trail-pulse" d="M -60 300 C 300 330, 500 480, 690 602 H 1500" vectorEffect="non-scaling-stroke" />
        <path className="trail-pulse trail-pulse-late" d="M -60 830 C 360 750, 540 680, 690 610 H 1500" vectorEffect="non-scaling-stroke" />
      </g>
    </svg>
  )
}

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
    <section id="contact" className="relative border-t border-border/40 overflow-hidden">

      {/* ── CTA finale — trails converge behind the buttons ── */}
      <div className="relative">
        <TrailField />

        <div className="container-wide relative z-10 flex flex-col items-center text-center pt-20 pb-24 md:pt-28 md:pb-36">

          <Reveal>
            <span className="inline-block font-mono text-[11px] uppercase tracking-[0.25em] text-primary border border-primary/40 bg-primary/5 rounded-md px-3.5 py-1.5">
              05 · Contact
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              className="font-bold tracking-tight leading-[1.04] mt-7"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.75rem)" }}
            >
              Let's build something<br />
              that <span className="text-primary">ships.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="text-muted-foreground max-w-md leading-relaxed mt-6">
              Agents, local LLMs, or AI products that need to hold up in production — I'm always up for talking shop.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="flex flex-col items-center gap-3 mt-10">
              <a
                href={`mailto:${EMAIL}`}
                className="cosmic-button inline-flex items-center justify-center gap-2.5 min-w-[280px]"
              >
                <Mail size={16} /> {EMAIL}
              </a>
              <button
                onClick={copyEmail}
                aria-label="Copy email address"
                className="inline-flex items-center justify-center gap-2 min-w-[280px] px-6 py-2.5 rounded-full border border-border bg-background/60 backdrop-blur-sm font-mono text-xs text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
              >
                {copied ? <Check size={14} className="text-primary" /> : <Copy size={14} />}
                {copied ? "copied" : "copy email"}
              </button>
            </div>
          </Reveal>

        </div>
      </div>

      {/* ── Footer ── */}
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
                { label: "LeetCode", href: "https://leetcode.com/pierreprudh", external: true },
                { label: EMAIL, href: `mailto:${EMAIL}` },
              ]}
            />

          </div>
        </Reveal>

        {/* Bottom bar */}
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

    </section>
  )
}
