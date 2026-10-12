import { useState } from 'react'
import { TESTIMONIALS } from '../data/site'

/** Reader-controlled quotes keep the current review stable while reading. */
export default function Testimonials() {
  const [index, setIndex] = useState(0)

return (
    <section className="ix-sec" id="reviews">
      <div className="ix-container ix-quote">
        <span className="ix-eyebrow">THE OTHER SIDE OF MOVING DAY</span><h2 className="ix-h2">Good moves. <em>Happy people.</em></h2><span className="mark" aria-hidden="true">&ldquo;</span>
        <div className="ix-qs">
          {TESTIMONIALS.map((t, i) => (
            <div className={`ix-q ${i === index ? 'on' : ''}`} key={t.text} aria-hidden={i !== index}>
              <blockquote>{t.text}</blockquote>
              <cite>{t.who}</cite>
            </div>
          ))}
        </div>
        <div className="ix-review-controls"><button className="ix-review-arrow" aria-label="Previous review" onClick={() => setIndex(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}>←</button><div className="ix-dots">
          {TESTIMONIALS.map((t, i) => (
            <button key={t.text} type="button" aria-label={`Review ${i + 1}`} aria-current={i === index} onClick={() => setIndex(i)} />
          ))}
        </div><button className="ix-review-arrow" aria-label="Next review" onClick={() => setIndex(i => (i + 1) % TESTIMONIALS.length)}>→</button></div>
      </div>
    </section>
  )
}
