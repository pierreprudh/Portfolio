import { motion as Motion, useReducedMotion } from "motion/react"

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
