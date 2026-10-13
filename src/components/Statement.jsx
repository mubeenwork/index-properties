import { useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import home3 from '../assets/images/home3.jpg'
import home4 from '../assets/images/home4.jpg'
import home6 from '../assets/images/home6.jpg'
import toronto from '../assets/images/toronto.jpg'
import { scrollToId } from '../utils'
import { ArrowIcon, CloseIcon } from './icons'
import CountUp from './CountUp'
import ParallaxImg from './ParallaxImg'
import Reveal from './Reveal'
import ScrollWords from './ScrollWords'

/**
 * The four reasons shown as tiles. Clicking the arrow on a tile opens a modal with the full detail
 * (`more`, the points and the call to action). Edit the text here.
 */
const REASONS = [
  {
    id: 'a', num: '01', img: home3, alt: 'Bright, modern living room', amount: 16,
    title: 'Local agents who know your street',
    short: 'Real neighbourhood knowledge in Brampton, Mississauga, Toronto, Oakville, Milton and Whitby.',
    more: 'Every agent on our team lives and works in the area they cover. They know which streets sell fastest, which schools families ask about and what a fair price looks like this month.',
    points: ['Agents who live in the area they sell', 'Six GTA cities in four regions', 'Neighbourhood tours before you decide', 'Introductions to lawyers, inspectors and lenders'],
    cta: { label: 'See homes by city', to: 'areas' },
  },
  {
    id: 'b', num: '02', img: home6, alt: 'Family home with a porch', amount: 10,
    title: 'Honest numbers',
    short: 'Pricing from recent sales on your street, not guesses.',
    more: 'Before you make or accept an offer, we show you the sales behind the price. You see what similar homes sold for, how long they took and what that means for your next step.',
    points: ['Price report from recent nearby sales', 'Clear breakdown of closing costs', 'Land transfer tax worked out for you', 'No hidden fees, ever'],
    cta: { label: 'Get a free valuation', to: 'contact' },
  },
  {
    id: 'stat', num: '03', stat: true, img: toronto, alt: 'Aerial view of downtown Toronto',
    title: 'One team across the GTA',
    short: 'Four regions, one brokerage, since 2021.',
    more: 'Index Realty Brokerage started in Mississauga in 2021 and now serves Peel, Halton, Toronto and Durham. One team means you can buy in one city and sell in another with the same people.',
    points: ['Peel: Brampton and Mississauga', 'Toronto: the city and the waterfront', 'Halton: Oakville and Milton', 'Durham: Whitby'],
    cta: { label: 'Meet the team', to: 'about' },
  },
  {
    id: 'd', num: '04', img: home4, alt: 'Modern house with a pool', amount: 14,
    title: 'One clear plan, from first call to keys',
    short: 'We stay with you through offers, inspections and closing day.',
    more: 'You always know what comes next. We lay out the steps at the first call and check in at each one, so there are no surprises between the offer and moving day.',
    points: ['A written plan at your first call', 'Help with offers and negotiation', 'Inspection and condition support', 'Closing-day walkthrough and keys'],
    cta: { label: 'Book a call', to: 'contact' },
  },
]

/**
 * "Why Index": a short statement that fills in as you scroll, then a bento grid of rounded tiles.
 * Each tile is one reason to choose Index. The arrow opens a modal with the details.
 */
export default function Statement() {
  const [openId, setOpenId] = useState(null)
  const openItem = REASONS.find((r) => r.id === openId)
  // keep the last opened reason so the modal text does not vanish while it fades out
  const last = useRef(null)
  if (openItem) last.current = openItem
  const shown = openItem || last.current

  const cta = (to) => {
    setOpenId(null)
    setTimeout(() => scrollToId(to), 300) // wait for the modal to close and release the page scroll
  }

  return (
    <section className="ix-statement" id="why">
      <div className="ix-container">
        <div className="ix-why-head">
          <div className="ix-why-title">
            <span className="ix-eyebrow">01 / Why Index</span>
            <h2 className="ix-h2">Why homeowners<br />choose <em>Index</em></h2>
          </div>
          <div className="ix-why-side">
            <ScrollWords
              className="ix-why-lead"
              text="Buying or selling is a big decision. Our local agents explain every number and stay with you until the keys are in your hand."
            />
            <button className="ix-pillbtn" type="button" onClick={() => scrollToId('about')}>Meet the team <ArrowIcon /></button>
          </div>
        </div>

        <div className="ix-why-grid">
          {REASONS.map((r, i) => (
            <Reveal as="article" className={`ix-wt ${r.id}`} delay={i} key={r.id}>
              {!r.stat && <ParallaxImg amount={r.amount} src={r.img} alt={r.alt} loading="lazy" />}
              <span className="ix-wt-num">{r.num}</span>
              {r.stat && <div className="ix-stat-big"><b><CountUp to={6} /></b><span>cities</span></div>}
              <div className="ix-wt-body">
                <h3>{r.title}</h3>
                <p>{r.short}</p>
              </div>
              <button className="ix-wt-go" type="button" aria-haspopup="dialog" aria-label={`Read more: ${r.title}`} onClick={() => setOpenId(r.id)}>
                <ArrowIcon />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <Modal show={!!openItem} onHide={() => setOpenId(null)} centered dialogClassName="ix-modal-dialog" contentClassName="ix-modal-content" aria-labelledby="why-title">
        <button className="ix-qv-close" type="button" aria-label="Close" onClick={() => setOpenId(null)}><CloseIcon /></button>
        {shown && (
          <div className="ix-qv-grid">
            <div className="ix-qv-img">
              <img src={shown.img} alt={shown.alt} />
              <span className="ix-why-modal-num">{shown.num} / 04</span>
            </div>
            <div className="ix-qv-body">
              <span className="ix-eyebrow">Why Index</span>
              <h3 id="why-title">{shown.title}</h3>
              <p className="ix-qv-desc">{shown.more}</p>
              <ul className="ix-why-points">
                {shown.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
              <div className="ix-qv-actions">
                <button className="ix-btn" type="button" onClick={() => cta(shown.cta.to)}>{shown.cta.label} <ArrowIcon /></button>
                <button className="ix-btn ix-ghost" type="button" onClick={() => setOpenId(null)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}
