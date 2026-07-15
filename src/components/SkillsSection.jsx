import { useState } from "react"
import { ArrowDownLeft, ArrowUpRight, Bot, Cpu, Layers, LineChart } from "lucide-react"
import { motion as Motion, useReducedMotion } from "motion/react"
import {
  SiOpenai, SiAnthropic, SiLangchain, SiN8N,
  SiOllama, SiHuggingface, SiApple,
  SiTypescript, SiReact, SiExpress, SiPostgresql, SiRust, SiDocker, SiFastapi,
  SiPython, SiPytorch, SiTensorflow, SiPandas, SiApachespark, SiApachekafka,
  SiScikitlearn, SiOpencv,
} from "react-icons/si"
import { Reveal, Parallax } from "./Reveal"
import { SectionHeader } from "./SectionHeader"

// Linear-style statement cards: huge claim top-left, vast negative space,
// one giant brand-logo watermark, attribution + tech logos pinned to the bottom.
// Click to flip: the back lists the full stack in plain words (recruiter-friendly).
const variants = {
  "gradient-cool": {
    card: "bg-gradient-to-br from-sky-100 via-indigo-100 to-violet-200 dark:from-sky-950/70 dark:via-indigo-950/60 dark:to-violet-950/70 text-slate-900 dark:text-slate-100 border border-black/5 dark:border-white/10",
    muted: "text-slate-900/60 dark:text-slate-100/60",
    watermark: "text-slate-900/[0.06] dark:text-white/[0.06]",
    chip: "border-slate-900/15 dark:border-white/15",
  },
  vivid: {
    card: "bg-[#dbf34e] text-neutral-950 border border-black/5",
    muted: "text-neutral-950/60",
    watermark: "text-neutral-950/[0.08]",
    chip: "border-neutral-950/20",
  },
  inverted: {
    card: "bg-foreground text-background border border-foreground",
    muted: "text-background/60",
    watermark: "text-background/[0.08]",
    chip: "border-background/20",
  },
  "gradient-warm": {
    card: "bg-gradient-to-br from-teal-100 via-cyan-100 to-sky-200 dark:from-teal-950/70 dark:via-cyan-950/60 dark:to-sky-950/70 text-slate-900 dark:text-slate-100 border border-black/5 dark:border-white/10",
    muted: "text-slate-900/60 dark:text-slate-100/60",
    watermark: "text-slate-900/[0.06] dark:text-white/[0.06]",
    chip: "border-slate-900/15 dark:border-white/15",
  },
}

const groups = [
  {
    icon: Bot,
    title: "Agentic Systems",
    concepts: "Tool calling · MCP · RAG · Evals",
    logos: [
      { Logo: SiOpenai, label: "OpenAI" },
      { Logo: SiAnthropic, label: "Anthropic" },
      { Logo: SiLangchain, label: "LangChain / LangGraph" },
      { Logo: SiN8N, label: "n8n" },
    ],
    stackGroups: [
      { label: "Orchestration", items: ["LangChain", "LangGraph", "AutoGen", "n8n", "Multi-agent systems", "Custom agent runtime"] },
      { label: "Model APIs & routing", items: ["OpenAI", "Anthropic", "Mistral", "OpenRouter"] },
      { label: "Retrieval, memory & protocols", items: ["MCP", "RAG", "ChromaDB", "Agent memory"] },
      { label: "Reliability", items: ["Structured outputs", "Approval gates", "Prompt optimization", "A/B evaluation"] },
    ],
    statement: "Agents that plan, call tools, and finish the job. From orchestration graphs to a runtime built from scratch.",
    span: "lg:col-span-8",
    variant: "gradient-cool",
    watermarkSrc: "/logos/langchain.png",
    big: true,
  },
  {
    icon: Cpu,
    title: "LLM Infrastructure",
    concepts: "Metal · Quantization · KV-cache · LoRA",
    logos: [
      { Logo: SiOllama, label: "Ollama" },
      { Logo: SiHuggingface, label: "Hugging Face" },
      { Logo: SiApple, label: "Apple Silicon" },
    ],
    stackGroups: [
      { label: "Serving", items: ["Ollama", "llama.cpp", "MLX"] },
      { label: "Optimization", items: ["Metal acceleration", "Quantization", "KV-cache reuse", "Model residency"] },
      { label: "Tuning & models", items: ["LoRA fine-tuning", "Hugging Face"] },
      { label: "Platform", items: ["Apple Silicon", "Self-hosted inference"] },
    ],
    statement: "Local models, tuned and served on my own hardware. Private by default.",
    span: "lg:col-span-4",
    variant: "vivid",
    watermarkSrc: "/logos/llama-cpp.png",
  },
  {
    icon: Layers,
    title: "Full-stack Engineering",
    concepts: "Security · Sandboxing · Private networking",
    logos: [
      { Logo: SiTypescript, label: "TypeScript" },
      { Logo: SiReact, label: "React" },
      { Logo: SiExpress, label: "Express" },
      { Logo: SiFastapi, label: "FastAPI" },
      { Logo: SiPostgresql, label: "PostgreSQL" },
      { Logo: SiRust, label: "Rust" },
      { Logo: SiDocker, label: "Docker" },
    ],
    stackGroups: [
      { label: "Frontend", items: ["React", "Tailwind CSS", "Vite"] },
      { label: "Backend", items: ["TypeScript", "Express", "FastAPI", "Rust", "PostgreSQL"] },
      { label: "Infra & deploy", items: ["Docker", "CI/CD", "Caddy", "Cloudflare", "Tailscale"] },
      { label: "Security & operations", items: ["JWT revocation", "Rate limiting", "Sandboxed execution", "Backup & restore"] },
    ],
    statement: "Typed front to back, containerized, deployed. Products, not prototypes.",
    span: "lg:col-span-4",
    variant: "inverted",
    Watermark: SiReact,
  },
  {
    icon: LineChart,
    title: "Data & Machine Learning",
    concepts: "Computer vision · OCR · Predictive modeling · Tree ensembles",
    logos: [
      { Logo: SiPython, label: "Python" },
      { Logo: SiPytorch, label: "PyTorch" },
      { Logo: SiTensorflow, label: "TensorFlow" },
      { Logo: SiScikitlearn, label: "scikit-learn" },
      { Logo: SiOpencv, label: "OpenCV" },
      { Logo: SiPandas, label: "Pandas" },
      { Logo: SiApachespark, label: "Apache Spark" },
      { Logo: SiApachekafka, label: "Apache Kafka" },
    ],
    stackGroups: [
      { label: "Modeling", items: ["PyTorch", "TensorFlow", "Keras", "scikit-learn", "XGBoost", "Random Forest"] },
      { label: "Vision", items: ["OpenCV", "OCR"] },
      { label: "Data & pipelines", items: ["Python", "Pandas", "NumPy", "SQL", "Apache Spark", "Kafka", "Hadoop"] },
    ],
    statement: "From classical predictive modeling to deep learning for vision. Grounded in the data first.",
    span: "lg:col-span-8",
    variant: "gradient-warm",
    Watermark: SiPython,
    big: true,
  },
]

const faceBase =
  "overflow-hidden rounded-[1.75rem] p-8 md:p-10 flex flex-col text-left [backface-visibility:hidden] [-webkit-backface-visibility:hidden] transition-shadow duration-500 group-hover:shadow-[0_32px_80px_-32px_rgb(0_0_0/0.4)]"

const CapabilityCard = ({ group }) => {
  const { icon: Icon, title, concepts, logos, stackGroups, statement, variant, Watermark, watermarkSrc, big } = group
  const v = variants[variant]
  const [flipped, setFlipped] = useState(false)
  const reduced = useReducedMotion()

  const toggle = () => setFlipped((f) => !f)

  return (
    <div className="group h-full [perspective:1600px]">
      <Motion.div
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={`${title} — click to ${flipped ? "see the statement" : "see the full stack list"}`}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            toggle()
          }
        }}
        className="relative h-full min-h-[380px] md:min-h-[440px] cursor-pointer select-none [transform-style:preserve-3d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring rounded-[1.75rem]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        whileHover={reduced ? undefined : { y: -6 }}
        transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 220, damping: 26 }}
      >
        {/* ── Front: statement ── */}
        <div className={`relative h-full ${faceBase} ${v.card}`}>
          {/* Giant brand watermark — image sources are alpha-masked so they take the card's ink color */}
          {watermarkSrc ? (
            <div
              aria-hidden="true"
              className={`absolute -right-8 md:-right-14 top-1/2 -translate-y-1/2 h-[105%] aspect-square pointer-events-none ${v.watermark}`}
              style={{
                backgroundColor: "currentColor",
                maskImage: `url(${watermarkSrc})`,
                maskSize: "contain",
                maskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskImage: `url(${watermarkSrc})`,
                WebkitMaskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
              }}
            />
          ) : Watermark && (
            <Watermark
              aria-hidden="true"
              className={`absolute -right-8 md:-right-14 top-1/2 -translate-y-1/2 h-[105%] w-auto pointer-events-none ${v.watermark}`}
            />
          )}

          {/* Flip affordance — diagonal arrow, nudges on hover */}
          <span
            className={`absolute top-7 right-7 ${v.muted} opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5`}
            aria-hidden="true"
          >
            <ArrowUpRight size={19} strokeWidth={1.75} />
          </span>

          {/* Statement */}
          <p
            className={`relative font-semibold tracking-tight leading-[1.15] pr-10 ${
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
                <div className={`text-xs md:text-sm mt-0.5 flex flex-wrap gap-x-2.5 ${v.muted}`}>
                  {concepts.split("·").map((c) => (
                    <span key={c.trim()}>{c.trim()}</span>
                  ))}
                </div>
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

        {/* ── Back: the full written list ── */}
        <div className={`absolute inset-0 [transform:rotateY(180deg)] ${faceBase} ${v.card}`}>
          <span
            className={`absolute top-7 right-7 ${v.muted} opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-x-0.5 group-hover:translate-y-0.5`}
            aria-hidden="true"
          >
            <ArrowDownLeft size={19} strokeWidth={1.75} />
          </span>

          <div className="flex items-center gap-3">
            <Icon className="h-5 w-5 shrink-0" strokeWidth={1.75} />
            <div className="text-base md:text-lg font-semibold">{title}</div>
          </div>
          <div className={`text-xs md:text-sm mt-1.5 ${v.muted}`}>The full working stack, written out.</div>

          {/* Grouped editorial list — labeled clusters, hairline rows, scrolls when taller than the card */}
          <div
            data-lenis-prevent
            className={`mt-7 flex-1 min-h-0 overflow-y-auto overscroll-contain scroll-thin scroll-fade pr-2 -mr-2 pb-8 grid content-start items-start gap-x-8 md:gap-x-10 gap-y-6 ${
              big ? "grid-cols-2 md:grid-cols-3" : "grid-cols-2"
            }`}
          >
            {stackGroups.map(({ label, items }, gi) => (
              <div key={label}>
                <Motion.div
                  className={`text-[10px] uppercase tracking-[0.22em] font-semibold pb-2 ${v.muted}`}
                  animate={
                    reduced ? { opacity: 1 } : flipped ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: flipped && !reduced ? 0.15 + gi * 0.09 : 0,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {label}
                </Motion.div>
                {items.map((item, ii) => (
                  <Motion.div
                    key={item}
                    className={`py-2 text-xs md:text-sm font-medium leading-tight border-b ${v.chip}`}
                    animate={
                      reduced ? { opacity: 1 } : flipped ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                    }
                    transition={{
                      duration: 0.5,
                      delay: flipped && !reduced ? 0.2 + gi * 0.09 + ii * 0.04 : 0,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {item}
                  </Motion.div>
                ))}
              </div>
            ))}
          </div>

        </div>
      </Motion.div>
    </div>
  )
}

export const SkillsSection = () => {
  return (
    <section id="skills" className="-mt-8 md:-mt-12 pt-0 pb-12 md:pb-16 relative">
      <div className="container-wide">

        <SectionHeader
          index="03"
          label="Capabilities"
          title="What I work with"
          lead="Four areas, each backed by things that run in production — click a card for the full list."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">
          {groups.map((group, i) => (
            <Reveal key={group.title} className={group.span} delay={0.05 + i * 0.06}>
              {/* Alternating drift rates — columns move at different speeds like the hero layers */}
              <Parallax speed={i % 2 === 0 ? 0.06 : 0.14} className="h-full">
                <CapabilityCard group={group} />
              </Parallax>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
