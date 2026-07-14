/**
 * Adapted from Kokonut UI "Background Paths" (MIT)
 * @author: @dorianbaffier — https://kokonutui.com
 * Background layer only: the demo's hero/title markup is stripped, and the
 * purple/pink gradient is re-tinted to the site's teal palette.
 */

import { motion as Motion } from "motion/react"
import { memo, useMemo } from "react"

function generateAestheticPath(index, position, type) {
  const baseAmplitude = type === "primary" ? 150 : type === "secondary" ? 100 : 60
  const phase = index * 0.2
  const points = []
  const segments = type === "primary" ? 10 : type === "secondary" ? 8 : 6

  const startX = 2400
  const startY = 800
  const endX = -2400
  const endY = -800 + index * 25

  for (let i = 0; i <= segments; i++) {
    const progress = i / segments
    const eased = 1 - (1 - progress) ** 2

    const baseX = startX + (endX - startX) * eased
    const baseY = startY + (endY - startY) * eased

    const amplitudeFactor = 1 - eased * 0.3
    const wave1 = Math.sin(progress * Math.PI * 3 + phase) * (baseAmplitude * 0.7 * amplitudeFactor)
    const wave2 = Math.cos(progress * Math.PI * 4 + phase) * (baseAmplitude * 0.3 * amplitudeFactor)
    const wave3 = Math.sin(progress * Math.PI * 2 + phase) * (baseAmplitude * 0.2 * amplitudeFactor)

    points.push({
      x: baseX * position,
      y: baseY + wave1 + wave2 + wave3,
    })
  }

  const pathCommands = points.map((point, i) => {
    if (i === 0) return `M ${point.x} ${point.y}`
    const prevPoint = points[i - 1]
    const tension = 0.4
    const cp1x = prevPoint.x + (point.x - prevPoint.x) * tension
    const cp1y = prevPoint.y
    const cp2x = prevPoint.x + (point.x - prevPoint.x) * (1 - tension)
    const cp2y = point.y
    return `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${point.x} ${point.y}`
  })

  return pathCommands.join(" ")
}

const generateUniqueId = (prefix) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`

const FloatingPaths = memo(function FloatingPaths({ position }) {
  const primaryPaths = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: generateUniqueId("primary"),
        d: generateAestheticPath(i, position, "primary"),
        opacity: 0.15 + i * 0.02,
        width: 4 + i * 0.3,
      })),
    [position]
  )

  const secondaryPaths = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        id: generateUniqueId("secondary"),
        d: generateAestheticPath(i, position, "secondary"),
        opacity: 0.12 + i * 0.015,
        width: 3 + i * 0.25,
      })),
    [position]
  )

  const accentPaths = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: generateUniqueId("accent"),
        d: generateAestheticPath(i, position, "accent"),
        opacity: 0.08 + i * 0.12,
        width: 2 + i * 0.2,
      })),
    [position]
  )

  const sharedAnimationProps = {
    opacity: 1,
    scale: 1,
    transition: {
      opacity: { duration: 1 },
      scale: { duration: 1 },
    },
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="h-full w-full"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        viewBox="-2400 -800 4800 1600"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="sharedGradient" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="hsl(186 45% 40% / 0.5)" />
            <stop offset="50%" stopColor="hsl(199 65% 55% / 0.5)" />
            <stop offset="100%" stopColor="hsl(170 45% 45% / 0.5)" />
          </linearGradient>
        </defs>

        <g className="primary-waves">
          {primaryPaths.map((path) => (
            <Motion.path
              animate={{ ...sharedAnimationProps, y: [0, -15, 0] }}
              d={path.d}
              initial={{ opacity: 0, scale: 0.8 }}
              key={path.id}
              stroke="url(#sharedGradient)"
              strokeLinecap="round"
              strokeWidth={path.width}
              style={{ opacity: path.opacity }}
              transition={{
                ...sharedAnimationProps.transition,
                y: {
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  repeatType: "reverse",
                },
              }}
            />
          ))}
        </g>

        <g className="secondary-waves" style={{ opacity: 0.8 }}>
          {secondaryPaths.map((path) => (
            <Motion.path
              animate={{ ...sharedAnimationProps, y: [0, -10, 0] }}
              d={path.d}
              initial={{ opacity: 0, scale: 0.9 }}
              key={path.id}
              stroke="url(#sharedGradient)"
              strokeLinecap="round"
              strokeWidth={path.width}
              style={{ opacity: path.opacity }}
              transition={{
                ...sharedAnimationProps.transition,
                y: {
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  repeatType: "reverse",
                },
              }}
            />
          ))}
        </g>

        <g className="accent-waves" style={{ opacity: 0.6 }}>
          {accentPaths.map((path) => (
            <Motion.path
              animate={{ ...sharedAnimationProps, y: [0, -5, 0] }}
              d={path.d}
              initial={{ opacity: 0, scale: 0.95 }}
              key={path.id}
              stroke="url(#sharedGradient)"
              strokeLinecap="round"
              strokeWidth={path.width}
              style={{ opacity: path.opacity }}
              transition={{
                ...sharedAnimationProps.transition,
                y: {
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  repeatType: "reverse",
                },
              }}
            />
          ))}
        </g>
      </svg>
    </div>
  )
})

const BackgroundPaths = memo(function BackgroundPaths({ position = 1 }) {
  return (
    <div className="absolute inset-0">
      <FloatingPaths position={position} />
    </div>
  )
})

export default BackgroundPaths
