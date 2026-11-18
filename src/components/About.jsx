import { useRef } from 'react'
import Icon from './Icon.jsx'
import SplitText from './SplitText.jsx'
import useReveal from '../hooks/useReveal.js'
import { aboutItems } from '../data.js'

export default function About() {
  const ref = useRef(null)
  useReveal(ref, '.tl li')
  return (
    <section className="view on" id="v-about" ref={ref}>
      <span className="wm" style={{ left: '-2vw', bottom: '-5vw' }}>About Me</span>
      <div className="col">
        <SplitText as="h2" className="pg" text="About Me." />
        <ul className="tl">
          {aboutItems.map((item) => (
            <li key={item.title}>
              <div className="hd">
                <h3>
                  {item.title} <Icon name={item.icon} size={15} />
                </h3>
                {item.link && (
                  <a href={item.link.href} {...(item.link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    {item.link.label}
                  </a>
                )}
              </div>
              {item.paras && item.paras.map((t) => <p key={t}>{t}</p>)}
              {item.groups && (
                <div className="sk">
                  {item.groups.map(([label, list]) => (
                    <div key={label}>
                      <em>{label}</em>
                      {list.map((s) => (
                        <span key={s}>{s}</span>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
