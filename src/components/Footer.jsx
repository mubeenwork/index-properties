import { TOOLS } from '../data/homepage'
import DemoAction from './DemoAction'
import useInView from '../hooks/useInView'
import { scrollToId } from '../utils'
import { LogoMark } from './icons'

const LINKS = [
  { label: 'Buy', to: 'listings' },
  { label: 'Sell', to: 'move-tools' },
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
            <span>(555) 010-0100</span><span>hello@example.com</span><span>123 Sample Avenue<br />Demo City · Sample office</span>
          </div>
        </div>

        <div className="ix-footer-resources"><div><h3>Explore Index</h3><a href="#team" onClick={e=>go(e,'team')}>Our team</a><a href="#join" onClick={e=>go(e,'join')}>Join Index</a><a href="#buyer-programs" onClick={e=>go(e,'buyer-programs')}>Buyer programs</a><a href="#reports" onClick={e=>go(e,'reports')}>Free reports</a></div><div><h3>Planning tools</h3>{TOOLS.map(([label,path])=><DemoAction key={path}>{label} ↗</DemoAction>)}</div><div><h3>Stay connected</h3><DemoAction>Market Watch Report ↗</DemoAction><DemoAction>Facebook ↗</DemoAction><DemoAction>Instagram ↗</DemoAction><DemoAction>Privacy policy ↗</DemoAction><DemoAction>CRM login ↗</DemoAction></div></div><div className="ix-giant" aria-label="Index">
          {'INDEX'.split('').map((ch, i) => (
            <span key={i} style={{ '--i': i }} aria-hidden="true">{ch}</span>
          ))}
          <span style={{ '--i': 5 }} aria-hidden="true"><em>.</em></span>
        </div>

        <div className="ix-legal">
          <p>
            Design preview only. All people, property details, prices and contact information are samples. Photography is illustrative.
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
