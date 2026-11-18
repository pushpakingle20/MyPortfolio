import { useEffect, useState } from 'react'

export const ROUTES = ['home', 'about', 'projects', 'contact']

const read = () => {
  const h = window.location.hash.slice(1)
  return ROUTES.includes(h) ? h : 'home'
}

export default function useHashRoute() {
  const [route, setRoute] = useState(read)
  useEffect(() => {
    const onChange = () => {
      setRoute(read())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}
