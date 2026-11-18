import { useRef } from 'react'
import Icon from './Icon.jsx'
import SplitText from './SplitText.jsx'
import useReveal from '../hooks/useReveal.js'
import { profile } from '../data.js'

export default function Contact() {
  const ref = useRef(null)
  useReveal(ref, '.rows li')
  return (
    <section className="view on" id="v-contact" ref={ref}>
      <span className="wm" style={{ right: '-3vw', bottom: '-5vw' }}>Hi.</span>
      <div className="col">
        <SplitText as="h2" className="pg" text="Contact." />
        <p style={{ maxWidth: '56ch', margin: '0 0 28px', color: 'var(--muted)' }}>
          I’m open to full-stack and MERN developer roles. Email is the quickest way to reach me.
        </p>
        <a className="mail" href={`mailto:${profile.email}`}>{profile.email}</a>
        <div className="cta">
          <a className="btn p" href={`mailto:${profile.email}`}><Icon name="mail" size={18} />Email me</a>
          <a className="btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Icon name="linkedin" size={18} />LinkedIn</a>
          <a className="btn" href={profile.github} target="_blank" rel="noopener noreferrer"><Icon name="github" size={18} />GitHub</a>
        </div>
        <ul className="rows">
          <li>Phone<span><a href={`tel:${profile.phoneHref}`}>{profile.phone}</a></span></li>
          <li>LinkedIn<span><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">pushpak-ingle</a></span></li>
          <li>GitHub<span><a href={profile.github} target="_blank" rel="noopener noreferrer">pushpakingle20</a></span></li>
          <li>Location<span>{profile.location}</span></li>
        </ul>
      </div>
    </section>
  )
}
