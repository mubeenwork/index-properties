import { useEffect, useRef, useState } from 'react'
import buyPhoto from '../assets/images/about.jpg'
import sellPhoto from '../assets/images/home8.jpg'
import { prefersReducedMotion, scrollToId } from '../utils'
import { ArrowIcon, TagIcon } from './icons'

// How long each side (Buy or Sell) stays open before it switches by itself, in milliseconds.
const AUTO_MS = 3000

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-9z" /></svg>
)

// The two sides. Edit the words here.
const SIDES = [
  {
    id: 'buy', label: 'Buy', icon: <HomeIcon />, photo: buyPhoto, alt: 'A small house model and keys on a table',
    title: 'I want to buy',
    line: 'Find the right home at the right price.',
    points: ['Homes matched to your budget and lifestyle', 'Expert negotiation on your behalf', 'Support from the first search to closing day'],
    steps: ['Search', 'Offer', 'Keys'],
    cta: { label: 'Browse listings', to: 'listings' },
  },
  {
    id: 'sell', label: 'Sell', icon: <TagIcon />, photo: sellPhoto, alt: 'A modern villa with a swimming pool',
    title: 'I want to sell',
    line: 'Get the best price for your home.',
    points: ['A free valuation from recent nearby sales', 'Staging advice and professional photos', 'Your home marketed where buyers look'],
    steps: ['Evaluate', 'List', 'Sell'],
    cta: { label: 'Get my valuation', to: 'contact' },
  },
]

/**
 * Buy or sell, as two big doors side by side. The open one is wide and shows everything; the other one is narrower
 * and shows only its title. They swap by themselves every few seconds. Point at one to open it, click to keep it.
 */
export default function BuySell() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false) // the mouse or the keyboard is on the section
  const [picked, setPicked] = useState(false) // the visitor clicked a side: stop switching for them
  const [visible, setVisible] = useState(false) // the section is on screen
  const ref = useRef(null)
  const hoverTimer = useRef(null)
  const auto = !picked && !prefersReducedMotion()

  // Swap sides on their own, only while the section is on screen and nobody is pointing at it.
  useEffect(() => {
    if (!auto || paused || !visible) return
    const id = setTimeout(() => setActive((a) => (a + 1) % SIDES.length), AUTO_MS)
    return () => clearTimeout(id)
  }, [active, auto, paused, visible])

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) { setVisible(true); return }
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  useEffect(() => () => clearTimeout(hoverTimer.current), [])

  // Pointing at a door opens it after a short pause, so the doors do not jump while the mouse only passes over.
  const hover = (i) => { clearTimeout(hoverTimer.current); hoverTimer.current = setTimeout(() => setActive(i), 120) }
  const choose = (i) => { clearTimeout(hoverTimer.current); setPicked(true); setActive(i) }

  return (
    <section className="ix-sec ix-dr" id="move" ref={ref}>
      <div className="ix-container">
        <div className="ix-dr-head">
          <span className="ix-eyebrow">02 / Your next move</span>
          <h2 className="ix-h2">Buying or selling? <em>Start here.</em></h2>
        </div>

        <div
          className="ix-dr-grid"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => { setPaused(false); clearTimeout(hoverTimer.current) }}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {SIDES.map((s, i) => {
            const on = active === i
            return (
              <article
                key={s.id}
                className={`ix-door ${on ? 'on' : ''}`}
                onMouseEnter={() => hover(i)}
                onClick={() => !on && choose(i)}
              >
                <img src={s.photo} alt={on ? s.alt : ''} loading="lazy" />
                <span className="ix-door-corner" aria-hidden="true" />

                <button className="ix-door-top" type="button" aria-expanded={on} aria-controls={`door-${s.id}`} onClick={() => choose(i)}>
                  <span className="ix-door-ico">{s.icon}</span>
                  <span className="ix-door-label">{s.label}</span>
                  <span className="ix-door-open" aria-hidden="true">{on ? 'Open' : 'See more'}</span>
                </button>

                <div className="ix-door-body" id={`door-${s.id}`}>
                  <h3>{s.title}</h3>
                  <p className="ix-door-line">{s.line}</p>
                  <div className="ix-door-more" aria-hidden={!on}>
                    <div>
                      <ul>
                        {s.points.map((p) => <li key={p}>{p}</li>)}
                      </ul>
                      <ol className="ix-door-steps">
                        {s.steps.map((t, n) => <li key={t}><b>0{n + 1}</b>{t}</li>)}
                      </ol>
                      <div className="ix-door-cta">
                        <button className="ix-btn" type="button" tabIndex={on ? 0 : -1} onClick={() => scrollToId(s.cta.to)}>{s.cta.label} <ArrowIcon /></button>
                        <button className="ix-door-link" type="button" tabIndex={on ? 0 : -1} onClick={() => scrollToId('contact')}>Talk to an agent <span aria-hidden="true">›</span></button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* a thin line that fills up until the sides swap */}
                {on && auto && <i className={`ix-door-prog ${paused || !visible ? 'hold' : ''}`} key={`prog-${active}-${paused || !visible}`} style={{ animationDuration: `${AUTO_MS}ms` }} aria-hidden="true" />}
              </article>
            )
          })}
          <span className="ix-dr-or" aria-hidden="true">or</span>
        </div>
      </div>
    </section>
  )
}
