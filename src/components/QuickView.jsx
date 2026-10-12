import Modal from 'react-bootstrap/Modal'
import { formatPrice } from '../utils'
import { CloseIcon, PinIcon } from './icons'

/** Quick view popup (Bootstrap Modal). Closes with Esc, a click outside, or the X. */
export default function QuickView({ item, show, saved, onHide, onToggleSave, onBook }) {
  return (
    <Modal show={show} onHide={onHide} centered dialogClassName="ix-modal-dialog" contentClassName="ix-modal-content" aria-labelledby="qv-price">
      <button className="ix-qv-close" type="button" aria-label="Close" onClick={onHide}><CloseIcon /></button>
      {item && (
        <div className="ix-qv-grid">
          <div className="ix-qv-img"><img src={item.img} alt={`${item.area}, ${item.city}`} /></div>
          <div className="ix-qv-body">
            <span className={`ix-status ${item.hot ? 'hot' : ''}`}>{item.status}</span>
            <h3 id="qv-price">{formatPrice(item.price)} <small>CAD</small></h3>
            <p className="ix-addr"><PinIcon />{item.title} · {item.area}, {item.city}</p>
            <div className="ix-facts">
              <div><b>{item.beds}</b><span>Beds</span></div>
              <div><b>{item.baths}</b><span>Baths</span></div>
              <div><b>{item.sqft.toLocaleString('en-CA')}</b><span>Sq ft</span></div>
            </div>
            <p className="ix-qv-desc">{item.desc}</p>
            <p className="ix-mls">Sample listing · {item.id}</p>
            <div className="ix-qv-actions">
              <button className="ix-btn" type="button" onClick={onBook}>Book a showing</button>
              <button className="ix-btn ix-ghost" type="button" aria-pressed={saved} onClick={() => onToggleSave(item.id)}>
                {saved ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}
