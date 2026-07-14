import { motion as Motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

// Scroll-linked drift — same physics grammar as the hero parallax, so cards
// across the page feel governed by one motion system. speed sets amplitude
// and direction (positive drifts up as you scroll past).
export const Parallax = ({ children, speed = 0.1, className = "" }) => {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [speed * 120, speed * -120])

  return (
    <Motion.div ref={ref} className={className} style={reduced ? undefined : { y }}>
      {children}
    </Motion.div>
  )
}

// Single scroll-reveal primitive for the whole site — Apple-style blur-up:
// one easing, one distance, settles crisp.

export const Reveal = ({ children, direction = "up", delay = 0, className = "" }) => {
  const reduced = useReducedMotion()

  const offset = {
    up: { y: 36 },
    down: { y: -36 },
    left: { x: -44 },
    right: { x: 44 },
  }[direction] ?? { y: 36 }

  return (
    <Motion.div
      className={className}
      initial={reduced ? { opacity: 1 } : { opacity: 0, filter: "blur(12px)", ...offset }}
      whileInView={{ opacity: 1, filter: "blur(0px)", x: 0, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Motion.div>
  )
}
