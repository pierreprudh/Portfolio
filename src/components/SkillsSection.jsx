import { Bot, Cpu, Layers, LineChart } from "lucide-react"
import { Reveal } from "./Reveal"
import { SectionHeader } from "./SectionHeader"

const groups = [
  {
    icon: Bot,
    index: "a",
    title: "Agentic Systems",
    proof: "Multi-agent pipelines shipped at Limpide and Ontraak — and in KLIDE, my own agent runtime.",
    chips: ["mcp", "rag", "langchain / langgraph", "autogen", "n8n", "openai · mistral · claude"],
    span: "lg:col-span-7",
  },
  {
    icon: Cpu,
    index: "b",
    title: "LLM Infrastructure",
    proof: "On-device inference in production on Apple Silicon — tuned, secured, self-hosted end-to-end.",
    chips: ["ollama", "mlx", "lora fine-tuning", "kv-cache tuning", "hugging face"],
    span: "lg:col-span-5",
  },
  {
    icon: Layers,
    index: "c",
    title: "Full-stack Engineering",
    proof: "The Ontraak assistant stack: typed front to back, containerized, tunneled, CI/CD-deployed.",
    chips: ["typescript", "react", "express", "postgresql", "fastapi", "rust", "docker", "ci/cd", "caddy · cloudflare", "tailscale"],
    span: "lg:col-span-5",
  },
  {
    icon: LineChart,
    index: "d",
    title: "Data & Machine Learning",
    proof: "From predictive models at the Ministère de l'Éducation to computer vision in the energy market.",
    chips: ["python", "pytorch", "tensorflow", "computer vision", "pandas · sql", "spark · kafka"],
    span: "lg:col-span-7",
  },
]

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 md:py-32 border-t border-border/40 relative">
      <div className="container-wide">

        <SectionHeader
          index="03"
          label="Capabilities"
          title="What I work with"
          lead="Four areas, each backed by things that run in production — not a tool inventory."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">
          {groups.map(({ icon: Icon, index, title, proof, chips, span }, i) => (
            <Reveal key={title} className={span} delay={0.05 + i * 0.06}>
              <div className="tile group h-full p-7 md:p-8 text-left flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  <span className="font-mono text-xs text-muted-foreground/50">/{index}</span>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-card-foreground mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-md">{proof}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                  {chips.map((name) => (
                    <span
                      key={name}
                      className="px-2.5 py-1 rounded-full font-mono text-[11px] border border-border/60 text-foreground/70 group-hover:border-border transition-colors"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
