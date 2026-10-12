import { useEffect, useRef } from 'react'
import { subscribe } from '../hooks/scrollEngine'
import { clamp, prefersReducedMotion } from '../utils'

/** A paragraph whose words go from faint to full colour as you scroll past it. */
export default function ScrollWords({ text, className = '' }) {
  const ref = useRef(null)
  const words = text.split(' ')

  useEffect(() => {
    const el = ref.current
    const spans = el.querySelectorAll('.wd')
    if (prefersReducedMotion()) {
      spans.forEach((s) => s.classList.add('on'))
      return
    }
    return subscribe((_, vh) => {
      const r = el.getBoundingClientRect()
      // starts when the paragraph reaches 80% of the screen height, ends when its bottom is at 40%
      const p = clamp((vh * 0.8 - r.top) / (vh * 0.4 + r.height))
      const n = Math.round(p * spans.length * 1.08)
      spans.forEach((s, i) => s.classList.toggle('on', i < n))
    })
  }, [])

  return (
    <p ref={ref} className={`ix-scrollwords ${className}`}>
      <span className="ix-sr">{text}</span>
      {words.map((w, i) => (
        <span key={i} className="wd" aria-hidden="true">{w}{' '}</span>
      ))}
    </p>
  )
}
