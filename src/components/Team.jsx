import { TEAM } from '../data/team'
import { scrollToId } from '../utils'
import { ArrowIcon, PhoneIcon } from './icons'

const line = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.9, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
const SOCIALS = [
  { label: 'Facebook', icon: <svg viewBox="0 0 24 24" {...line}><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" /></svg> },
  { label: 'LinkedIn', icon: <svg viewBox="0 0 24 24" {...line}><path d="M6 9v10M6 5.2v.1M11 19v-6a3 3 0 0 1 6 0v6M11 9v10" /></svg> },
  { label: 'Instagram', icon: <svg viewBox="0 0 24 24" {...line}><rect x="4" y="4" width="16" height="16" rx="5" /><circle cx="12" cy="12" r="3.6" /><path d="M16.8 7.2v.1" /></svg> },
]

function Card({ m, hidden }) {
  return (
    <article className="ix-agent" aria-hidden={hidden || undefined}>
      <div className="ix-agent-ph">
        <img src={m.img} alt={hidden ? '' : `${m.name}, ${m.role}`} loading="lazy" draggable="false" />
        <ul className="ix-agent-social">
          {SOCIALS.map((s) => (
            <li key={s.label}><a href="#" tabIndex={hidden ? -1 : 0} aria-label={`${m.name} on ${s.label}`} onClick={(e) => e.preventDefault()}>{s.icon}</a></li>
          ))}
        </ul>
        <span className="ix-agent-tag">{m.role}</span>
      </div>
      <div className="ix-agent-info">
        <h3>{m.name}</h3>
        <span>{m.langs}</span>
        {m.phone && <a className="ix-agent-tel" href="#" tabIndex={hidden ? -1 : 0} onClick={(e) => e.preventDefault()}><PhoneIcon />{m.phone}</a>}
      </div>
    </article>
  )
}

/**
 * Our team: a marquee. The row of agent cards slides sideways on its own, forever, and stops while you point at it.
 * The list is rendered twice so the loop has no gap (the second copy is hidden from screen readers).
 * With "reduce motion" it does not slide; the row can be scrolled by hand instead.
 */
export default function Team() {
  return (
    <section className="ix-sec ix-team" id="team">
      <div className="ix-container">
        <div className="ix-head-row">
          <div>
            <span className="ix-eyebrow">06 / Our team</span>
            <h2 className="ix-h2">Meet the people<br />behind <em>Index</em></h2>
          </div>
          <button className="ix-pillbtn" type="button" onClick={() => scrollToId('contact')}>Talk to an agent <ArrowIcon /></button>
        </div>
      </div>

      <div className="ix-marquee" role="region" aria-label="Our team">
        <div className="ix-marquee-track">
          {TEAM.map((m) => <Card key={m.name} m={m} />)}
          {TEAM.map((m) => <Card key={`${m.name}-copy`} m={m} hidden />)}
        </div>
      </div>
    </section>
  )
}
