import { Briefcase, MapPin } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const RevealBox = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.08, rootMargin: "0px 0px -50px 0px" }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(40px)",
        transition: `opacity 0.75s ease ${delay}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

const experiences = [
  {
    role: "AI Engineer",
    company: "Ontraak",
    location: "Paris, France",
    period: "Feb 2026 — Present",
    current: true,
    highlights: [
      "Architected and operate a self-hosted, privacy-first AI assistant stack running fully on-premise on Apple Silicon — React/TypeScript UI, Express API, PostgreSQL, and local LLM inference via Ollama/MLX with Metal GPU offload.",
      "Tuned on-device inference (KV-cache and context sizing, persistent model residency) and integrated private web search and n8n automation behind a Cloudflare Tunnel and Caddy reverse proxy.",
      "Engineered security and reliability end-to-end: JWT auth with silent refresh and revocation, rate limiting, sandboxed code execution, Tailscale-gated admin with zero public ports, and automated backups with tested restore runbooks.",
    ],
    tags: ["TypeScript", "React", "Express", "PostgreSQL", "Ollama", "MLX", "Docker", "n8n", "CI/CD"],
  },
  {
    role: "AI Engineer Intern",
    company: "Limpide",
    location: "Prague, Czech Republic",
    period: "May 2025 — Nov 2025",
    highlights: [
      "Designed a computer-vision document information extraction tool for the energy market, using fine-tuned AI models and self-improving agents with continuous prompt optimization.",
      "Developed collaborative agents and deployed a multi-agent architecture integrating MCP and RAG.",
    ],
    tags: ["Python", "AutoGen", "LangChain", "n8n", "MCP", "RAG", "OCR", "Azure"],
  },
  {
    role: "Data Scientist Intern",
    company: "Ministère de l'Éducation Nationale",
    location: "Paris, France",
    period: "May 2023 — Aug 2023",
    highlights: [
      "Implemented a predictive model for staff management based on student grades and academic trajectories.",
      "Built a self-assessment tool for dataset analysis, processing and visualizing data from relational databases.",
    ],
    tags: ["Python", "Machine Learning", "SQL", "Data Visualization"],
  },
  {
    role: "Data Protection Officer Intern",
    company: "Confiance Digitale",
    location: "Massy, France",
    period: "May 2022 — Aug 2022",
    highlights: [
      "Set up and administered virtual machines via Active Directory, implemented patch management, and deployed anti-spam solutions across Microsoft domains.",
    ],
    tags: ["Active Directory", "Sysadmin", "Security"],
  },
]

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">

        <RevealBox delay={0}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-primary/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Career</span>
            <div className="h-px w-10 bg-primary/40" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Work <span className="text-primary">Experience</span>
          </h2>
        </RevealBox>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border/70 md:-translate-x-px" />

          <div className="flex flex-col gap-12">
            {experiences.map((exp, i) => (
              <RevealBox key={exp.company + exp.period} delay={0.1 + i * 0.08}>
                <div className={`relative flex flex-col md:flex-row gap-6 md:gap-0 ${i % 2 === 0 ? "" : "md:flex-row-reverse"}`}>

                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 top-1.5 -translate-x-1/2 z-10">
                    <span className="relative flex h-3.5 w-3.5">
                      {exp.current && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-50" />
                      )}
                      <span className={`relative inline-flex rounded-full h-3.5 w-3.5 border-2 border-background ${exp.current ? "bg-primary" : "bg-muted-foreground/60"}`} />
                    </span>
                  </div>

                  {/* Period — opposite side on desktop, hugging the center line */}
                  <div className={`hidden md:flex w-1/2 items-start ${i % 2 === 0 ? "justify-end pr-16" : "justify-start pl-16"}`}>
                    <span className="text-sm font-mono text-muted-foreground pt-0.5">{exp.period}</span>
                  </div>

                  {/* Card — padded on the line-facing side */}
                  <div className={`w-full md:w-1/2 pl-10 md:pl-0 ${i % 2 === 0 ? "md:pl-16" : "md:pr-16"}`}>
                    <div className="group rounded-2xl border border-border/70 bg-card p-6 text-left hover:border-primary/30 transition-colors duration-300">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2 md:hidden">
                        <span className="font-mono">{exp.period}</span>
                      </div>
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <h3 className="font-semibold text-lg text-foreground">{exp.role}</h3>
                        {exp.current && (
                          <span className="shrink-0 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-primary/10 text-primary border border-primary/30">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground mb-4">
                        <span className="inline-flex items-center gap-1.5 text-primary font-medium">
                          <Briefcase size={13} /> {exp.company}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={13} /> {exp.location}
                        </span>
                      </div>
                      <ul className="flex flex-col gap-2 mb-4">
                        {exp.highlights.map((h, j) => (
                          <li key={j} className="text-sm text-muted-foreground leading-relaxed pl-4 relative">
                            <span className="absolute left-0 top-[0.55em] h-1 w-1 rounded-full bg-primary/60" />
                            {h}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-primary/10 border border-border/60 text-secondary-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </RevealBox>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
