import { Briefcase, Code, Sparkles, MapPin, ArrowRight } from "lucide-react"
import { Reveal } from "./Reveal"
import { SectionHeader } from "./SectionHeader"

const stats = [
  { value: "2025", label: "ENSIIE graduate" },
  { value: "10+", label: "Projects built" },
  { value: "4", label: "Roles across AI & data" },
]

const cards = [
  {
    icon: <Code className="h-5 w-5 text-primary" />,
    title: "AI Engineer",
    desc: "Designing and operating production AI systems — agentic workflows, LLM inference infrastructure, and full-stack AI products.",
    accent: "from-primary/20 to-primary/5",
  },
  {
    icon: <Sparkles className="h-5 w-5 text-emerald-500" />,
    title: "Local-first & Privacy-minded",
    desc: "Specialized in self-hosted AI: on-device inference, fine-tuned open-source models, and secure infrastructure with zero data leaving the network.",
    accent: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    icon: <Briefcase className="h-5 w-5 text-violet-500" />,
    title: "End-to-end Ownership",
    desc: "From architecture to CI/CD, auth, and backup runbooks — I ship systems that hold up in production, not just demos.",
    accent: "from-violet-500/20 to-violet-500/5",
  },
]

export const AboutSection = () => {
  return (
    <section id="about" className="py-28 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-5xl">

        <SectionHeader kicker="About me" title="Who I" accent="am" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-16">

          {/* Left — slides from left */}
          <Reveal direction="left" delay={0.1}>
            <div className="flex flex-col gap-6 text-left">

              {/* Location badge */}
              <div className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground">
                <MapPin size={14} className="text-primary" />
                <span>Paris, France · Ontraak</span>
              </div>

              <p className="text-foreground/80 leading-relaxed text-base md:text-lg">
                I'm an AI Engineer at <span className="text-primary font-medium">Ontraak</span>, where I architect and operate a self-hosted, privacy-first AI assistant stack — from local LLM inference to security, CI/CD, and everything in between.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                ENSIIE graduate (2025) with experience across agentic AI, computer vision, and data science — from multi-agent document extraction in the energy market to building KLIDE, my own AI-native IDE with a custom Rust agent loop.
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
          </Reveal>

          {/* Right — slides from right, cards staggered */}
          <div className="flex flex-col gap-4">
            {cards.map(({ icon, title, desc, accent }, i) => (
              <Reveal key={title} direction="right" delay={0.15 + i * 0.1}>
                <div className="group relative rounded-xl border border-border/70 bg-card p-5 overflow-hidden text-left card-hover">
                  {/* Gradient accent top */}
                  <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${accent}`} />
                  <div className="flex items-start gap-4">
                    <div className={`shrink-0 p-2.5 rounded-xl bg-gradient-to-br ${accent} border border-border/50`}>
                      {icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-card-foreground mb-1">{title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
