import { useState } from 'react'
import ProjectCard from './ProjectCard.jsx'
import SplitText from './SplitText.jsx'
import { projectFilters, projects } from '../data.js'

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const list = projects.filter((p) => filter === 'All' || p.tags.includes(filter))
  return (
    <section className="view on" id="v-projects">
      <span className="wm" style={{ left: '-6vw', top: '40px', writingMode: 'vertical-rl', lineHeight: 1 }}>Projects</span>
      <div className="col">
        <SplitText as="h2" className="pg" text="Projects." />
        <div className="tabs" role="group" aria-label="Filter projects">
          {projectFilters.map((f) => (
            <button key={f} className="tab" aria-pressed={filter === f} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>
        <div className="grid">
          {list.map((p, i) => (
            <ProjectCard key={`${filter}-${p.name}`} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
