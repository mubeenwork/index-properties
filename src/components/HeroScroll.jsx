import { useEffect, useRef } from 'react'
import { subscribe } from '../hooks/scrollEngine'
import city from '../assets/images/city2.jpg'
import { clamp, ease, prefersReducedMotion, seg } from '../utils'
import Hero from './Hero'

/**
 * The INDEX scroll scene. The hero stays pinned to the screen while you scroll through about two screens:
 *   1. the headline and search lift away and fade, the photo zooms a little
 *   2. the screen darkens and a huge INDEX wordmark appears, with the Toronto skyline showing through the letters
 *   3. the wordmark grows towards you and fades while the "Why Index" section rises over it
 * Each step is a number written to CSS variables on the wrapper (see styles/scenes.css).
 * To make it gentler or stronger, change the seg(p, from, to) ranges and the numbers below.
 * With reduced motion the scene is skipped and the hero is a normal section.
 */
export default function HeroScroll(props) {
  const ref = useRef(null)
  const still = prefersReducedMotion()

  useEffect(() => {
    if (still) return
    const el = ref.current
    return subscribe((_, vh) => {
      const r = el.getBoundingClientRect()
      const p = clamp(-r.top / Math.max(1, r.height - vh)) // 0 at the top, 1 when the scene ends
      const hero = ease(seg(p, 0, 0.28))
      const word = ease(seg(p, 0.16, 0.5))
      const zoom = seg(p, 0.5, 0.9)
      const s = el.style
      s.setProperty('--hp-o', 1 - seg(p, 0, 0.2)) // hero text opacity
      s.setProperty('--hp-ty', `${-hero * 90}px`) // hero text moves up
      s.setProperty('--hp-z', 1 + hero * 0.08) // hero photo zoom
      s.setProperty('--dk', word * 0.85) // darkness over the hero
      s.setProperty('--w-o', word * (1 - ease(seg(p, 0.78, 0.92)))) // wordmark opacity
      s.setProperty('--w-s', 0.9 + 0.1 * word + Math.pow(zoom, 2.2) * 6) // wordmark scale (max ~7x)
      s.setProperty('--t-o', word * (1 - seg(p, 0.5, 0.6))) // tagline opacity
      s.setProperty('--cue', 1 - seg(p, 0, 0.08)) // "Scroll" hint
      el.dataset.out = hero > 0.9 ? 'true' : 'false' // hero is invisible: stop it catching clicks
    })
  }, [still])

  return (
    <div id="hero-scroll" ref={ref} className={`ix-hs ${still ? 'still' : ''}`}>
      <div className="ix-hs-stage">
        <Hero {...props} />
        {!still && (
          <>
            <div className="ix-hs-dark" />
            <div className="ix-hs-word" aria-hidden="true">
              <span className="w" style={{ backgroundImage: `url(${city})` }}>INDEX</span>
              <span className="t">Measuring what matters</span>
            </div>
            <div className="ix-hs-cue" aria-hidden="true"><span>Scroll</span><i /></div>
          </>
        )}
      </div>
    </div>
  )
}
