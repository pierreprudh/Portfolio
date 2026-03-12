import { useEffect, useRef, useState } from "react"

export const SectionDivider = () => {
  const ref = useRef(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTriggered(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ display: "flex", justifyContent: "center", height: 64, pointerEvents: "none" }}>
      <div style={{
        position: "relative",
        width: 1,
        height: "100%",
        background: "hsl(var(--primary) / 0.12)",
        borderRadius: 1,
        overflow: "hidden",
      }}>
        {triggered && (
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "40%",
            background: "linear-gradient(to bottom, transparent, hsl(var(--primary)), transparent)",
            animation: "shimmerSlide 1.6s cubic-bezier(0.4, 0, 0.6, 1) 0.05s forwards",
          }} />
        )}
      </div>
    </div>
  )
}
