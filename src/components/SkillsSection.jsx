import { useState } from "react"
import { ArrowDownLeft, ArrowUpRight, Bot, Cpu, Layers, LineChart } from "lucide-react"
import { motion as Motion, useReducedMotion } from "motion/react"
import {
  SiOpenai, SiClaude, SiLangchain, SiN8N,
  SiOllama, SiHuggingface, SiApple,
  SiTypescript, SiReact, SiExpress, SiPostgresql, SiRust, SiDocker, SiFastapi,
  SiPython, SiPytorch, SiTensorflow, SiPandas, SiApachespark, SiApachekafka,
  SiScikitlearn, SiOpencv,
} from "react-icons/si"
import { Reveal } from "./Reveal"
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
    concepts: "MCP · RAG · AutoGen · ChromaDB",
    logos: [
      { Logo: SiOpenai, label: "OpenAI" },
      { Logo: SiClaude, label: "Claude" },
      { Logo: SiLangchain, label: "LangChain / LangGraph" },
      { Logo: SiN8N, label: "n8n" },
    ],
    stack: [
      "MCP", "RAG", "LangChain", "LangGraph", "AutoGen", "n8n",
      "OpenAI", "Claude", "Mistral", "ChromaDB", "Multi-agent orchestration",
    ],
    statement: "Agents that plan, call tools, and finish the job — from orchestration graphs to a runtime built from scratch.",
    span: "lg:col-span-8",
    variant: "gradient-cool",
    watermarkSrc: "/logos/langchain.png",
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
    stack: [
      "Ollama", "llama.cpp", "MLX", "LoRA fine-tuning", "KV-cache tuning",
      "Hugging Face", "Apple Silicon", "Self-hosted inference",
    ],
    statement: "Local models, tuned and served on my own hardware — private by default.",
    span: "lg:col-span-4",
    variant: "vivid",
    watermarkSrc: "/logos/llama-cpp.png",
  },
  {
    icon: Layers,
    title: "Full-stack Engineering",
    concepts: "CI/CD · Tailscale · Cloudflare",
    logos: [
      { Logo: SiTypescript, label: "TypeScript" },
      { Logo: SiReact, label: "React" },
      { Logo: SiExpress, label: "Express" },
      { Logo: SiFastapi, label: "FastAPI" },
      { Logo: SiPostgresql, label: "PostgreSQL" },
      { Logo: SiRust, label: "Rust" },
      { Logo: SiDocker, label: "Docker" },
    ],
    stack: [
      "TypeScript", "React", "Express", "FastAPI", "PostgreSQL", "Rust",
      "Docker", "CI/CD", "Caddy", "Cloudflare", "Tailscale", "Tailwind CSS", "Vite",
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
      { Logo: SiScikitlearn, label: "scikit-learn" },
      { Logo: SiOpencv, label: "OpenCV" },
      { Logo: SiPandas, label: "Pandas" },
      { Logo: SiApachespark, label: "Apache Spark" },
      { Logo: SiApachekafka, label: "Apache Kafka" },
    ],
    stack: [
      "Python", "PyTorch", "TensorFlow", "Keras", "scikit-learn", "OpenCV",
      "Computer vision", "OCR", "Pandas", "NumPy", "SQL", "Apache Spark", "Kafka", "Hadoop",
    ],
    statement: "From classical predictive modeling to deep learning for vision — grounded in the data first.",
    span: "lg:col-span-8",
    variant: "gradient-warm",
    Watermark: SiPython,
    big: true,
  },
]

const faceBase =
  "overflow-hidden rounded-[1.75rem] p-8 md:p-10 flex flex-col text-left [backface-visibility:hidden] [-webkit-backface-visibility:hidden] transition-shadow duration-500 group-hover:shadow-[0_32px_80px_-32px_rgb(0_0_0/0.4)]"

const CapabilityCard = ({ group }) => {
  const { icon: Icon, title, concepts, logos, stack, statement, variant, Watermark, watermarkSrc, big } = group
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

          <div className="mt-7 flex flex-wrap content-start gap-2 flex-1">
            {stack.map((item) => (
              <span
                key={item}
                className={`px-3 py-1.5 rounded-full border text-xs md:text-sm ${v.chip}`}
              >
                {item}
              </span>
            ))}
          </div>

        </div>
      </Motion.div>
    </div>
  )
}

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-12 md:py-16 border-t border-border/40 relative">
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
              <CapabilityCard group={group} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
