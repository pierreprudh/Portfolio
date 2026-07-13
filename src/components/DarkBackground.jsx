import { useCallback } from "react"
import Particles from "react-tsparticles"
import { loadSlim } from "tsparticles-slim"

export const DarkBackground = ({ className = "" }) => {
  const init = useCallback(async (engine) => {
    await loadSlim(engine)
  }, [])

  return (
    <div
      className={`fixed inset-0 z-[5] overflow-hidden ${className}`}
      style={{ backgroundColor: "#04080f" }}
    >
      <div className="absolute inset-0">

        {/* Blob 1 — deep indigo, top-left dominant */}
        <div style={{
          position: "absolute",
          top: "-35%", left: "-15%",
          width: "130rem", height: "90rem",
          background: "radial-gradient(ellipse 58% 44% at 40% 52%, #3730a3 0%, #1e1b4b 42%, #0d0b2a 65%, transparent 78%)",
          opacity: 0.65,
          filter: "blur(72px)",
          borderRadius: "44% 56% 50% 50% / 40% 48% 52% 60%",
          animation: "auroraFloat1 18s ease-in-out infinite, auroraPulse 9s ease-in-out infinite",
        }} />

        {/* Blob 2 — teal right */}
        <div style={{
          position: "absolute",
          top: "5%", right: "-22%",
          width: "95rem", height: "85rem",
          background: "radial-gradient(ellipse 54% 46% at 54% 50%, #0f766e 0%, #134e4a 44%, #042f2e 68%, transparent 80%)",
          opacity: 0.55,
          filter: "blur(80px)",
          borderRadius: "52% 48% 60% 40% / 54% 60% 40% 46%",
          animation: "auroraFloat2 21s ease-in-out infinite, auroraPulse 12s ease-in-out infinite",
        }} />

        {/* Blob 3 — violet centre bloom */}
        <div style={{
          position: "absolute",
          top: "-18%", left: "25%",
          width: "75rem", height: "62rem",
          background: "radial-gradient(ellipse 52% 44% at 50% 50%, #7c3aed 0%, #4c1d95 38%, #2e1065 62%, transparent 76%)",
          opacity: 0.45,
          filter: "blur(60px)",
          borderRadius: "58% 42% 48% 52% / 50% 56% 44% 50%",
          animation: "auroraFloat3 14s ease-in-out infinite, auroraPulse 8s ease-in-out infinite",
        }} />

        {/* Blob 4 — electric cyan accent, upper-right */}
        <div style={{
          position: "absolute",
          top: "-10%", right: "-5%",
          width: "62rem", height: "55rem",
          background: "radial-gradient(ellipse 52% 48% at 50% 50%, #0891b2 0%, #0e7490 42%, #164e63 66%, transparent 80%)",
          opacity: 0.42,
          filter: "blur(64px)",
          borderRadius: "50% 50% 44% 56% / 48% 52% 48% 52%",
          animation: "auroraFloat2 15s ease-in-out infinite reverse, auroraPulse 10s ease-in-out infinite",
        }} />

        {/* Blob 5 — midnight blue, bottom sweep */}
        <div style={{
          position: "absolute",
          bottom: "-30%", left: "0%",
          width: "115rem", height: "75rem",
          background: "radial-gradient(ellipse 56% 44% at 44% 50%, #1e3a5f 0%, #0f2440 38%, #060e1c 62%, transparent 78%)",
          opacity: 0.55,
          filter: "blur(88px)",
          borderRadius: "46% 54% 44% 56% / 58% 40% 60% 42%",
          transform: "rotate(-5deg)",
          animation: "auroraFloat1 26s ease-in-out infinite reverse, auroraPulse 15s ease-in-out infinite",
        }} />

        {/* Blob 6 — rose/pink subtle warmth, centre-right */}
        <div style={{
          position: "absolute",
          top: "25%", right: "10%",
          width: "55rem", height: "50rem",
          background: "radial-gradient(ellipse 50% 46% at 50% 50%, #be185d 0%, #831843 46%, transparent 70%)",
          opacity: 0.10,
          filter: "blur(70px)",
          borderRadius: "54% 46% 52% 48% / 48% 54% 46% 52%",
          animation: "auroraFloat3 19s ease-in-out infinite, auroraPulse 11s ease-in-out infinite",
        }} />

        {/* Blob 7 — deep purple bottom-right anchor */}
        <div style={{
          position: "absolute",
          bottom: "-15%", right: "-10%",
          width: "70rem", height: "60rem",
          background: "radial-gradient(ellipse 54% 48% at 50% 50%, #581c87 0%, #3b0764 48%, transparent 72%)",
          opacity: 0.38,
          filter: "blur(75px)",
          borderRadius: "48% 52% 56% 44% / 52% 44% 56% 48%",
          animation: "auroraFloat2 17s ease-in-out infinite, auroraPulse 13s ease-in-out infinite",
        }} />

      </div>

      {/* Edge vignette */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 75% 75% at 50% 50%, transparent 35%, rgba(2, 4, 10, 0.55) 100%)",
        pointerEvents: "none",
      }} />

      {/* Particles — only below the hero (starts at 100vh) */}
      <div style={{
        position: "fixed",
        top: "100vh",
        left: 0, right: 0, bottom: 0,
        overflow: "hidden",
        zIndex: 3,
      }}>
        <Particles
          id="dark-particles"
          init={init}
          style={{ position: "absolute", inset: 0 }}
          options={{
            fullScreen: { enable: false },
            background: { color: { value: "transparent" }},
            fpsLimit: 60,
            particles: {
              number: { value: 55, density: { enable: true, area: 900 }},
              color: { value: ["#a5b4fc", "#c4b5fd", "#67e8f9"] },
              opacity: { value: 0.35 },
              size: { value: { min: 1, max: 2.5 }, random: true },
              move: { enable: true, speed: 0.7, direction: "none", outModes: { default: "out" }},
              links: {
                enable: true,
                distance: 130,
                color: "#818cf8",
                opacity: 0.18,
                width: 0.8,
              },
            },
            interactivity: {
              events: {
                onHover: { enable: true, mode: "repulse" },
                resize: true,
              },
              modes: { repulse: { distance: 80, duration: 0.4 }},
            },
            detectRetina: true,
          }}
        />
      </div>

    </div>
  )
}
