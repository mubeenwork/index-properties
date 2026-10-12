import { formatPrice } from '../utils'
import { AreaIcon, BathIcon, BedIcon, HeartIcon, PhoneIcon, PinIcon, WhatsAppIcon } from './icons'

/** One listing card. Clicking the card opens the quick view; the buttons inside do their own thing. */
export default function ListingCard({ item, index, saved, onToggleSave, onOpen, onContact }) {
  const stop = (fn) => (e) => { e.stopPropagation(); fn() }

  return (
    <div
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
        <span className={`ix-status ${item.hot ? 'hot' : ''}`}>{item.status}</span>
        <button className="ix-heart" type="button" aria-pressed={saved} aria-label={`Save ${item.title}`} onClick={stop(() => onToggleSave(item.id))}>
          <HeartIcon />
        </button>
        <span className="ix-qv">Quick view</span>

      </div>

      <div className="ix-card-info">
        <p className="ix-card-price">{formatPrice(item.price)} <span>CAD</span></p><h3 className="ix-ttl">{item.title}</h3>
        <span className="ix-addr"><PinIcon />{item.area}, {item.city}</span>
        <p className="ix-card-description">{item.desc}</p><div className="ix-spec">
          <span><BedIcon />{item.beds}</span>
          <span><BathIcon />{item.baths}</span>
          <span><AreaIcon />{item.sqft.toLocaleString('en-CA')} sq ft</span>
        </div>
        <div className="ix-acts">
          <button className="ix-book" type="button" onClick={stop(onContact)}>Book Viewing</button>
          <button className="ix-ib" type="button" aria-label={`Call an agent about ${item.title}`} onClick={stop(onContact)}><PhoneIcon /></button>
          <button className="ix-ib wa" type="button" aria-label={`WhatsApp an agent about ${item.title}`} onClick={stop(onContact)}><WhatsAppIcon /></button>
        </div>
      </div>
    </div>
  )
}
