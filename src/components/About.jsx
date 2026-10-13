import { ABOUT_IMG } from '../data/site'
import useInView from '../hooks/useInView'
import CountUp from './CountUp'
import ParallaxImg from './ParallaxImg'
import Reveal from './Reveal'

export default function About() {
  const [portraitRef, portraitIn] = useInView({ threshold: 0.35, rootMargin: '0px' })

  return (
    <section className="ix-sec" id="about">
      <div className="ix-container">
        <div className="row align-items-center gy-5 gx-lg-5">
          <div className="col-12 col-lg-6">
            <div ref={portraitRef} className={`ix-portrait ${portraitIn ? 'in' : ''}`}>
              <ParallaxImg amount={20}src={ABOUT_IMG.src} alt={ABOUT_IMG.alt} loading="lazy" />
              <span className="cap"><small>Broker of Record</small><strong>Hardeep Sivia</strong></span>
              <span className="panel" />
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="tw:grid tw:gap-[22px]">
              <Reveal as="span" className="ix-eyebrow">About us</Reveal>
              <Reveal as="h2" className="ix-h2" delay={1}>Local agents. <em>Clear</em> advice.</Reveal>
              <Reveal as="p" className="ix-lead" delay={2}>
                Index Realty Brokerage started in Mississauga in 2021. We help families buy and sell homes across the
                Greater Toronto Area, and we explain every number along the way.
              </Reveal>
              <Reveal className="ix-stats" delay={3}>
                <div><b><CountUp to={2021} from={1996} /></b><span>Founded</span></div>
                <div><b><CountUp to={6} /></b><span>GTA cities</span></div>
                <div><b><CountUp to={4} /></b><span>Regions</span></div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
