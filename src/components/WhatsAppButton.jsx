import { scrollToId } from '../utils'
import { WhatsAppIcon } from './icons'

/** Floating WhatsApp button. Later: point `href` at https://wa.me/<agent number>. */
export default function WhatsAppButton() {
  return (
    <a className="ix-wa" href="#contact" aria-label="Preview contact form" onClick={(e) => { e.preventDefault(); scrollToId('contact') }}>
      <WhatsAppIcon />
    </a>
  )
}
