import { scrollToId } from '../utils'
export default function Statement() {
  return <section className="ix-introduction" id="why"><div className="ix-container"><p>A home is a place.<br /><strong>The right home is a feeling.</strong></p><div><span>YOUR MOVE, AT YOUR PACE</span><nav aria-label="Explore your next move"><button onClick={()=>scrollToId('listings')}>Find a home <b>01 ↗</b></button><button onClick={()=>scrollToId('move-tools')}>Plan your move <b>02 ↗</b></button><button onClick={()=>scrollToId('team')}>Meet your people <b>03 ↗</b></button></nav></div></div></section>
}
