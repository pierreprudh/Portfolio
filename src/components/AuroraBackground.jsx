export const AuroraBackground = ({ className = "" }) => {
  return (
    <div
      className={`fixed inset-0 z-[5] overflow-hidden ${className}`}
      style={{ backgroundColor: "#f0faf5" }}
    >
      <div className="absolute inset-0">

        {/* Blob 1 — soft emerald, top-left */}
        <div style={{
          position: "absolute",
          top: "-40%", left: "-20%",
          width: "160rem", height: "110rem",
          background: "radial-gradient(ellipse 58% 44% at 40% 50%, #6ee7b7 0%, #34d399 42%, #10b981 68%, transparent 82%)",
          opacity: 0.38,
          filter: "blur(80px)",
          borderRadius: "44% 56% 48% 52% / 38% 50% 50% 62%",
          animation: "auroraFloat1 16s ease-in-out infinite, auroraPulse 9s ease-in-out infinite",
        }} />

        {/* Blob 2 — pale teal, right */}
        <div style={{
          position: "absolute",
          top: "0%", right: "-25%",
          width: "115rem", height: "100rem",
          background: "radial-gradient(ellipse 55% 46% at 52% 50%, #5eead4 0%, #2dd4bf 44%, #0d9488 72%, transparent 84%)",
          opacity: 0.30,
          filter: "blur(90px)",
          borderRadius: "54% 46% 60% 40% / 52% 62% 38% 48%",
          animation: "auroraFloat2 20s ease-in-out infinite, auroraPulse 11s ease-in-out infinite",
        }} />

        {/* Blob 3 — white/mint bright core */}
        <div style={{
          position: "absolute",
          top: "-15%", left: "20%",
          width: "85rem", height: "68rem",
          background: "radial-gradient(ellipse 52% 42% at 50% 50%, rgba(255,255,255,1) 0%, #d1fae5 30%, #a7f3d0 55%, transparent 72%)",
          opacity: 0.85,
          filter: "blur(50px)",
          borderRadius: "58% 42% 50% 50% / 54% 46% 54% 46%",
          animation: "auroraFloat3 11s ease-in-out infinite reverse, auroraPulse 6s ease-in-out infinite",
        }} />

        {/* Blob 4 — cyan whisper, upper-center */}
        <div style={{
          position: "absolute",
          top: "-20%", left: "35%",
          width: "72rem", height: "58rem",
          background: "radial-gradient(ellipse 52% 44% at 50% 52%, #a5f3fc 0%, #67e8f9 42%, #22d3ee 65%, transparent 80%)",
          opacity: 0.22,
          filter: "blur(65px)",
          borderRadius: "60% 40% 52% 48% / 48% 56% 44% 52%",
          animation: "auroraFloat3 15s ease-in-out infinite, auroraPulse 8s ease-in-out infinite",
        }} />

        {/* Blob 5 — mint bottom sweep */}
        <div style={{
          position: "absolute",
          bottom: "-30%", left: "-5%",
          width: "110rem", height: "78rem",
          background: "radial-gradient(ellipse 56% 44% at 44% 50%, #a7f3d0 0%, #6ee7b7 38%, #34d399 64%, transparent 80%)",
          opacity: 0.32,
          filter: "blur(90px)",
          borderRadius: "46% 54% 44% 56% / 58% 40% 60% 42%",
          transform: "rotate(-5deg)",
          animation: "auroraFloat1 25s ease-in-out infinite reverse, auroraPulse 14s ease-in-out infinite",
        }} />

        {/* Blob 6 — teal edge, top-right */}
        <div style={{
          position: "absolute",
          top: "-15%", right: "-8%",
          width: "65rem", height: "58rem",
          background: "radial-gradient(ellipse 54% 48% at 50% 50%, #5eead4 0%, #2dd4bf 48%, #0d9488 72%, transparent 84%)",
          opacity: 0.28,
          filter: "blur(70px)",
          borderRadius: "50% 50% 46% 54% / 50% 48% 52% 50%",
          animation: "auroraFloat2 15s ease-in-out infinite reverse, auroraPulse 10s ease-in-out infinite",
        }} />

      </div>

      {/* Bright centre wash — keeps the reading area clean */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(255,255,255,0.55) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
    </div>
  )
}
