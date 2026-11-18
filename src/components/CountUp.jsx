import { useEffect, useState } from 'react'

// Counts from 0 up to a number (used for the stats on the home page).
// delay and duration are in milliseconds.
export default function CountUp({ to, delay = 2300, duration = 1200 }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setCount(to)
      return undefined
    }

    let animationId = 0
    let startTime = 0
    const beginAt = performance.now() + delay

    function step(now) {
      // still waiting for the delay to finish
      if (now < beginAt) {
        animationId = requestAnimationFrame(step)
        return
      }
      if (!startTime) startTime = now

      const progress = Math.min(1, (now - startTime) / duration)
      const eased = 1 - Math.pow(1 - progress, 3) // starts fast, ends slow
      setCount(Math.round(to * eased))

      if (progress < 1) animationId = requestAnimationFrame(step)
    }

    animationId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animationId)
  }, [to, delay, duration])

  return <>{count}</>
}
