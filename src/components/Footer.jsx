import useInView from '../hooks/useInView'
import { scrollToId } from '../utils'
import { LogoMark } from './icons'

const LINKS = [
  { label: 'Buy', to: 'listings' },
  { label: 'Sell', to: 'services' },
  { label: 'About', to: 'about' },
  { label: 'Contact', to: 'contact' },
]

export default function Footer({ onReplay }) {
  const [ref, inView] = useInView({ threshold: 0.35, rootMargin: '0px' })
  const go = (e, to) => { e.preventDefault(); scrollToId(to) }

  return (
    <footer ref={ref} className={`ix-foot ${inView ? 'in' : ''}`}>
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
            <span>info@indexrealtybrokerage.com</span>
          </div>
        </div>

        <div className="ix-giant" aria-label="Index">
          {'INDEX'.split('').map((ch, i) => (
            <span key={i} style={{ '--i': i }} aria-hidden="true">{ch}</span>
          ))}
          <span style={{ '--i': 5 }} aria-hidden="true"><em>.</em></span>
        </div>

        <div className="ix-legal">
          <p>
            REALTOR® and MLS® are trademarks of CREA. Design prototype: listings and reviews are samples. Photos from{' '}
            <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a>, used as placeholders.
          </p>
          <span className="tw:flex tw:flex-wrap tw:items-center tw:gap-3.5">
            <button type="button" onClick={onReplay}>Replay intro</button>
            <span>© 2026 Index Realty Brokerage</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
