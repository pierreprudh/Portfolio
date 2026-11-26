import { SiGithub } from "react-icons/si"
import { ArrowUpRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion as Motion, useReducedMotion } from "motion/react"
import { Reveal } from "./Reveal"
import { SectionHeader } from "./SectionHeader"

// Plays only while on screen so the file never loads for visitors who don't scroll to it
const ProjectVideo = ({ src, poster, title }) => {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {})
        else el.pause()
      },
      { threshold: 0.25 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      aria-label={title}
      muted
      loop
      playsInline
      preload="none"
      className="w-full h-full object-cover"
    />
  )
}

const MonoTags = ({ children }) => (
  <div className="font-mono text-[11px] text-muted-foreground/70 flex flex-wrap gap-x-3 gap-y-1">
    {children.split("·").map((tag) => (
      <span key={tag.trim()}>{tag.trim()}</span>
    ))}
  </div>
)

// Klide Light and the Midnight dark foundation, from the brand guidelines
const KLIDE_PALETTE = [
  { name: "Chrome", hex: "#F5F6F7" },
  { name: "Ink", hex: "#1C1C1C" },
  { name: "Sage", hex: "#5A7B4C" },
  { name: "Midnight", hex: "#11110F" },
  { name: "Paper", hex: "#F0EFE9" },
  { name: "Periwinkle", hex: "#8EA2FF" },
]

// Agents and model sources Klide runs today, each in its own colors
const KLIDE_AGENTS = [
  { name: "Claude Code", src: "claude-code.png" },
  { name: "Codex", src: "codex.png" },
  { name: "OpenCode", src: "opencode.svg", dark: "opencode-dark.svg" },
  { name: "Hermes", src: "hermes.png", dark: "hermes-dark.png" },
  { name: "Amp", src: "amp.svg" },
  { name: "Cursor", src: "cursor.svg" },
  { name: "Factory", src: "factory.svg" },
]
const KLIDE_MODELS = [
  { name: "Ollama", src: "ollama.png", invert: true },
  { name: "Mistral", src: "mistral.png" },
  { name: "DeepSeek", src: "deepseek.png" },
  { name: "xAI", src: "grok.svg", invert: true },
  { name: "Hugging Face", src: "huggingface.png" },
  { name: "Liquid AI", src: "liquidai.png", invert: true },
  { name: "GitHub", src: "github.svg", invert: true },
]

// The standout features, from the repo's README and docs
const KLIDE_HIGHLIGHTS = [
  {
    title: "Any agent, any model",
    text: "Claude Code or Codex on a local or third-party model through Klide's adapters. The CLI only ever sees a temporary loopback key.",
  },
  {
    title: "Agents talk to each other",
    text: "CLIs join one Rust-owned journal over an embedded MCP server, and every message between them is reviewed before it lands.",
  },
  {
    title: "Borrowed sight",
    text: "A model without vision borrows another model's eyes: a dropped image is described locally first, with the source credited.",
  },
  {
    title: "Agent races",
    text: "The same task on several agents in separate worktrees, evidence side by side, and the best result merged.",
  },
  {
    title: "Design mode",
    text: "A live dev server on a canvas: select elements, pin comments, and send the review back to the agent as a task.",
  },
  {
    title: "It reviews itself",
    text: "klide-bot reviews every pull request on Klide's own agent, run headless with klide run, on any model.",
  },
]

// One row of bare logos, repeated so a single copy is wider than the
// tile. Two copies slide by half their width for a seamless loop.
const BandRow = ({ items, reverse, reduced, duration }) => {
  const copy = (hidden) => (
    <ul className="flex shrink-0 items-center gap-12 md:gap-16 pr-12 md:pr-16" aria-hidden={hidden || undefined}>
      {[...items, ...items, ...items].map(({ name, src, dark, invert }, i) => {
        // Monochrome marks swap to their dark artwork, or invert, on the dark theme
        const logo = "h-8 w-8 md:h-9 md:w-9 object-contain grayscale opacity-70 dark:opacity-90 transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/logo:grayscale-0 group-hover/logo:opacity-100 group-hover/logo:-translate-y-0.5"
        return (
          <li key={`${name}-${i}`} className="group/logo shrink-0" title={name}>
            {dark ? (
              <>
                <img src={`projects/klide/logos/${src}`} alt={name} loading="lazy" className={`${logo} dark:hidden`} />
                <img src={`projects/klide/logos/${dark}`} alt={name} loading="lazy" className={`${logo} hidden dark:block`} />
              </>
            ) : (
              <img src={`projects/klide/logos/${src}`} alt={name} loading="lazy" className={`${logo} ${invert ? "dark:invert" : ""}`} />
            )}
          </li>
        )
      })}
    </ul>
  )
  return (
    <div className="flex overflow-hidden">
      <div
        className="flex w-max hover:[animation-play-state:paused]"
        style={reduced ? undefined : { animation: `klide-marquee ${duration}s linear infinite${reverse ? " reverse" : ""}` }}
      >
        {copy(false)}
        {copy(true)}
      </div>
    </div>
  )
}

// Agents on top, model sources below, drifting in opposite directions
const IntegrationBand = ({ reduced }) => (
  <div
    className="mt-7 -mx-7 md:-mx-10 flex flex-col gap-4 py-1 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
    aria-label={`Works with ${[...KLIDE_AGENTS, ...KLIDE_MODELS].map((x) => x.name).join(", ")}`}
  >
    <BandRow items={KLIDE_AGENTS} reduced={reduced} duration={60} />
    <BandRow items={KLIDE_MODELS} reduced={reduced} duration={70} reverse />
  </div>
)

// Klide reads left to right, identity then product. The details stay folded
// away until the tile is clicked, like the Capabilities cards.
const KlideTile = () => {
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()
  const toggle = () => setOpen((o) => !o)

  const reveal = (i) => ({
    initial: reduced ? false : { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: reduced ? 0 : 0.12 + i * 0.07, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <div
      className="tile group h-full overflow-hidden flex flex-col text-left cursor-pointer"
      onClick={(e) => {
        // Links inside the tile keep their own behavior
        if (!e.target.closest("a, button")) toggle()
      }}
    >
      {/* Inset banner with the product, the app icon overlapping its lower edge */}
      <div className="relative p-2 md:p-2.5">
        <div className="relative h-56 md:h-96 overflow-hidden rounded-2xl border border-border/60 bg-black">
          <ProjectVideo src="projects/klide-demo.mp4" poster="projects/Project - KLIDE.jpg" title="Klide demo" />
        </div>
        <img
          src="projects/klide/app-icon.svg"
          alt="Klide app icon"
          className="absolute left-7 md:left-10 bottom-0 translate-y-[58%] w-20 md:w-32 drop-shadow-[0_14px_28px_rgb(0_0_0/0.28)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-[52%]"
        />
      </div>

      <div className="px-7 md:px-10 pb-7 md:pb-8 pt-14 sm:pt-3 md:pt-4">
        {/* Beside the icon from sm up; below it on phones */}
        <div className="flex items-start justify-between gap-4 sm:pl-24 md:pl-40 sm:min-h-[3.25rem] md:min-h-[5rem]">
          <div className="flex flex-col gap-2.5">
            {/* The wordmark is set in Inter, as in the app */}
            <h3 className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-2xl md:text-3xl font-semibold tracking-tight text-card-foreground">
              <span className="font-['Inter',var(--font-sans)]">Klide</span>
              <span className="text-primary">AI-native IDE</span>
            </h3>
            <MonoTags>rust · typescript · react · tauri · mcp · lora · branding</MonoTags>
          </div>
          <div className="flex items-center gap-4 shrink-0 mt-1.5">
            <a
              href="https://github.com/pierreprudh/KLIDE"
              target="_blank" rel="noopener noreferrer"
              aria-label="Klide on GitHub"
              className="text-muted-foreground/60 hover:text-primary transition-colors"
            >
              <SiGithub size={19} />
            </a>
            <button
              type="button"
              onClick={toggle}
              aria-expanded={open}
              aria-controls="klide-details"
              aria-label={open ? "Hide Klide details" : "Show Klide details"}
              className="text-muted-foreground/60 group-hover:text-primary transition-colors rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              <Motion.span
                className="block"
                animate={{ rotate: open ? 180 : 0 }}
                transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 24 }}
              >
                <ArrowUpRight size={19} strokeWidth={1.75} />
              </Motion.span>
            </button>
          </div>
        </div>

        <IntegrationBand reduced={reduced} />

        <AnimatePresence initial={false}>
          {open && (
            <Motion.div
              id="klide-details"
              key="details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={reduced ? { duration: 0 } : { duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-6 mt-6 border-t border-border/60 grid grid-cols-1 lg:grid-cols-[minmax(0,8fr)_minmax(0,5fr)] gap-8 lg:gap-12">
                <Motion.div {...reveal(0)} className="flex flex-col gap-3">
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70">Product</div>
                  <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed max-w-2xl">
                    A local-first macOS workspace for coding agents. Claude Code, Codex, OpenCode,
                    Hermes and other CLIs run side by side in real terminals, on the model you choose:
                    local through Ollama or MLX, a hosted API, or a subscription. A Rust core owns the
                    runs, and every change goes through review before it lands.
                  </p>
                  <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70">Highlights</div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    {KLIDE_HIGHLIGHTS.map(({ title, text }) => (
                      <li key={title} className="flex flex-col gap-1">
                        <span className="text-[15px] font-semibold tracking-tight text-card-foreground">{title}</span>
                        <span className="text-sm text-muted-foreground leading-relaxed">{text}</span>
                      </li>
                    ))}
                  </ul>
                </Motion.div>

                <Motion.div {...reveal(1)} className="flex flex-col gap-3 lg:border-l lg:border-border/60 lg:pl-12">
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70">Brand identity</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Name, symbol and macOS app icon built in Icon Composer, with light and dark
                    variants. An Inter wordmark next to a native San Francisco interface, and a palette
                    that keeps the app's cool grey chrome with sage and periwinkle accents.
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/70 bg-[#F5F6F7]">
                      <img src="projects/klide/mark-light.svg" alt="Klide symbol, light" className="w-5" />
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/70 bg-[#11110F]">
                      <img src="projects/klide/mark-dark.svg" alt="Klide symbol, dark" className="w-5" />
                    </span>
                  </div>
                  <div className="flex items-center gap-2 pt-1" role="list" aria-label="Klide palette">
                    {KLIDE_PALETTE.map(({ name, hex }) => (
                      <span
                        key={hex}
                        role="listitem"
                        title={`${name} ${hex}`}
                        aria-label={`${name} ${hex}`}
                        className="h-5 w-5 rounded-full border border-border/70"
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                  </div>
                </Motion.div>
              </div>
            </Motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export const ProjectsSection = () => {
  return (
    <section id="projects" className="pt-6 md:pt-8 pb-12 md:pb-16 relative">
      <div className="container-wide">

        <SectionHeader
          title="Projects"
          lead="Three systems I'm proud of."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">

          {/* Klide: one story from brand identity to the running app */}
          <Reveal className="lg:col-span-12" delay={0.05}>
            <KlideTile />
          </Reveal>

          {/* Strava dashboard tile */}
          <Reveal className="lg:col-span-4" delay={0.08}>
            <div className="tile group h-full overflow-hidden flex flex-col text-left">
              <div className="relative h-44 overflow-hidden border-b border-border/60">
                <img
                  src="projects/Project - Strava Dashboard.jpg"
                  alt="Strava Dashboard"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-7 flex flex-col gap-3 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold tracking-tight text-card-foreground">
                    Strava Dashboard
                  </h3>
                  <a
                    href="https://github.com/pierreprudh/Strava-Dashboard"
                    target="_blank" rel="noopener noreferrer"
                    aria-label="Strava Dashboard on GitHub"
                    className="text-muted-foreground/60 hover:text-primary transition-colors shrink-0 mt-0.5"
                  >
                    <SiGithub size={17} />
                  </a>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Personal training analytics over the Strava API — a React dashboard on a Python backend, turning raw activity data into pace, load, and progression insights.
                </p>
                <div className="mt-auto pt-2">
                  <MonoTags>react · python · strava api</MonoTags>
                </div>
              </div>
            </div>
          </Reveal>

          {/* SAV agent tile */}
          <Reveal className="lg:col-span-5" delay={0.12}>
            <div className="tile group h-full p-7 md:p-8 text-left flex flex-col gap-3">
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-card-foreground">
                Process-aware customer-service agent
              </h3>
              <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed max-w-2xl">
                Agentic after-sales pipeline on LangGraph — identifies the customer, auto-creates a ticket, runs a structured diagnostic dialogue, and routes each case to the right resolution branch. Fully local on Ollama, with RAG over past execution traces, MCP tool servers, and an A/B harness proving memory-augmented agents beat blank-slate ones.
              </p>
              <div className="mt-auto pt-2">
                <MonoTags>python · langgraph · ollama · chromadb · rag · mcp</MonoTags>
              </div>
            </div>
          </Reveal>

          {/* GitHub CTA tile */}
          <Reveal className="lg:col-span-3" delay={0.16}>
            <a
              href="https://github.com/pierreprudh"
              target="_blank" rel="noopener noreferrer"
              className="tile group h-full p-7 md:p-8 text-left flex flex-col justify-between gap-6 min-h-48"
            >
              <div className="flex items-center justify-between">
                <SiGithub size={22} className="text-muted-foreground group-hover:text-primary transition-colors" />
                <ArrowUpRight size={18} className="text-muted-foreground/50 group-hover:text-primary transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <div>
                <div className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
                  More on GitHub
                </div>
                <div className="font-mono text-xs text-muted-foreground mt-1">
                  github.com/pierreprudh
                </div>
              </div>
            </a>
          </Reveal>
        </div>

      </div>
    </section>
  )
}
