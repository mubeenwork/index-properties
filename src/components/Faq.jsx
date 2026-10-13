import { useState } from 'react'
import { FAQS } from '../data/blog'
import { scrollToId } from '../utils'
import { ArrowIcon, PhoneIcon } from './icons'

/** FAQ: a heading and a "still have questions?" card on the left, an accordion on the right (one answer open at a time). */
export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section className="ix-sec ix-faq" id="faq">
      <div className="ix-container">
        <div className="ix-faq-grid">
          <div className="ix-faq-side">
            <span className="ix-eyebrow">11 / FAQ</span>
            <h2 className="ix-h2">Questions,<br /><em>answered.</em></h2>
            <p className="ix-lead">The things buyers and sellers ask us most. Not here? Ask an agent, we reply within one business day.</p>
            <div className="ix-faq-card">
              <span className="ix-faq-ico"><PhoneIcon /></span>
              <div><b>Still have a question?</b><small>Talk to one of our agents.</small></div>
              <button className="ix-btn" type="button" onClick={() => scrollToId('contact')}>Ask an agent <ArrowIcon /></button>
            </div>
          </div>

          <div className="ix-faq-list">
            {FAQS.map((f, i) => {
              const on = open === i
              return (
                <div className={`ix-faq-row ${on ? 'on' : ''}`} key={f.q}>
                  <button className="ix-faq-q" type="button" id={`faq-q-${i}`} aria-expanded={on} aria-controls={`faq-a-${i}`} onClick={() => setOpen(on ? null : i)}>
                    <span className="ix-faq-n">{String(i + 1).padStart(2, '0')}</span>
                    <span className="ix-faq-t">{f.q}</span>
                    <span className="ix-faq-plus" aria-hidden="true" />
                  </button>
                  <div className="ix-faq-a" id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
                    <div><p>{f.a}</p></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
