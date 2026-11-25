import { SiGithub } from "react-icons/si"
import { ArrowUpRight } from "lucide-react"
import { useEffect, useRef } from "react"
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

export const ProjectsSection = () => {
  return (
    <section id="projects" className="pt-6 md:pt-8 pb-12 md:pb-16 relative">
      <div className="container-wide">

        <SectionHeader
          title="Projects"
          lead="Three systems I'm proud of."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">

          {/* KLIDE — feature tile */}
          <Reveal className="lg:col-span-8" delay={0.05}>
            <div className="tile group h-full overflow-hidden flex flex-col text-left">
              <div className="relative h-64 md:h-80 overflow-hidden border-b border-border/60">
                <ProjectVideo src="projects/klide-demo.mp4" poster="projects/Project - KLIDE.jpg" title="KLIDE demo" />
              </div>
              <div className="p-7 md:p-8 flex flex-col gap-3 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-card-foreground">
                    KLIDE <span className="text-muted-foreground font-normal">—</span> <span className="text-primary">AI-native IDE</span>
                  </h3>
                  <a
                    href="https://github.com/pierreprudh/KLIDE"
                    target="_blank" rel="noopener noreferrer"
                    aria-label="KLIDE on GitHub"
                    className="text-muted-foreground/60 hover:text-primary transition-colors shrink-0 mt-1.5"
                  >
                    <SiGithub size={19} />
                  </a>
                </div>
                <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed max-w-2xl">
                  Local-first IDE pairing a VS Code–style shell with a custom Rust agent loop — embedded terminals running delegate CLI agents, a 16-tool schema with approval-gated execution, cross-agent orchestration over MCP, and a LoRA fine-tuned on-device model for reliable local tool calling.
                </p>
                <MonoTags>rust · typescript · react · mcp · lora</MonoTags>
              </div>
            </div>
          </Reveal>

          {/* Strava dashboard tile */}
          <Reveal className="lg:col-span-4" delay={0.12}>
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
          <Reveal className="lg:col-span-7" delay={0.08}>
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
          <Reveal className="lg:col-span-5" delay={0.14}>
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
