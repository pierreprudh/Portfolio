import { SiGithub, SiLeetcode } from "react-icons/si"
import { ArrowUpRight } from "lucide-react"
import { useEffect, useRef } from "react"
import { Reveal } from "./Reveal"
import { SectionHeader } from "./SectionHeader"

const flagships = [
  {
    id: "klide",
    title: "KLIDE — AI-native IDE",
    description: "Local-first AI-native IDE pairing a VS Code–style shell (Monaco editor, diff review) with a custom Rust agent loop, embedded terminals running delegate CLI agents, and a 16-tool schema with approval-gated execution. A cross-agent orchestration layer (Sessions MCP) drives sibling sessions and parallel git worktrees, and a LoRA fine-tuned on-device model handles local tool calling reliably.",
    image: "projects/Project - KLIDE.jpg",
    video: "projects/klide-demo.mp4",
    tags: ["Rust", "TypeScript", "React", "MCP", "LoRA"],
    githubUrl: "https://github.com/pierreprudh/KLIDE",
  },
  {
    id: "ai-stack",
    title: "Self-hosted private AI stack",
    description: "Docker-orchestrated AI platform for a small team — chat UI, Ollama LLM runtime, code-execution sandbox, web search, and automation, all on a private network with zero data leaving it. The system I architect and operate in production at Ontraak.",
    image: "projects/AI stack.jpg",
    tags: ["TypeScript", "React", "Express", "PostgreSQL", "Ollama", "Docker"],
  },
  {
    id: "sav-agent",
    title: "Process-aware customer-service AI agent",
    description: "Agentic after-sales-support pipeline built on LangGraph — identifies the customer, auto-creates a ticket, runs a structured diagnostic dialogue, and routes each case to the right resolution branch. Runs fully local on Ollama (or hybrid), with RAG over past execution traces, MCP tool servers, and an A/B benchmark harness proving memory-augmented agents beat blank-slate ones.",
    image: "projects/ai-chabot.jpg",
    tags: ["Python", "LangGraph", "Ollama", "ChromaDB", "RAG", "MCP"],
  },
]

const archive = [
  {
    id: "doc-extraction",
    title: "Agentic document extraction",
    description: "Multi-agent AutoGen pipeline with self-improving prompt optimization, applied to energy-market documents.",
    tags: ["Python", "AutoGen", "OCR"],
    githubUrl: "https://github.com/pierreprudh/Document-Information-Extraction",
  },
  {
    id: "strava",
    title: "Strava Dashboard",
    description: "Interactive React + Python dashboard visualizing training data from the Strava API.",
    tags: ["React", "Python", "API"],
    githubUrl: "https://github.com/pierreprudh/Strava-Dashboard",
  },
  {
    id: "mask-detection",
    title: "Masked Face Detection",
    description: "Real-time mask classification with MobileNet and EfficientNet architectures.",
    tags: ["Deep Learning", "Computer Vision"],
    githubUrl: "https://github.com/WacimN/SF-mask-detection",
  },
  {
    id: "anfr",
    title: "French Mobile Network Analysis",
    description: "Big-data pipeline over ANFR geospatial data with Hadoop, Kafka, Spark, and OpenSearch.",
    tags: ["Hadoop", "Spark", "Kafka"],
    githubUrl: "https://github.com/pierreprudh/Antens_Map",
  },
  {
    id: "animal-faces",
    title: "Animal Face Recognition",
    description: "CNN-based classification of animal faces with TensorFlow/Keras.",
    tags: ["Keras", "Computer Vision"],
    githubUrl: "https://github.com/pierreprudh/Animal_face_recognition",
  },
  {
    id: "file-analysis",
    title: "File Analysis Tool",
    description: "CSV/XLSX processing utility generating JSON summaries and PDF dashboard reports.",
    tags: ["Python", "Pandas"],
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

const Tag = ({ children }) => (
  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono border border-border/70 bg-primary/10 text-foreground/75">
    {children}
  </span>
)

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <SectionHeader
          kicker="Selected work"
          title="Featured"
          accent="Projects"
          lead="Three systems I'm proud of — and the earlier experiments that led here."
        />

        {/* Flagships */}
        <div className="flex flex-col gap-10 mt-14">
          {flagships.map((project, i) => (
            <Reveal key={project.id} delay={0.05}>
              <article className="group grid grid-cols-1 lg:grid-cols-2 rounded-xl border border-border/70 bg-card overflow-hidden card-hover">
                <div className={`relative h-56 lg:h-full min-h-56 overflow-hidden ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  {project.video ? (
                    <ProjectVideo src={project.video} poster={project.image} title={project.title} />
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-7 lg:p-8 text-left flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-card-foreground">
                    {project.title}
                  </h3>
                  <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4 w-fit"
                    >
                      <SiGithub size={16} /> View source <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Archive */}
        <Reveal delay={0.05}>
          <div className="flex items-center gap-4 mt-16 mb-8">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground shrink-0">More projects</span>
            <div className="h-px flex-1 bg-border/70" />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {archive.map((project, i) => (
            <Reveal key={project.id} delay={0.04 + (i % 3) * 0.05}>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col h-full rounded-xl border border-border/70 bg-card p-5 text-left card-hover"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-semibold text-card-foreground leading-snug">{project.title}</h3>
                  <ArrowUpRight size={16} className="shrink-0 text-muted-foreground/60 group-hover:text-primary transition-colors mt-0.5" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[11px] font-mono text-muted-foreground/80">
                      {tag}{project.tags.indexOf(tag) < project.tags.length - 1 ? " ·" : ""}
                    </span>
                  ))}
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        {/* CTAs */}
        <div className="text-center mt-14 flex justify-center items-center gap-6">
          <a
            href="https://github.com/pierreprudh"
            className="cosmic-button w-fit flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            More on GitHub <SiGithub size={18} />
          </a>
          <a
            href="https://leetcode.com/pierreprudh"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiLeetcode size={16} /> LeetCode
          </a>
        </div>
      </div>
    </section>
  )
}
