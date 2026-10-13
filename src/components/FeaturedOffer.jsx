import offer from '../assets/images/offer.jpg'
import { scrollToId } from '../utils'
import { ArrowIcon, PhoneIcon, TagIcon } from './icons'
import ParallaxImg from './ParallaxImg'
import Reveal from './Reveal'

// The offer chips shown under the headline. Edit the text here.
const OFFERS = [
  { label: 'Free home valuation', note: 'Within 24 hours' },
  { label: 'Closing-cost estimate', note: 'Before you make an offer' },
  { label: 'First-time buyer help', note: 'Guidance on rebates' },
]

/** Featured offer: a wide photo banner with one strong message, a phone number and a button. */
export default function FeaturedOffer() {
  return (
    <section className="ix-offer-sec" id="offer">
      <div className="ix-container">
        <div className="ix-ofr">
          <ParallaxImg amount={30} src={offer} alt="Toronto skyline at sunset" loading="lazy" />
          <div className="ix-ofr-in">
            <Reveal as="span" className="ix-ofr-kicker"><TagIcon /> Featured offer</Reveal>
            <Reveal as="h2" className="ix-ofr-title" delay={1}>Thinking of buying or selling?<br />Start with a <em>free plan.</em></Reveal>
            <Reveal as="p" className="ix-ofr-sub" delay={2}>One call and an agent will map out your next move, with real numbers.</Reveal>
            <Reveal className="ix-ofr-cta" delay={3}>
              <span className="ix-ofr-tel"><PhoneIcon />Call / Text: <b>+1 (905) 555-0100</b></span>
              <button className="ix-btn" type="button" onClick={() => scrollToId('contact')}>Contact us <ArrowIcon /></button>
            </Reveal>
          </div>
          <ul className="ix-ofr-chips">
            {OFFERS.map((o) => (
              <li key={o.label}><b>{o.label}</b><span>{o.note}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
