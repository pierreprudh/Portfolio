import { ArrowRight, ArrowUpRight } from "lucide-react"
import {
  motion as Motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react"
import { useRef, useState } from "react"
import ScrollStack, { ScrollStackItem } from "./ScrollStack"
import { SectionHeader } from "./SectionHeader"

const journey = [
  { year: "2021", title: "ENSIIE", sub: "engineering school, after two years of preparatory class" },
  { year: "2023", title: "Ministère de l'Éducation Nationale", sub: "data scientist intern" },
  { year: "2025", title: "Limpide Prague", sub: "AI engineer intern, agents and computer vision" },
  { year: "2026", title: "Ontraak Paris", sub: "AI engineer, self-hosted AI stack", now: true },
]

const SEGMENT_COLORS = [
  "from-foreground/15 to-primary/25",
  "from-primary/25 to-primary/40",
  "from-primary/40 to-primary/60",
  "from-primary/60 via-primary/25 to-transparent",
]
const REVEAL_POINTS = [0.02, 0.31, 0.6, 0.87]
const DOT_GLASS =
  "border border-foreground/30 bg-background/60 backdrop-blur-md shadow-[inset_0_1px_0_hsl(0_0%_100%/0.4)]"
const DOT_NOW =
  "bg-primary/70 backdrop-blur-md border border-white/30 shadow-[inset_0_1px_0_hsl(0_0%_100%/0.5),0_0_14px_2px_hsl(var(--primary)/0.3)]"
const JOURNEY_SPRING = { stiffness: 105, damping: 28, mass: 0.32, restDelta: 0.001 }

/* Each milestone derives its visual state directly from one shared MotionValue.
   That keeps the sequence continuous without React renders during scrolling. */
const JourneyMilestone = ({ item, index, progress, vertical, reduced }) => {
  const { year, title, sub, now } = item
  const revealAt = REVEAL_POINTS[index]
  const lineEnd = index < journey.length - 1 ? REVEAL_POINTS[index + 1] : 1

  const dotOpacity = useTransform(progress, [revealAt, revealAt + 0.065], [0, 1])
  const dotScale = useTransform(progress, [revealAt, revealAt + 0.09], [0.9, 1])
  const textOpacity = useTransform(progress, [revealAt + 0.02, revealAt + 0.12], [0, 1])
  const textY = useTransform(progress, [revealAt + 0.02, revealAt + 0.14], [8, 0])
  const lineScale = useTransform(progress, [revealAt + 0.065, lineEnd], [0, 1])

  const lineStyle = vertical
    ? {
        left: "-29px",
        top: "30px",
        bottom: now ? "-74px" : "-27px",
        scaleY: reduced ? 1 : lineScale,
        transformOrigin: "top",
      }
    : {
        right: now ? "-24px" : "-15px",
        scaleX: reduced ? 1 : lineScale,
        transformOrigin: "left",
      }

  return (
    <div className={vertical ? "relative" : "relative pt-10"}>
      <Motion.div
        aria-hidden="true"
        className={
          vertical
            ? `absolute w-[3px] rounded-full bg-gradient-to-b ${SEGMENT_COLORS[index]}`
            : `absolute top-[7px] left-[26px] h-[3px] rounded-full bg-gradient-to-r ${SEGMENT_COLORS[index]}`
        }
        style={lineStyle}
      />

      <Motion.span
        aria-hidden="true"
        className={`absolute h-[17px] w-[17px] rounded-full ${
          vertical ? "top-1.5 -left-9" : "top-0 left-0"
        } ${now ? DOT_NOW : DOT_GLASS}`}
        style={reduced ? undefined : { opacity: dotOpacity, scale: dotScale }}
      />

      <Motion.div style={reduced ? undefined : { opacity: textOpacity, y: textY }}>
        <div
          className={`font-mono font-semibold tracking-tight text-foreground ${
            vertical ? "text-2xl" : "text-3xl md:text-4xl"
          }`}
        >
          {year}
        </div>
        <div
          className={`font-semibold text-card-foreground leading-snug ${
            vertical ? "mt-1" : "mt-2 text-lg"
          }`}
        >
          {title}
        </div>
        <div
          className={`text-sm text-muted-foreground leading-snug ${
            vertical ? "mt-0.5" : "mt-1"
          }`}
        >
          {sub}
        </div>
      </Motion.div>
    </div>
  )
}

/* The reveal is scrubbed by scroll and softened by a single spring. This makes
   the timeline feel physically attached to the card instead of playing a timer. */
const JourneyTimeline = () => {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 82%", "center 48%"],
  })
  const progress = useSpring(scrollYProgress, JOURNEY_SPRING)

  return (
    <div ref={ref} className="flex-1 flex flex-col min-h-0">
      <div className="hidden sm:flex flex-1 items-center">
        <div className="relative w-full">
          <div className="grid grid-cols-4 gap-6">
            {journey.map((item, index) => (
              <JourneyMilestone
                key={item.year}
                item={item}
                index={index}
                progress={progress}
                vertical={false}
                reduced={reduced}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="sm:hidden flex-1 relative pl-9 py-2">
        <div className="flex flex-col justify-center h-full gap-7">
          {journey.map((item, index) => (
            <JourneyMilestone
              key={item.year}
              item={item}
              index={index}
              progress={progress}
              vertical
              reduced={reduced}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

const Label = ({ children }) => (
  <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">{children}</div>
)

/* Ontraak mark, inlined so it follows the theme via currentColor */
const OntraakMark = ({ className }) => (
  <svg viewBox="58 92 182 116" className={className} aria-hidden="true">
    <path
      d="M183.3,100.1h-67.2c-27.7,0-50.2,22.5-50.2,50.2c0,27.7,22.5,50.2,50.2,50.2h67.2c27.7,0,50.2-22.5,50.2-50.2 C233.5,122.5,211,100.1,183.3,100.1"
      fill="none" stroke="currentColor" strokeWidth="6"
    />
    <path
      d="M180.8,183.7c-18.5,0-33.5-15-33.5-33.5c0-18.5,15-33.5,33.5-33.5c18.5,0,33.5,15,33.5,33.5 C214.3,168.7,199.2,183.7,180.8,183.7"
      fill="currentColor"
    />
  </svg>
)

/* Paris at dusk (Pont Alexandre III) filling the whole card edge-to-edge,
   dissolving to transparent over the text side. Positioned inset-0 against the
   card's own padding box (the card is position:relative) so it can never
   outgrow the card; mask + clip-path live on this container, not the img —
   WebKit drops border-radius clipping on masked children. */
const ParisPhoto = () => (
  <div
    aria-hidden="true"
    className="absolute inset-0 overflow-hidden rounded-[32px] [clip-path:inset(0_round_32px)] pointer-events-none
      [mask-image:linear-gradient(to_right,transparent_42%,rgb(0_0_0/0.12)_56%,rgb(0_0_0/0.35)_70%,rgb(0_0_0/0.7)_84%,black_95%)]
      lg:[mask-image:linear-gradient(to_right,transparent_34%,rgb(0_0_0/0.18)_48%,rgb(0_0_0/0.45)_60%,rgb(0_0_0/0.75)_72%,black_86%)]"
    style={{ opacity: "calc(1 - 0.65 * var(--covered, 0))" }}
  >
    <img
      src="/paris.webp"
      srcSet="/paris-sm.webp 900w, /paris.webp 2400w"
      sizes="(max-width: 1023px) 100vw, 1400px"
      alt=""
      loading="lazy"
      className="h-full w-full object-cover object-[68%_40%]"
    />
  </div>
)

/* Miniature CV sheet that straightens when the card is hovered */
/* The sheet settles in, then its lines write themselves top to bottom —
   the CV "creating" itself. Entrance motion lives on the outer wrapper so the
   inner div keeps the CSS hover straighten/lift untouched. */
/* Scrubbed by scroll like the Journey timeline: the sheet rises and its lines
   write themselves as the card enters, and everything reverses on the way out. */
const PaperLine = ({ progress, start, reduced, className, style }) => {
  const scaleX = useTransform(progress, [start, start + 0.1], [0, 1])
  const opacity = useTransform(progress, [start, start + 0.08], [0, 1])
  return (
    <Motion.div
      className={className}
      style={reduced ? style : { transformOrigin: "left", scaleX, opacity, ...style }}
    />
  )
}

const PaperMock = () => {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 96%", "center 58%"],
  })
  const progress = useSpring(scrollYProgress, JOURNEY_SPRING)

  const sheetOpacity = useTransform(progress, [0, 0.22], [0, 1])
  const sheetY = useTransform(progress, [0, 0.28], [34, 0])
  const sheetScale = useTransform(progress, [0, 0.28], [0.92, 1])

  return (
    <Motion.div
      ref={ref}
      aria-hidden="true"
      style={reduced ? undefined : { opacity: sheetOpacity, y: sheetY, scale: sheetScale }}
    >
      <div className="relative w-48 h-[17rem] xl:w-56 xl:h-80 rounded-xl border border-border/70 bg-card p-6 flex flex-col gap-3 rotate-[4deg] shadow-[0_24px_50px_-24px_rgb(0_0_0/0.45)] transition-transform duration-500 ease-out group-hover:rotate-0 group-hover:-translate-y-1.5">
        <PaperLine progress={progress} start={0.26} reduced={reduced} className="h-2.5 w-24 rounded-full bg-foreground/25" />
        <PaperLine progress={progress} start={0.34} reduced={reduced} className="h-2 w-16 rounded-full bg-primary/50" />
        <div className="mt-3 space-y-2">
          {[90, 82, 74, 86, 66, 78, 58].map((w, i) => (
            <PaperLine
              key={i}
              progress={progress}
              start={0.42 + i * 0.055}
              reduced={reduced}
              className="h-2 rounded-full bg-foreground/10"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
        <PaperLine progress={progress} start={0.86} reduced={reduced} className="mt-auto h-2 w-20 rounded-full bg-foreground/10" />
      </div>
    </Motion.div>
  )
}

const cards = [
  {
    key: "bio",
    content: (
      /* no `relative` here: ParisPhoto must resolve inset-0 against the card */
      <div className="h-full text-left">
        <ParisPhoto />
        <div className="relative z-10 flex flex-col justify-center gap-6 h-full max-w-[80%] sm:max-w-[68%] lg:max-w-[54%]">
          <Label>Profile</Label>
          <p className="text-2xl md:text-[2.1rem] leading-snug font-semibold tracking-tight text-foreground">
            I'm Pierre, an AI engineer in Paris.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I work on agents, local inference, and everything it takes to run them: serving,
            security, deploys. I came to AI through data science and I like understanding every
            layer of what I ship.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            ENSIIE class of 2025, after two years of preparatory class. Along the way: computer
            vision and document extraction agents in Prague, data science at the French Ministry
            of Education, and today the AI stack at Ontraak. Outside work I run, lift, and play
            football.
          </p>
        </div>
      </div>
    ),
  },
  {
    key: "currently",
    content: (
      <div className="h-full text-left">
        {/* Giant brand watermark, Capabilities-card style: clipped to the card,
            bleeding off the left edge, visible at every size */}
        <div
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden rounded-[32px] [clip-path:inset(0_round_32px)] pointer-events-none"
        >
          <OntraakMark className="lg:hidden absolute -left-8 top-1/2 -translate-y-1/2 h-[62%] w-auto text-slate-900/[0.06] dark:text-white/[0.07]" />
        </div>
        <div className="relative z-10 flex flex-col gap-6 h-full">
          <Label>Currently</Label>
          <div className="flex-1 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16 lg:-mt-10">
            <div className="hidden lg:flex w-64 shrink-0 items-center justify-center">
              <OntraakMark className="w-52 text-primary/30 dark:text-white/30" />
            </div>
            <div className="flex-1 flex flex-col justify-center gap-7">
              <div>
                <div className="text-2xl md:text-3xl font-semibold text-card-foreground tracking-tight">AI Engineer - Ontraak</div>
                <div className="flex items-baseline justify-between w-[92%] font-mono text-sm text-muted-foreground mt-2">
                  <span>02/2026 - now</span>
                  <span>Paris</span>
                </div>
              </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-10">
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                I built and run the company's AI assistant fully on premise: local models on Apple
                Silicon through Ollama and MLX, a React and Express stack in Docker, PostgreSQL,
                private search, and n8n automations behind a reverse proxy.
              </p>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                I also handle what keeps it fast and trustworthy: KV-cache tuning, models resident
                in memory, JWT auth with revocation, rate limiting, sandboxed code execution, daily
                backups with tested restores, and the CI/CD that ships it all.
              </p>
              <p className="text-muted-foreground leading-relaxed max-w-2xl xl:col-span-2">
                Beyond the stack, I keep the team up to speed on AI: continuous watch on the
                ecosystem, internal training sessions, and presentations on what's worth adopting.
              </p>
            </div>
          </div>
        </div>
        </div>
      </div>
    ),
  },
  {
    key: "numbers",
    content: (
      <div className="h-full text-left">
        <div className="flex flex-col gap-6 h-full">
          <Label>Journey</Label>

          <JourneyTimeline />
        </div>
      </div>
    ),
  },
  {
    key: "cv",
    content: (
      <a href="/CV.pdf" download className="group flex flex-col md:flex-row md:items-center gap-8 md:gap-12 text-left h-full cursor-pointer">
        <ArrowUpRight
          size={19}
          strokeWidth={1.75}
          className="absolute top-7 right-7 text-muted-foreground/60 group-hover:text-primary transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
        <div className="md:w-[46%] shrink-0 flex flex-col gap-6 h-full">
          <Label>Resume</Label>
          <div className="flex-1 flex flex-col justify-center gap-3">
            <div className="text-2xl md:text-3xl font-semibold tracking-tight text-card-foreground group-hover:text-primary transition-colors inline-flex items-center gap-3">
              Download my CV
              <ArrowRight size={22} className="transition-transform group-hover:translate-x-1" />
            </div>
            <p className="text-sm text-muted-foreground">One page. Last updated July 2026.</p>
            <div className="flex items-center gap-5 font-mono text-xs text-muted-foreground/70 mt-1.5">
              <span>PDF</span>
              <span>47 KB</span>
              <span>english</span>
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center h-full pt-4 md:pt-0">
          <PaperMock />
        </div>
      </a>
    ),
  },
]

export const AboutSection = () => {
  // Phones get the plain stacked tiles: pinned cards taller than the viewport
  // can never reveal their bottom, so the scroll-stack is desktop/tablet only.
  const [staticCards] = useState(
    () =>
      prefersReducedMotion() ||
      (typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches)
  )

  return (
    <section id="about" className="pt-6 md:pt-8 relative z-10">
      <div className="container-wide">
        <SectionHeader index="01" label="About" title="Who I am" />
      </div>

      {staticCards ? (
        <div className="container-wide flex flex-col gap-4 py-10 md:py-16">
          {cards.map(({ key, content }) => (
            /* padding mirrors .scroll-stack-card so full-bleed content
               (ParisPhoto's inset-0 layers) lands exactly on the card edge */
            <div key={key} className="tile relative overflow-hidden rounded-[32px] p-8 sm:p-10 md:px-16 md:py-14">{content}</div>
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
