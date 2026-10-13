import { useEffect, useRef, useState } from 'react'
import { LISTINGS } from '../data/listings'
import { ArrowIcon } from './icons'
import toronto from '../assets/images/toronto.jpg'
import brampton from '../assets/images/city_brampton.jpg'
import oakville from '../assets/images/city_oakville.jpg'
import whitby from '../assets/images/city_whitby.jpg'
import home1 from '../assets/images/home1.jpg'
import condo1 from '../assets/images/condo1.jpg'

// One panel per city: the photo, where in the photo to look, and a short line shown when the panel opens.
const PANELS = [
  { name: 'Toronto', region: 'Toronto', img: toronto, pos: '50% 30%', line: 'Waterfront, downtown and condo towers.' },
  { name: 'Brampton', region: 'Peel', img: brampton, pos: '50% 60%', line: 'Family homes and new communities.' },
  { name: 'Mississauga', region: 'Peel', img: condo1, pos: '50% 50%', line: 'City Centre, transit and the lakefront.' },
  { name: 'Oakville', region: 'Halton', img: oakville, pos: '40% 50%', line: 'Upscale, leafy and close to the lake.' },
  { name: 'Milton', region: 'Halton', img: home1, pos: '50% 45%', line: 'Fast-growing and family friendly.' },
  { name: 'Whitby', region: 'Durham', img: whitby, pos: '50% 45%', line: 'Lakeside living in Durham Region.' },
]

const countFor = (city) => LISTINGS.filter((l) => l.city === city).length

/**
 * Where we work: six tall panels side by side. The open one is wide and shows the city, the others are thin
 * strips with a vertical name. Hover, focus or tap a panel to open it; "Explore" filters the listings above.
 */
export default function Neighbourhoods({ onPick }) {
  const [active, setActive] = useState(0)
  const timer = useRef(null)

  // Open a panel after a short pause, so the strips do not jump while the mouse is just passing over them.
  const open = (i, delay = 110) => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setActive(i), delay)
  }
  useEffect(() => () => clearTimeout(timer.current), [])

  return (
    <section className="ix-locations" id="areas">
      <div className="ix-container">
        <div className="ix-loc-head">
          <div className="ix-loc-title">
            <span className="ix-eyebrow">05 / Neighbourhoods</span>
            <h2 className="ix-h2">Find your <em>corner</em><br />of the GTA</h2>
          </div>
          <div className="ix-loc-side">
            <p>Six cities, four regions and one team that knows every street. Open a city to see its homes.</p>
            <ul className="ix-loc-stats">
              <li><b>6</b><span>Cities</span></li>
              <li><b>4</b><span>Regions</span></li>
              <li><b>{LISTINGS.length}</b><span>Homes</span></li>
            </ul>
          </div>
        </div>

        <div className="ix-fan" onMouseLeave={() => clearTimeout(timer.current)}>
          {PANELS.map((p, i) => {
            const on = active === i
            const n = countFor(p.name)
            return (
              <article
                key={p.name}
                className={`ix-pn ${on ? 'on' : ''}`}
                tabIndex={0}
                aria-expanded={on}
                aria-label={`${p.name}, ${p.region} Region`}
                onMouseEnter={() => open(i)}
                onFocus={() => open(i, 0)}
                onClick={() => open(i, 0)}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && e.target === e.currentTarget) { e.preventDefault(); open(i, 0) }
                }}
              >
                <img src={p.img} alt="" loading="lazy" style={{ objectPosition: p.pos }} />
                <span className="ix-pn-num">0{i + 1}</span>
                <span className="ix-pn-vert" aria-hidden="true">{p.name}</span>
                <div className="ix-pn-body" aria-hidden={!on}>
                  <small>{p.region} Region</small>
                  <strong>{p.name}</strong>
                  <em>{p.line}</em>
                  <div className="ix-pn-row">
                    <span className="ix-pn-count">{n} {n === 1 ? 'home' : 'homes'}</span>
                    <button className="ix-pn-go" type="button" tabIndex={on ? 0 : -1} onClick={(e) => { e.stopPropagation(); onPick(p.name) }}>
                      Explore {p.name} <ArrowIcon />
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
