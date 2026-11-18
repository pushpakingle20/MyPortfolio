import { useEffect } from 'react'

// Makes buttons and icons lean a little toward the mouse when it is close.
export default function useMagnetic(selector = '.btn, .soc a') {
  useEffect(() => {
    const hasMouse = window.matchMedia('(pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!hasMouse || prefersReducedMotion) return undefined

    let activeElement = null

    function resetActiveElement() {
      if (activeElement) activeElement.style.translate = ''
      activeElement = null
    }

    function handleMouseMove(event) {
      const element = event.target.closest ? event.target.closest(selector) : null

      // the mouse left the previous element, so put it back
      if (activeElement && activeElement !== element) resetActiveElement()

      if (element) {
        activeElement = element
        const box = element.getBoundingClientRect()
        const offsetX = event.clientX - (box.left + box.width / 2)
        const offsetY = event.clientY - (box.top + box.height / 2)
        element.style.translate = `${offsetX * 0.25}px ${offsetY * 0.35}px`
      }
    }

    document.addEventListener('pointermove', handleMouseMove)
    document.addEventListener('pointerleave', resetActiveElement)
    return () => {
      document.removeEventListener('pointermove', handleMouseMove)
      document.removeEventListener('pointerleave', resetActiveElement)
      resetActiveElement()
    }
  }, [selector])
}
