import { formatPrice } from '../utils'
import { AreaIcon, BathIcon, BedIcon, HeartIcon, PhoneIcon, PinIcon, TagIcon, WhatsAppIcon } from './icons'

const pad = (n) => String(n).padStart(2, '0')

/**
 * One listing in the showcase. It shows its place in the list (01 / 06), the price with the old price crossed out
 * when it was reduced, and the offer that comes with it. Clicking the card opens the quick view.
 */
export default function ListingCard({ item, index, total, saved, onToggleSave, onOpen, onContact }) {
  const stop = (fn) => (e) => { e.stopPropagation(); fn() }

  return (
    <article
      className="ix-card ix-enter"
      data-cursor="View"
      style={{ '--k': index }}
      role="button"
      tabIndex={0}
      aria-label={`Quick view: ${item.title}, ${item.city}`}
      onClick={() => onOpen(item.id)}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && e.target === e.currentTarget) {
          e.preventDefault()
          onOpen(item.id)
        }
      }}
    >
      <div className="ix-card-ph">
        <img src={item.img} alt={`${item.area}, ${item.city}`} loading="lazy" />
        <span className="ix-idx"><b>{pad(index + 1)}</b><i>/</i>{pad(total)}</span>
        <button className="ix-heart" type="button" aria-pressed={saved} aria-label={`Save ${item.title}`} onClick={stop(() => onToggleSave(item.id))}>
          <HeartIcon />
        </button>
        <span className={`ix-status ${item.hot ? 'hot' : ''}`}>{item.status}</span>
      </div>

      <div className="ix-card-info">
        <h3 className="ix-ttl">{item.title}</h3>
        <span className="ix-addr"><PinIcon />{item.area}, {item.city}</span>

        <div className="ix-price-row">
          <span className="ix-price-now">{formatPrice(item.price)}{item.mode === 'rent' && <small> /mo</small>}</span>
          {item.was && <s className="ix-price-was">{formatPrice(item.was)}</s>}
        </div>

        <div className="ix-spec">
          <span><BedIcon />{item.beds}</span>
          <span><BathIcon />{item.baths}</span>
          <span><AreaIcon />{item.sqft.toLocaleString('en-CA')} sq ft</span>
        </div>

        <div className="ix-offer"><TagIcon /><span><b>Offer</b>{item.offer}</span></div>

        <div className="ix-acts">
          <button className="ix-book" type="button" onClick={stop(onContact)}>Book Viewing</button>
          <button className="ix-ib" type="button" aria-label={`Call an agent about ${item.title}`} onClick={stop(onContact)}><PhoneIcon /></button>
          <button className="ix-ib wa" type="button" aria-label={`WhatsApp an agent about ${item.title}`} onClick={stop(onContact)}><WhatsAppIcon /></button>
        </div>
      </div>
    </article>
  )
}
