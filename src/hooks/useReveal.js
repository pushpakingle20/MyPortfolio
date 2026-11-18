import { useEffect } from 'react'

// Adds the "in" class to items when they scroll into view, so CSS can fade them in.
export default function useReveal(containerRef, itemSelector) {
  useEffect(() => {
    const items = [...containerRef.current.querySelectorAll(itemSelector)]

    // a small delay per item so they don't all appear at the same moment
    items.forEach((item, index) => {
      item.style.transitionDelay = `${(index % 3) * 90}ms`
    })

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('in'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('in')
        })
      },
      { threshold: 0.12 },
    )
    items.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [containerRef, itemSelector])
}
