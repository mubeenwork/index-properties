import { useEffect, useState } from 'react'
import { TESTIMONIALS } from '../data/site'
import { prefersReducedMotion } from '../utils'

/** Auto-rotating quote on a big card. The timer restarts whenever the slide changes (also after a dot click). */
export default function Testimonials() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = setTimeout(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 6000)
    return () => clearTimeout(id)
  }, [index])

  return (
    <section className="ix-sec ix-reviews" id="reviews">
      <div className="ix-container">
        <div className="ix-quote">
          <span className="ix-eyebrow">07 / Client stories</span>
          <span className="ix-qmark" aria-hidden="true">&ldquo;</span>
          <div className="ix-qs">
            {TESTIMONIALS.map((t, i) => (
              <div className={`ix-q ${i === index ? 'on' : ''}`} key={t.text} aria-hidden={i !== index}>
                <blockquote>{t.text}</blockquote>
                <cite>{t.who}</cite>
              </div>
            ))}
          </div>
          <div className="ix-dots">
            {TESTIMONIALS.map((t, i) => (
              <button key={t.text} type="button" aria-label={`Review ${i + 1}`} aria-current={i === index} onClick={() => setIndex(i)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
