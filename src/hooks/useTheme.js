import { useCallback, useEffect, useState } from 'react'

export default function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'dark'
    } catch {
      return 'dark'
    }
  })
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* storage unavailable */
    }
  }, [theme])
  const toggle = useCallback(() => setTheme((t) => (t === 'light' ? 'dark' : 'light')), [])
  return { theme, toggle }
}
