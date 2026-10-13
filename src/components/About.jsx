import { useState } from 'react'
import { ABOUT_IMG } from '../data/site'
import home2 from '../assets/images/home2.jpg'
import useInView from '../hooks/useInView'
import { scrollToId } from '../utils'
import { ArrowIcon, TagIcon } from './icons'
import CountUp from './CountUp'
import ParallaxImg from './ParallaxImg'
import Reveal from './Reveal'

const line = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }

// The three promises. Clicking one changes the text underneath.
const PROMISES = [
  {
    id: 'agents', label: 'Expert agents',
    icon: <svg viewBox="0 0 24 24" {...line}><circle cx="12" cy="8" r="3.5" /><path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" /></svg>,
    text: 'Every agent is licensed, local and easy to reach. They explain each step in plain language, so you always know what happens next.',
    points: ['Licensed agents across the GTA', 'Plain-language advice at every step'],
  },
  {
    id: 'service', label: 'Trusted service',
    icon: <svg viewBox="0 0 24 24" {...line}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" /></svg>,
    text: 'We put your interests first, with honest pricing advice and clear fees. Our clients come back and send their friends.',
    points: ['Clear, upfront fees', 'Support that continues after closing'],
  },
  {
    id: 'deals', label: 'Best deals',
    icon: <TagIcon />,
    text: 'We compare recent sales and negotiate hard for you, so you buy at a fair price and sell for what your home is worth.',
    points: ['Prices based on recent nearby sales', 'Strong, patient negotiation'],
  },
]

/** About: a red panel. Photo collage on the left; the story, three promise tabs, numbers and buttons on the right. */
export default function About() {
  const [portraitRef, portraitIn] = useInView({ threshold: 0.35, rootMargin: '0px' })
  const [tab, setTab] = useState('agents')
  const current = PROMISES.find((p) => p.id === tab)

  return (
    <section className="ix-about" id="about">
      <div className="ix-container">
        <div className="row align-items-center gy-5 gx-lg-5">
          <div className="col-12 col-lg-5">
            <div className="ix-ab-collage">
              <div ref={portraitRef} className={`ix-portrait ${portraitIn ? 'in' : ''}`}>
                <ParallaxImg amount={20} src={ABOUT_IMG.src} alt={ABOUT_IMG.alt} loading="lazy" />
                <span className="cap"><small>Broker of Record</small><strong>Hardeep Sivia</strong></span>
                <span className="panel" />
              </div>
              <img className="ix-ab-small" src={home2} alt="Modern house at dusk" loading="lazy" />
              <div className="ix-ab-seal" aria-hidden="true">
                <svg viewBox="0 0 120 120">
                  <defs><path id="ab-circle" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" /></defs>
                  <text><textPath href="#ab-circle" startOffset="0">ESTABLISHED IN MISSISSAUGA · GTA ·</textPath></text>
                </svg>
                <b>2021</b>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-7">
            <div className="ix-ab-copy">
              <Reveal as="span" className="ix-eyebrow">05 / About us</Reveal>
              <Reveal as="h2" className="ix-h2" delay={1}>We help you find<br />the <em>right home.</em></Reveal>
              <Reveal as="p" className="ix-lead" delay={2}>
                Index Realty Brokerage started in Mississauga in 2021. We help families buy and sell homes across the
                Greater Toronto Area, and we explain every number along the way.
              </Reveal>

              <Reveal className="ix-ab-tabs" delay={3}>
                <div className="ix-ab-tablist" role="tablist" aria-label="Our promises">
                  {PROMISES.map((p) => (
                    <button key={p.id} id={`ab-tab-${p.id}`} type="button" role="tab" aria-selected={tab === p.id} aria-controls="ab-panel" onClick={() => setTab(p.id)}>
                      {p.icon}{p.label}
                    </button>
                  ))}
                </div>
                <div className="ix-ab-panel" id="ab-panel" role="tabpanel" aria-labelledby={`ab-tab-${tab}`} key={tab}>
                  <p>{current.text}</p>
                  <ul>{current.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
                </div>
              </Reveal>

              <Reveal className="ix-stats" delay={4}>
                <div><b><CountUp to={2021} from={1996} /></b><span>Founded</span></div>
                <div><b><CountUp to={6} /></b><span>GTA cities</span></div>
                <div><b><CountUp to={4} /></b><span>Regions</span></div>
              </Reveal>

              <Reveal className="ix-ab-cta" delay={5}>
                <button className="ix-btn" type="button" onClick={() => scrollToId('team')}>Meet the team <ArrowIcon /></button>
                <button className="ix-ab-link" type="button" onClick={() => scrollToId('contact')}>Book a call <ArrowIcon /></button>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
