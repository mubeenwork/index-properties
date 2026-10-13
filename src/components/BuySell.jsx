import { useEffect, useRef, useState } from 'react'
import buyPhoto from '../assets/images/about.jpg'
import sellPhoto from '../assets/images/home8.jpg'
import { prefersReducedMotion, scrollToId } from '../utils'

// How long each side (Buy or Sell) stays before it switches by itself, in milliseconds.
const AUTO_MS = 3000
import { ArrowIcon, TagIcon } from './icons'

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-9z" /></svg>
)

// Everything that changes when you switch between Buy and Sell.
const MODES = {
  buy: {
    label: 'Buy', icon: <HomeIcon />, photo: buyPhoto, alt: 'A small house model and keys on a table',
    kicker: 'Your next move starts here',
    title: <>Looking for a home?<br />We'll make it <em>simple.</em></>,
    sub: 'Find homes in your budget',
    points: ['Homes matched to your budget and lifestyle', 'Expert negotiation on your behalf', 'Support from the first search to closing day'],
    cta: { label: 'Browse listings', to: 'listings' },
    chip: 'Free buyer consultation',
    steps: [['Search', 'Tell us your budget'], ['Offer', 'We negotiate for you'], ['Keys', 'Close with confidence']],
  },
  sell: {
    label: 'Sell', icon: <TagIcon />, photo: sellPhoto, alt: 'A modern villa with a swimming pool',
    kicker: 'Thinking of selling?',
    title: <>Ready to sell?<br />Let's get you the <em>best price.</em></>,
    sub: 'Get a free home valuation',
    points: ['A free valuation from recent nearby sales', 'Staging advice and professional photos', 'Your home marketed where buyers look'],
    cta: { label: 'Get my valuation', to: 'contact' },
    chip: 'Free valuation, reply within one business day',
    steps: [['Evaluate', 'A free valuation'], ['List', 'Photos and marketing'], ['Sell', 'The best offer, closed']],
  },
}

/**
 * Buy or sell: a toggle on top of a tall photo. Switching it swaps the photo and all the words on the right
 * (the headline, three points, the button and the three steps). The text is in MODES above.
 */
export default function BuySell() {
  const [mode, setMode] = useState('buy')
  const [paused, setPaused] = useState(false) // the mouse or the keyboard is on the section
  const [picked, setPicked] = useState(false) // the visitor chose a side themselves: stop switching for them
  const [visible, setVisible] = useState(false) // the section is on screen
  const ref = useRef(null)
  const m = MODES[mode]
  const keys = Object.keys(MODES)
  const auto = !picked && !prefersReducedMotion()

  // Switch sides on its own, only while the section is on screen and nobody is pointing at it.
  useEffect(() => {
    if (!auto || paused || !visible) return
    const id = setTimeout(() => setMode((cur) => (cur === 'buy' ? 'sell' : 'buy')), AUTO_MS)
    return () => clearTimeout(id)
  }, [mode, auto, paused, visible])

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) { setVisible(true); return }
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const choose = (k) => { setPicked(true); setMode(k) }

  const onKey = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault()
      choose(mode === 'buy' ? 'sell' : 'buy')
    }
  }

  return (
    <section className="ix-sec ix-bs" id="move" ref={ref}>
      <div className="ix-container">
        <div
          className="ix-bs-grid"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="ix-bs-media">
            {keys.map((k) => (
              <img key={k} className={`ix-bs-img ${mode === k ? 'on' : ''}`} src={MODES[k].photo} alt={mode === k ? MODES[k].alt : ''} loading="lazy" />
            ))}
            <span className="ix-bs-corner" aria-hidden="true" />

            <div className={`ix-bs-toggle ${mode}`} role="tablist" aria-label="Buy or sell" onKeyDown={onKey}>
              <span className="ix-bs-slider" aria-hidden="true" />
              {keys.map((k) => (
                <button key={k} type="button" role="tab" id={`bs-tab-${k}`} aria-selected={mode === k} aria-controls="bs-panel" tabIndex={mode === k ? 0 : -1} onClick={() => choose(k)}>
                  {MODES[k].icon}{MODES[k].label}
                </button>
              ))}
            </div>

            <span className="ix-bs-chip" key={`chip-${mode}`}><i />{m.chip}</span>
            {/* a thin line that fills up until the next switch */}
            {auto && <i className={`ix-bs-prog ${paused || !visible ? 'hold' : ''}`} key={`prog-${mode}-${paused || !visible}`} style={{ animationDuration: `${AUTO_MS}ms` }} aria-hidden="true" />}
          </div>

          <div className="ix-bs-copy" id="bs-panel" role="tabpanel" aria-labelledby={`bs-tab-${mode}`}>
            <div className="ix-bs-swap" key={mode}>
              <span className="ix-bs-kicker">02 / {m.kicker}</span>
              <h2 className="ix-h2">{m.title}</h2>
              <p className="ix-bs-sub">{m.sub}</p>
              <ul className="ix-bs-points">
                {m.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
              <div className="ix-bs-cta">
                <button className="ix-btn" type="button" onClick={() => scrollToId(m.cta.to)}>{m.cta.label} <ArrowIcon /></button>
                <button className="ix-bs-link" type="button" onClick={() => scrollToId('contact')}>Talk to an agent <span aria-hidden="true">›</span></button>
              </div>
              <ol className="ix-bs-steps">
                {m.steps.map(([t, d], i) => (
                  <li key={t}><b>0{i + 1}</b><strong>{t}</strong><span>{d}</span></li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
