import { motion as Motion, useReducedMotion } from "motion/react"

const EASE = [0.16, 1, 0.3, 1]
const STAGGER = 0.07

const SIZES = {
  md: "clamp(1.9rem, 3.4vw, 3rem)",
  lg: "clamp(2.4rem, 4.2vw, 3.75rem)",
}

// Section title. Entrance, first time only: each word rises out of its own
// mask in a short stagger, then the lead blurs up once the title has landed.
// Pass `hideTitle` where the content already introduces itself: the heading
// then stays in the DOM for screen readers and SEO only.
export const SectionHeader = ({ title, lead, hideTitle = false, size = "md" }) => {
  const reduced = useReducedMotion()
  const words = title.split(" ")

  if (hideTitle) {
    return (
      <>
        <h2 className="sr-only">{title}</h2>
        {lead && <p className="text-left text-muted-foreground max-w-xl leading-relaxed mb-0">{lead}</p>}
      </>
    )
  }

  return (
    <Motion.div
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
    >
      <h2
        aria-label={title}
        className="text-left font-bold tracking-tight leading-[1.05] text-foreground mb-4 md:mb-5"
        style={{ fontSize: SIZES[size] ?? SIZES.md }}
      >
        {words.map((word, i) => (
          // pb/-mb keep descenders inside the mask without shifting the line box
          <span key={i} aria-hidden="true" className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
            <Motion.span
              className="inline-block"
              variants={{
                hidden: reduced ? { y: 0 } : { y: "110%" },
                shown: { y: 0 },
              }}
              transition={{ duration: 0.9, delay: i * STAGGER, ease: EASE }}
            >
              {word}
            </Motion.span>
            {i < words.length - 1 && " "}
          </span>
        ))}
      </h2>
      {lead && (
        <Motion.p
          className="text-left text-muted-foreground max-w-xl leading-relaxed mb-0"
          variants={{
            hidden: reduced ? { opacity: 1 } : { opacity: 0, y: 14, filter: "blur(8px)" },
            shown: { opacity: 1, y: 0, filter: "blur(0px)" },
          }}
          transition={{ duration: 0.9, delay: words.length * STAGGER + 0.15, ease: EASE }}
        >
          {lead}
        </Motion.p>
      )}
    </Motion.div>
  )
}
