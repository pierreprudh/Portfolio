import { Briefcase, Code, Sparkles, MapPin, ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const RevealBox = ({ children, direction = "up", delay = 0, className = "" }) => {
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
  const hidden = { up: "translateY(40px)", left: "translateX(-48px)", right: "translateX(48px)" }[direction]
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : hidden,
        transition: `opacity 0.75s ease ${delay}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

const stats = [
  { value: "3rd", label: "Year at ENSIIE" },
  { value: "10+", label: "Projects built" },
  { value: "2", label: "Internships" },
]

const cards = [
  {
    icon: <Code className="h-5 w-5 text-primary" />,
    title: "Data Scientist & AI Engineer",
    desc: "Building end-to-end ML pipelines, LLM systems and agentic workflows that turn data into decisions.",
    accent: "from-primary/20 to-primary/5",
  },
  {
    icon: <Sparkles className="h-5 w-5 text-emerald-500" />,
    title: "Curious & Self-driven",
    desc: "Constantly exploring new techniques — from RAG architectures to reinforcement learning and beyond.",
    accent: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    icon: <Briefcase className="h-5 w-5 text-violet-500" />,
    title: "Open to Opportunities",
    desc: "Looking for a first full-time role in data science or AI engineering — internship or graduate position.",
    accent: "from-violet-500/20 to-violet-500/5",
  },
]

export const AboutSection = () => {
  return (
    <section id="about" className="py-28 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-5xl">

        {/* Section label */}
        <RevealBox direction="up" delay={0}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-primary/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">About me</span>
            <div className="h-px w-10 bg-primary/40" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Who I <span className="text-primary">am</span>
          </h2>
        </RevealBox>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — slides from left */}
          <RevealBox direction="left" delay={0.1}>
            <div className="flex flex-col gap-6 text-left">

              {/* Location badge */}
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={14} className="text-primary" />
                <span>Paris, France · ENSIIE</span>
              </div>

              <p className="text-foreground/80 leading-relaxed text-base md:text-lg">
                I'm a data science student at <span className="text-primary font-medium">ENSIIE</span>, passionate about building agentic AI systems, LLM pipelines, and data-driven products that actually ship.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I've gained hands-on experience through internships and personal projects — from predictive modeling and data visualization to building full agentic workflows with LangChain and LangGraph.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 py-4 border-y border-border/60">
                {stats.map(({ value, label }) => (
                  <div key={label} className="text-center">
                    <div className="text-2xl font-bold text-foreground">{value}</div>
                    <div className="text-xs text-muted-foreground mt-0.5 leading-snug">{label}</div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a href="#contact" className="cosmic-button inline-flex items-center gap-2">
                  Get in touch <ArrowRight size={14} />
                </a>
                <a
                  href="/CV.pdf"
                  download
                  className="px-5 py-2 rounded-full border border-primary/40 text-primary text-sm font-medium hover:bg-primary/10 transition-colors duration-300"
                >
                  Download CV
                </a>
              </div>
            </div>
          </RevealBox>

          {/* Right — slides from right, cards staggered */}
          <div className="flex flex-col gap-4">
            {cards.map(({ icon, title, desc, accent }, i) => (
              <RevealBox key={title} direction="right" delay={0.15 + i * 0.1}>
                <div className="group relative rounded-2xl border border-border/70 bg-card p-5 overflow-hidden hover:border-primary/30 transition-colors duration-300">
                  {/* Gradient accent top */}
                  <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${accent}`} />
                  <div className="flex items-start gap-4">
                    <div className={`shrink-0 p-2.5 rounded-xl bg-gradient-to-br ${accent} border border-border/50`}>
                      {icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
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
