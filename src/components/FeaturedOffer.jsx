import offer from '../assets/images/home2.jpg'
import { scrollToId } from '../utils'
import { ArrowIcon, PhoneIcon } from './icons'
import ParallaxImg from './ParallaxImg'
import Reveal from './Reveal'

// What the offer includes. Edit the text here.
const OFFERS = [
  { label: 'Free home valuation', note: 'Based on recent nearby sales, within 24 hours' },
  { label: 'Closing-cost estimate', note: 'Know the full cost before you make an offer' },
  { label: 'First-time buyer help', note: 'Guidance on rebates and your first steps' },
]

/** Featured offer: a rounded card with the offer on the left and a photo on the right. */
export default function FeaturedOffer() {
  return (
    <section className="ix-offer-sec" id="offer">
      <div className="ix-container">
        <div className="ix-ofr">
          <div className="ix-ofr-copy">
            <Reveal as="span" className="ix-eyebrow">06 / Featured offer</Reveal>
            <Reveal as="h2" className="ix-h2" delay={1}>Start with a<br /><em>free plan.</em></Reveal>
            <Reveal as="p" className="ix-ofr-sub" delay={2}>One call and an agent will map out your next move, with real numbers.</Reveal>

            <Reveal as="ul" className="ix-ofr-list" delay={3}>
              {OFFERS.map((o, i) => (
                <li key={o.label}>
                  <span className="ix-ofr-n">0{i + 1}</span>
                  <span><b>{o.label}</b><small>{o.note}</small></span>
                </li>
              ))}
            </Reveal>

            <Reveal className="ix-ofr-cta" delay={4}>
              <button className="ix-btn" type="button" onClick={() => scrollToId('contact')}>Claim your free plan <ArrowIcon /></button>
              <span className="ix-ofr-tel"><PhoneIcon /><span>Call / Text<b>+1 (905) 555-0100</b></span></span>
            </Reveal>
          </div>

          <div className="ix-ofr-media">
            <ParallaxImg amount={22} src={offer} alt="A modern house at dusk" loading="lazy" />
            <span className="ix-ofr-badge"><i />No obligation. Reply within one business day.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
