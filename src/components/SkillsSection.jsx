import { Bot, Cpu, Layers, LineChart } from "lucide-react"
import { Reveal } from "./Reveal"
import { SectionHeader } from "./SectionHeader"

// Linear-style statement cards: huge claim top-left, vast negative space,
// giant watermark glyph, attribution row pinned to the bottom.
const variants = {
  "gradient-cool": {
    card: "bg-gradient-to-br from-sky-100 via-indigo-100 to-violet-200 dark:from-sky-950/70 dark:via-indigo-950/60 dark:to-violet-950/70 text-slate-900 dark:text-slate-100 border border-black/5 dark:border-white/10",
    watermark: "text-slate-900/6 dark:text-white/6",
    muted: "text-slate-900/60 dark:text-slate-100/60",
  },
  vivid: {
    card: "bg-[#dbf34e] text-neutral-950 border border-black/5",
    watermark: "text-neutral-950/8",
    muted: "text-neutral-950/60",
  },
  inverted: {
    card: "bg-foreground text-background border border-foreground",
    watermark: "text-background/8",
    muted: "text-background/60",
  },
  "gradient-warm": {
    card: "bg-gradient-to-br from-teal-100 via-cyan-100 to-sky-200 dark:from-teal-950/70 dark:via-cyan-950/60 dark:to-sky-950/70 text-slate-900 dark:text-slate-100 border border-black/5 dark:border-white/10",
    watermark: "text-slate-900/6 dark:text-white/6",
    muted: "text-slate-900/60 dark:text-slate-100/60",
  },
}

const groups = [
  {
    icon: Bot,
    title: "Agentic Systems",
    tools: "MCP · RAG · LangChain · LangGraph · AutoGen · n8n",
    statement: "Multi-agent pipelines shipped at Limpide and Ontraak — and in KLIDE, my own agent runtime.",
    span: "lg:col-span-8",
    variant: "gradient-cool",
    big: true,
  },
  {
    icon: Cpu,
    title: "LLM Infrastructure",
    tools: "Ollama · MLX · LoRA · KV-cache · Hugging Face",
    statement: "On-device inference in production on Apple Silicon — self-hosted end-to-end.",
    span: "lg:col-span-4",
    variant: "vivid",
  },
  {
    icon: Layers,
    title: "Full-stack Engineering",
    tools: "TypeScript · React · Express · PostgreSQL · Rust · Docker",
    statement: "The Ontraak assistant stack: typed front to back, containerized, CI/CD-deployed.",
    span: "lg:col-span-4",
    variant: "inverted",
  },
  {
    icon: LineChart,
    title: "Data & Machine Learning",
    tools: "Python · PyTorch · Computer Vision · Pandas · Spark · Kafka",
    statement: "From predictive models at the Ministère de l'Éducation to computer vision in the energy market.",
    span: "lg:col-span-8",
    variant: "gradient-warm",
    big: true,
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
          {groups.map(({ icon: Icon, title, tools, statement, span, variant, big }, i) => {
            const v = variants[variant]
            return (
              <Reveal key={title} className={span} delay={0.05 + i * 0.06}>
                <div
                  className={`relative h-full overflow-hidden rounded-[1.75rem] p-8 md:p-10 flex flex-col text-left min-h-[380px] md:min-h-[440px] transition-[transform,box-shadow] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-[0_32px_80px_-32px_rgb(0_0_0/0.4)] ${v.card}`}
                >
                  {/* Watermark glyph */}
                  <Icon
                    aria-hidden="true"
                    strokeWidth={0.75}
                    className={`absolute -right-12 top-1/2 -translate-y-1/2 h-[135%] w-auto pointer-events-none select-none ${v.watermark}`}
                  />

                  {/* Statement */}
                  <p
                    className={`relative font-semibold tracking-tight leading-[1.15] ${
                      big ? "text-2xl md:text-4xl max-w-xl" : "text-xl md:text-2xl max-w-sm"
                    }`}
                  >
                    {statement}
                  </p>

                  {/* Attribution */}
                  <div className="relative mt-auto pt-10 flex items-center gap-3.5">
                    <Icon className="h-6 w-6 shrink-0" strokeWidth={1.75} />
                    <div>
                      <div className="text-sm md:text-base font-semibold leading-tight">{title}</div>
                      <div className={`text-xs md:text-sm mt-0.5 ${v.muted}`}>{tools}</div>
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
