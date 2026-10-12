import { useEffect, useRef } from 'react'
import home2 from '../assets/images/home2.jpg'
import home3 from '../assets/images/home3.jpg'
import home4 from '../assets/images/home4.jpg'
import home6 from '../assets/images/home6.jpg'
import { subscribe } from '../hooks/scrollEngine'
import { clamp, ease, prefersReducedMotion } from '../utils'
import ScrollWords from './ScrollWords'

const STRIPS = [
  { src: home3, alt: 'Bright modern living room', label: 'Bright interiors' },
  { src: home6, alt: 'Family home with a porch', label: 'Family homes' },
  { src: home4, alt: 'Modern house with a pool', label: 'Pool residences' },
  { src: home2, alt: 'Modern house at dusk', label: 'Modern builds' },
]

/**
 * "Why Index": a statement that fills in word by word as you scroll,
 * then four slanted photo strips that rise one after another.
 */
export default function Statement() {
  const stripsRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const el = stripsRef.current
    const items = Array.from(el.children)
    return subscribe((_, vh) => {
      const r = el.getBoundingClientRect()
      const progress = clamp((vh * 0.95 - r.top) / (vh * 0.6))
      items.forEach((item, i) => {
        item.style.setProperty('--s', ease(clamp((progress - i * 0.1) / 0.55)))
      })
    })
  }, [])

  return (
    <section className="ix-statement" id="why">
      <div className="ix-container">
        <span className="ix-eyebrow">Why Index</span>
        <ScrollWords
          className="ix-big"
          text="Buying or selling a home is one of the biggest decisions you will make. Our local agents explain every number, plan every move and stay with you until the keys are in your hand."
        />
        <div className="ix-strips" ref={stripsRef}>
          {STRIPS.map((s) => (
            <div className="ix-strip" key={s.src}>
              <img src={s.src} alt={s.alt} loading="lazy" />
              <span className="cap">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
