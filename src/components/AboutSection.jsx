import { ArrowDownToLine, ArrowRight, MapPin } from "lucide-react"
import { useEffect, useState } from "react"
import ScrollStack, { ScrollStackItem } from "./ScrollStack"
import { SectionHeader } from "./SectionHeader"

const stats = [
  { value: "2025", label: "ENSIIE graduate" },
  { value: "10+", label: "Projects built" },
  { value: "4", label: "Roles across AI & data" },
]

const focus = ["self-hosted llm stack", "mcp servers", "lora fine-tuning", "agent orchestration"]

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

const ParisClock = () => {
  const [time, setTime] = useState("")
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit", second: "2-digit",
    })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return <span className="font-mono text-3xl md:text-4xl text-foreground tabular-nums">{time}</span>
}

const Label = ({ children }) => (
  <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">{children}</div>
)

const cards = [
  {
    key: "bio",
    content: (
      <div className="flex flex-col gap-6 text-left h-full">
        <Label>Profile</Label>
        <p className="text-foreground/90 leading-relaxed text-xl md:text-2xl max-w-3xl">
          AI Engineer at <span className="text-primary font-medium">Ontraak</span>, where I architect and operate a self-hosted, privacy-first AI assistant stack — from local LLM inference to security, CI/CD, and everything in between.
        </p>
        <p className="text-muted-foreground leading-relaxed max-w-2xl">
          ENSIIE graduate (2025) with experience across agentic AI, computer vision, and data science — from multi-agent document extraction in the energy market to building KLIDE, my own AI-native IDE with a custom Rust agent loop.
        </p>
      </div>
    ),
  },
  {
    key: "currently",
    content: (
      <div className="flex flex-col gap-5 text-left h-full">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <Label>Currently</Label>
        </div>
        <div>
          <div className="text-2xl md:text-3xl font-semibold text-card-foreground tracking-tight">AI Engineer · Ontraak</div>
          <div className="font-mono text-sm text-muted-foreground mt-2">feb 2026 — present · paris</div>
        </div>
        <div className="flex flex-wrap gap-2 mt-auto">
          {focus.map((f) => (
            <span key={f} className="px-3 py-1.5 rounded-full font-mono text-xs border border-border/60 text-foreground/70">
              {f}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    key: "numbers",
    content: (
      <div className="flex flex-col gap-6 text-left h-full">
        <Label>In numbers</Label>
        <div className="grid grid-cols-3 gap-6 flex-1 items-center">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <div className="font-mono text-3xl md:text-5xl font-semibold text-foreground">{value}</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-2 leading-snug">{label}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-border/50 pt-5">
          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin size={14} className="text-primary" /> Paris, France
          </span>
          <ParisClock />
        </div>
      </div>
    ),
  },
  {
    key: "cv",
    content: (
      <a href="/CV.pdf" download className="group flex flex-col gap-6 text-left h-full cursor-pointer">
        <div className="flex items-center justify-between">
          <Label>Résumé</Label>
          <ArrowDownToLine size={18} className="text-muted-foreground/60 group-hover:text-primary transition-colors" />
        </div>
        <div className="flex-1 flex flex-col justify-center gap-3">
          <div className="text-2xl md:text-3xl font-semibold tracking-tight text-card-foreground group-hover:text-primary transition-colors inline-flex items-center gap-3">
            Download my CV
            <ArrowRight size={22} className="transition-transform group-hover:translate-x-1" />
          </div>
          <p className="text-sm text-muted-foreground">One page — education, experience, and the stack I ship with.</p>
        </div>
      </a>
    ),
  },
]

export const AboutSection = () => {
  const [reduced] = useState(prefersReducedMotion)

  return (
    <section id="about" className="-mt-24 md:-mt-28 pt-0 relative z-10">
      <div className="container-wide">
        <SectionHeader index="01" label="About" title="Who I am" />
      </div>

      {reduced ? (
        <div className="container-wide flex flex-col gap-4 py-16">
          {cards.map(({ key, content }) => (
            <div key={key} className="tile p-8 md:p-10">{content}</div>
          ))}
        </div>
      ) : (
        /* Full-bleed: the stack spans the viewport, only a slim gutter remains */
        <div className="px-3 md:px-6 xl:px-10">
          <ScrollStack
            useWindowScroll
            itemDistance={120}
            itemStackDistance={24}
            stackPosition="22%"
            scaleEndPosition="12%"
            baseScale={0.88}
          >
            {cards.map(({ key, content }) => (
              <ScrollStackItem key={key}>{content}</ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      )}
    </section>
  )
}
