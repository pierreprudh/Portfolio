import { useEffect, useRef, useState } from "react"

export const ScrollReveal = ({ children, delay = 0, direction = "up" }) => {
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

  const hiddenTransform = {
    up: "translateY(48px)",
    down: "translateY(-48px)",
    left: "translateX(48px)",
    right: "translateX(-48px)",
  }[direction] ?? "translateY(48px)"

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : hiddenTransform,
        transition: `opacity 0.8s ease ${delay}s, transform 0.85s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}
