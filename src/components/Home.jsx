import CountUp from './CountUp.jsx'
import Icon from './Icon.jsx'
import SplitText from './SplitText.jsx'
import { profile, stats, techStack } from '../data.js'

export default function Home() {
  return (
    <section className="view on" id="v-home">
      <span className="wm" style={{ left: '-3vw', bottom: '-6vw' }}>PI.</span>
      <div className="shapes" aria-hidden="true"><i className="s1" /><i className="s2" /><i className="s3" /></div>
      <div className="col hero">
        <div className="badge"><i />Open to full-stack developer roles</div>
        <SplitText as="h1" className="name" text="I’m Pushpak Ingle" />
        <p>
          Full-stack developer and electronics engineer. I spend my days building <a href="#projects">Projects</a> with React, Node.js and Flask, from the interface down to the database, and sometimes down to the circuit.
        </p>
        <p>
          B.Tech in Electronics Engineering, with internships in MERN and Python/Flask development. I like minimal interfaces and code that does exactly what it says. Read <a href="#about">About</a> me, or <a href="#contact">Contact me</a>.
        </p>
        <a className="more" href="#about">
          See More About Me
          <svg viewBox="0 0 26 12" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M0 6h25M20 1l5 5-5 5" />
          </svg>
        </a>
        <ul className="soc">
          <li><a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Icon name="linkedin" /></a></li>
          <li><a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Icon name="github" /></a></li>
          <li><a href={`mailto:${profile.email}`} aria-label="Email"><Icon name="mail" /></a></li>
        </ul>
        <div className="stats">
          {stats.map((s) => (
            <div key={s.label}>
              <b><CountUp to={s.value} /></b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
        <div className="marquee" aria-label="Technologies I work with">
          <div className="track">
            {[...techStack, ...techStack].map((t, i) => (
              <span key={`${t}-${i}`} aria-hidden={i >= techStack.length ? 'true' : undefined}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
