import { useMemo, useRef, useState } from 'react'
import { PREVIEW_SCREENS, makeShot } from '../utils/preview.js'

export default function ProjectCard({ project, index }) {
  const { name, tags, desc, colors, kind } = project
  const cardRef = useRef(null)
  const [activeScreen, setActiveScreen] = useState(0)

  const screens = PREVIEW_SCREENS[kind]
  // build the three preview images once, not on every render
  const images = useMemo(() => screens.map((_, i) => makeShot(colors, kind, i)), [screens, colors, kind])

  // Whole card: tilt a little toward the mouse and move the glowing border
  function handleCardMove(event) {
    if (event.pointerType === 'touch') return

    const card = cardRef.current
    const box = card.getBoundingClientRect()
    const percentX = (event.clientX - box.left) / box.width
    const percentY = (event.clientY - box.top) / box.height
    const tiltX = (0.5 - percentY) * 5
    const tiltY = (percentX - 0.5) * 6

    card.style.setProperty('--gx', `${percentX * 100}%`)
    card.style.setProperty('--gy', `${percentY * 100}%`)
    card.style.transform = `perspective(900px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateY(-4px)`
  }

  function handleCardLeave() {
    cardRef.current.style.transform = ''
  }

  // Preview image: left, middle and right thirds show screen 1, 2 and 3
  function handleStageMove(event) {
    if (event.pointerType === 'touch') return

    const box = event.currentTarget.getBoundingClientRect()
    const percentX = (event.clientX - box.left) / box.width
    const screenIndex = Math.floor(percentX * 3)
    setActiveScreen(Math.min(2, Math.max(0, screenIndex)))
  }

  function handleStageLeave(event) {
    if (event.pointerType !== 'touch') setActiveScreen(0)
  }

  // Keyboard: arrow keys switch screens
  function handleKeyDown(event) {
    if (event.key === 'ArrowRight') setActiveScreen((current) => Math.min(2, current + 1))
    if (event.key === 'ArrowLeft') setActiveScreen((current) => Math.max(0, current - 1))
  }

  // Phones have no hover, so a tap goes to the next screen
  function handleClick() {
    const hasNoHover = window.matchMedia('(hover: none)').matches
    if (hasNoHover) setActiveScreen((current) => (current + 1) % 3)
  }

  return (
    <article
      ref={cardRef}
      className="pc"
      style={{ animationDelay: `${index * 90 + 300}ms` }}
      onPointerMove={handleCardMove}
      onPointerLeave={handleCardLeave}
    >
      <div
        className="stage"
        tabIndex={0}
        role="group"
        aria-label={`${name} preview. Move the cursor or use the arrow keys to change the screen.`}
        style={{ background: `linear-gradient(135deg,${colors[0]},${colors[1]})` }}
        onPointerMove={handleStageMove}
        onPointerLeave={handleStageLeave}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${name}, ${screens[i][0]} screen`}
            draggable={false}
            className={i === activeScreen ? 'on' : undefined}
          />
        ))}

        <div className="cap">
          <div>
            <b>{name}</b>
            <em>{screens[activeScreen][0]}</em>
          </div>
          <div className="dots">
            {screens.map((screen, i) => (
              <i key={screen[0]} className={i === activeScreen ? 'on' : undefined} />
            ))}
          </div>
        </div>
      </div>

      <div className="pi">
        <h3>{name}</h3>
        <p>{desc}</p>
        <span className="tg">{tags.join(', ')}</span>
      </div>
    </article>
  )
}
