import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../utils'

const LETTERS = 'INDEX'.split('')

/**
 * Logo intro. Draws the logo, counts the progress bar, then wipes a red curtain.
 * Calls `onReady` when the hero text may start animating, then removes itself.
 */
export default function Preloader({ onReady }) {
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) {
      onReady()
      setDone(true)
      return
    }
    const t1 = setTimeout(onReady, 2450)
    const t2 = setTimeout(() => setDone(true), 3050)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [onReady])

  if (done) return null

  return (
    <div className="ix-loader run" aria-hidden="true">
      <div className="lk">
        <svg viewBox="0 0 120 120">
          <rect className="frame" x="6" y="6" width="108" height="108" />
          <polyline className="roof" points="28,58 60,30 92,58" />
          <rect className="bar" x="40" y="58" width="13" height="38" />
          <line className="ln" x1="60" y1="66" x2="84" y2="66" />
          <line className="ln" x1="60" y1="79" x2="80" y2="79" />
          <line className="ln" x1="60" y1="92" x2="76" y2="92" />
        </svg>
        <div className="word">
          {LETTERS.map((ch, i) => (
            <span key={i} style={{ '--i': i }}>{ch}</span>
          ))}
        </div>
      </div>
      <i className="pbar" />
      <i className="cur" />
    </div>
  )
}
