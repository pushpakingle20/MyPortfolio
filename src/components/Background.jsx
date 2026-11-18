import { useEffect, useRef } from 'react'

// How the dots behave (distances are in pixels)
const MAX_DOTS = 70
const DOT_LINK_DISTANCE = 130 // dots closer than this get a line between them
const MOUSE_LINK_DISTANCE = 180 // dots this close to the mouse get a line to it
const MOUSE_PUSH_DISTANCE = 120 // dots this close to the mouse get pushed away

// Page background: soft glows, a spotlight on the grid that follows the mouse,
// and a network of small dots drawn on a canvas.
export default function Background() {
  const canvasRef = useRef(null)
  const spotlightRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const spotlight = spotlightRef.current
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const dots = []
    let width = 0
    let height = 0
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight * 0.4
    let animationId = 0

    // Match the canvas size to the window and add or remove dots to fit
    function resizeCanvas() {
      const pixelRatio = window.devicePixelRatio || 1
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * pixelRatio
      canvas.height = height * pixelRatio
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

      const wantedDots = Math.round(Math.min(MAX_DOTS, (width * height) / 22000))
      while (dots.length < wantedDots) {
        dots.push({
          x: Math.random() * width,
          y: Math.random() * height,
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: (Math.random() - 0.5) * 0.4,
          size: 1 + Math.random() * 1.5,
        })
      }
      dots.length = wantedDots
    }

    // Remember where the mouse is, move the spotlight and the parallax values
    function handleMouseMove(event) {
      mouseX = event.clientX
      mouseY = event.clientY
      spotlight.style.setProperty('--mx', `${mouseX}px`)
      spotlight.style.setProperty('--my', `${mouseY}px`)
      document.body.style.setProperty('--px', (mouseX / width - 0.5).toFixed(3))
      document.body.style.setProperty('--py', (mouseY / height - 0.5).toFixed(3))
    }

    function drawLine(fromX, fromY, toX, toY, opacity) {
      ctx.globalAlpha = opacity
      ctx.beginPath()
      ctx.moveTo(fromX, fromY)
      ctx.lineTo(toX, toY)
      ctx.stroke()
    }

    // Runs about 60 times per second: move every dot, then draw it and its lines
    function drawFrame() {
      animationId = requestAnimationFrame(drawFrame)

      const color = getComputedStyle(document.documentElement).getPropertyValue('--ink').trim()
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = color
      ctx.strokeStyle = color
      ctx.lineWidth = 1

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i]
        const distanceToMouseX = dot.x - mouseX
        const distanceToMouseY = dot.y - mouseY
        const mouseDistanceSquared = distanceToMouseX ** 2 + distanceToMouseY ** 2

        // line from the dot to the mouse
        if (mouseDistanceSquared < MOUSE_LINK_DISTANCE ** 2) {
          const mouseDistance = Math.sqrt(mouseDistanceSquared)
          drawLine(dot.x, dot.y, mouseX, mouseY, (1 - mouseDistance / MOUSE_LINK_DISTANCE) * 0.35)
        }

        // push the dot away from the mouse
        if (mouseDistanceSquared < MOUSE_PUSH_DISTANCE ** 2 && mouseDistanceSquared > 1) {
          const mouseDistance = Math.sqrt(mouseDistanceSquared)
          const pushStrength = (1 - mouseDistance / MOUSE_PUSH_DISTANCE) * 2.2
          dot.x += (distanceToMouseX / mouseDistance) * pushStrength
          dot.y += (distanceToMouseY / mouseDistance) * pushStrength
        }

        // move the dot and bounce it off the screen edges
        dot.x += dot.speedX
        dot.y += dot.speedY
        if (dot.x < 0 || dot.x > width) dot.speedX *= -1
        if (dot.y < 0 || dot.y > height) dot.speedY *= -1

        ctx.globalAlpha = 0.6
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2)
        ctx.fill()

        // lines to the other dots that are close enough
        for (let j = i + 1; j < dots.length; j++) {
          const other = dots[j]
          const distanceSquared = (dot.x - other.x) ** 2 + (dot.y - other.y) ** 2
          if (distanceSquared < DOT_LINK_DISTANCE ** 2) {
            drawLine(dot.x, dot.y, other.x, other.y, (1 - distanceSquared / DOT_LINK_DISTANCE ** 2) * 0.22)
          }
        }
      }
      ctx.globalAlpha = 1
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('pointermove', handleMouseMove)
    if (!prefersReducedMotion) animationId = requestAnimationFrame(drawFrame)

    // clean up when the component is removed
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('pointermove', handleMouseMove)
    }
  }, [])

  return (
    <>
      <div className="bg" />
      <canvas ref={canvasRef} className="fx" aria-hidden="true" />
      <div ref={spotlightRef} className="spot" aria-hidden="true" />
    </>
  )
}
