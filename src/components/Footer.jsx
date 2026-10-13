import { scrollToId } from '../utils'
import { LogoMark } from './icons'

const LINKS = [
  { label: 'Buy', to: 'listings' },
  { label: 'Neighbourhoods', to: 'areas' },
  { label: 'Services', to: 'services' },
  { label: 'About', to: 'about' },
  { label: 'Contact', to: 'contact' },
]

/** A compact footer: logo, links and contact on one row, then the legal line. */
export default function Footer({ onReplay }) {
  const go = (e, to) => { e.preventDefault(); scrollToId(to) }

  return (
    <footer className="ix-foot">
      <div className="ix-container">
        <div className="top">
          <a className="ix-logo" href="#top" aria-label="Back to top" onClick={(e) => go(e, 'top')}>
            <LogoMark />
            <b>INDEX</b>
          </a>
          <ul>
            {LINKS.map((l) => (
              <li key={l.label}><a href={`#${l.to}`} onClick={(e) => go(e, l.to)}>{l.label}</a></li>
            ))}
          </ul>
          <div className="contact">
            <span>Mississauga, Ontario</span>
            <a href="mailto:info@indexrealtybrokerage.com">info@indexrealtybrokerage.com</a>
          </div>
        </div>

        <div className="ix-legal">
          <span>© 2026 Index Realty Brokerage</span>
          <button type="button" onClick={onReplay}>Replay intro</button>
        </div>
      </div>
    </footer>
  )
}
