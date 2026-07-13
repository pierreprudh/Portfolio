import { Bot, Cpu, Layers, LineChart } from "lucide-react"
import {
  SiPython, SiOpenai, SiOllama, SiHuggingface, SiN8N, SiTypescript, SiReact,
  SiExpress, SiPostgresql, SiRust, SiFastapi, SiDocker, SiGithubactions,
  SiCloudflare, SiTailscale, SiTensorflow, SiPytorch, SiOpencv, SiPandas,
  SiApachespark, SiApachekafka, SiAnthropic, SiLangchain,
} from "react-icons/si"
import { Reveal } from "./Reveal"
import { SectionHeader } from "./SectionHeader"

const groups = [
  {
    icon: Bot,
    title: "Agentic Systems",
    proof: "Multi-agent pipelines shipped at Limpide and Ontraak — and in KLIDE, my own agent runtime.",
    accent: "from-primary/20 to-primary/5",
    chips: [
      { name: "MCP", icon: SiAnthropic },
      { name: "RAG", icon: SiLangchain },
      { name: "LangChain / LangGraph", icon: SiLangchain },
      { name: "AutoGen", icon: SiPython },
      { name: "n8n", icon: SiN8N },
      { name: "OpenAI / Mistral / Claude APIs", icon: SiOpenai },
    ],
  },
  {
    icon: Cpu,
    title: "LLM Infrastructure",
    proof: "On-device inference in production on Apple Silicon — tuned, secured, and self-hosted end-to-end.",
    accent: "from-emerald-500/20 to-emerald-500/5",
    chips: [
      { name: "Ollama", icon: SiOllama },
      { name: "MLX", icon: SiApachespark },
      { name: "LoRA fine-tuning", icon: SiHuggingface },
      { name: "KV-cache & context tuning", icon: SiOllama },
      { name: "Hugging Face", icon: SiHuggingface },
    ],
  },
  {
    icon: Layers,
    title: "Full-stack Engineering",
    proof: "The Ontraak assistant stack: typed front to back, containerized, tunneled, and CI/CD-deployed.",
    accent: "from-violet-500/20 to-violet-500/5",
    chips: [
      { name: "TypeScript", icon: SiTypescript },
      { name: "React", icon: SiReact },
      { name: "Express", icon: SiExpress },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "FastAPI", icon: SiFastapi },
      { name: "Rust", icon: SiRust },
      { name: "Docker", icon: SiDocker },
      { name: "CI/CD", icon: SiGithubactions },
      { name: "Caddy / Cloudflare", icon: SiCloudflare },
      { name: "Tailscale", icon: SiTailscale },
    ],
  },
  {
    icon: LineChart,
    title: "Data & Machine Learning",
    proof: "From predictive models at the Ministère de l'Éducation to computer vision in the energy market.",
    accent: "from-sky-500/20 to-sky-500/5",
    chips: [
      { name: "Python", icon: SiPython },
      { name: "PyTorch", icon: SiPytorch },
      { name: "TensorFlow", icon: SiTensorflow },
      { name: "Computer Vision", icon: SiOpencv },
      { name: "Pandas / SQL", icon: SiPandas },
      { name: "Spark / Kafka", icon: SiApachekafka },
    ],
  },
]

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <SectionHeader
          kicker="Capabilities"
          title="What I"
          accent="work with"
          lead="Not a tool inventory — the four areas I operate in, each backed by things that run in production."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
          {groups.map(({ icon: Icon, title, proof, accent, chips }, i) => (
            <Reveal key={title} delay={0.08 + i * 0.07}>
              <div className="group h-full rounded-xl border border-border/70 bg-card p-6 text-left card-hover">
                <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${accent} border border-border/50 mb-4`}>
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-card-foreground mb-1.5">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{proof}</p>
                <div className="flex flex-wrap gap-2">
                  {chips.map(({ name, icon: ChipIcon }) => (
                    <span
                      key={name}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono border border-border/70 bg-background/60 text-foreground/75"
                    >
                      <ChipIcon className="h-3 w-3 text-primary/80" />
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
