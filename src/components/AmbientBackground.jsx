// Ambient canvas: three huge, slow-drifting color glows under the whole page.
// Fixed to the viewport, behind content, invisible to pointers and screen readers.
const blobs = [
  {
    size: "55vw", top: "-18%", left: "-12%",
    color: "hsl(var(--primary) / 0.17)",
    animation: "auroraFloat1 32s ease-in-out infinite",
  },
  {
    size: "50vw", top: "28%", right: "-16%",
    color: "hsl(215 70% 55% / 0.13)",
    animation: "auroraFloat2 40s ease-in-out infinite",
  },
  {
    size: "62vw", bottom: "-24%", left: "16%",
    color: "hsl(var(--primary) / 0.12)",
    animation: "auroraFloat3 48s ease-in-out infinite",
  },
]

export const AmbientBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
    {blobs.map(({ size, color, animation, ...position }, i) => (
      <div
        key={i}
        className="absolute rounded-full dark:opacity-55"
        style={{
          width: size,
          height: size,
          ...position,
          background: `radial-gradient(circle, ${color}, transparent 68%)`,
          filter: "blur(64px)",
          animation,
        }}
      />
    ))}
  </div>
)
