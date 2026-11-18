const LINKS = [
  ['about', 'About'],
  ['projects', 'Projects'],
  ['contact', 'Contact'],
]

export default function Header({ route, onToggleTheme }) {
  return (
    <header>
      <div className="bar">
        <a className="logo" href="#home" aria-label="Home">
          <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round">
            <path d="M22 6v32M8.1 14l27.8 16M8.1 30l27.8-16" />
          </svg>
        </a>
        <nav aria-label="Main">
          {LINKS.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={route === id ? 'on' : undefined}>
              {label}
            </a>
          ))}
          <button id="theme" onClick={onToggleTheme} aria-label="Switch light and dark theme">
            <svg width="26" height="26" viewBox="0 0 26 26">
              <circle cx="13" cy="13" r="11" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M13 2a11 11 0 0 1 0 22z" fill="currentColor" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  )
}
