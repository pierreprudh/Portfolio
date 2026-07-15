import { ArrowUpRight, MapPin } from "lucide-react"
import {
  SiApple, SiDocker, SiExpress, SiLangchain, SiN8N, SiOllama,
  SiPostgresql, SiPython, SiReact, SiTypescript,
} from "react-icons/si"
import { Reveal } from "./Reveal"
import { SectionHeader } from "./SectionHeader"

const experiences = [
  {
    role: "AI Engineer",
    company: "Ontraak",
    url: "https://ontraak.com",
    location: "Paris, France",
    period: "2026 —",
    current: true,
    summary:
      "I built the company's AI assistant from the ground up and I keep it running in production, entirely on our own hardware.",
    highlights: [
      "Multi-agent stack for customer service, from agent design to production",
      "Local inference on Apple Silicon with Ollama and MLX, tuned for resident models and KV cache reuse",
      "Typed React and Express services in Docker, with PostgreSQL, private search and n8n automations behind Caddy and a Cloudflare tunnel",
      "Security end to end: JWT auth with revocation, rate limiting, sandboxed code execution, admin gated behind Tailscale with zero public ports",
      "CI/CD pipeline, daily backups and restore runbooks that are actually tested",
      "AI watch for the team: internal training sessions and presentations on what is worth adopting",
    ],
    tags: [
      { label: "typescript", Logo: SiTypescript },
      { label: "react", Logo: SiReact },
      { label: "express", Logo: SiExpress },
      { label: "postgresql", Logo: SiPostgresql },
      { label: "ollama", Logo: SiOllama },
      { label: "mlx", Logo: SiApple },
      { label: "docker", Logo: SiDocker },
      { label: "ci/cd" },
    ],
  },
  {
    role: "AI Engineer Intern",
    company: "Limpide",
    url: "https://limpide.net",
    location: "Prague, Czechia",
    period: "2025",
    summary: "Six months building document intelligence for the energy market.",
    kpis: [
      { value: "95%", label: "extraction accuracy" },
      { value: "20s", label: "to process an invoice" },
      { value: "1 day", label: "saved per consultant, monthly" },
    ],
    highlights: [
      "Computer vision pipeline extracting structured information from energy market documents, built on fine-tuned models and fed directly into the company's CRM",
      "Self-improving pipeline with continuous prompt optimization, running mostly on self-hosted n8n and orchestrating AutoGen agents",
      "Multi-agent architecture combining MCP and RAG, deployed on Azure",
    ],
    tags: [
      { label: "python", Logo: SiPython },
      { label: "autogen" },
      { label: "n8n", Logo: SiN8N },
      { label: "langchain", Logo: SiLangchain },
      { label: "mcp" },
      { label: "rag" },
      { label: "ocr" },
      { label: "azure" },
    ],
  },
  {
    role: "Data Scientist Intern",
    company: "Ministère de l'Éducation Nationale",
    location: "Paris, France",
    period: "2023",
    summary: "A summer of data science inside the French Ministry of Education.",
    highlights: [
      "Predictive model for staff management, trained on student grades and academic trajectories",
      "Self-assessment tool for dataset analysis over the ministry's relational databases",
    ],
    tags: [
      { label: "python", Logo: SiPython },
      { label: "machine learning" },
      { label: "sql" },
    ],
  },
  {
    role: "Data Protection Officer Intern",
    company: "Confiance Digitale",
    location: "Massy, France",
    period: "2022",
    summary: "First internship, on the infrastructure and security side.",
    highlights: [
      "Set up and administered virtual machines through Active Directory, with patch management across the fleet",
      "Managed Microsoft domains and deployed anti-spam protection on them",
    ],
    tags: [
      { label: "active directory" },
      { label: "sysadmin" },
      { label: "security" },
    ],
  },
]

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-12 md:py-16 relative">
      <div className="container-wide">

        <SectionHeader index="02" label="Experience" title="Experience" />

        <div className="mt-4 border-t border-border/50">
          {experiences.map((exp, i) => (
            <Reveal key={exp.company + exp.period} delay={0.05 + i * 0.05}>
              <article className="group grid grid-cols-1 lg:grid-cols-[8rem_1fr_auto] gap-4 lg:gap-8 py-8 md:py-10 border-b border-border/50 text-left transition-colors duration-300 hover:bg-card/40 md:px-4 md:-mx-4 rounded-lg">

                {/* Period, with the location alongside it below lg */}
                <div className="flex items-baseline justify-between lg:justify-start lg:pt-1 font-mono text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    {exp.current && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />}
                    <span className={exp.current ? "text-primary" : ""}>{exp.period}</span>
                  </span>
                  <span className="lg:hidden inline-flex items-center gap-1.5 text-xs text-muted-foreground/70">
                    <MapPin size={12} className="text-muted-foreground/50" />
                    {exp.location}
                  </span>
                </div>

                {/* Role + detail */}
                <div className="max-w-3xl">
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground">
                    {exp.role}
                    {exp.url ? (
                      <a
                        href={exp.url}
                        target="_blank"
                        rel="noreferrer"
                        className={`ml-3.5 inline-flex items-center gap-1 group/link ${exp.current ? "text-primary" : "text-foreground/80"}`}
                      >
                        {exp.company}
                        <ArrowUpRight
                          size={16}
                          strokeWidth={2}
                          className="text-muted-foreground/50 transition-all duration-300 group-hover/link:text-primary group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                        />
                      </a>
                    ) : (
                      <span className={`ml-3.5 ${exp.current ? "text-primary" : "text-foreground/80"}`}>{exp.company}</span>
                    )}
                  </h3>
                  <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed mt-2">
                    {exp.summary}
                  </p>

                  {exp.kpis && (
                    <div className="flex flex-wrap gap-x-10 gap-y-4 mt-5">
                      {exp.kpis.map(({ value, label }) => (
                        <div key={label}>
                          <div className="font-mono text-xl md:text-2xl font-semibold tracking-tight text-foreground">{value}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  <ul className="mt-4 space-y-2.5">
                    {exp.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3 text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                        <span className="mt-[11px] h-px w-3.5 shrink-0 bg-primary/50" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-5">
                    {exp.tags.map(({ label, Logo }) => (
                      <span key={label} className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground/70">
                        {Logo && <Logo size={13} className="opacity-80" aria-hidden="true" />}
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div className="hidden lg:flex items-start gap-1.5 font-mono text-xs text-muted-foreground/70 pt-2">
                  <MapPin size={13} className="mt-px text-muted-foreground/50" />
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
