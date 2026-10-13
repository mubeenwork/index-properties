import { TEAM } from '../data/team'
import useInView from '../hooks/useInView'
import { scrollToId } from '../utils'
import { ArrowIcon, PhoneIcon } from './icons'
import CountUp from './CountUp'
import ParallaxImg from './ParallaxImg'
import Reveal from './Reveal'

// The broker shown on the About section. It is the "Broker of Record" from the team list (src/data/team.js),
// so change the name, role and photo there.
const BROKER = TEAM.find((m) => m.role === 'Broker of Record') || TEAM[0]

/**
 * About, the way real estate sites usually do it: a large portrait of the broker with a name plate and a
 * "free consultation" card, then a short bio, three numbers and a button.
 */
export default function About() {
  const [portraitRef, portraitIn] = useInView({ threshold: 0.35, rootMargin: '0px' })

  return (
    <section className="ix-about" id="about">
      <div className="ix-container">
        <div className="row align-items-center gy-5 gx-lg-5">
          <div className="col-12 col-lg-5">
            <div className="ix-ab-frame">
              <span className="ix-ab-shape" aria-hidden="true" />
              <div ref={portraitRef} className={`ix-portrait ${portraitIn ? 'in' : ''}`}>
                <ParallaxImg amount={18} src={BROKER.img} alt={`${BROKER.name}, ${BROKER.role}`} loading="lazy" />
                <span className="cap"><small>{BROKER.role}</small><strong>{BROKER.name}</strong></span>
                <span className="panel" />
              </div>
              <button className="ix-ab-consult" type="button" onClick={() => scrollToId('contact')}>
                <span className="ix-ab-consult-ico"><PhoneIcon /></span>
                <span><b>Free consultation</b><small>Talk to a broker today</small></span>
                <ArrowIcon />
              </button>
            </div>
          </div>

          <div className="col-12 col-lg-7">
            <div className="ix-ab-copy">
              <Reveal as="span" className="ix-eyebrow">07 / About us</Reveal>
              <Reveal as="h2" className="ix-h2" delay={1}>Real estate,<br /><em>done personally.</em></Reveal>
              <Reveal className="ix-ab-bio" delay={2}>
                <p>
                  Index Realty Brokerage started in Mississauga in 2021 with one idea: every client should understand
                  the market as clearly as their agent does.
                </p>
                <p>
                  From first homes in Brampton to condos in Toronto and new builds in Whitby, we work with you from the
                  first call to the day you get the keys.
                </p>
              </Reveal>

              <Reveal className="ix-ab-stats" delay={3}>
                <div><b><CountUp to={2021} from={1996} /></b><span>Founded</span></div>
                <div><b><CountUp to={6} /></b><span>GTA cities</span></div>
                <div><b><CountUp to={4} /></b><span>Regions</span></div>
              </Reveal>

              <Reveal className="ix-ab-cta" delay={4}>
                <button className="ix-btn" type="button" onClick={() => scrollToId('team')}>Meet the team <ArrowIcon /></button>
                <span className="ix-ab-sign">{BROKER.name}<small>{BROKER.role}</small></span>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
