import { Reveal } from "./Reveal"
import { SectionHeader } from "./SectionHeader"

const experiences = [
  {
    role: "AI Engineer",
    company: "Ontraak",
    location: "paris, fr",
    period: "2026 —",
    current: true,
    summary: "Architect and operate a self-hosted, privacy-first AI assistant stack running fully on-premise on Apple Silicon — local LLM inference (Ollama/MLX, Metal offload), typed React/Express services, and security engineered end-to-end: JWT auth with revocation, sandboxed code execution, Tailscale-gated admin with zero public ports, CI/CD and tested backup runbooks.",
    tags: ["typescript", "react", "express", "postgresql", "ollama", "mlx", "docker", "ci/cd"],
  },
  {
    role: "AI Engineer Intern",
    company: "Limpide",
    location: "prague, cz",
    period: "2025",
    summary: "Computer-vision document information extraction for the energy market — fine-tuned models and self-improving agents with continuous prompt optimization; deployed a multi-agent architecture integrating MCP and RAG.",
    tags: ["python", "autogen", "langchain", "mcp", "rag", "ocr", "azure"],
  },
  {
    role: "Data Scientist Intern",
    company: "Ministère de l'Éducation Nationale",
    location: "paris, fr",
    period: "2023",
    summary: "Predictive model for staff management based on student grades and academic trajectories; built a self-assessment tool for dataset analysis over relational databases.",
    tags: ["python", "machine learning", "sql"],
  },
  {
    role: "Data Protection Officer Intern",
    company: "Confiance Digitale",
    location: "massy, fr",
    period: "2022",
    summary: "Virtual machine administration via Active Directory, patch management, and anti-spam deployment across Microsoft domains.",
    tags: ["active directory", "sysadmin", "security"],
  },
]

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-12 md:py-16 border-t border-border/40 relative">
      <div className="container-wide">

        <SectionHeader index="02" label="Career" title="Experience" />

        <div className="mt-4 border-t border-border/50">
          {experiences.map((exp, i) => (
            <Reveal key={exp.company + exp.period} delay={0.05 + i * 0.05}>
              <article className="group grid grid-cols-1 md:grid-cols-[8rem_1fr_auto] gap-3 md:gap-8 py-8 md:py-10 border-b border-border/50 text-left transition-colors duration-300 hover:bg-card/40 md:px-4 md:-mx-4 rounded-lg">

                {/* Period */}
                <div className="font-mono text-sm text-muted-foreground pt-1 flex items-start gap-2">
                  {exp.current && (
                    <span className="relative flex h-2 w-2 mt-1.5 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                    </span>
                  )}
                  <span className={exp.current ? "text-primary" : ""}>{exp.period}</span>
                </div>

                {/* Role + summary */}
                <div className="max-w-3xl">
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground">
                    {exp.role} <span className="text-muted-foreground font-normal">·</span>{" "}
                    <span className={exp.current ? "text-primary" : "text-foreground/80"}>{exp.company}</span>
                  </h3>
                  <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed mt-3">
                    {exp.summary}
                  </p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-4">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[11px] text-muted-foreground/70">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div className="hidden md:block font-mono text-xs text-muted-foreground/70 pt-2">
                  {exp.location}
                </div>

              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
