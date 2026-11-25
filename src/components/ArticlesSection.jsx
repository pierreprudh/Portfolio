import { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { ArrowUpRight, Download, X } from "lucide-react"
import { SiLinkedin } from "react-icons/si"
import { AnimatePresence, motion as Motion, useReducedMotion, useScroll, useMotionValueEvent } from "motion/react"
import { SectionHeader } from "./SectionHeader"
import { ArticleReader } from "./ArticleReader"
import { articleContent } from "../data/articles"

// Model and lab marks (LobeHub icons, MIT). Mono marks use currentColor.
import anthropic from "../assets/models/anthropic.svg?raw"
import nvidia from "../assets/models/nvidia.svg?raw"
import kimi from "../assets/models/kimi.svg?raw"
import zai from "../assets/models/zai.svg?raw"
import qwen from "../assets/models/qwen.svg?raw"
import cursor from "../assets/models/cursor.svg?raw"
import typesafe from "../assets/models/typesafeai.svg?raw"

const LINKEDIN_ACTIVITY = "https://www.linkedin.com/in/pierre-prudhomme-14b145222/recent-activity/all/"

// Everything opens in the viewer: articles render as a reading page from
// src/data/articles.js (PDF kept as a download), posts show their text.
const items = [
  {
    id: "anthropic-monopoly",
    kind: "Article",
    meta: "nov 2026",
    marks: [anthropic, nvidia],
    title: "Is Anthropic walking towards a global AI monopoly?",
    blurb: "Nvidia's leadership crisis, a $10B IPO anchor and a chip-control week in Washington.",
    href: "/articles/anthropic-global-ai-monopoly.pdf",
  },
  {
    id: "cursor-origin",
    kind: "LinkedIn",
    meta: "",
    marks: [cursor],
    title: "Cursor takes on GitHub",
    blurb: "Origin, a code hosting platform launched during a GitHub outage. And SpaceX behind it.",
    headline: "Cursor takes on GitHub",
    body: [
      "Big news: Cursor is launching Origin in beta for its premium plan, a new code hosting platform competing directly with GitHub.",
      "GitHub has been the only one offering this kind of service at this level, and now Cursor wants to take the crown. The release went out on Monday, during a GitHub outage. Good press or a fundamental issue? With the democratisation of agentic coding, coding has never been easier, and a lot more code is being produced by everyone. Maybe in the future GitHub won't be profitable and measures will be taken.",
      "Building a competitor is never wrong; it will just be hard to convince the whole developer world to use it. Another interesting fact: SpaceX is now behind Cursor after buying it (I covered it in a previous post). The company was interested in the agentic coding back-and-forth data that only Cursor could have produced. Could this be another way of gathering code and human/AI interaction to build a top-level model?",
    ],
    links: [],
    href: LINKEDIN_ACTIVITY,
  },
  {
    id: "glm-53-flash",
    kind: "LinkedIn",
    meta: "",
    marks: [zai],
    title: "GLM-5.3-Flash",
    blurb: "Z.ai dropped it anonymously with OpenRouter and OpenCode, and let users do the launch.",
    headline: "China stays on top of open-source AI",
    body: [
      "Z.ai, one of the top Chinese AI labs, just released a new model from its flagship lineage: GLM-5.3-Flash.",
      "A little reminder: GLM-5.2 is still one of the top open-source models at the frontier that you can run on your own (if you are rich), fighting with Kimi K3. So a new model of this quality is good news for model openness.",
      "This isn't just a new model with cheap tokens and very high quality. Z.ai came with an interesting strategy: they dropped it as Ox Alpha, with a lot of compute capacity and partnerships with OpenCode and OpenRouter to make it available fast and cheap. So the users did the communication about this model, not another blog post.",
    ],
    links: [{ label: "z.ai/blog/glm-5.3-flash", href: "https://z.ai/blog/glm-5.3-flash" }],
    href: LINKEDIN_ACTIVITY,
  },
  {
    id: "qwen-38",
    kind: "LinkedIn",
    meta: "",
    marks: [qwen],
    title: "Qwen-3.8-Flash",
    blurb: "Alibaba's next generation, from the lab that owns models for a single laptop.",
    headline: "Alibaba, a new crown for Chinese local AI",
    body: [
      "The biggest AI news of the week: Qwen-3.8-Flash.",
      "Last week I mentioned Alibaba's new model, Qwen-3.8. The company is known for the best models for local hardware, the kind that run on a single laptop. For a long time Qwen-3.6-27B led that race, with remarkable quality on modest hardware.",
      "Today they released a new version of their latest flagship, but the big news is that it showcases the technical advances of Alibaba's next generation of models.",
    ],
    links: [{ label: "qwen.ai/blog", href: "https://qwen.ai/blog?id=qwen3.8-flash-next" }],
    href: LINKEDIN_ACTIVITY,
  },
  {
    id: "jev",
    kind: "LinkedIn",
    meta: "",
    marks: [typesafe],
    title: "Jev, a new model type",
    blurb: "Outputs machine-readable state, not text, trained with RLCD instead of RLHF.",
    headline: "A new model type: Jev",
    body: [
      "Meet Jev by Diogo Almeida! A new type of AI model from TypeSafe AI, a startup founded by a former OpenAI researcher from the training team.",
      "New approach, new output: instead of text, this model generates computer-readable state. Define the output your workflow needs and say goodbye to output parsers and safeguards (lol). Astonishing speed and price for its quality, which comes from the model's narrow purpose.",
      "Those results come from a new training approach. You may know RLHF (Reinforcement Learning from Human Feedback); here Diogo Almeida presents RLCD (Reinforcement Learning for Calibrated Decisions). RLHF teaches LLMs to behave like humans from enormous amounts of data or deeply annotated tasks, whereas RLCD optimises probabilistic outputs and confidence scores instead.",
    ],
    links: [],
    href: LINKEDIN_ACTIVITY,
  },
  {
    id: "glm-53",
    kind: "LinkedIn",
    meta: "",
    marks: [zai],
    title: "GLM-5.3",
    blurb: "743B parameters for agentic coding, and a post-training recipe built to generalise.",
    headline: "Another top-level competitor",
    body: [
      "After the rise of Kimi K3 from Moonshot AI, an open-weight model competing on results with the top proprietary models from Anthropic and OpenAI, another Chinese lab brings a better open-weight model to the table: GLM-5.3.",
      "Its predecessor GLM-5.2, a very good open-source model you can self-host on four DGX Spark (Nvidia's local powerhouse, about $4k each), was for a few months the king of high-end open-source models.",
      "743B parameters, aimed at agentic coding and long-running tasks, as the market wants. The real deal is the post-training method: more data and different environments to make the model more general and more adaptable.",
    ],
    links: [{ label: "z.ai/blog/glm-5.3", href: "https://z.ai/blog/glm-5.3" }],
    href: LINKEDIN_ACTIVITY,
  },
  {
    id: "open-source-ai",
    kind: "Article",
    meta: "jul 2026",
    marks: [kimi],
    title: "Evolution of open-source AI",
    blurb: "Kimi K3 reaches the frontier: downloadable by anyone, operable by almost no one.",
    href: "/articles/evolution-of-open-source-ai.pdf",
  },
]

// Top-left of a card: "Article" in the accent, or where the post went out.
const KindLabel = ({ kind }) =>
  kind === "Article" ? (
    <span className="text-primary font-medium">Article</span>
  ) : (
    <span className="inline-flex items-center gap-1.5">
      <SiLinkedin size={11} aria-hidden="true" />
      LinkedIn
    </span>
  )

const Mark = ({ svg }) => (
  <span
    className="inline-flex text-[44px] md:text-[52px] text-foreground [&>svg]:block"
    dangerouslySetInnerHTML={{ __html: svg }}
  />
)

// KLIDE connector-card shape: kind and verb on top, the mark as the hero,
// title, short blurb.
const ArticleCard = ({ item, hidden, onOpen }) => {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={hidden ? -1 : undefined}
      draggable={false}
      onClick={(e) => {
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
        e.preventDefault()
        onOpen?.(item, e.currentTarget)
      }}
      className="group flex h-full flex-col items-center rounded-[22px] border border-border/70 bg-card px-4 pt-3 pb-5 text-center shadow-[0_2px_5px_rgb(0_0_0/0.03)] transition-colors duration-200 hover:border-foreground/20"
    >
      <span className="flex h-6 w-full items-center justify-between text-[11.5px] text-muted-foreground">
        <KindLabel kind={item.kind} />
        <span className="font-mono text-[10.5px] group-hover:hidden">{item.meta}</span>
        <span className="hidden group-hover:inline-flex items-center gap-1 text-foreground/80">
          Read
        </span>
      </span>

      <span className="my-6 md:my-7 flex h-14 items-center justify-center gap-4" aria-hidden="true">
        {item.marks.map((svg, i) => <Mark key={i} svg={svg} />)}
      </span>

      <span className="line-clamp-2 text-[14px] font-semibold leading-snug tracking-tight text-foreground">
        {item.title}
      </span>
      <span className="mt-1.5 line-clamp-3 text-[12.5px] leading-[1.45] text-muted-foreground">
        {item.blurb}
      </span>
    </a>
  )
}

// Curved strip: cards bend toward the viewer as they near the edges, the row
// drifts sideways with page scroll and can be grabbed and flicked, and the
// sides fade out. Three copies of the list keep the loop seamless; only the
// middle copy is exposed to assistive tech.
const COPIES = 3
const MAX_TILT = 38 // deg at the very edge
const MAX_DEPTH = 120 // px toward the viewer at the edge
const FRICTION = 0.94 // per frame, after a flick
const CLICK_SLOP = 6 // px of movement before a press counts as a drag

const CurvedStrip = ({ onOpen }) => {
  const stripRef = useRef(null)
  const trackRef = useRef(null)
  const cardRefs = useRef([])
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: stripRef, offset: ["start end", "end start"] })

  // drag state lives in a ref: it changes every frame and never re-renders
  const drag = useRef({ offset: 0, active: false, moved: false, startX: 0, startOffset: 0, lastX: 0, lastT: 0, v: 0, raf: 0 })

  const layout = () => {
    const track = trackRef.current
    if (!track) return
    const S = track.scrollWidth / COPIES
    // one set's width slides by while the strip crosses the screen, plus the drag
    const raw = -S * (0.5 + scrollYProgress.get()) + drag.current.offset
    // wrap into [-1.5S, -0.5S) so the middle copy always covers the viewport
    const x = -S * 0.5 - ((((-S * 0.5 - raw) % S) + S) % S)
    track.style.transform = `translate3d(${x}px,0,0)`

    const mid = window.innerWidth / 2
    for (const card of cardRefs.current) {
      if (!card) continue
      const center = card.offsetLeft + card.offsetWidth / 2 + x
      const d = Math.max(-1, Math.min(1, (center - mid) / mid)) // -1 left edge, 1 right edge
      const bend = d * Math.abs(d)
      card.style.transform = `translateZ(${Math.abs(bend) * MAX_DEPTH}px) rotateY(${-bend * MAX_TILT}deg)`
    }
  }

  const glide = () => {
    const st = drag.current
    st.v *= FRICTION
    if (Math.abs(st.v) < 0.05) { st.raf = 0; return }
    st.offset += st.v * 16
    layout()
    st.raf = requestAnimationFrame(glide)
  }

  const onPointerDown = (e) => {
    if (e.button !== 0) return
    const st = drag.current
    cancelAnimationFrame(st.raf)
    Object.assign(st, { active: true, moved: false, startX: e.clientX, startOffset: st.offset, lastX: e.clientX, lastT: e.timeStamp, v: 0 })
  }
  const onPointerMove = (e) => {
    const st = drag.current
    if (!st.active) return
    const dx = e.clientX - st.startX
    if (!st.moved && Math.abs(dx) > CLICK_SLOP) {
      st.moved = true
      stripRef.current?.setPointerCapture(e.pointerId)
    }
    if (!st.moved) return
    const dt = Math.max(1, e.timeStamp - st.lastT)
    st.v = (e.clientX - st.lastX) / dt // px per ms
    st.lastX = e.clientX
    st.lastT = e.timeStamp
    st.offset = st.startOffset + dx
    layout()
  }
  const onPointerUp = () => {
    const st = drag.current
    if (!st.active) return
    st.active = false
    if (st.moved) st.raf = requestAnimationFrame(glide)
  }
  // a drag must not open the card it started on
  const onClickCapture = (e) => {
    if (drag.current.moved) { e.preventDefault(); e.stopPropagation(); drag.current.moved = false }
  }

  useMotionValueEvent(scrollYProgress, "change", () => { if (!reduced) layout() })
  useEffect(() => {
    if (reduced) return
    const st = drag.current
    layout()
    window.addEventListener("resize", layout)
    return () => {
      window.removeEventListener("resize", layout)
      cancelAnimationFrame(st.raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced])

  if (reduced) {
    return (
      <div className="container-wide">
        <div className="flex gap-4 overflow-x-auto py-8 scroll-thin">
          {items.map((item) => (
            <div key={item.id} className="w-56 shrink-0"><ArticleCard item={item} onOpen={onOpen} /></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      ref={stripRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClickCapture={onClickCapture}
      className="relative overflow-hidden py-10 md:py-12 cursor-grab active:cursor-grabbing select-none touch-pan-y"
      style={{
        perspective: "1100px",
        maskImage: "linear-gradient(to right, transparent, black 14%, black 86%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 14%, black 86%, transparent)",
      }}
    >
      <div ref={trackRef} className="flex w-max gap-4 md:gap-5 will-change-transform" style={{ transformStyle: "preserve-3d" }}>
        {Array.from({ length: COPIES }, (_, copy) =>
          items.map((item, i) => (
            <div
              key={`${copy}-${item.id}`}
              ref={(el) => { cardRefs.current[copy * items.length + i] = el }}
              aria-hidden={copy !== 1 || undefined}
              className="w-52 md:w-60 shrink-0"
              style={{ transformStyle: "preserve-3d" }}
            >
              <ArticleCard item={item} hidden={copy !== 1} onOpen={onOpen} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

// Reader on top of the page: the PDF for articles, the text for posts.
// Portaled to <body> so the strip's 3D transforms can't trap it.
const Viewer = ({ item, onClose }) => {
  const closeRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!item) return
    const html = document.documentElement
    const prev = html.style.overflow
    html.style.overflow = "hidden"
    const onKey = (e) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", onKey)
    closeRef.current?.focus({ preventScroll: true })
    return () => {
      html.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [item, onClose])

  const isPdf = item?.href?.endsWith(".pdf")
  const ease = [0.16, 1, 0.3, 1]

  return createPortal(
    <AnimatePresence>
      {item && (
        <Motion.div
          key="viewer"
          data-lenis-prevent
          className="fixed inset-0 z-[60] flex items-end md:items-center justify-center md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease }}
        >
          <div className="absolute inset-0 bg-background/60 backdrop-blur-md" onClick={onClose} aria-hidden="true" />

          <Motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="viewer-title"
            className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-t-[28px] md:rounded-[28px] border border-border/70 bg-card shadow-[0_40px_120px_-30px_rgb(0_0_0/0.45)] h-[92svh] md:h-[88vh]"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.55, ease }}
          >
            {/* Header */}
            <div className="flex items-center gap-4 border-b border-border/60 px-5 md:px-7 py-4">
              <span className="flex shrink-0 items-center gap-2" aria-hidden="true">
                {item.marks.map((svg, i) => (
                  <span key={i} className="inline-flex text-[22px] text-foreground [&>svg]:block" dangerouslySetInnerHTML={{ __html: svg }} />
                ))}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3 text-[11.5px] text-muted-foreground">
                  <KindLabel kind={item.kind} />
                  <span className="font-mono text-[10.5px]">{item.meta}</span>
                </div>
                <h3 id="viewer-title" className="truncate text-[15px] md:text-base font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
              </div>
              {isPdf && (
                <a
                  href={item.href}
                  download
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-muted-foreground hover:bg-foreground/8 hover:text-foreground transition-colors"
                >
                  <Download size={13} /> PDF
                </a>
              )}
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Close"
                className="rounded-full p-2 text-muted-foreground hover:bg-foreground/8 hover:text-foreground transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            {articleContent[item.id] ? (
              <div className="flex-1 overflow-y-auto overscroll-contain scroll-thin">
                <ArticleReader item={item} content={articleContent[item.id]} marks={item.marks} />
              </div>
            ) : isPdf ? (
              <iframe
                src={`${item.href}#view=FitH&navpanes=0`}
                title={item.title}
                className="flex-1 w-full bg-white"
              />
            ) : (
              <div className="flex-1 overflow-y-auto overscroll-contain scroll-thin">
                <article className="mx-auto max-w-2xl px-6 md:px-10 py-10 md:py-14 text-left">
                  <div className="flex justify-center gap-5 mb-10" aria-hidden="true">
                    {item.marks.map((svg, i) => (
                      <span key={i} className="inline-flex text-[64px] text-foreground [&>svg]:block" dangerouslySetInnerHTML={{ __html: svg }} />
                    ))}
                  </div>
                  <h4 className="text-2xl md:text-[2rem] leading-tight font-semibold tracking-tight text-foreground">
                    {item.headline}
                  </h4>
                  <div className="mt-6 space-y-5 text-[15px] md:text-[17px] leading-relaxed text-foreground/80">
                    {item.body.map((para) => <p key={para}>{para}</p>)}
                  </div>
                  <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border/60 pt-6 text-sm">
                    {item.links.map(({ label, href }) => (
                      <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
                        {label}
                        <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    ))}
                    <a href={LINKEDIN_ACTIVITY} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
                      <SiLinkedin size={13} aria-hidden="true" /> On LinkedIn
                      <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </article>
              </div>
            )}
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

export const ArticlesSection = () => {
  const [open, setOpen] = useState(null)
  const returnFocus = useRef(null)
  const openItem = (item, el) => { returnFocus.current = el; setOpen(item) }
  const close = useCallback(() => {
    setOpen(null)
    returnFocus.current?.focus({ preventScroll: true })
  }, [])
  return (
    <section id="articles" className="pt-0 pb-12 md:pb-16 relative">
      <div className="container-wide">
        <SectionHeader
          title="Articles"
          lead="Long-form pieces and weekly posts on where AI is going: models, chips, capital and policy."
        />
      </div>

      <CurvedStrip onOpen={openItem} />
      <Viewer item={open} onClose={close} />

    </section>
  )
}
