import { useEffect, useRef } from 'react'

// A soft ring that follows the mouse with a little delay, plus a small dot.
// The ring gets bigger over links, buttons and project previews.
export default function Cursor() {
  const ringRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    const hasMouse = window.matchMedia('(pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!hasMouse || prefersReducedMotion) return undefined

    const ring = ringRef.current
    const dot = dotRef.current
    let mouseX = -100
    let mouseY = -100
    let ringX = -100
    let ringY = -100
    let animationId = 0

    function handleMouseMove(event) {
      mouseX = event.clientX
      mouseY = event.clientY
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`

      const isOverClickable = event.target.closest && event.target.closest('a, button, .stage')
      ring.classList.toggle('big', Boolean(isOverClickable))
      ring.style.opacity = 1
      dot.style.opacity = 1
    }

    function handleMouseLeave() {
      ring.style.opacity = 0
      dot.style.opacity = 0
    }

    // the ring moves 16% of the way to the mouse each frame, which gives the lag
    function followMouse() {
      animationId = requestAnimationFrame(followMouse)
      ringX += (mouseX - ringX) * 0.16
      ringY += (mouseY - ringY) * 0.16
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
    }

    window.addEventListener('pointermove', handleMouseMove)
    document.addEventListener('pointerleave', handleMouseLeave)
    animationId = requestAnimationFrame(followMouse)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('pointermove', handleMouseMove)
      document.removeEventListener('pointerleave', handleMouseLeave)
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cur-ring" aria-hidden="true" />
      <div ref={dotRef} className="cur-dot" aria-hidden="true" />
    </>
  )
}
