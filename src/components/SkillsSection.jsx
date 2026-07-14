import { Bot, Cpu, Layers, LineChart } from "lucide-react"
import {
  SiOpenai, SiClaude, SiLangchain, SiN8N,
  SiOllama, SiHuggingface, SiApple,
  SiTypescript, SiReact, SiExpress, SiPostgresql, SiRust, SiDocker,
  SiPython, SiPytorch, SiTensorflow, SiPandas, SiApachespark, SiApachekafka,
} from "react-icons/si"
import { Reveal } from "./Reveal"
import { SectionHeader } from "./SectionHeader"

// Linear-style statement cards: huge claim top-left, vast negative space,
// one giant brand-logo watermark, attribution + tech logos pinned to the bottom.
const variants = {
  "gradient-cool": {
    card: "bg-gradient-to-br from-sky-100 via-indigo-100 to-violet-200 dark:from-sky-950/70 dark:via-indigo-950/60 dark:to-violet-950/70 text-slate-900 dark:text-slate-100 border border-black/5 dark:border-white/10",
    muted: "text-slate-900/60 dark:text-slate-100/60",
    watermark: "text-slate-900/[0.06] dark:text-white/[0.06]",
  },
  vivid: {
    card: "bg-[#dbf34e] text-neutral-950 border border-black/5",
    muted: "text-neutral-950/60",
    watermark: "text-neutral-950/[0.08]",
  },
  inverted: {
    card: "bg-foreground text-background border border-foreground",
    muted: "text-background/60",
    watermark: "text-background/[0.08]",
  },
  "gradient-warm": {
    card: "bg-gradient-to-br from-teal-100 via-cyan-100 to-sky-200 dark:from-teal-950/70 dark:via-cyan-950/60 dark:to-sky-950/70 text-slate-900 dark:text-slate-100 border border-black/5 dark:border-white/10",
    muted: "text-slate-900/60 dark:text-slate-100/60",
    watermark: "text-slate-900/[0.06] dark:text-white/[0.06]",
  },
}

const groups = [
  {
    icon: Bot,
    title: "Agentic Systems",
    concepts: "MCP · RAG · Multi-agent orchestration",
    logos: [
      { Logo: SiOpenai, label: "OpenAI" },
      { Logo: SiClaude, label: "Claude" },
      { Logo: SiLangchain, label: "LangChain / LangGraph" },
      { Logo: SiN8N, label: "n8n" },
    ],
    statement: "Agents that plan, call tools, and finish the job — from orchestration graphs to a runtime built from scratch.",
    span: "lg:col-span-8",
    variant: "gradient-cool",
    Watermark: SiLangchain,
    big: true,
  },
  {
    icon: Cpu,
    title: "LLM Infrastructure",
    concepts: "MLX · LoRA · KV-cache tuning",
    logos: [
      { Logo: SiOllama, label: "Ollama" },
      { Logo: SiHuggingface, label: "Hugging Face" },
      { Logo: SiApple, label: "Apple Silicon" },
    ],
    statement: "Local models, tuned and served on my own hardware — private by default.",
    span: "lg:col-span-4",
    variant: "vivid",
    Watermark: SiOllama,
  },
  {
    icon: Layers,
    title: "Full-stack Engineering",
    concepts: "CI/CD · Self-hosted infra",
    logos: [
      { Logo: SiTypescript, label: "TypeScript" },
      { Logo: SiReact, label: "React" },
      { Logo: SiExpress, label: "Express" },
      { Logo: SiPostgresql, label: "PostgreSQL" },
      { Logo: SiRust, label: "Rust" },
      { Logo: SiDocker, label: "Docker" },
    ],
    statement: "Typed front to back, containerized, deployed — products, not prototypes.",
    span: "lg:col-span-4",
    variant: "inverted",
    Watermark: SiReact,
  },
  {
    icon: LineChart,
    title: "Data & Machine Learning",
    concepts: "Computer vision · Predictive modeling",
    logos: [
      { Logo: SiPython, label: "Python" },
      { Logo: SiPytorch, label: "PyTorch" },
      { Logo: SiTensorflow, label: "TensorFlow" },
      { Logo: SiPandas, label: "Pandas" },
      { Logo: SiApachespark, label: "Apache Spark" },
      { Logo: SiApachekafka, label: "Apache Kafka" },
    ],
    statement: "From classical predictive modeling to deep learning for vision — grounded in the data first.",
    span: "lg:col-span-8",
    variant: "gradient-warm",
    Watermark: SiPytorch,
    big: true,
  },
]

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-12 md:py-16 border-t border-border/40 relative">
      <div className="container-wide">

        <SectionHeader
          index="03"
          label="Capabilities"
          title="What I work with"
          lead="Four areas, each backed by things that run in production — not a tool inventory."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">
          {groups.map(({ icon: Icon, title, concepts, logos, statement, span, variant, Watermark, big }, i) => {
            const v = variants[variant]
            return (
              <Reveal key={title} className={span} delay={0.05 + i * 0.06}>
                <div
                  className={`relative h-full overflow-hidden rounded-[1.75rem] p-8 md:p-10 flex flex-col text-left min-h-[380px] md:min-h-[440px] transition-[transform,box-shadow] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-[0_32px_80px_-32px_rgb(0_0_0/0.4)] ${v.card}`}
                >
                  {/* Giant brand watermark */}
                  {Watermark && (
                    <Watermark
                      aria-hidden="true"
                      className={`absolute -right-8 md:-right-14 top-1/2 -translate-y-1/2 h-[105%] w-auto pointer-events-none select-none ${v.watermark}`}
                    />
                  )}

                  {/* Statement */}
                  <p
                    className={`relative font-semibold tracking-tight leading-[1.15] ${
                      big ? "text-2xl md:text-4xl max-w-xl" : "text-xl md:text-2xl max-w-sm"
                    }`}
                  >
                    {statement}
                  </p>

                  {/* Attribution + logo strip */}
                  <div className="relative mt-auto pt-10 flex flex-wrap items-end justify-between gap-x-6 gap-y-5">
                    <div className="flex items-center gap-3.5">
                      <Icon className="h-6 w-6 shrink-0" strokeWidth={1.75} />
                      <div>
                        <div className="text-sm md:text-base font-semibold leading-tight">{title}</div>
                        <div className={`text-xs md:text-sm mt-0.5 ${v.muted}`}>{concepts}</div>
                      </div>
                    </div>
                    <div className={`flex items-center gap-3.5 ${v.muted}`}>
                      {logos.map(({ Logo, label }) => (
                        <Logo
                          key={label}
                          size={18}
                          title={label}
                          aria-label={label}
                          className="transition-opacity hover:opacity-100 opacity-80"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
