import { SiGithub } from "react-icons/si"
import { ArrowUpRight } from "lucide-react"
import { useEffect, useRef } from "react"
import { Reveal } from "./Reveal"
import { SectionHeader } from "./SectionHeader"

const archive = [
  {
    id: "doc-extraction",
    title: "Agentic document extraction",
    description: "Self-improving AutoGen agents over energy-market documents",
    tags: "python · autogen · ocr",
    githubUrl: "https://github.com/pierreprudh/Document-Information-Extraction",
  },
  {
    id: "mask-detection",
    title: "Masked Face Detection",
    description: "Real-time mask classification, MobileNet / EfficientNet",
    tags: "deep learning · cv",
    githubUrl: "https://github.com/WacimN/SF-mask-detection",
  },
  {
    id: "anfr",
    title: "French Mobile Network Analysis",
    description: "Big-data pipeline over ANFR geospatial data",
    tags: "hadoop · spark · kafka",
    githubUrl: "https://github.com/pierreprudh/Antens_Map",
  },
  {
    id: "animal-faces",
    title: "Animal Face Recognition",
    description: "CNN classification of animal faces",
    tags: "keras · cv",
    githubUrl: "https://github.com/pierreprudh/Animal_face_recognition",
  },
  {
    id: "file-analysis",
    title: "File Analysis Tool",
    description: "CSV/XLSX processing with JSON + PDF report generation",
    tags: "python · pandas",
    githubUrl: "https://github.com/pierreprudh/File-Analysis",
  },
]

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
    <section id="projects" className="py-12 md:py-16 border-t border-border/40 relative">
      <div className="container-wide">

        <SectionHeader
          index="04"
          label="Selected work"
          title="Projects"
          lead="Three systems I'm proud of — and the earlier experiments that led here."
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

        {/* Archive index */}
        <Reveal delay={0.05}>
          <div className="flex items-baseline gap-4 mt-16 mb-2">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">archive</span>
            <div className="h-px flex-1 self-center bg-border/60" />
          </div>
        </Reveal>

        <div>
          {archive.map((project, i) => (
            <Reveal key={project.id} delay={0.03 + i * 0.03}>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[1fr_auto] md:grid-cols-[minmax(0,2fr)_minmax(0,2.4fr)_minmax(0,1.4fr)_auto] items-baseline gap-4 md:gap-8 py-4 border-b border-border/40 text-left transition-colors hover:bg-card/40 md:px-4 md:-mx-4 rounded-md"
              >
                <span className="font-medium text-foreground/90 group-hover:text-primary transition-colors leading-snug">
                  {project.title}
                </span>
                <span className="hidden md:block text-sm text-muted-foreground truncate">{project.description}</span>
                <span className="hidden md:flex flex-wrap gap-x-3 font-mono text-[11px] text-muted-foreground/70">
                  {project.tags.split("·").map((tag) => (
                    <span key={tag.trim()}>{tag.trim()}</span>
                  ))}
                </span>
                <ArrowUpRight size={15} className="text-muted-foreground/40 group-hover:text-primary transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 self-center" />
              </a>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}
