import { SERVICES } from '../data/site'
import { scrollToId } from '../utils'
import ParallaxImg from './ParallaxImg'
import Reveal from './Reveal'

/** Three photo tiles. Bootstrap grid: 1 column on phones, 3 from tablet up. */
export default function Services() {
  return (
    <section className="ix-sec ix-services" id="services">
      <div className="ix-container">
        <div className="ix-head">
          <span className="ix-eyebrow">04 / What we do</span>
          <h2 className="ix-h2">Here for every <em>move</em></h2>
        </div>
        <div className="row g-4">
          {SERVICES.map((s, i) => (
            <div className="col-12 col-md-4" key={s.title}>
              <Reveal as="a" className="ix-svc" delay={i} data-cursor="Explore" href={`#${s.to}`} onClick={(e) => { e.preventDefault(); scrollToId(s.to) }}>
                <ParallaxImg amount={14}src={s.img} alt={s.alt} loading="lazy" />
                <div className="tx">
                  <span className="bar" />
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
