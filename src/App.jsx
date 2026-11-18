import { useEffect, useRef, useState } from 'react'
import About from './components/About.jsx'
import Background from './components/Background.jsx'
import Contact from './components/Contact.jsx'
import Cursor from './components/Cursor.jsx'
import Header from './components/Header.jsx'
import Home from './components/Home.jsx'
import Projects from './components/Projects.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import useHashRoute from './hooks/useHashRoute.js'
import useMagnetic from './hooks/useMagnetic.js'
import useTheme from './hooks/useTheme.js'

const VIEWS = { home: Home, about: About, projects: Projects, contact: Contact }

export default function App() {
  const route = useHashRoute()
  const { toggle } = useTheme()
  const View = VIEWS[route]
  const prev = useRef(route)
  const [wipe, setWipe] = useState(0)

  useMagnetic()

  useEffect(() => {
    document.body.classList.toggle('home', route === 'home')
    if (prev.current !== route) {
      prev.current = route
      setWipe((n) => n + 1)
    }
  }, [route])

  return (
    <>
      <Background />
      <ScrollProgress />
      <Header route={route} onToggleTheme={toggle} />
      <main>
        <View key={route} />
      </main>
      {wipe > 0 && <div key={wipe} className="wipe" aria-hidden="true" />}
      <Cursor />
    </>
  )
}
