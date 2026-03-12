import { useEffect, useState } from "react"

export const SplashScreen = ({ onDone }) => {
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setExiting(true), 1900)
    const t2 = setTimeout(onDone, 2500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
      style={exiting ? { animation: "splashExit 0.55s cubic-bezier(0.4, 0, 1, 1) forwards" } : {}}
    >
      {/* Ambient glow */}
      <div style={{
        position: "absolute",
        width: "40rem", height: "40rem",
        background: "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
        animation: "auroraPulse 3s ease-in-out infinite",
      }} />

      <div className="relative flex flex-col items-center gap-4">
        {/* Initials monogram */}
        <div
          className="text-[6rem] font-bold leading-none tracking-[-0.05em] select-none"
          style={{ animation: "splashContent 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both" }}
        >
          <span className="text-foreground">P</span>
          <span className="text-primary">P</span>
        </div>

        {/* Full name */}
        <div
          className="text-lg font-medium tracking-[0.25em] uppercase text-muted-foreground"
          style={{ animation: "splashContent 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.5s both" }}
        >
          Pierre Prudhomme
        </div>

        {/* Loading bar */}
        <div
          className="w-32 h-[2px] rounded-full bg-border overflow-hidden"
          style={{ animation: "splashContent 0.5s ease 0.7s both" }}
        >
          <div
            className="h-full bg-primary rounded-full"
            style={{ animation: "splashBar 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.8s both" }}
          />
        </div>
      </div>
    </div>
  )
}
